import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// The User schema stores the display name as `name`.
const profileSchema = z.object({
  name: z.string().trim().min(1).max(100),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = (session.user as any).id;

  await dbConnect();

  if (req.method === 'GET') {
    const user = await (User as any).findById(userId).select('name email role');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ name: user.name, email: user.email, role: user.role });
  }

  if (req.method === 'PUT') {
    const parsed = profileSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid data', issues: parsed.error.flatten().fieldErrors });
    }
    const updated = await (User as any).findByIdAndUpdate(
      userId,
      { name: parsed.data.name },
      { new: true }
    ).select('name email role');
    return res.status(200).json({ name: updated.name, email: updated.email, role: updated.role });
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
