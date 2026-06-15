import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = (session.user as any).id;

  await dbConnect();

  if (req.method === 'GET') {
    // Each user only sees their own orders.
    const orders = await (Order as any).find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } else if (req.method === 'POST') {
    const { items, total_amount } = req.body || {};
    if (!Array.isArray(items) || items.length === 0 || typeof total_amount !== 'number') {
      return res.status(400).json({ error: 'items and total_amount are required' });
    }
    const order = await (Order as any).create({ userId, items, total_amount });
    return res.status(201).json(order);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
