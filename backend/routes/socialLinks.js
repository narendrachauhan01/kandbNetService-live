import express from 'express';
import SocialLinks from '../models/SocialLinks.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public — get social links
router.get('/', async (req, res) => {
  try {
    let links = await SocialLinks.findOne();
    if (!links) links = await SocialLinks.create({});
    res.json(links);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin — update social links
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { facebook, youtube, twitter, linkedin } = req.body;
    let links = await SocialLinks.findOne();
    if (!links) links = new SocialLinks();
    links.facebook = facebook || '';
    links.youtube  = youtube  || '';
    links.twitter  = twitter  || '';
    links.linkedin = linkedin || '';
    await links.save();
    res.json(links);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
