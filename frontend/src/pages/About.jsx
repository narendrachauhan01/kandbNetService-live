import React, { useEffect, useState } from 'react'
import { FaShieldAlt, FaHeadset, FaRocket, FaGlobe, FaTag, FaStar } from 'react-icons/fa'
import aboutUs from '../assets/patten-image/about.png'
import { getSiteImages } from '../api/api'

const features = [
  { icon: <FaRocket className="text-blue-600" size={22} />, title: 'Super High Performance', desc: 'Consistent speeds with zero throttling, guaranteed uptime SLA.' },
  { icon: <FaGlobe className="text-green-600" size={22} />, title: 'European Technology', desc: 'Cutting-edge fiber technology delivering European-grade internet to Indian homes.' },
  { icon: <FaHeadset className="text-amber-600" size={22} />, title: 'Lightning Fast Support', desc: 'Our trained engineers resolve issues faster than anyone else.' },
  { icon: <FaShieldAlt className="text-purple-600" size={22} />, title: '24/7 Technical Assistance', desc: 'Round-the-clock monitoring and instant technical support.' },
  { icon: <FaTag className="text-red-500" size={22} />, title: 'Affordable Packages', desc: 'Best value plans designed for every budget and usage need.' },
  { icon: <FaStar className="text-orange-500" size={22} />, title: 'Wide Network Coverage', desc: 'Extensive fiber network across Ahmedabad and Gujarat.' },
]

const stats = [
  { value: '5+', label: 'Years of Service' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '24/7', label: 'Support Available' },
]

function About() {
  const [aboutImage, setAboutImage] = useState(aboutUs)

  useEffect(() => {
    getSiteImages('about').then((data) => {
      if (data && data.length > 0) setAboutImage(data[0].imageUrl)
    })
  }, [])

  return (
    <section className="font-poppins">
      {/* Stats bar */}
      <div className="bg-gradient-to-r from-[#17345C] to-[#1e4a7f] py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-black text-amber-400">{s.value}</p>
              <p className="text-sm text-blue-200 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main about section */}
      <div className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-wide uppercase">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Combining high-speed internet with{' '}
              <span className="text-amber-500">seamless entertainment</span>
            </h2>
          </div>

          {/* Image + Text */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="md:w-1/2 flex justify-center">
              <img
                src={aboutImage}
                alt="About K&B Net Service"
                className="w-full max-w-md rounded-3xl shadow-xl object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-amber-600 mb-4">
                Get TV service with your internet
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Enjoy seamless connectivity and entertainment with our combined internet and TV
                services. Stay connected, stay entertained, and experience the best of both worlds
                with unmatched reliability and speed.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                K&B Net Service is Ahmedabad's trusted broadband provider, partnered with{' '}
                <strong>RailTel, BSNL, RailWire, and GTPL</strong> to bring you the fastest, most
                reliable internet at the most affordable rates.
              </p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 p-6 rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  {f.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{f.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
