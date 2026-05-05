import React, { useEffect, useState, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { getAllImages, uploadSiteImage, deleteSiteImage } from '../api/api';
import { MdDelete, MdUpload, MdImage } from 'react-icons/md';

function AdminImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllImages('bsnl_plan');
      setImages(data || []);
    } catch (err) {
      flash(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files[0];
    if (!file) return flash('Please select an image');
    const fd = new FormData();
    fd.append('image', file);
    fd.append('section', 'bsnl_plan');
    fd.append('alt', 'BSNL Plan Image');
    setUploading(true);
    try {
      await uploadSiteImage(fd);
      if (fileRef.current) fileRef.current.value = '';
      flash('Image uploaded successfully!');
      load();
    } catch (err) {
      flash(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await deleteSiteImage(id);
      flash('Image deleted');
      load();
    } catch (err) {
      flash(err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">BSNL Plan Images</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage images for the <span className="font-semibold text-blue-600">Superfast Internet + SkyPro BSNL IFTV</span> section on the home page.
          </p>
        </div>

        {msg && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${msg.includes('success') || msg.includes('deleted') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {msg}
          </div>
        )}

        {/* Upload card */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8 border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <MdUpload size={18} className="text-blue-600" /> Upload New Image
          </h3>
          <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:font-medium hover:file:bg-blue-100 cursor-pointer"
            />
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all disabled:opacity-60 whitespace-nowrap"
            >
              <MdUpload size={17} />
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>
        </div>

        {/* Images grid */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading images...</div>
        ) : images.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center border border-gray-100">
            <MdImage size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No images uploaded yet</p>
            <p className="text-xs text-gray-400 mt-1">Static default images are shown on the site until you upload here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {images.map((img, idx) => (
              <div key={img._id} className="bg-white rounded-2xl shadow overflow-hidden border border-gray-100 group">
                <div className="relative">
                  <img
                    src={img.imageUrl}
                    alt={img.alt || `BSNL Plan ${idx + 1}`}
                    className="w-full h-44 object-contain bg-gray-50"
                  />
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Image {idx + 1}</span>
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <MdDelete size={15} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminImages;
