import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { z } from "zod";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { sendMail } from "@/lib/mailer";

const schema = z.object({ email: z.string().trim().email() });

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "A valid email is required" });
  }
  const { email } = parsed.data;

  await dbConnect();
  const user = await (User as any).findOne({ email });

  // Only act if the user exists AND has a password (OAuth-only accounts can't
  // reset a password they don't have). Either way we return the same response
  // below so callers can't enumerate which emails are registered.
  if (user && user.password) {
    const token = crypto.randomBytes(32).toString("hex");
    user.resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");
    user.resetTokenExpiry = new Date(Date.now() + TOKEN_TTL_MS);
    await user.save();

    const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const link = `${base}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    await sendMail({
      to: email,
      subject: "Reset your Firefly password",
      text: `Reset your password using this link (valid for 1 hour): ${link}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto">
          <h2 style="color:#b45309">Reset your Firefly password</h2>
          <p>We received a request to reset your password. This link is valid for 1 hour.</p>
          <p><a href="${link}" style="display:inline-block;background:#f59e0b;color:#1a1a1a;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Choose a new password</a></p>
          <p style="color:#666;font-size:13px">If you didn't request this, you can safely ignore this email.</p>
        </div>`,
    });
  }

  // Generic response — never reveal whether the email is registered.
  return res.status(200).json({
    message: "If an account exists for that email, a reset link has been sent.",
  });
}
