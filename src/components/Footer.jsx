import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhone, FaWifi } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import logo from '../assets/LogoImage/logo1.jpeg'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/plans', label: 'Broadband Plans' },
  { to: '/my-Connection', label: 'My Connection' },
  { to: '/customer-reviews', label: 'Customer Reviews' },
  { to: '/contact-us', label: 'Enquire Now' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
]

const socials = [
  { href: 'https://www.facebook.com/kandbnetservice', icon: <FaFacebookF size={15} />, label: 'Facebook', hover: 'hover:bg-blue-600' },
  { href: 'https://www.youtube.com/@kbnet2199', icon: <FaYoutube size={15} />, label: 'YouTube', hover: 'hover:bg-red-600' },
  { href: '#', icon: <FaXTwitter size={15} />, label: 'Twitter', hover: 'hover:bg-gray-600' },
  { href: '#', icon: <FaInstagram size={15} />, label: 'Instagram', hover: 'hover:bg-pink-600' },
  { href: '#', icon: <FaLinkedinIn size={15} />, label: 'LinkedIn', hover: 'hover:bg-blue-700' },
]

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-[#0a0f1e] text-white font-poppins">

      {/* Top CTA strip */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaWifi size={22} className="text-white" />
            <div>
              <p className="font-bold text-base">Get Connected Today</p>
              <p className="text-blue-100 text-xs">High-speed fiber internet for your home & business</p>
            </div>
          </div>
          <Link
            to="/contact-us"
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow flex-shrink-0"
          >
            New Connection →
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <button onClick={scrollToTop} className="flex items-center gap-3 mb-5 group">
            <img src={logo} alt="K&B Net Service" className="w-14 h-14 rounded-full shadow-lg group-hover:scale-105 transition-transform object-cover" />
            <div className="text-left">
              <p className="font-black text-base leading-tight">K&B Net Service</p>
              <p className="text-xs text-blue-300">High Speed Internet</p>
            </div>
          </button>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Trusted broadband provider in Ahmedabad, Gujarat. Partnered with RailTel, BSNL, and RailWire for reliable, fast, affordable internet.
          </p>
          {/* Socials */}
          <div className="flex gap-2.5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                className={`w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-300 ${s.hover} hover:scale-110`}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest text-blue-400 mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}
                  className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 flex-shrink-0"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest text-blue-400 mb-5">Our Services</h3>
          <ul className="space-y-3">
            {['Home Broadband', 'Business Internet', 'BSNL + SkyPro IFTV', 'RailTel Fiber', 'New Connection', 'Quick Pay'].map((s) => (
              <li key={s}>
                <Link to="/contact-us"
                  className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 flex-shrink-0"></span>
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest text-blue-400 mb-5">Contact Us</h3>
          <ul className="space-y-4">
            <li>
              <a href="tel:+918200683391" className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                  <FaPhone size={12} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Call Us</p>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">+91 8200683391</p>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">+91 9879669892</p>
                </div>
              </a>
            </li>
            <li>
              <p className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPhone size={12} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Helpdesk</p>
                  <p className="text-sm text-gray-300">079-2999-1999</p>
                  <p className="text-sm text-gray-300">079-2999-2999</p>
                </div>
              </p>
            </li>
            <li>
              <a href="mailto:kandbnetservice3517@gmail.com" className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                  <MdEmail size={14} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors break-all">
                    kandbnetservice3517@gmail.com
                  </p>
                </div>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdLocationOn size={14} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Address</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    168/A Pratapnagar, Rameshwar Cross, Meghaninagar, Ahmedabad - 380016, Gujarat
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} K&B Net Service Pvt. Ltd. — All Rights Reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <span>Terms of Use</span>
            <span>|</span>
            <span className="text-gray-500">
              Managed by{' '}
              <span className="text-blue-400 font-semibold">Narendra Singh</span>
              {' '}— DevOps Engineer
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
