import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

// Admin-only operations on a single contact message.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if ((session?.user as any)?.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { id } = req.query;
  if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid message id" });
  }

  await dbConnect();

  if (req.method === "PATCH") {
    // Toggle/set the read flag (defaults to marking read).
    const read = typeof req.body?.read === "boolean" ? req.body.read : true;
    const updated = await (Message as any).findByIdAndUpdate(id, { read }, { new: true });
    if (!updated) return res.status(404).json({ error: "Message not found" });
    return res.status(200).json({ success: true, read: updated.read });
  }

  if (req.method === "DELETE") {
    const deleted = await (Message as any).findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Message not found" });
    return res.status(200).json({ success: true });
  }

  res.setHeader("Allow", ["PATCH", "DELETE"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
