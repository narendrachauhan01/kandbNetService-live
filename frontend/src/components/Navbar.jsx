import React, { useState, useEffect } from 'react'
import { RiMenu2Fill, RiCloseLine } from 'react-icons/ri'
import { FaWifi, FaSearch } from 'react-icons/fa'
import logo1 from '../assets/LogoImage/logo1.jpeg'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/plans', label: 'Broadband Plans' },
    { to: '/my-Connection', label: 'My Connection' },
    { to: '/customer-reviews', label: 'Reviews' },
    { to: '/privacy-policy', label: 'Privacy Policy' },
  ]

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <nav className={`bg-white sticky top-0 z-40 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <img src={logo1} alt="K&B Net Service" className="w-12 h-12 rounded-full shadow object-cover" />
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-[#17345C] leading-tight">K&B Net Service</p>
            <p className="text-[10px] text-gray-500">High Speed Internet</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1 font-poppins text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/contact-us"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/contact-us')
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Enquire Now
            </Link>
          </li>
          <li>
            <Link
              to="/check-enquiry"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/check-enquiry')
                  ? 'text-purple-600 bg-purple-50 font-semibold'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <FaSearch size={11} /> Check Enquiry
            </Link>
          </li>
        </ul>

        {/* New Connection CTA — desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact-us"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            <FaWifi size={14} />
            New Connection
          </Link>
        </div>

        {/* Mobile: New Connection + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/contact-us"
            className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-full shadow"
          >
            <FaWifi size={12} />
            <span className="hidden sm:inline">New Connection</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            {isOpen ? <RiCloseLine size={26} /> : <RiMenu2Fill size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden absolute w-full bg-white border-t border-gray-100 shadow-xl z-50 font-poppins">
          <ul className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.to)
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact-us"
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive('/contact-us')
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Enquire Now
              </Link>
            </li>
            <li>
              <Link
                to="/check-enquiry"
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive('/check-enquiry')
                    ? 'bg-purple-50 text-purple-600 font-semibold'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <FaSearch size={13} /> Check Enquiry
              </Link>
            </li>
            <li className="pt-2 pb-1">
              <Link
                to="/contact-us"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow"
              >
                <FaWifi size={15} />
                New Connection
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
