import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { getAllInquiries, updateInquiryStatus, deleteInquiry } from '../api/api';
import { MdDelete, MdPhone, MdEmail, MdLocationOn, MdRefresh, MdSearch, MdClose } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';

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

function InquiryRow({ inquiry, onStatusChange, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <FaUserAlt size={14} className="text-white" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-gray-800 text-sm">{inquiry.fullName}</p>
            <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">CLOSED</span>
          </div>
          {inquiry.inquiryId && (
            <p className="text-[10px] font-mono text-blue-500 font-bold mt-0.5">{inquiry.inquiryId}</p>
          )}
          <p className="text-xs text-gray-400 mt-0.5">{formatTime(inquiry.createdAt)} · {timeAgo(inquiry.createdAt)}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 flex-1">
        <span className="flex items-center gap-1">
          <MdPhone size={13} className="text-green-500" />
          <a href={`tel:${inquiry.phone}`} className="hover:text-blue-600 font-medium">{inquiry.phone}</a>
        </span>
        <span className="flex items-center gap-1">
          <MdEmail size={13} className="text-blue-400" />
          <span className="truncate max-w-[160px]">{inquiry.email}</span>
        </span>
        {inquiry.city && (
          <span className="flex items-center gap-1">
            <MdLocationOn size={13} className="text-red-400" />
            {inquiry.city}{inquiry.state ? `, ${inquiry.state}` : ''}
          </span>
        )}
      </div>

      {inquiry.message && (
        <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 max-w-xs truncate hidden lg:block border border-gray-100">
          {inquiry.message}
        </p>
      )}

      <div className="flex items-center gap-2 flex-shrink-0">
        <select
          value={inquiry.status}
          onChange={(e) => onStatusChange(inquiry._id, e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
        <button onClick={() => onDelete(inquiry._id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition" title="Delete">
          <MdDelete size={17} />
        </button>
      </div>
    </div>
  );
}

function AdminClosedInquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllInquiries();
      setItems(data.filter((i) => i.status === 'closed'));
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiryStatus(id, status);
      setItems((prev) => prev.filter((i) => i._id !== id));
      flash('Status updated');
    } catch (err) { flash(err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await deleteInquiry(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
      flash('Inquiry deleted');
    } catch (err) { flash(err.message); }
  };

  const filtered = items.filter((i) =>
    i.fullName.toLowerCase().includes(search.toLowerCase()) ||
    (i.inquiryId && i.inquiryId.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="max-w-5xl space-y-6">

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
              <h2 className="text-xl font-bold text-gray-800">Closed Inquiries</h2>
              {items.length > 0 && (
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-0.5">All successfully closed inquiries</p>
          </div>
          <button onClick={load} className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 bg-white border border-gray-200 px-3 py-2 rounded-xl transition">
            <MdRefresh size={16} /> Refresh
          </button>
        </div>

        {msg && (
          <div className="px-4 py-3 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            {msg}
          </div>
        )}

        {/* Search */}
        <div className="relative max-w-sm">
          <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or Inquiry ID..."
            className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white" />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <MdClose size={16} />
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-14 text-center text-gray-400 text-sm">
            {search ? `No results for "${search}"` : 'No closed inquiries yet'}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((inq) => (
              <InquiryRow key={inq._id} inquiry={inq} onStatusChange={handleStatusChange} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminClosedInquiries;
