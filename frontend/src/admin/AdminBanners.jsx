import React, { useEffect, useState, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { getAllBanners, uploadBanner, updateBanner, deleteBanner } from '../api/api';
import { MdDelete, MdUpload, MdVisibility, MdVisibilityOff } from 'react-icons/md';

function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ title: '', subtitle: '' });
  const fileRef = useRef(null);

  const load = async () => {
    try {
      const data = await getAllBanners();
      setBanners(data);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const flash = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files[0];
    if (!file) return flash('Please select an image');
    const fd = new FormData();
    fd.append('image', file);
    fd.append('title', form.title);
    fd.append('subtitle', form.subtitle);
    setUploading(true);
    try {
      await uploadBanner(fd);
      setForm({ title: '', subtitle: '' });
      if (fileRef.current) fileRef.current.value = '';
      flash('Banner uploaded successfully!');
      load();
    } catch (err) {
      flash(err.message);
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (banner) => {
    const fd = new FormData();
    fd.append('isActive', String(!banner.isActive));
    fd.append('order', String(banner.order));
    try {
      await updateBanner(banner._id, fd);
      load();
    } catch (err) {
      flash(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this banner?')) return;
    try {
      await deleteBanner(id);
      flash('Banner deleted');
      load();
    } catch (err) {
      flash(err.message);
    }
  };

  const updateOrder = async (banner, newOrder) => {
    const fd = new FormData();
    fd.append('order', String(newOrder));
    fd.append('isActive', String(banner.isActive));
    try {
      await updateBanner(banner._id, fd);
      load();
    } catch (err) {
      flash(err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Banner Management</h2>

        {msg && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${msg.includes('success') || msg.includes('deleted') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {msg}
          </div>
        )}

        {/* Upload form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h3 className="font-semibold text-gray-700 mb-4">Upload New Banner</h3>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title (optional)</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Banner title"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Subtitle (optional)</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Banner subtitle"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input ref={fileRef} type="file" accept="image/*" className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:font-medium hover:file:bg-blue-100" />
              <button type="submit" disabled={uploading} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all disabled:opacity-60">
                <MdUpload size={18} />
                {uploading ? 'Uploading...' : 'Upload Banner'}
              </button>
            </div>
          </form>
        </div>

        {/* Banners grid */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading banners...</div>
        ) : banners.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
            No banners uploaded yet. Upload your first banner above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {banners.map((banner) => (
              <div key={banner._id} className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="relative">
                  <img src={banner.imageUrl} alt={banner.title || 'Banner'} className="w-full h-44 object-cover" />
                  <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {banner.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <div className="p-4">
                  {banner.title && <p className="font-semibold text-gray-800 text-sm">{banner.title}</p>}
                  {banner.subtitle && <p className="text-xs text-gray-500">{banner.subtitle}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500">Order:</label>
                      <input
                        type="number"
                        defaultValue={banner.order}
                        min="0"
                        onBlur={(e) => updateOrder(banner, e.target.value)}
                        className="w-14 border border-gray-300 rounded px-2 py-1 text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleActive(banner)} title={banner.isActive ? 'Deactivate' : 'Activate'}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition">
                        {banner.isActive ? <MdVisibility size={18} /> : <MdVisibilityOff size={18} />}
                      </button>
                      <button onClick={() => handleDelete(banner._id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition">
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminBanners;
