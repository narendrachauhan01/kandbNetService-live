import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Review from '../models/Review.js';
import authMiddleware from '../middleware/authMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs/promises';

async function safeUnlink(imageUrl) {
  if (!imageUrl || !imageUrl.startsWith('/uploads/')) return;
  const filePath = path.join(__dirname, '..', imageUrl);
  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('Failed to delete file:', filePath, err.message);
  }
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/reviews')),
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'review-' + suffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only images allowed')),
});

const router = express.Router();

// Public — get approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Public — submit review (with optional image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, location, text, rating } = req.body;
    if (!name || !text || !rating) return res.status(400).json({ message: 'Name, review and rating are required' });
    const review = await Review.create({
      name, location, text, rating,
      imageUrl: req.file ? `/uploads/reviews/${req.file.filename}` : '',
    });
    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — get all reviews
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — toggle approve
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: req.body.isApproved },
      { new: true }
    );
    res.json(review);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — delete review
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (review) await safeUnlink(review.imageUrl);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
