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
  const isAdmin = (session.user as any).role === 'admin';
  const { id } = req.query;

  await dbConnect();

  const order = await (Order as any).findById(id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  // A user may only access their own orders; admins may access any.
  if (!isAdmin && order.userId.toString() !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(order);
  } else if (req.method === 'PUT') {
    // Only the status is updatable (e.g. admin marking shipped/delivered).
    if (req.body?.status) order.status = req.body.status;
    await order.save();
    return res.status(200).json(order);
  } else if (req.method === 'DELETE') {
    await (Order as any).findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
