import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

// Stripe signature verification needs the raw, unparsed body.
export const config = { api: { bodyParser: false } };

function readRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function markOrder(paymentIntentId: string, orderId: string | undefined, paymentStatus: "paid" | "failed") {
  await dbConnect();
  const filter = orderId ? { _id: orderId } : { stripePaymentIntentId: paymentIntentId };
  await (Order as any).findOneAndUpdate(filter, { paymentStatus, stripePaymentIntentId: paymentIntentId });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];
  if (!secret || !sig) {
    return res.status(400).json({ error: "Missing webhook secret or signature" });
  }

  let event: Stripe.Event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err: any) {
    return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object as Stripe.PaymentIntent;
      await markOrder(pi.id, pi.metadata?.orderId, "paid");
    } else if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object as Stripe.PaymentIntent;
      await markOrder(pi.id, pi.metadata?.orderId, "failed");
    }
  } catch (err: any) {
    // Returning 500 tells Stripe to retry the delivery.
    return res.status(500).json({ error: err.message });
  }

  return res.status(200).json({ received: true });
}
