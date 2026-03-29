import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = await (Product as any).findById(id);
    return res.status(200).json(product);
  } else if (req.method === 'PUT') {
    const update = await (Product as any).findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(update);
  } else if (req.method === 'DELETE') {
    await (Product as any).findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  }
}
