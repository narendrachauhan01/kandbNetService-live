import express from 'express';
import nodemailer from 'nodemailer';
import Inquiry from '../models/Inquiry.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

function makeTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  });
}

async function sendConfirmationEmail(inquiry) {
  const transporter = makeTransporter();
  await transporter.sendMail({
    from: `"K&B Net Service" <${process.env.MAIL_USER}>`,
    to: inquiry.email,
    subject: `Inquiry Confirmed – ${inquiry.inquiryId} | K&B Net Service`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#1e3a5f,#17345c);padding:32px 24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;">K&amp;B Net Service</h1>
          <p style="color:#93c5fd;font-size:13px;margin:6px 0 0;">Broadband &amp; IFTV Specialists</p>
        </div>

        <!-- Body -->
        <div style="padding:32px 24px;">
          <h2 style="color:#1d4ed8;font-size:18px;margin:0 0 8px;">✅ Inquiry Received!</h2>
          <p style="color:#374151;font-size:14px;margin:0 0 20px;">
            Dear <strong>${inquiry.fullName}</strong>, your inquiry has been successfully registered.
            Our team will contact you within <strong>24 hours</strong>.
          </p>

          <!-- Inquiry ID box -->
          <div style="background:#eff6ff;border:2px dashed #3b82f6;border-radius:12px;padding:16px 24px;text-align:center;margin-bottom:24px;">
            <p style="color:#6b7280;font-size:12px;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px;">Your Inquiry ID</p>
            <p style="color:#1d4ed8;font-size:28px;font-weight:900;margin:0;letter-spacing:4px;">${inquiry.inquiryId}</p>
            <p style="color:#9ca3af;font-size:11px;margin:8px 0 0;">Keep this ID for tracking your inquiry status</p>
          </div>

          <!-- Details -->
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 0;color:#6b7280;width:40%;">Full Name</td>
              <td style="padding:10px 0;color:#111827;font-weight:600;">${inquiry.fullName}</td>
            </tr>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 0;color:#6b7280;">Phone</td>
              <td style="padding:10px 0;color:#111827;font-weight:600;">${inquiry.phone}</td>
            </tr>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 0;color:#6b7280;">Email</td>
              <td style="padding:10px 0;color:#111827;font-weight:600;">${inquiry.email}</td>
            </tr>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 0;color:#6b7280;">Location</td>
              <td style="padding:10px 0;color:#111827;font-weight:600;">${[inquiry.city, inquiry.state].filter(Boolean).join(', ') || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#6b7280;">Date</td>
              <td style="padding:10px 0;color:#111827;font-weight:600;">${new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</td>
            </tr>
          </table>

          <div style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:8px;padding:14px 18px;margin-top:24px;">
            <p style="color:#15803d;font-size:13px;margin:0;font-weight:600;">📞 What happens next?</p>
            <p style="color:#166534;font-size:13px;margin:6px 0 0;">Our team will call you on <strong>${inquiry.phone}</strong> within 24 hours to discuss your connection requirements.</p>
          </div>
        </div>

        <!-- Contact -->
        <div style="background:#f9fafb;padding:20px 24px;border-top:1px solid #e5e7eb;">
          <p style="color:#6b7280;font-size:12px;margin:0 0 6px;">Need help? Reach us at:</p>
          <p style="color:#1d4ed8;font-size:13px;font-weight:600;margin:0;">📞 079-2999-1999 &nbsp;|&nbsp; ✉️ kandbnetservice3517@gmail.com</p>
        </div>

        <!-- Footer -->
        <div style="background:#1e3a5f;padding:16px;text-align:center;">
          <p style="color:#93c5fd;font-size:11px;margin:0;">© ${new Date().getFullYear()} K&amp;B Net Service · 168/A Pratapnagar, Meghaninagar, Ahmedabad - 380016</p>
        </div>
      </div>
    `,
  });
}

// Public — check inquiry status by email
router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const inquiries = await Inquiry.find({ email: email.toLowerCase() }).sort({ createdAt: -1 }).limit(5);
  if (!inquiries.length) return res.status(404).json({ message: 'No inquiry found with this email.' });

  res.json(inquiries.map((inq) => ({
    inquiryId:  inq.inquiryId || '—',
    fullName:   inq.fullName,
    phone:      inq.phone,
    city:       inq.city,
    state:      inq.state,
    message:    inq.message,
    status:     inq.status,
    createdAt:  inq.createdAt,
  })));
});

// Public — check if phone already registered
router.post('/check-phone', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.json({ exists: false });
  const existing = await Inquiry.findOne({ phone, status: { $in: ['new', 'contacted'] } });
  if (!existing) return res.json({ exists: false });

  // Generate inquiryId for old records
  if (!existing.inquiryId) {
    const date = new Date(existing.createdAt);
    const yyyymmdd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const count = await Inquiry.countDocuments({ createdAt: { $lte: existing.createdAt } });
    existing.inquiryId = `KNB-${yyyymmdd}-${String(count).padStart(4, '0')}`;
    await existing.save();
  }

  res.json({ exists: true, inquiryId: existing.inquiryId });
});

// Public — save new inquiry
router.post('/', async (req, res) => {
  try {
    const { fullName, phone, email, city, state, message } = req.body;
    if (!fullName || !phone || !email) {
      return res.status(400).json({ message: 'Name, phone and email are required' });
    }

    // Check for existing active inquiry with same email or phone
    const existing = await Inquiry.findOne({
      status: { $in: ['new', 'contacted'] },
      $or: [{ email: email.toLowerCase() }, { phone }],
    });

    if (existing) {
      // Generate inquiryId for old records that don't have one
      if (!existing.inquiryId) {
        const date = new Date(existing.createdAt);
        const yyyymmdd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
        const count = await Inquiry.countDocuments({ createdAt: { $lte: existing.createdAt } });
        existing.inquiryId = `KNB-${yyyymmdd}-${String(count).padStart(4, '0')}`;
        await existing.save();
      }
      return res.status(409).json({
        alreadyExists: true,
        inquiryId: existing.inquiryId,
        message: `An inquiry is already registered with this ${existing.email === email.toLowerCase() ? 'email' : 'phone number'}. Your Inquiry ID is ${existing.inquiryId}. Our team will contact you soon.`,
      });
    }

    const inquiry = await Inquiry.create({ fullName, phone, email: email.toLowerCase(), city, state, message });

    // Send confirmation email (don't block response if it fails)
    sendConfirmationEmail(inquiry).catch((err) => console.error('Email error:', err.message));

    res.status(201).json({ success: true, inquiryId: inquiry.inquiryId, id: inquiry._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — get all inquiries
router.get('/', authMiddleware, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — update status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ message: 'Not found' });
    res.json(inquiry);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — delete inquiry
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
