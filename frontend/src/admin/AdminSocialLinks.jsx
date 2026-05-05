import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaSave } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdCheckCircle, MdError } from 'react-icons/md';
import AdminLayout from './AdminLayout';
import { getSocialLinks, updateSocialLinks } from '../api/api';

const fields = [
  { key: 'facebook', label: 'Facebook', icon: <FaFacebookF size={18} />, color: 'text-blue-600', placeholder: 'https://www.facebook.com/yourpage' },
  { key: 'youtube',  label: 'YouTube',  icon: <FaYoutube size={18} />,   color: 'text-red-600',  placeholder: 'https://www.youtube.com/@yourchannel' },
  { key: 'twitter',  label: 'X (Twitter)', icon: <FaXTwitter size={18} />, color: 'text-gray-800', placeholder: 'https://x.com/yourhandle' },
  { key: 'linkedin', label: 'LinkedIn', icon: <FaLinkedinIn size={18} />, color: 'text-blue-700', placeholder: 'https://www.linkedin.com/company/yourpage' },
];

function AdminSocialLinks() {
  const [form, setForm] = useState({ facebook: '', youtube: '', twitter: '', linkedin: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  useEffect(() => {
    getSocialLinks().then((data) => {
      if (data) setForm({ facebook: data.facebook || '', youtube: data.youtube || '', twitter: data.twitter || '', linkedin: data.linkedin || '' });
      setLoading(false);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await updateSocialLinks(form);
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-6">

        <div>
          <h2 className="text-xl font-black text-gray-800">Social Media Links</h2>
          <p className="text-sm text-gray-400 mt-1">Update the URLs shown in the site header and footer.</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">Loading…</div>
        ) : (
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className={f.color}>{f.icon}</span>
                  {f.label}
                </label>
                <input
                  type="url"
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                />
              </div>
            ))}

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition disabled:opacity-60"
              >
                <FaSave size={14} />
                {saving ? 'Saving…' : 'Save Changes'}
              </button>

              {status === 'success' && (
                <span className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                  <MdCheckCircle size={18} /> Saved successfully
                </span>
              )}
              {status === 'error' && (
                <span className="flex items-center gap-1.5 text-red-500 text-sm font-semibold">
                  <MdError size={18} /> Failed to save
                </span>
              )}
            </div>
          </form>
        )}

      </div>
    </AdminLayout>
  );
}

export default AdminSocialLinks;
