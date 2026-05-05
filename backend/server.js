import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import bannerRoutes from './routes/banners.js';
import planRoutes from './routes/plans.js';
import imageRoutes from './routes/images.js';
import inquiryRoutes from './routes/inquiries.js';
import reviewRoutes from './routes/reviews.js';
import otpRoutes from './routes/otp.js';
import socialLinksRoutes from './routes/socialLinks.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/social-links', socialLinksRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
