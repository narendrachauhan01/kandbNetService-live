import React, { useState, useEffect, useRef } from 'react'
import { FaQuoteLeft, FaStar, FaYoutube, FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { getReviews, submitReview } from '../api/api'

const videos = [
  'https://www.youtube.com/embed/igYkMjaEXRw?si=1Hgog2H65zqwc9_K',
  'https://www.youtube.com/embed/8CmocLnxppA?si=lxwEtYk3MKb8iE79',
  'https://www.youtube.com/embed/aFeRL--wOsM?si=uMFvXf0u6UhGvAvV',
  'https://www.youtube.com/embed/_wGWwlIeCKg?si=8N1-QfDxk0FdZmQS',
]

/* ---------- Star picker ---------- */
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-125 focus:outline-none"
          >
            <FaStar
              size={34}
              className={`transition-colors duration-150 ${
                star <= (hovered || value) ? 'text-amber-400' : 'text-gray-200'
              }`}
            />
          </button>
        ))}
      </div>
      {(hovered || value) > 0 && (
        <span className="text-sm font-semibold text-amber-500">{labels[hovered || value]}</span>
      )}
    </div>
  )
}

/* ---------- Star display ---------- */
function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar key={s} size={13} className={s <= rating ? 'text-amber-400' : 'text-gray-200'} />
      ))}
    </div>
  )
}

/* ---------- Review Card ---------- */
function ReviewCard({ review, active }) {
  return (
    <div className={`bg-white rounded-3xl shadow-md flex flex-col transition-all duration-500 h-full ${active ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}`}>
      <div className="p-7 flex-1">
        <FaQuoteLeft size={28} className="text-blue-100 mb-4" />
        <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
        <div className="mt-4">
          <StarDisplay rating={review.rating} />
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex items-center gap-4 border-t border-blue-100 rounded-b-3xl">
        {(review.image || review.imageUrl)
          ? <img src={review.image || review.imageUrl} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0" />
          : <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 border-2 border-white shadow-md">
              <FaUserCircle size={36} className="text-blue-400" />
            </div>
        }
        <div>
          <p className="font-bold text-gray-800 text-sm">{review.name}</p>
          {review.location && (
            <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <MdLocationOn size={12} className="text-red-400" />
              {review.location}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- Review Slider ---------- */
function ReviewSlider({ reviews }) {
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(3)
  const autoRef = useRef(null)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, reviews.length - perView)

  const next = () => setCurrent((p) => (p >= maxIndex ? 0 : p + 1))
  const prev = () => setCurrent((p) => (p <= 0 ? maxIndex : p - 1))

  useEffect(() => {
    autoRef.current = setInterval(next, 4000)
    return () => clearInterval(autoRef.current)
  }, [perView, reviews.length])

  const resetAuto = (fn) => {
    clearInterval(autoRef.current)
    fn()
    autoRef.current = setInterval(next, 4000)
  }

  if (reviews.length === 0) return null

  return (
    <div className="relative max-w-6xl mx-auto px-4">
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${current * (100 / perView)}% - ${current * 24 / perView}px))` }}
        >
          {reviews.map((review, i) => (
            <div key={review._id || i} className="flex-shrink-0"
              style={{ width: `calc(${100 / perView}% - ${(perView - 1) * 24 / perView}px)` }}>
              <ReviewCard review={review} active={i >= current && i < current + perView} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => resetAuto(prev)}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all z-10">
        <FaChevronLeft size={15} />
      </button>
      <button onClick={() => resetAuto(next)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all z-10">
        <FaChevronRight size={15} />
      </button>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button key={i} onClick={() => resetAuto(() => setCurrent(i))}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-7 h-2.5 bg-blue-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-blue-300'}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------- Video Slider ---------- */
function VideoSlider() {
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(2)
  const autoRef = useRef(null)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = videos.length - perView
  const next = () => setCurrent((p) => (p >= maxIndex ? 0 : p + 1))
  const prev = () => setCurrent((p) => (p <= 0 ? maxIndex : p - 1))

  useEffect(() => {
    autoRef.current = setInterval(next, 4000)
    return () => clearInterval(autoRef.current)
  }, [perView])

  const resetAuto = (fn) => {
    clearInterval(autoRef.current)
    fn()
    autoRef.current = setInterval(next, 4000)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex gap-5 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${current * (100 / perView)}% - ${current * 20 / perView}px))` }}>
          {videos.map((src, i) => (
            <div key={i} className="flex-shrink-0"
              style={{ width: `calc(${100 / perView}% - ${(perView - 1) * 20 / perView}px)` }}>
              <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10 hover:ring-red-500/50 transition-all duration-300">
                <div className="w-full aspect-video">
                  <iframe src={src} title={`Customer Review ${i + 1}`} allowFullScreen className="w-full h-full" />
                </div>
                <div className="bg-gray-800 px-3 py-2 flex items-center gap-2">
                  <FaYoutube size={14} className="text-red-500" />
                  <span className="text-gray-300 text-xs font-medium">Customer Review #{i + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => resetAuto(prev)}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-gray-700 shadow-lg rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all z-10">
        <FaChevronLeft size={15} />
      </button>
      <button onClick={() => resetAuto(next)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-gray-700 shadow-lg rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all z-10">
        <FaChevronRight size={15} />
      </button>
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button key={i} onClick={() => resetAuto(() => setCurrent(i))}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-7 h-2.5 bg-red-500' : 'w-2.5 h-2.5 bg-gray-600 hover:bg-red-400'}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------- Submit Review Form ---------- */
function SubmitReviewForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: '', location: '', text: '', rating: 0 })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.rating === 0) return setError('Please select a star rating')
    setLoading(true)
    setError('')
    try {
      await submitReview(form, imageFile)
      setSuccess(true)
      setForm({ name: '', location: '', text: '', rating: 0 })
      setImageFile(null)
      setPreview(null)
      onSubmitted()
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <FaStar size={28} className="text-green-500" />
        </div>
        <h4 className="text-lg font-bold text-gray-800 mb-1">Thank you for your review!</h4>
        <p className="text-gray-500 text-sm mb-5">Your review has been posted successfully.</p>
        <button onClick={() => setSuccess(false)} className="text-sm text-blue-600 hover:underline">
          Write another review
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Star picker */}
      <div className="text-center py-2">
        <p className="text-sm text-gray-500 mb-3">Tap to rate your experience</p>
        <StarPicker value={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
      </div>

      {/* Optional photo */}
      <div className="flex flex-col items-center gap-3">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Profile Photo <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        {preview ? (
          <div className="relative">
            <img src={preview} alt="preview" className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow" />
            <button type="button" onClick={removeImage}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center shadow hover:bg-red-600 transition">
              ✕
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => fileRef.current?.click()}
            className="w-20 h-20 rounded-full border-2 border-dashed border-blue-300 flex flex-col items-center justify-center text-blue-400 hover:border-blue-500 hover:text-blue-600 transition bg-blue-50">
            <FaUserCircle size={28} />
            <span className="text-[10px] mt-1">Add Photo</span>
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name *</label>
          <input type="text" value={form.name} required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
          <input type="text" value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Ahmedabad, Gujarat"
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Your Review *</label>
        <textarea value={form.text} required rows={4}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          placeholder="Share your experience with K&B Net Service..."
          className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition resize-none" />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button type="submit" disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow hover:shadow-md disabled:opacity-60 flex items-center justify-center gap-2">
        {loading ? 'Submitting...' : <><FaStar size={14} /> Submit Review</>}
      </button>
    </form>
  )
}

/* ---------- Main Page ---------- */
function CustomerReviews() {
  const [allReviews, setAllReviews] = useState([])

  const loadReviews = async () => {
    const data = await getReviews()
    if (data) setAllReviews(data)
  }

  useEffect(() => { loadReviews() }, [])

  return (
    <main className="font-poppins bg-gradient-to-b from-slate-50 to-white">

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#17345C] to-[#1e4a7f] text-white text-center py-14 px-4">
        <span className="inline-block bg-white/10 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
          Testimonials
        </span>
        <h1 className="text-3xl md:text-4xl font-black mb-3">What Our Customers Say</h1>
        <p className="text-blue-200 text-sm md:text-base max-w-lg mx-auto">
          Real stories from real customers who trust K&B Net Service every day.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {[
            { value: '10,000+', label: 'Happy Customers' },
            { value: '4.9 ★', label: 'Average Rating' },
            { value: '5+ Years', label: 'Trusted Service' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-2xl font-black text-amber-400">{s.value}</p>
              <p className="text-xs text-blue-200 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="py-16 px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800">Happy Customers</h2>
          <p className="text-gray-400 text-sm mt-2">Trusted by thousands across Gujarat & India</p>
        </div>
        <ReviewSlider reviews={allReviews} />
      </div>

      {/* Submit Review */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-wide uppercase">
              Share Your Experience
            </span>
            <h2 className="text-2xl font-black text-gray-800">Write a Review</h2>
            <p className="text-gray-500 text-sm mt-2">Your feedback helps us serve better</p>
          </div>
          <div className="bg-white rounded-3xl shadow-md p-8">
            <SubmitReviewForm onSubmitted={loadReviews} />
          </div>
        </div>
      </div>

      {/* YouTube Reviews */}
      <div className="bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FaYoutube size={28} className="text-red-500" />
              <span className="text-white font-black text-2xl md:text-3xl">Video Reviews</span>
            </div>
            <p className="text-gray-400 text-sm">Watch what our customers say on YouTube</p>
          </div>
          <VideoSlider />
          <p className="text-center text-gray-500 text-xs mt-8">
            Subscribe to our{' '}
            <a href="https://www.youtube.com/@kbnet2199" target="_blank" rel="noreferrer"
              className="text-red-400 hover:text-red-300 underline">YouTube channel</a>{' '}
            for more customer stories
          </p>
        </div>
      </div>

    </main>
  )
}

export default CustomerReviews
