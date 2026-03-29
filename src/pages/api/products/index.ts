import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { books } from '@/data/books';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
  if (req.method === 'GET') {
    let products = await (Product as any).find({});
    // Seed from local if empty
    if (products.length === 0) {
      await (Product as any).insertMany(books);
      products = await (Product as any).find({});
    }
    return res.status(200).json(products);
  } else if (req.method === 'POST') {
    const newProduct = await (Product as any).create(req.body);
    return res.status(201).json(newProduct);
  }
}
