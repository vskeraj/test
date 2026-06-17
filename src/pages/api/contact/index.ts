import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import { sendMail } from '@/lib/mailer';

// Mirrors the client-side schema so submissions are validated on the server too.
const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10).max(1000),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    // Public endpoint — anyone can send a message.
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid form data', issues: parsed.error.flatten().fieldErrors });
    }
    const doc = await (Message as any).create(parsed.data);

    // Notify the admin by email. The message is already stored, so a mail
    // failure must not fail the request — just log it.
    const recipient = process.env.CONTACT_RECIPIENT || process.env.SMTP_USER || process.env.EMAIL_FROM;
    if (recipient) {
      const { name, email, subject, message } = parsed.data;
      try {
        await sendMail({
          to: recipient,
          replyTo: `${name} <${email}>`,
          subject: `📬 New contact message: ${subject}`,
          text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;margin:auto">
              <h2 style="color:#b45309">New contact message</h2>
              <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p style="white-space:pre-wrap;border-left:3px solid #f59e0b;padding-left:12px;color:#333">${message}</p>
              <p style="color:#888;font-size:12px">Reply directly to this email to respond to ${name}.</p>
            </div>`,
        });
      } catch (err) {
        console.error('[contact] failed to email admin:', err);
      }
    }

    return res.status(201).json({ success: true, id: doc._id.toString() });
  }

  if (req.method === 'GET') {
    // Admins can read submitted messages (newest first).
    const session = await getServerSession(req, res, authOptions);
    if ((session?.user as any)?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const messages = await (Message as any).find({}).sort({ createdAt: -1 });
    return res.status(200).json(JSON.parse(JSON.stringify(messages)));
  }

  res.setHeader('Allow', ['POST', 'GET']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
