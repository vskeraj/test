import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dbConnect from '@/lib/mongodb';
import Favorite from '@/models/Favorite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = (session.user as any).id;

  await dbConnect();

  if (req.method === 'GET') {
    // Return the user's favorite product ids as plain strings.
    const favs = await (Favorite as any).find({ userId }).select('productId');
    return res.status(200).json(favs.map((f: any) => f.productId.toString()));
  }

  // POST and DELETE both operate on a single productId from the body.
  const { productId } = req.body || {};
  if (!productId || !mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ error: 'A valid productId is required' });
  }

  if (req.method === 'POST') {
    // Idempotent add — avoids duplicates if the user double-clicks.
    await (Favorite as any).findOneAndUpdate(
      { userId, productId },
      { userId, productId },
      { upsert: true }
    );
    return res.status(201).json({ success: true });
  } else if (req.method === 'DELETE') {
    await (Favorite as any).deleteOne({ userId, productId });
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
