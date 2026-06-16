import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { z } from "zod";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

const schema = z.object({
  email: z.string().trim().email(),
  token: z.string().min(1),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0]?.message || "Invalid data" });
  }
  const { email, token, password } = parsed.data;

  await dbConnect();
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await (User as any).findOne({
    email,
    resetTokenHash: tokenHash,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({ message: "This reset link is invalid or has expired." });
  }

  // Set the new password and invalidate the token (single use).
  user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  user.resetTokenHash = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return res.status(200).json({ message: "Your password has been reset. You can now sign in." });
}
