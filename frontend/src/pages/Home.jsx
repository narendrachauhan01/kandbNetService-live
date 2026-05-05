import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import banner1 from '../assets/bannerImage/banner-1.png'
import banner2 from '../assets/bannerImage/banner-2.jpg'
import banner3 from '../assets/bannerImage/banner-3.jpeg'
import banner4 from '../assets/bannerImage/banner-4.jpeg'
import InternetPlan from '../Data/InternetPlan'
import About from '../pages/About'
import BsnlPlan from '../Data/BsnlPlan'
import OurPartner from './OurPartner'
import FloatingButtons from '../components/FloatingButtons'
import { getBanners } from '../api/api'

const staticBanners = [
  { imageUrl: banner1, title: '' },
  { imageUrl: banner2, title: '' },
  { imageUrl: banner3, title: '' },
  { imageUrl: banner4, title: '' },
]

function Home() {
  const [banners, setBanners] = useState(staticBanners)
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    getBanners().then((data) => {
      if (data && data.length > 0) setBanners(data)
    })
  }, [])

  const changeTo = (index) => {
    setFade(false)
    setTimeout(() => {
      setCurrent(index)
      setFade(true)
    }, 300)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changeTo((current + 1) % banners.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [current, banners.length])

  const prev = () => changeTo((current - 1 + banners.length) % banners.length)
  const next = () => changeTo((current + 1) % banners.length)

  return (
    <main className="flex flex-col font-poppins">
      {/* Banner Slider */}
      <div className="relative w-full overflow-hidden group" style={{ height: 'clamp(220px, 55vw, 680px)' }}>

        {/* Slides */}
        {banners.map((banner, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img
              src={banner.imageUrl || banner}
              alt={banner.title || `Banner ${i + 1}`}
              className="w-full h-full object-cover object-center"
            />
            {/* subtle bottom gradient for dots readability */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ))}

        {/* Prev arrow */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        >
          <FaChevronLeft size={16} />
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        >
          <FaChevronRight size={16} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => changeTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-7 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>

      </div>

      {/* Page sections */}
      <div className="mt-6">
        <BsnlPlan />
        <InternetPlan />
        <About />
        <OurPartner />
        <FloatingButtons />
      </div>
    </main>
  )
}

export default Home
