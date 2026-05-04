import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Plan from '../models/Plan.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/plans')),
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'plan-' + suffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only images allowed')),
});

// Public — plans by category
router.get('/', async (req, res) => {
  try {
    const query = { isActive: true };
    if (req.query.category) query.category = req.query.category;
    const plans = await Plan.find(query).sort({ order: 1 });
    res.json(plans);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — all plans
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const query = {};
    if (req.query.category) query.category = req.query.category;
    const plans = await Plan.find(query).sort({ order: 1 });
    res.json(plans);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — create plan
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { category, title, speed, afterFup, data, priceMonth, priceThree, priceSix, priceTen, features } = req.body;
    const count = await Plan.countDocuments({ category });
    const plan = await Plan.create({
      category,
      title: title || '',
      speed,
      afterFup: afterFup || '',
      data: data || '',
      priceMonth: parseFloat(priceMonth),
      priceThree: parseFloat(priceThree) || 0,
      priceSix: parseFloat(priceSix) || 0,
      priceTen: parseFloat(priceTen) || 0,
      imageUrl: req.file ? `/uploads/plans/${req.file.filename}` : '',
      features: features ? JSON.parse(features) : [],
      order: count,
    });
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — update plan
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, speed, afterFup, data, priceMonth, priceThree, priceSix, priceTen, isActive, order, features } = req.body;
    const update = {
      title: title || '',
      speed,
      afterFup: afterFup || '',
      data: data || '',
      priceMonth: parseFloat(priceMonth),
      priceThree: parseFloat(priceThree) || 0,
      priceSix: parseFloat(priceSix) || 0,
      priceTen: parseFloat(priceTen) || 0,
      isActive: isActive === 'true' || isActive === true,
      order: parseInt(order) || 0,
    };
    if (features) update.features = JSON.parse(features);
    if (req.file) update.imageUrl = `/uploads/plans/${req.file.filename}`;
    const plan = await Plan.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — delete plan
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
