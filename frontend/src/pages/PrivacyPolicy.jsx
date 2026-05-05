import React, { useState } from 'react'
import {
  MdSecurity, MdPrivacyTip, MdCancelPresentation, MdGavel,
  MdEmail, MdPhone, MdCheckCircle, MdExpandMore, MdExpandLess,
} from 'react-icons/md'
import { FaShieldAlt, FaHandshake, FaUserShield, FaDatabase } from 'react-icons/fa'

const COMPANY = 'K&B Net Service'
const WEBSITE = 'https://narendrasingh.wewp.io'
const CONTACT_EMAIL = 'kandbnetservice3517@gmail.com'
const HELPDESK = ['079-2999-1999', '079-2999-2999']
const EFFECTIVE_DATE = 'October 7, 2025'

const sections = [
  {
    id: 'privacy',
    icon: <FaUserShield size={22} />,
    color: 'blue',
    title: 'Privacy Policy',
    subtitle: 'How we collect and use your information',
    content: [
      {
        heading: 'Information We Collect',
        text: `${COMPANY} collects personal information such as your name, address, email, phone number, and service usage details when you register for or use our broadband, fiber-optic, or wireless internet services.`,
      },
      {
        heading: 'How We Use It',
        text: `Your information is used solely to provide, improve, and maintain our services — including billing, customer support, and service activation. We work with network partners including RailWire, RailTel, BSNL, Trikona, and GTPL to ensure reliable connectivity.`,
      },
      {
        heading: 'Policy Updates',
        text: `We may update this policy from time to time. Changes will be posted on our official website and deemed accepted by your continued use of our services.`,
      },
    ],
  },
  {
    id: 'refund',
    icon: <MdCancelPresentation size={22} />,
    color: 'amber',
    title: 'Refund & Cancellation',
    subtitle: 'Our fair cancellation and refund process',
    content: [
      {
        heading: 'Service Cancellation',
        text: `Customers may cancel services according to their subscription plan terms. Written or email notice is required for cancellation requests.`,
      },
      {
        heading: 'Refund Process',
        text: `Refunds, if applicable, are processed as per our internal policy and communicated via email or customer support within 7–14 business days.`,
      },
      {
        heading: 'No Liability for Outages',
        text: `${COMPANY} is not liable for temporary service outages due to technical issues, maintenance, or factors beyond our control such as natural disasters or third-party network failures.`,
      },
    ],
  },
  {
    id: 'terms',
    icon: <MdGavel size={22} />,
    color: 'purple',
    title: 'Terms of Use',
    subtitle: 'Rules and conditions for using our services',
    content: [
      {
        heading: 'As-Is Services',
        text: `All services provided by ${COMPANY} are offered "AS IS" without any warranty, express or implied, including warranties of performance, merchantability, or fitness for a particular purpose.`,
      },
      {
        heading: 'User Responsibility',
        text: `You are responsible for the legal use of your internet connection. Misuse including illegal downloads, network attacks, or reselling bandwidth without authorization is strictly prohibited.`,
      },
      {
        heading: 'External Links',
        text: `We may link to external websites not controlled by ${COMPANY}. Inclusion of any links does not imply endorsement; we are not responsible for the content or availability of those sites.`,
      },
    ],
  },
  {
    id: 'data',
    icon: <FaDatabase size={20} />,
    color: 'green',
    title: 'Data Security',
    subtitle: 'How we protect your personal data',
    content: [
      {
        heading: 'Security Measures',
        text: `We implement industry-standard security measures including encrypted storage and secure transmission protocols to protect your personal information from unauthorized access, disclosure, or loss.`,
      },
      {
        heading: 'Data Retention',
        text: `We retain your data only for as long as necessary to provide services and comply with legal obligations. You may request deletion of your personal data by contacting our support team.`,
      },
      {
        heading: 'No Third-Party Selling',
        text: `${COMPANY} does not sell, rent, or trade your personal information to third parties for marketing purposes. Your data stays with us.`,
      },
    ],
  },
]

const colorMap = {
  blue:   { bg: 'bg-blue-600',   light: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-600',   badge: 'bg-blue-100 text-blue-700' },
  amber:  { bg: 'bg-amber-500',  light: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-600',  badge: 'bg-amber-100 text-amber-700' },
  purple: { bg: 'bg-purple-600', light: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  green:  { bg: 'bg-green-600',  light: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-600',  badge: 'bg-green-100 text-green-700' },
}

function AccordionSection({ section }) {
  const [open, setOpen] = useState(true)
  const c = colorMap[section.color]

  return (
    <div className={`rounded-2xl border ${c.border} overflow-hidden shadow-sm`}>
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-4 px-6 py-5 ${c.light} hover:brightness-95 transition-all`}
      >
        <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
          {section.icon}
        </div>
        <div className="flex-1 text-left">
          <p className={`font-bold text-base ${c.text}`}>{section.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{section.subtitle}</p>
        </div>
        <span className={`${c.text}`}>
          {open ? <MdExpandLess size={22} /> : <MdExpandMore size={22} />}
        </span>
      </button>

      {/* Body */}
      {open && (
        <div className="bg-white px-6 py-5 space-y-5">
          {section.content.map((item, i) => (
            <div key={i} className="flex gap-3">
              <MdCheckCircle size={18} className={`${c.text} flex-shrink-0 mt-0.5`} />
              <div>
                <p className="font-semibold text-gray-800 text-sm">{item.heading}</p>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PrivacyPolicy() {
  return (
    <main className="font-poppins bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#17345C] to-[#0f172a] text-white py-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
          <MdSecurity size={14} />
          Legal & Policies
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-3">Privacy Policy &amp; Terms</h1>
        <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
          We believe in full transparency. Here's everything you need to know about how we handle your data and services.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { icon: <FaShieldAlt size={18} />, label: 'Data Protected' },
            { icon: <FaHandshake size={18} />, label: 'Fair Terms' },
            { icon: <MdPrivacyTip size={18} />, label: 'Your Privacy First' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
              <span className="text-amber-400">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </div>
        <p className="text-white/30 text-xs mt-8">Effective Date: {EFFECTIVE_DATE}</p>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-5">
        {sections.map((section) => (
          <AccordionSection key={section.id} section={section} />
        ))}

        {/* Contact card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 mt-8 shadow-lg">
          <h3 className="text-lg font-bold mb-1">Have a Question?</h3>
          <p className="text-blue-100 text-sm mb-6">
            If you have any questions about our privacy policy or terms, reach out — we're happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <a href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 bg-white/15 hover:bg-white/25 transition px-5 py-3 rounded-xl text-sm font-medium">
              <MdEmail size={18} />
              {CONTACT_EMAIL}
            </a>
            <div className="flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl text-sm font-medium">
              <MdPhone size={18} />
              <div>
                <p className="text-blue-200 text-[10px] uppercase tracking-wide mb-0.5">Helpdesk</p>
                {HELPDESK.map((num) => (
                  <a key={num} href={`tel:${num.replace(/-/g, '')}`}
                    className="block hover:text-white/70 transition">
                    {num}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pt-4">
          © {new Date().getFullYear()} {COMPANY}. All rights reserved. &nbsp;|&nbsp; {WEBSITE}
        </p>
      </div>

    </main>
  )
}

export default PrivacyPolicy
