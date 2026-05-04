import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MdDashboard, MdImage, MdLogout, MdMenu, MdInbox, MdClose, MdNotifications, MdCheckCircle, MdPhotoLibrary,
} from 'react-icons/md';
import { FaListAlt, FaUserAlt, FaPhone } from 'react-icons/fa';
import logo from '../assets/LogoImage/logo1.jpeg';
import { getAllInquiries } from '../api/api';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <MdDashboard size={20} /> },
  { path: '/admin/banners', label: 'Banners', icon: <MdImage size={20} /> },
  { path: '/admin/plans', label: 'Plans', icon: <FaListAlt size={18} /> },
  { path: '/admin/inquiries', label: 'Inquiries', icon: <MdInbox size={20} /> },
  { path: '/admin/closed-inquiries', label: 'Closed', icon: <MdCheckCircle size={20} /> },
  { path: '/admin/images', label: 'Site Images', icon: <MdPhotoLibrary size={20} /> },
];

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// Toast notification component
function Toast({ inquiry, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="animate-slide-in bg-white rounded-2xl shadow-2xl border border-blue-100 p-4 w-80 flex gap-3">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
        <FaUserAlt size={14} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">New Inquiry!</p>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <MdClose size={14} />
          </button>
        </div>
        <p className="font-bold text-gray-800 text-sm mt-0.5 truncate">{inquiry.fullName}</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <FaPhone size={10} className="text-green-500" />
          <span>{inquiry.phone}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{formatTime(inquiry.createdAt)}</p>
      </div>
    </div>
  );
}

// Bell dropdown item
function NotifItem({ inquiry, onClose }) {
  return (
    <Link to="/admin/inquiries" onClick={onClose}
      className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <FaUserAlt size={11} className="text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{inquiry.fullName}</p>
        <p className="text-xs text-gray-500">{inquiry.phone}</p>
        <p className="text-xs text-blue-400 mt-0.5">{timeAgo(inquiry.createdAt)}</p>
      </div>
      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
    </Link>
  );
}

const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [unread, setUnread] = useState([]);
  const [bellOpen, setBellOpen] = useState(false);
  const [idleWarning, setIdleWarning] = useState(false);
  const bellRef = useRef(null);
  const idleTimer = useRef(null);
  const warnTimer = useRef(null);
  const adminUser = localStorage.getItem('adminUser') || 'Admin';

  // Auto-logout on inactivity
  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('kandb_last_inquiry_time');
      navigate('/admin/login');
    };

    const resetTimer = () => {
      setIdleWarning(false);
      clearTimeout(idleTimer.current);
      clearTimeout(warnTimer.current);
      // warn at 9 min
      warnTimer.current = setTimeout(() => setIdleWarning(true), IDLE_TIMEOUT - 60000);
      // logout at 10 min
      idleTimer.current = setTimeout(logout, IDLE_TIMEOUT);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(idleTimer.current);
      clearTimeout(warnTimer.current);
    };
  }, [navigate]);

  // Poll every 20 seconds for new inquiries
  useEffect(() => {
    const STORAGE_KEY = 'kandb_last_inquiry_time';

    const check = async () => {
      try {
        const data = await getAllInquiries();
        if (!data || data.length === 0) return;

        const lastSeen = localStorage.getItem(STORAGE_KEY);
        const lastSeenTime = lastSeen ? new Date(lastSeen) : null;

        const newOnes = lastSeenTime
          ? data.filter((i) => new Date(i.createdAt) > lastSeenTime && i.status === 'new')
          : [];

        if (newOnes.length > 0) {
          // Show toast for each new inquiry (max 3)
          newOnes.slice(0, 3).forEach((inq, idx) => {
            setTimeout(() => {
              setToasts((prev) => [...prev, { ...inq, _toastId: Date.now() + idx }]);
            }, idx * 800);
          });
          setUnread((prev) => [...newOnes, ...prev].slice(0, 10));
        }

        // Update lastSeen to most recent inquiry
        localStorage.setItem(STORAGE_KEY, data[0].createdAt);
      } catch {}
    };

    check();
    const interval = setInterval(check, 20000);
    return () => clearInterval(interval);
  }, []);

  // Close bell dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Clear unread when visiting inquiries page
  useEffect(() => {
    if (location.pathname === '/admin/inquiries') {
      setUnread([]);
      setBellOpen(false);
    }
  }, [location.pathname]);

  const dismissToast = (toastId) => setToasts((prev) => prev.filter((t) => t._toastId !== toastId));

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('kandb_last_inquiry_time');
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-[#0f172a] text-white w-64">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-bold text-sm">K&B Net Service</p>
          <p className="text-xs text-gray-400">SuperAdmin Panel</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            {item.path === '/admin/inquiries' && unread.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {unread.length}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-5 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-2 mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
            {adminUser[0].toUpperCase()}
          </div>
          <span className="text-sm text-gray-300">{adminUser}</span>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
          <MdLogout size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex-shrink-0"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <MdMenu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-700">
            {navItems.find((n) => n.path === location.pathname)?.label || 'Admin'}
          </h1>

          <div className="flex items-center gap-4">
            {/* Bell icon */}
            <div className="relative" ref={bellRef}>
              <button
                onClick={() => setBellOpen((v) => !v)}
                className="relative p-2 rounded-xl hover:bg-gray-100 transition text-gray-500"
              >
                <MdNotifications size={22} />
                {unread.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unread.length > 9 ? '9+' : unread.length}
                  </span>
                )}
              </button>

              {/* Bell dropdown */}
              {bellOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-bold text-gray-800">New Inquiries</p>
                    <Link to="/admin/inquiries" onClick={() => setBellOpen(false)}
                      className="text-xs text-blue-600 hover:underline font-medium">
                      View all →
                    </Link>
                  </div>
                  {unread.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">
                      No new inquiries
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto">
                      {unread.map((inq) => (
                        <NotifItem key={inq._id} inquiry={inq} onClose={() => setBellOpen(false)} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <a href="/" target="_blank" className="text-sm text-blue-600 hover:underline hidden sm:block">
              View Site →
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Idle warning banner */}
      {idleWarning && (
        <div className="fixed top-0 left-0 right-0 z-[200] bg-amber-500 text-white text-sm font-semibold text-center py-2.5 shadow-lg">
          ⚠️ No activity detected — you will be logged out in 1 minute.
        </div>
      )}

      {/* Toast notifications — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end">
        {toasts.map((toast) => (
          <Toast key={toast._toastId} inquiry={toast} onClose={() => dismissToast(toast._toastId)} />
        ))}
      </div>

      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.35s ease-out; }
      `}</style>
    </div>
  );
}

export default AdminLayout;
