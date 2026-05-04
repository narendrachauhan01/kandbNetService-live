import mongoose from 'mongoose';

const siteImageSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: ['bsnl_plan', 'featured_plan', 'about', 'partner_logo', 'customer'],
    },
    imageUrl: { type: String, required: true },
    alt: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('SiteImage', siteImageSchema);
