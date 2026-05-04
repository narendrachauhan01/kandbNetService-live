import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['featured', 'bsnl', 'gujarat_fup', 'gujarat_unlimited', 'gujarat_msme'],
    },
    title: { type: String, default: '' },
    speed: { type: String, required: true },
    afterFup: { type: String, default: '' },
    data: { type: String, default: '' },
    priceMonth: { type: Number, required: true },
    priceThree: { type: Number, default: 0 },
    priceSix: { type: Number, default: 0 },
    priceTen: { type: Number, default: 0 },
    imageUrl: { type: String, default: '' },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Plan', planSchema);
