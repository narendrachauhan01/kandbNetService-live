import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Plan from '../models/Plan.js';
import Review from '../models/Review.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Admin user
  const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
    await Admin.create({ username: process.env.ADMIN_USERNAME || 'admin', password: hashed });
    console.log(`Admin created — username: admin  password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
  } else {
    console.log('Admin already exists, skipping');
  }

  // Featured plans
  if ((await Plan.countDocuments({ category: 'featured' })) === 0) {
    await Plan.insertMany([
      {
        category: 'featured', speed: '100 Mbps', title: 'Basic Plan',
        priceMonth: 6699,
        features: ['Up to 100 Mbps Speed', '12 + 3 Months Validity', 'Unlimited Data', 'Free Installation', '24/7 Support'],
        order: 0,
      },
      {
        category: 'featured', speed: '150 Mbps', title: 'Standard Plan',
        priceMonth: 7699,
        features: ['Up to 150 Mbps Speed', '12 + 3 Months Validity', 'Unlimited Data', 'Free Installation', 'Priority Support', 'Free Router Setup'],
        order: 1,
      },
      {
        category: 'featured', speed: '200 Mbps', title: 'Premium Plan',
        priceMonth: 8699,
        features: ['Up to 200 Mbps Speed', '12 + 3 Months Validity', 'Unlimited Data', 'Free Installation', 'Dedicated Support', 'Free Router', 'Static IP Available'],
        order: 2,
      },
    ]);
    console.log('Featured plans seeded');
  }

  // Gujarat FUP
  if ((await Plan.countDocuments({ category: 'gujarat_fup' })) === 0) {
    await Plan.insertMany([
      { category: 'gujarat_fup', speed: '40 Mbps', afterFup: '2 Mbps', data: '3500 GB', priceMonth: 399, priceThree: 1197, priceSix: 2394, priceTen: 3990, order: 0 },
      { category: 'gujarat_fup', speed: '50 Mbps', afterFup: '2 Mbps', data: '3000 GB', priceMonth: 549, priceThree: 1647, priceSix: 3294, priceTen: 5490, order: 1 },
      { category: 'gujarat_fup', speed: '100 Mbps', afterFup: '5 Mbps', data: '3500 GB', priceMonth: 699, priceThree: 2097, priceSix: 4197, priceTen: 6990, order: 2 },
    ]);
    console.log('Gujarat FUP plans seeded');
  }

  // Gujarat Unlimited
  if ((await Plan.countDocuments({ category: 'gujarat_unlimited' })) === 0) {
    await Plan.insertMany([
      { category: 'gujarat_unlimited', speed: '10 Mbps', priceMonth: 499, priceThree: 1497, priceSix: 2994, priceTen: 4990, order: 0 },
      { category: 'gujarat_unlimited', speed: '20 Mbps', priceMonth: 599, priceThree: 1797, priceSix: 3594, priceTen: 5990, order: 1 },
      { category: 'gujarat_unlimited', speed: '50 Mbps', priceMonth: 799, priceThree: 2397, priceSix: 4794, priceTen: 7990, order: 2 },
      { category: 'gujarat_unlimited', speed: '100 Mbps', priceMonth: 999, priceThree: 2997, priceSix: 5994, priceTen: 9990, order: 3 },
    ]);
    console.log('Gujarat Unlimited plans seeded');
  }

  // Gujarat MSME
  if ((await Plan.countDocuments({ category: 'gujarat_msme' })) === 0) {
    await Plan.insertMany([
      { category: 'gujarat_msme', speed: '25 Mbps', afterFup: '5 Mbps', data: '2000 GB', priceMonth: 599, order: 0 },
      { category: 'gujarat_msme', speed: '50 Mbps', afterFup: '5 Mbps', data: '2500 GB', priceMonth: 799, order: 1 },
      { category: 'gujarat_msme', speed: '75 Mbps', afterFup: '5 Mbps', data: '3000 GB', priceMonth: 999, order: 2 },
      { category: 'gujarat_msme', speed: '100 Mbps', afterFup: '5 Mbps', data: '3500 GB', priceMonth: 1199, order: 3 },
    ]);
    console.log('Gujarat MSME plans seeded');
  }

  // Reviews
  if ((await Review.countDocuments()) === 0) {
    await Review.insertMany([
      { name: 'Narendra Singh', location: 'Ahmedabad, Gujarat', rating: 5, text: 'Very good service and speed is also commendable and very fast. Have not faced any issue since we have taken this connection. Good quality service provider. Thank you so much for this service.' },
      { name: 'Abodh Kumar', location: 'Rajasthan', rating: 5, text: 'Very good service and speed is also commendable and very fast. Have not faced any issue since we have taken this connection. Good quality service provider. Thank you so much for this service.' },
      { name: 'Rajan Vavadia', location: 'Ahmedabad, Gujarat', rating: 5, text: 'Very good service and speed is also commendable and very fast. Have not faced any issue since we have taken this connection. Good quality service provider. Thank you so much for this service.' },
      { name: 'Rahul Singh', location: 'Ahmedabad, Gujarat', rating: 5, text: 'Very good service and speed is also commendable and very fast. Have not faced any issue since we have taken this connection. Good quality service provider. Thank you so much for this service.' },
      { name: 'Narendra', location: 'Jaunpur, Uttar Pradesh', rating: 5, text: 'Very good service and speed is also commendable and very fast. Have not faced any issue since we have taken this connection. Good quality service provider. Thank you so much for this service.' },
    ]);
    console.log('Reviews seeded');
  } else {
    console.log('Reviews already exist, skipping');
  }

  console.log('\nSeeding complete!');
  console.log('Admin login → username: admin | password: Admin@123');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
