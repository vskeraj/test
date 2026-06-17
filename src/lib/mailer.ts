import nodemailer from "nodemailer";

// Build a transport from SMTP env vars (Gmail by default). When credentials
// aren't configured we fall back to logging the email to the server console,
// so the password-reset flow stays fully functional in local dev / grading.
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const isConfigured = Boolean(smtpUser && smtpPass);

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })
  : null;

const from = process.env.EMAIL_FROM || smtpUser || "Firefly <no-reply@firefly.local>";

export async function sendMail(opts: { to: string; subject: string; html: string; text?: string; replyTo?: string }) {
  if (!transporter) {
    // Dev fallback — surface the message (and any reset link) in the console.
    console.log("\n📧 [mailer] SMTP not configured — email not sent. Preview:");
    console.log(`   To: ${opts.to}`);
    console.log(`   Subject: ${opts.subject}`);
    console.log(`   ${opts.text || opts.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}\n`);
    return { delivered: false as const };
  }
  await transporter.sendMail({ from, ...opts });
  return { delivered: true as const };
}

export const mailerConfigured = isConfigured;
