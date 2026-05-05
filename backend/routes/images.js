import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import SiteImage from '../models/SiteImage.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
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
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/images')),
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'img-' + suffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only images allowed')),
});

// Public — images by section
router.get('/', async (req, res) => {
  try {
    const query = { isActive: true };
    if (req.query.section) query.section = req.query.section;
    const images = await SiteImage.find(query).sort({ order: 1 });
    res.json(images);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — all images
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const query = {};
    if (req.query.section) query.section = req.query.section;
    const images = await SiteImage.find(query).sort({ section: 1, order: 1 });
    res.json(images);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — upload image
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image is required' });
    const { section, alt } = req.body;
    const count = await SiteImage.countDocuments({ section });
    const siteImage = await SiteImage.create({
      section,
      imageUrl: `/uploads/images/${req.file.filename}`,
      alt: alt || '',
      order: count,
    });
    res.status(201).json(siteImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — update image
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const old = req.file ? await SiteImage.findById(req.params.id) : null;
    const update = {
      alt: req.body.alt || '',
      isActive: req.body.isActive === 'true',
      order: parseInt(req.body.order) || 0,
    };
    if (req.file) update.imageUrl = `/uploads/images/${req.file.filename}`;
    const image = await SiteImage.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!image) return res.status(404).json({ message: 'Image not found' });
    if (old?.imageUrl) await safeUnlink(old.imageUrl);
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — delete image
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const image = await SiteImage.findByIdAndDelete(req.params.id);
    if (image) await safeUnlink(image.imageUrl);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
