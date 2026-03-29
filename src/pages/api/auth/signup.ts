import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await (User as any).findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user
    const newUser = await (User as any).create({
      email,
      password: hashedPassword,
      name: displayName || "New User",
      role: "user", // default role
    });

    return res.status(201).json({ message: "User created successfully", user: { id: newUser._id, email } });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
