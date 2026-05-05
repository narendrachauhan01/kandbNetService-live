import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdSpeed } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { getPlans } from '../api/api'

const staticPlans = {
  gujarat_fup: [
    { speed: '40 Mbps', afterFup: '2 Mbps', data: '3500 GB', priceMonth: 399, priceThree: 1197, priceSix: 2394, priceTen: 3990 },
    { speed: '50 Mbps', afterFup: '2 Mbps', data: '3000 GB', priceMonth: 549, priceThree: 1647, priceSix: 3294, priceTen: 5490 },
    { speed: '100 Mbps', afterFup: '5 Mbps', data: '3500 GB', priceMonth: 699, priceThree: 2097, priceSix: 4197, priceTen: 6990 },
  ],
  gujarat_unlimited: [
    { speed: '10 Mbps', priceMonth: 499, priceThree: 1497, priceSix: 2994, priceTen: 4990 },
    { speed: '20 Mbps', priceMonth: 599, priceThree: 1797, priceSix: 3594, priceTen: 5990 },
    { speed: '50 Mbps', priceMonth: 799, priceThree: 2397, priceSix: 4794, priceTen: 7990 },
    { speed: '100 Mbps', priceMonth: 999, priceThree: 2997, priceSix: 5994, priceTen: 9990 },
  ],
  gujarat_msme: [
    { speed: '25 Mbps', afterFup: '5 Mbps', data: '2000 GB', priceMonth: 599 },
    { speed: '50 Mbps', afterFup: '5 Mbps', data: '2500 GB', priceMonth: 799 },
    { speed: '75 Mbps', afterFup: '5 Mbps', data: '3000 GB', priceMonth: 999 },
    { speed: '100 Mbps', afterFup: '5 Mbps', data: '3500 GB', priceMonth: 1199 },
  ],
}

function PlanCard({ plan, type }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-sky-700 to-sky-600 px-5 py-4 text-white text-center">
        <div className="flex items-center justify-center gap-2">
          <MdSpeed size={20} />
          <h3 className="text-xl font-extrabold">{plan.speed}</h3>
        </div>
        {plan.afterFup && (
          <p className="text-xs opacity-75 mt-1">After FUP: {plan.afterFup}</p>
        )}
      </div>

      <div className="p-5">
        {plan.data && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 bg-sky-50 rounded-lg px-3 py-2">
            <FaCheck className="text-sky-500" size={12} />
            <span>{plan.data} Data</span>
          </div>
        )}

        <div className="text-center py-3 border-b border-gray-100 mb-4">
          <span className="text-4xl font-black text-red-500">₹{plan.priceMonth}</span>
          <span className="text-gray-400 text-sm ml-1">/ month</span>
        </div>

        {type !== 'msme' && (
          <div className="space-y-1.5 text-sm text-gray-600">
            <div className="flex justify-between"><span>3 Months</span><span className="font-semibold text-gray-800">₹{plan.priceThree}</span></div>
            <div className="flex justify-between"><span>6 Months</span><span className="font-semibold text-gray-800">₹{plan.priceSix}</span></div>
            <div className="flex justify-between"><span>10 Months</span><span className="font-semibold text-gray-800">₹{plan.priceTen}</span></div>
          </div>
        )}
      </div>
    </div>
  )
}

function Section({ title, type, plans, gradient }) {
  return (
    <section className="mb-12">
      <div className={`rounded-2xl px-6 py-4 mb-6 text-white text-center ${gradient}`}>
        <h2 className="text-xl md:text-2xl font-extrabold">{title}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {plans.map((plan, i) => (
          <PlanCard key={plan._id || i} plan={plan} type={type} />
        ))}
      </div>
    </section>
  )
}

function GujaratPlan() {
  const [fupPlans, setFupPlans] = useState(staticPlans.gujarat_fup)
  const [unlimitedPlans, setUnlimitedPlans] = useState(staticPlans.gujarat_unlimited)
  const [msmePlans, setMsmePlans] = useState(staticPlans.gujarat_msme)
  const navigate = useNavigate()

  useEffect(() => {
    getPlans('gujarat_fup').then((d) => { if (d) setFupPlans(d) })
    getPlans('gujarat_unlimited').then((d) => { if (d) setUnlimitedPlans(d) })
    getPlans('gujarat_msme').then((d) => { if (d) setMsmePlans(d) })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-gray-50 font-poppins">
      {/* Hero */}
      <div className="bg-gradient-to-r from-sky-800 to-sky-600 text-white text-center py-14 px-4">
        <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
          Govt. of India Initiative
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold">Gujarat Ka Home Internet</h1>
        <p className="text-sky-200 mt-2 text-sm md:text-base">
          RailTel's High-Speed Home Internet — Trusted by Millions
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
          <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">✅ Govt. Backed Network</span>
          <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">✅ Pan India Coverage</span>
          <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">✅ 99.9% Uptime</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Section
          title="FUP Home Plans"
          type="fup"
          plans={fupPlans}
          gradient="bg-gradient-to-r from-sky-700 to-sky-600"
        />
        <Section
          title="Unlimited Home Plans"
          type="unlimited"
          plans={unlimitedPlans}
          gradient="bg-gradient-to-r from-emerald-700 to-emerald-600"
        />
        <Section
          title="MSME Business Plans"
          type="msme"
          plans={msmePlans}
          gradient="bg-gradient-to-r from-violet-700 to-violet-600"
        />

        {/* Footer note */}
        <div className="text-center mt-8 bg-white rounded-2xl shadow p-6">
          <p className="text-sky-700 font-semibold text-lg">
            For New Connection Call: <a href="tel:18001039139" className="underline">1800 1039 139</a>
          </p>
          <p className="text-gray-500 text-sm mt-2">*All plans are subject to 18% GST</p>
          <button
            onClick={() => navigate('/contact-us')}
            className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 shadow hover:shadow-md"
          >
            Get New Connection
          </button>
        </div>
      </div>
    </div>
  )
}

export default GujaratPlan
