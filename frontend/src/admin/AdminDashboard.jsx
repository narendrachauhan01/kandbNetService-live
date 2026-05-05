import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdImage, MdListAlt, MdInbox, MdRefresh, MdPhotoLibrary, MdTrendingUp,
} from 'react-icons/md';
import { FaCheckCircle, FaStar, FaArrowRight } from 'react-icons/fa';
import AdminLayout from './AdminLayout';
import { getAllBanners, getAllPlans, getAllInquiries, getAllReviews } from '../api/api';

function AdminDashboard() {
  const [banners, setBanners]       = useState(0);
  const [plans, setPlans]           = useState(0);
  const [newCount, setNewCount]     = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading]       = useState(true);
  const adminUser = localStorage.getItem('adminUser') || 'Admin';

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const load = async () => {
    setLoading(true);
    try {
      const [b, p, inq, rev] = await Promise.all([
        getAllBanners(), getAllPlans(), getAllInquiries(), getAllReviews(),
      ]);
      setBanners(b?.length || 0);
      setPlans(p?.length || 0);
      setNewCount(inq?.filter((i) => i.status === 'new').length || 0);
      setClosedCount(inq?.filter((i) => i.status === 'closed').length || 0);
      setReviewCount(rev?.length || 0);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const stats = [
    {
      to: '/admin/banners',
      label: 'Banners',
      value: banners,
      icon: <MdImage size={22} />,
      bg: 'bg-blue-500',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
    },
    {
      to: '/admin/plans',
      label: 'Total Plans',
      value: plans,
      icon: <MdListAlt size={22} />,
      bg: 'bg-emerald-500',
      light: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
    },
    {
      to: '/admin/inquiries',
      label: 'New Inquiries',
      value: newCount,
      icon: <MdInbox size={22} />,
      bg: 'bg-violet-500',
      light: 'bg-violet-50',
      text: 'text-violet-600',
      border: 'border-violet-100',
      highlight: newCount > 0,
    },
    {
      to: '/admin/closed-inquiries',
      label: 'Closed',
      value: closedCount,
      icon: <FaCheckCircle size={20} />,
      bg: 'bg-teal-500',
      light: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-100',
    },
    {
      to: '#',
      label: 'Reviews',
      value: reviewCount,
      icon: <FaStar size={20} />,
      bg: 'bg-amber-500',
      light: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
    },
  ];

  const quickLinks = [
    {
      to: '/admin/banners',
      icon: <MdImage size={24} />,
      label: 'Manage Banners',
      desc: 'Upload & control homepage slider banners',
      color: 'blue',
    },
    {
      to: '/admin/plans',
      icon: <MdListAlt size={24} />,
      label: 'Manage Plans',
      desc: 'Update prices, speeds & plan details',
      color: 'emerald',
    },
    {
      to: '/admin/inquiries',
      icon: <MdInbox size={24} />,
      label: 'View Inquiries',
      desc: 'Respond to new connection requests',
      color: 'violet',
    },
    {
      to: '/admin/images',
      icon: <MdPhotoLibrary size={24} />,
      label: 'BSNL Images',
      desc: 'Update BSNL plan section images',
      color: 'amber',
    },
  ];

  const colorMap = {
    blue:    { card: 'bg-blue-50 border-blue-100 hover:bg-blue-100',     icon: 'text-blue-600',    arrow: 'text-blue-400' },
    emerald: { card: 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100', icon: 'text-emerald-600', arrow: 'text-emerald-400' },
    violet:  { card: 'bg-violet-50 border-violet-100 hover:bg-violet-100',  icon: 'text-violet-600',  arrow: 'text-violet-400' },
    amber:   { card: 'bg-amber-50 border-amber-100 hover:bg-amber-100',    icon: 'text-amber-600',   arrow: 'text-amber-400' },
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl space-y-8">

        {/* Welcome header */}
        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a5f] rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-sm font-medium">{dateStr}</p>
            <h2 className="text-2xl font-black text-white mt-1">
              {greeting}, <span className="text-amber-400">{adminUser}</span> 👋
            </h2>
            <p className="text-white/50 text-sm mt-1 flex items-center gap-1.5">
              <MdTrendingUp size={14} className="text-green-400" />
              Here's your admin overview for today
            </p>
          </div>
          <button
            onClick={load}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl transition-all"
          >
            <MdRefresh size={16} /> Refresh
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className={`relative bg-white rounded-2xl border ${s.border} p-5 hover:shadow-lg transition-all duration-200 group ${s.highlight ? 'ring-2 ring-violet-400 ring-offset-1' : ''}`}
            >
              <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center mb-4 text-white shadow-md`}>
                {s.icon}
              </div>
              <p className={`text-3xl font-black ${s.text}`}>
                {loading ? <span className="text-gray-300 text-2xl">—</span> : s.value}
              </p>
              <p className="text-xs text-gray-400 mt-1 font-medium">{s.label}</p>
              {s.highlight && (
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((q) => {
              const c = colorMap[q.color];
              return (
                <Link
                  key={q.label}
                  to={q.to}
                  className={`${c.card} border rounded-2xl p-5 transition-all duration-200 group flex flex-col gap-3`}
                >
                  <div className={`${c.icon} w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm`}>
                    {q.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">{q.label}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{q.desc}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${c.arrow} group-hover:gap-2 transition-all`}>
                    Go <FaArrowRight size={10} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
