import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight, FaTv, FaWifi, FaHeadset, FaGlobe, FaRedo, FaListAlt } from 'react-icons/fa'
import { MdDownload, MdSpeed } from 'react-icons/md'
import bsnl1 from '../assets/plan-image/bsnl-plan1.jpeg'
import bsnl2 from '../assets/plan-image/bsnl-plan2.jpeg'
import bsnl3 from '../assets/plan-image/bsnl-plan3.jpeg'
import { getSiteImages } from '../api/api'

const staticImages = [bsnl1, bsnl2, bsnl3]

const features = [
  { icon: <FaTv size={20} />,      label: 'Watch 500+',   sub: 'Live TV Channels' },
  { icon: <FaHeadset size={20} />, label: '24/7 Support', sub: 'Always Available' },
  { icon: <MdSpeed size={22} />,   label: 'Superfast',    sub: 'Broadband Speed' },
  { icon: <FaGlobe size={20} />,   label: 'HD Streaming', sub: 'Crystal Clear' },
  { icon: <FaRedo size={18} />,    label: 'Easy Renewal', sub: 'Upgrade Anytime' },
  { icon: <FaListAlt size={18} />, label: 'All-in-One',   sub: 'Internet + TV' },
]

function BsnlPlan() {
  const [images, setImages] = useState(staticImages)
  const [current, setCurrent] = useState(0)
  const autoRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    getSiteImages('bsnl_plan').then((data) => {
      if (data && data.length > 0) setImages(data.map((img) => img.imageUrl))
    })
  }, [])

  const total = images.length
  const next = () => setCurrent((p) => (p + 1) % total)
  const prev = () => setCurrent((p) => (p - 1 + total) % total)

  const resetAuto = (fn) => {
    clearInterval(autoRef.current)
    fn()
    autoRef.current = setInterval(next, 3500)
  }

  useEffect(() => {
    autoRef.current = setInterval(next, 3500)
    return () => clearInterval(autoRef.current)
  }, [total])

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
          <FaTv size={11} /> Special Combo
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 leading-tight">
          <span className="text-amber-500">Superfast Internet</span>
          <span className="text-gray-400 mx-2">+</span>
          <span className="text-blue-700">SkyPro BSNL IFTV</span>
        </h2>
        <p className="text-gray-500 text-base mt-3 max-w-xl mx-auto">
          Watch your favourite content on the go!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT PANEL */}
        <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1a2e52] to-[#0a0f1e] flex flex-col p-10 gap-5">
          <div className="absolute top-0 left-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Image slider — natural size, no fixed height */}
          <div className="relative z-10 rounded-xl overflow-hidden group/slider">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`BSNL Plan ${i + 1}`}
                className="w-full block transition-opacity duration-700"
                style={{
                  opacity: i === current ? 1 : 0,
                  position: i === current ? 'relative' : 'absolute',
                  top: 0, left: 0,
                }}
              />
            ))}

            <button onClick={() => resetAuto(prev)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100">
              <FaChevronLeft size={11} />
            </button>
            <button onClick={() => resetAuto(next)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100">
              <FaChevronRight size={11} />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => resetAuto(() => setCurrent(i))}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-amber-400' : 'w-1.5 h-1.5 bg-white/40'}`} />
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <button onClick={() => navigate('/contact-us')}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold py-2.5 px-6 rounded-full shadow-lg transition-all hover:-translate-y-0.5 text-sm">
              <MdDownload size={16} /> Get Connected Now
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#022c22] flex flex-col p-10 gap-6 justify-between">
          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10">
            <span className="inline-block bg-emerald-400/20 text-emerald-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              All-in-One Bundle
            </span>
            <h2 className="text-white text-2xl md:text-3xl font-black leading-tight">
              Elevate Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Entertainment
              </span>
            </h2>
            <p className="text-emerald-100/60 text-sm mt-2 leading-relaxed">
              The ultimate Internet + IFTV bundle — everything you need in one plan.
            </p>
          </div>

          {/* Feature cards */}
          <div className="relative z-10 grid grid-cols-2 gap-3 flex-1">
            {features.map((f, i) => (
              <div key={i}
                className="flex items-center gap-3 bg-white/8 hover:bg-white/15 transition-all duration-200 rounded-2xl px-4 py-3 border border-white/10 group cursor-default">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400/30 to-orange-500/20 rounded-xl flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{f.label}</p>
                  <p className="text-emerald-100/50 text-xs mt-0.5">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="relative z-10">
            <button onClick={() => navigate('/contact-us')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 text-sm">
              <FaWifi size={14} /> Enquire Now →
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default BsnlPlan
