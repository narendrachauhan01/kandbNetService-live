import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheck, FaWifi } from 'react-icons/fa'
import { MdSpeed } from 'react-icons/md'
import { getPlans } from '../api/api'

const staticPlans = [
  {
    speed: '100 Mbps', title: 'Basic Plan', priceMonth: 6699,
    features: ['Up to 100 Mbps Speed', '12 + 3 Months Validity', 'Unlimited Data', 'Free Installation', '24/7 Support'],
  },
  {
    speed: '150 Mbps', title: 'Standard Plan', priceMonth: 7699,
    features: ['Up to 150 Mbps Speed', '12 + 3 Months Validity', 'Unlimited Data', 'Free Installation', 'Priority Support', 'Free Router Setup'],
    popular: true,
  },
  {
    speed: '200 Mbps', title: 'Premium Plan', priceMonth: 8699,
    features: ['Up to 200 Mbps Speed', '12 + 3 Months Validity', 'Unlimited Data', 'Free Installation', 'Dedicated Support', 'Free Router', 'Static IP Available'],
  },
]

function PlanCard({ plan, index, onInquire }) {
  const isPopular = plan.popular || index === 1

  return (
    <div className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
      isPopular ? 'shadow-xl ring-2 ring-blue-500 scale-105' : 'shadow-md'
    }`}>
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold text-center py-1.5 tracking-wide z-10">
          MOST POPULAR
        </div>
      )}

      {/* Header with gradient */}
      <div className={`px-6 py-8 text-center ${isPopular ? 'pt-10' : ''} ${
        isPopular
          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
          : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
      }`}>
        <div className="flex items-center justify-center gap-2 mb-1">
          <MdSpeed size={22} />
          <h3 className="text-2xl font-extrabold">{plan.speed}</h3>
        </div>
        {plan.title && <p className="text-sm opacity-75 mt-1">{plan.title}</p>}
        <div className="mt-4">
          <span className="text-5xl font-black">₹{plan.priceMonth?.toLocaleString()}</span>
          <span className="text-sm opacity-70 ml-1">/ year</span>
        </div>
        <p className="text-xs opacity-60 mt-1">12 + 3 months validity</p>
      </div>

      {/* Features */}
      <div className="px-6 py-6">
        <ul className="space-y-3">
          {(plan.features || []).map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
              <FaCheck className="text-green-500 flex-shrink-0 mt-0.5" size={13} />
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={onInquire}
          className={`w-full mt-6 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow hover:shadow-md ${
            isPopular
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
          }`}
        >
          <FaWifi size={14} />
          Inquire Now
        </button>
      </div>
    </div>
  )
}

function InternetPlan() {
  const [plans, setPlans] = useState(staticPlans)
  const navigate = useNavigate()

  useEffect(() => {
    getPlans('featured').then((data) => { if (data) setPlans(data) })
  }, [])

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="text-center mb-12">
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-wide uppercase">
          Our Plans
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          Explore <span className="text-amber-500">Broadband</span>{' '}
          <span className="text-blue-600">Plans</span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
          High-speed fiber internet with guaranteed uptime, free installation, and round-the-clock support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
        {plans.slice(0, 3).map((plan, i) => (
          <PlanCard
            key={plan._id || i}
            plan={plan}
            index={i}
            onInquire={() => navigate('/contact-us')}
          />
        ))}
      </div>
    </section>
  )
}

export default InternetPlan
