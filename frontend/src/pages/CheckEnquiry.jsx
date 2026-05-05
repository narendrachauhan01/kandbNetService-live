import React, { useState } from 'react'
import { checkEnquiryByEmail } from '../api/api'
import {
  FaEnvelope, FaUserAlt, FaPhone, FaMapMarkerAlt, FaTag, FaCommentDots, FaSearch,
} from 'react-icons/fa'
import { MdCheckCircle, MdAccessTime, MdPending, MdCancel } from 'react-icons/md'

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}

const STEPS = [
  {
    key: 'new',
    label: 'Request Open',
    desc: 'Your inquiry has been received successfully.',
    icon: <MdPending size={20} />,
    activeColor: 'bg-blue-600',
    textColor: 'text-blue-600',
    lightBg: 'bg-blue-50',
  },
  {
    key: 'contacted',
    label: 'Team Contacted',
    desc: 'Our team has reached out to you on your phone.',
    icon: <MdAccessTime size={20} />,
    activeColor: 'bg-amber-500',
    textColor: 'text-amber-600',
    lightBg: 'bg-amber-50',
  },
  {
    key: 'closed',
    label: 'Request Closed',
    desc: 'Your inquiry has been resolved and closed.',
    icon: <MdCheckCircle size={20} />,
    activeColor: 'bg-green-600',
    textColor: 'text-green-600',
    lightBg: 'bg-green-50',
  },
]

const stepIndex = { new: 0, contacted: 1, closed: 2 }

function TrackingTimeline({ status }) {
  const current = stepIndex[status] ?? 0
  return (
    <div className="px-6 py-6 border-t border-gray-100">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Inquiry Progress</p>
      <div className="relative">
        {/* connector line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 z-0" style={{ marginLeft: '1.25rem', marginRight: '1.25rem' }} />
        <div
          className="absolute top-5 left-5 h-0.5 bg-blue-500 z-0 transition-all duration-700"
          style={{ width: current === 0 ? '0%' : current === 1 ? '50%' : '100%', marginLeft: '1.25rem' }}
        />

        <div className="relative z-10 flex justify-between">
          {STEPS.map((step, i) => {
            const done    = i < current
            const active  = i === current
            const pending = i > current
            return (
              <div key={step.key} className="flex flex-col items-center gap-2 flex-1">
                {/* Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  done    ? `${step.activeColor} border-transparent text-white` :
                  active  ? `${step.lightBg} ${step.textColor} border-current ring-4 ring-offset-2 ${step.textColor.replace('text-', 'ring-')}` :
                            'bg-gray-100 border-gray-200 text-gray-400'
                }`}>
                  {done ? <MdCheckCircle size={20} /> : step.icon}
                </div>
                {/* Label */}
                <div className="text-center px-1">
                  <p className={`text-xs font-bold leading-tight ${
                    active ? step.textColor : done ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  {active && (
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-tight hidden sm:block">{step.desc}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active step message */}
      <div className={`mt-6 rounded-xl px-4 py-3 flex items-start gap-2.5 text-sm ${STEPS[current].lightBg}`}>
        <span className={`mt-0.5 flex-shrink-0 ${STEPS[current].textColor}`}>{STEPS[current].icon}</span>
        <div>
          <p className={`font-bold text-sm ${STEPS[current].textColor}`}>{STEPS[current].label}</p>
          <p className="text-gray-600 text-xs mt-0.5">{STEPS[current].desc}
            {status === 'new' && ' Our team will call you within 24 hours.'}
            {status === 'contacted' && ' Please check your registered phone number.'}
          </p>
        </div>
      </div>
    </div>
  )
}

function EnquiryCard({ inq }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#17345C] to-[#1e4a7f] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <FaTag size={12} className="text-blue-300" />
          <span className="text-white font-black tracking-widest text-lg">{inq.inquiryId}</span>
        </div>
        <span className="text-blue-200 text-xs">{formatTime(inq.createdAt)}</span>
      </div>

      {/* Details grid */}
      <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaUserAlt size={14} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Full Name</p>
            <p className="text-gray-800 font-bold text-sm mt-0.5">{inq.fullName}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaPhone size={13} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Phone</p>
            <a href={`tel:${inq.phone}`} className="text-gray-800 font-bold text-sm mt-0.5 hover:text-blue-600 transition block">
              {inq.phone}
            </a>
          </div>
        </div>

        {(inq.city || inq.state) && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt size={13} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Location</p>
              <p className="text-gray-800 font-bold text-sm mt-0.5">
                {[inq.city, inq.state].filter(Boolean).join(', ')}
              </p>
            </div>
          </div>
        )}

        {inq.message && (
          <div className="flex items-start gap-3 sm:col-span-2">
            <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaCommentDots size={13} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium">Purpose / Reason</p>
              <p className="text-gray-700 text-sm mt-0.5 leading-relaxed">{inq.message}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tracking timeline */}
      <TrackingTimeline status={inq.status} />
    </div>
  )
}

export default function CheckEnquiry() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError]     = useState('')

  const handleCheck = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true); setError(''); setResults(null)
    try {
      const data = await checkEnquiryByEmail(email)
      setResults(data)
    } catch (err) {
      setError(err.message || 'No inquiry found.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 font-poppins">

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#17345C] to-[#1e4a7f] text-white py-14 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wide">
          <FaSearch size={11} /> TRACK YOUR INQUIRY
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3">Check Your Enquiry</h1>
        <p className="text-blue-200 text-sm max-w-md mx-auto">
          Enter your registered email to view your inquiry status, ID, and details.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Search card */}
        <div className="bg-white rounded-3xl shadow-md p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Enter Your Email</h2>
          <p className="text-gray-400 text-sm mb-6">We'll look up all inquiries linked to your email address.</p>

          <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FaEnvelope size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="email" required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setResults(null); setError(''); }}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-7 py-3 rounded-xl transition-all shadow-md disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Checking...
                </>
              ) : (
                <><FaSearch size={13} /> Check Status</>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
              <MdCancel size={18} className="flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-5">
            <p className="text-sm text-gray-500 font-medium">
              Found <span className="text-blue-600 font-bold">{results.length}</span> inquiry{results.length > 1 ? 's' : ''} for <span className="font-semibold">{email}</span>
            </p>
            {results.map((inq, i) => <EnquiryCard key={i} inq={inq} />)}
          </div>
        )}
      </div>
    </main>
  )
}
