import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { getAllInquiries, updateInquiryStatus, deleteInquiry } from '../api/api';
import {
  MdDelete, MdPhone, MdEmail, MdLocationOn, MdRefresh,
  MdSearch, MdClose, MdMessage, MdInbox,
} from 'react-icons/md';
import { FaUserAlt, FaTag } from 'react-icons/fa';

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleString('en-IN', {
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

const STATUS_STYLES = {
  new:       { ring: 'border-blue-300',   avatar: 'bg-blue-600',  badge: 'bg-blue-100 text-blue-700',    label: 'New' },
  contacted: { ring: 'border-amber-300',  avatar: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700',  label: 'Contacted' },
  closed:    { ring: 'border-green-300',  avatar: 'bg-green-600', badge: 'bg-green-100 text-green-700',  label: 'Closed' },
};

function InquiryCard({ inquiry, onStatusChange, onDelete }) {
  const s = STATUS_STYLES[inquiry.status] || STATUS_STYLES.new;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-2xl border-2 ${s.ring} shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className={`w-11 h-11 ${s.avatar} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <FaUserAlt size={15} className="text-white" />
          </div>

          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-1">
              <p className="font-bold text-gray-900 text-sm">{inquiry.fullName}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
              {inquiry.inquiryId && (
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  <FaTag size={8} /> {inquiry.inquiryId}
                </span>
              )}
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
              <a href={`tel:${inquiry.phone}`}
                className="flex items-center gap-1 hover:text-blue-600 transition font-medium">
                <MdPhone size={13} className="text-green-500" /> {inquiry.phone}
              </a>
              <a href={`mailto:${inquiry.email}`}
                className="flex items-center gap-1 hover:text-blue-600 transition truncate max-w-[200px]">
                <MdEmail size={13} className="text-blue-400" /> {inquiry.email}
              </a>
              {(inquiry.city || inquiry.state) && (
                <span className="flex items-center gap-1">
                  <MdLocationOn size={13} className="text-red-400" />
                  {[inquiry.city, inquiry.state].filter(Boolean).join(', ')}
                </span>
              )}
            </div>

            <p className="text-[11px] text-gray-400 mt-1.5">
              {formatTime(inquiry.createdAt)} &nbsp;·&nbsp; {timeAgo(inquiry.createdAt)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <select
              value={inquiry.status}
              onChange={(e) => onStatusChange(inquiry._id, e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
            {inquiry.message && (
              <button onClick={() => setExpanded((v) => !v)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition" title="View message">
                <MdMessage size={17} />
              </button>
            )}
            <button onClick={() => onDelete(inquiry._id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition" title="Delete">
              <MdDelete size={17} />
            </button>
          </div>
        </div>

        {/* Expandable message */}
        {expanded && inquiry.message && (
          <div className="mt-3 ml-15 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-600 leading-relaxed">
            <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">Message</p>
            {inquiry.message}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, color, dot, count, items, onStatusChange, onDelete, emptyMsg }) {
  const colors = {
    blue:   { badge: 'bg-blue-600 text-white',   empty: 'border-blue-100' },
    amber:  { badge: 'bg-amber-500 text-white',  empty: 'border-amber-100' },
  };
  const c = colors[color];

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <span className={`w-3 h-3 rounded-full ${dot}`} />
        <h3 className="text-base font-bold text-gray-800">{title}</h3>
        {count > 0 && (
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.badge}`}>{count}</span>
        )}
      </div>
      {items.length === 0 ? (
        <div className={`bg-white rounded-2xl border-2 border-dashed ${c.empty} py-10 text-center text-gray-400 text-sm`}>
          <MdInbox size={32} className="mx-auto mb-2 opacity-30" />
          {emptyMsg}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((inq) => (
            <InquiryCard key={inq._id} inquiry={inq} onStatusChange={onStatusChange} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [msg, setMsg]             = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllInquiries();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      setMsg(err.message);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((i) => i._id === id ? { ...i, status } : i));
    } catch (err) { flash(err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      flash('Inquiry deleted');
    } catch (err) { flash(err.message); }
  };

  const q = search.toLowerCase();
  const filtered = inquiries.filter((i) =>
    i.fullName?.toLowerCase().includes(q) ||
    i.phone?.includes(q) ||
    i.email?.toLowerCase().includes(q) ||
    i.inquiryId?.toLowerCase().includes(q)
  );

  const newList       = filtered.filter((i) => i.status === 'new');
  const contactedList = filtered.filter((i) => i.status === 'contacted');

  return (
    <AdminLayout>
      <div className="max-w-5xl space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Inquiries</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {loading ? 'Loading...' : `${inquiries.filter(i => i.status !== 'closed').length} active · ${inquiries.filter(i => i.status === 'new').length} new`}
            </p>
          </div>
          <button onClick={load}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 bg-white border border-gray-200 px-3 py-2 rounded-xl transition">
            <MdRefresh size={16} /> Refresh
          </button>
        </div>

        {msg && (
          <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${msg.includes('deleted') || msg.includes('success') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
            {msg}
          </div>
        )}

        {/* Search */}
        <div className="relative max-w-md">
          <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, email or Inquiry ID..."
            className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <MdClose size={16} />
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-gray-100 p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-gray-200 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                    <div className="h-2 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            <Section
              title="New Inquiries" color="blue"
              dot="bg-blue-500 animate-pulse"
              count={newList.length}
              items={newList}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              emptyMsg="No new inquiries"
            />
            <Section
              title="Contacted" color="amber"
              dot="bg-amber-400"
              count={contactedList.length}
              items={contactedList}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              emptyMsg="No contacted inquiries"
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
