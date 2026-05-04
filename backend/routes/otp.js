import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// In-memory OTP store: email → { otp, expiresAt }
const otpStore = new Map();

function makeTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

// POST /api/otp/send
router.post('/send', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(email.toLowerCase(), { otp, expiresAt });

  try {
    const transporter = makeTransporter();
    await transporter.sendMail({
      from: `"K&B Net Service" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Your OTP – K&B Net Service Inquiry',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1e3a5f,#17345c);padding:24px;text-align:center;">
            <h2 style="color:#fff;margin:0;font-size:20px;">K&amp;B Net Service</h2>
            <p style="color:#93c5fd;font-size:13px;margin:4px 0 0;">Email Verification</p>
          </div>
          <div style="padding:32px 24px;text-align:center;">
            <p style="color:#374151;font-size:15px;margin:0 0 16px;">Your One-Time Password (OTP) is:</p>
            <div style="display:inline-block;background:#eff6ff;border:2px dashed #3b82f6;border-radius:12px;padding:16px 40px;font-size:36px;font-weight:900;letter-spacing:10px;color:#1d4ed8;">
              ${otp}
            </div>
            <p style="color:#6b7280;font-size:13px;margin:20px 0 0;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
          </div>
          <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af;">
            © ${new Date().getFullYear()} K&amp;B Net Service · Ahmedabad, Gujarat
          </div>
        </div>
      `,
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Mail error:', err.message);
    res.status(500).json({ message: 'Failed to send OTP. Check email configuration.' });
  }
});

// POST /api/otp/verify
router.post('/verify', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

  const record = otpStore.get(email.toLowerCase());
  if (!record) return res.status(400).json({ message: 'OTP not found. Please request a new one.' });
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
  }
  if (record.otp !== otp.trim()) return res.status(400).json({ message: 'Invalid OTP. Please try again.' });

  otpStore.delete(email.toLowerCase());
  res.json({ message: 'Email verified successfully', verified: true });
});

export default router;
