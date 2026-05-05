import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaHandshake, FaBuilding } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import p1 from '../assets/partner-logo/1.png'
import p2 from '../assets/partner-logo/2.png'
import p3 from '../assets/partner-logo/3.png'
import p4 from '../assets/partner-logo/4.png'
import p5 from '../assets/partner-logo/airport.jpg'
import p6 from '../assets/partner-logo/station.jpeg'
import p7 from '../assets/partner-logo/nioh.png'
import p8 from '../assets/partner-logo/epfo.jpeg'
import p9 from '../assets/partner-logo/ugvcl.jpeg'
import p10 from '../assets/partner-logo/bullet.png'
import p11 from '../assets/partner-logo/boibank.jpeg'
import p12 from '../assets/partner-logo/canerabank.jpeg'
import p13 from '../assets/partner-logo/bob-bank.jpeg'
import p14 from '../assets/partner-logo/union-bank.jpeg'
import p15 from '../assets/partner-logo/ipr.jpeg'

const partners = [
  { img: p1, name: 'Partner 1' },
  { img: p2, name: 'Partner 2' },
  { img: p3, name: 'Partner 3' },
  { img: p4, name: 'Partner 4' },
]

const connections = [
  { img: p5,  name: 'Airport Ahmedabad',      location: 'Ahmedabad, Gujarat' },
  { img: p6,  name: 'Railway Station',         location: 'Ahmedabad, Gujarat' },
  { img: p7,  name: 'NIOH',                    location: 'Ahmedabad, Gujarat' },
  { img: p8,  name: 'EPFO',                    location: 'Ahmedabad, Gujarat' },
  { img: p9,  name: 'UGVCL',                   location: 'Ahmedabad, Gujarat' },
  { img: p10, name: 'Bullet Train Project',    location: 'Ahmedabad, Gujarat' },
  { img: p11, name: 'BOI Bank',                location: 'Ahmedabad, Gujarat' },
  { img: p12, name: 'Canara Bank',             location: 'Ahmedabad, Gujarat' },
  { img: p13, name: 'BOB Bank',                location: 'Ahmedabad, Gujarat' },
  { img: p14, name: 'Union Bank',              location: 'Ahmedabad, Gujarat' },
  { img: p15, name: 'IPR Ahmedabad',           location: 'Ahmedabad, Gujarat' },
]

/* ── Card Slider ── */
function CardSlider({ items, darkArrow, plain }) {
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(3)
  const autoRef = useRef(null)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else if (window.innerWidth < 1280) setPerView(3)
      else setPerView(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, items.length - perView)
  const next = () => setCurrent((p) => (p >= maxIndex ? 0 : p + 1))
  const prev = () => setCurrent((p) => (p <= 0 ? maxIndex : p - 1))

  useEffect(() => {
    autoRef.current = setInterval(next, 3000)
    return () => clearInterval(autoRef.current)
  }, [perView, items.length])

  const resetAuto = (fn) => {
    clearInterval(autoRef.current)
    fn()
    autoRef.current = setInterval(next, 3000)
  }

  const arrowBase = 'absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10'
  const arrowStyle = darkArrow
    ? 'bg-white/10 hover:bg-white text-white hover:text-gray-800 border border-white/20'
    : 'bg-white hover:bg-blue-600 text-gray-600 hover:text-white border border-gray-100'

  return (
    <div className="relative px-6">
      <div className="overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${current * (100 / perView)}% - ${current * 20 / perView}px))` }}
        >
          {items.map((item, i) => (
            <div key={i} className="flex-shrink-0"
              style={{ width: `calc(${100 / perView}% - ${(perView - 1) * 20 / perView}px)` }}>
              {plain ? (
                <div className="h-40 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-md">
                  <img src={item.img} alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(3)', transformOrigin: 'center center' }} />
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 group">
                  <div className="h-40 flex items-center justify-center p-4 bg-white/5">
                    <img src={item.img} alt={item.name}
                      className="max-h-28 max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="px-4 py-3 text-center border-t border-white/10">
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                    <p className="flex items-center justify-center gap-1 text-white/50 text-xs mt-0.5">
                      <MdLocationOn size={11} />
                      {item.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => resetAuto(prev)} className={`${arrowBase} ${arrowStyle} -left-2`}>
        <FaChevronLeft size={13} />
      </button>
      <button onClick={() => resetAuto(next)} className={`${arrowBase} ${arrowStyle} -right-2`}>
        <FaChevronRight size={13} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button key={i} onClick={() => resetAuto(() => setCurrent(i))}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  )
}

function OurPartner() {
  return (
    <main className="font-poppins bg-[#0f172a]">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#17345C] to-[#0f172a] text-white text-center py-16 px-4">
        <span className="inline-block bg-white/10 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
          Network & Partnerships
        </span>
        <h1 className="text-3xl md:text-5xl font-black mb-4">My Connection</h1>
        <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
          Trusted by leading institutions, government bodies, airports, railways, and banks
          across Ahmedabad & Gujarat.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { value: '15+', label: 'Top Connections' },
            { value: '4', label: 'Network Partners' },
            { value: '5+', label: 'Years of Trust' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-black text-amber-400">{s.value}</p>
              <p className="text-xs text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Partners — card slider */}
      <div className="py-14 px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaHandshake size={22} className="text-amber-400" />
            <h2 className="text-2xl md:text-3xl font-black text-white">Our Partners</h2>
          </div>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            We're proud to partner with the most trusted names in India's digital connectivity ecosystem.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <CardSlider items={partners} darkArrow plain />
        </div>
      </div>

      {/* Top Connections — card slider */}
      <div className="py-14 px-4 bg-gradient-to-b from-transparent to-[#17345C]/30">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaBuilding size={20} className="text-amber-400" />
            <h2 className="text-2xl md:text-3xl font-black text-white">Top Connections</h2>
          </div>
          <p className="text-white/50 text-sm max-w-2xl mx-auto">
            From airports and railway stations to leading banks and government institutions —
            K&B Net Service powers connectivity for Gujarat's most reputed organizations.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <CardSlider items={connections} darkArrow />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-14 px-4 border-t border-white/10">
        <p className="text-white/60 text-sm mb-1">Want to become a partner?</p>
        <h3 className="text-xl font-bold text-white mb-5">Let's connect and grow together</h3>
        <a href="/contact-us"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-3 rounded-full shadow transition-all hover:shadow-lg hover:-translate-y-0.5">
          Contact Us →
        </a>
      </div>

    </main>
  )
}

export default OurPartner
