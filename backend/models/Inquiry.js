import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    inquiryId: { type: String, unique: true },
    fullName:  { type: String, required: true },
    phone:     { type: String, required: true },
    email:     { type: String, required: true },
    city:      { type: String, default: '' },
    state:     { type: String, default: '' },
    message:   { type: String, default: '' },
    status:    { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

// Auto-generate inquiryId before save
inquirySchema.pre('save', async function (next) {
  if (this.inquiryId) return next();
  const date = new Date();
  const yyyymmdd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const count = await mongoose.model('Inquiry').countDocuments();
  this.inquiryId = `KNB-${yyyymmdd}-${String(count + 1).padStart(4, '0')}`;
  next();
});

export default mongoose.model('Inquiry', inquirySchema);
