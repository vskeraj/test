import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { stripe, stripeConfigured } from "@/lib/stripe";

const bodySchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().positive().max(99),
  })).min(1),
});

// Shipping rule mirrored from the cart UI.
const shippingFor = (subtotal: number) => (subtotal > 30 ? 0 : 4.99);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!stripeConfigured) {
    return res.status(500).json({ error: "Payments are not configured." });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  const userId = (session.user as any).id;

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid cart" });

  await dbConnect();

  // Recompute the order from authoritative DB prices — never trust client amounts.
  const orderItems: { productId: string; title: string; price: number; quantity: number }[] = [];
  let subtotal = 0;
  for (const { productId, quantity } of parsed.data.items) {
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ error: `Invalid product: ${productId}` });
    }
    const product = await (Product as any).findById(productId);
    if (!product) return res.status(400).json({ error: `Product not found: ${productId}` });
    subtotal += product.price * quantity;
    orderItems.push({ productId: product._id.toString(), title: product.title, price: product.price, quantity });
  }

  const total = subtotal + shippingFor(subtotal);
  const amountInCents = Math.round(total * 100);

  // Create the order as unpaid; the webhook flips it to paid on confirmation.
  const order = await (Order as any).create({
    userId,
    items: orderItems,
    total_amount: total,
    paymentStatus: "unpaid",
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: { orderId: order._id.toString(), userId: String(userId) },
  });

  // Persist the intent id so the order is traceable even before the webhook lands.
  order.stripePaymentIntentId = paymentIntent.id;
  await order.save();

  return res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    orderId: order._id.toString(),
    amount: total,
  });
}
