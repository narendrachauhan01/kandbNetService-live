import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Banner from '../models/Banner.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/banners')),
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'banner-' + suffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only images allowed')),
});

// Public — active banners for frontend
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.json(banners);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — all banners
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    res.json(banners);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — upload new banner
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image is required' });
    const count = await Banner.countDocuments();
    const banner = await Banner.create({
      imageUrl: `/uploads/banners/${req.file.filename}`,
      title: req.body.title || '',
      subtitle: req.body.subtitle || '',
      order: count,
    });
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — update banner
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const update = {
      title: req.body.title || '',
      subtitle: req.body.subtitle || '',
      isActive: req.body.isActive === 'true',
      order: parseInt(req.body.order) || 0,
    };
    if (req.file) update.imageUrl = `/uploads/banners/${req.file.filename}`;
    const banner = await Banner.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — delete banner
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
