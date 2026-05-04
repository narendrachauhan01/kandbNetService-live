import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, default: '' },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    imageUrl: { type: String, default: '' },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
