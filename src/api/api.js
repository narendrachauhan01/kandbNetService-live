const API = '/api';

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) && data.length === 0 ? null : data;
  } catch {
    return null;
  }
}

async function adminFetch(url, options = {}) {
  const token = localStorage.getItem('adminToken');
  const res = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// Public
export const getBanners = () => safeFetch(`${API}/banners`);
export const getPlans = (category) => safeFetch(`${API}/plans?category=${category}`);
export const getSiteImages = (section) => safeFetch(`${API}/images?section=${section}`);

// Auth
export async function adminLogin(username, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

// Admin — Reviews
export const getAllReviews = () => adminFetch(`${API}/reviews/all`);
export const deleteReview = (id) => adminFetch(`${API}/reviews/${id}`, { method: 'DELETE' });

// Admin — Banners
export const getAllBanners = () => adminFetch(`${API}/banners/all`);
export const uploadBanner = (fd) => adminFetch(`${API}/banners`, { method: 'POST', body: fd });
export const updateBanner = (id, fd) => adminFetch(`${API}/banners/${id}`, { method: 'PUT', body: fd });
export const deleteBanner = (id) => adminFetch(`${API}/banners/${id}`, { method: 'DELETE' });

// Admin — Plans
export const getAllPlans = (cat) => adminFetch(`${API}/plans/all${cat ? `?category=${cat}` : ''}`);
export const createPlan = (fd) => adminFetch(`${API}/plans`, { method: 'POST', body: fd });
export const updatePlan = (id, fd) => adminFetch(`${API}/plans/${id}`, { method: 'PUT', body: fd });
export const deletePlan = (id) => adminFetch(`${API}/plans/${id}`, { method: 'DELETE' });

// Public — Reviews
export const getReviews = () => safeFetch(`${API}/reviews`);
export async function submitReview(data, imageFile) {
  const fd = new FormData();
  fd.append('name', data.name);
  fd.append('location', data.location || '');
  fd.append('text', data.text);
  fd.append('rating', data.rating);
  if (imageFile) fd.append('image', imageFile);
  const res = await fetch(`${API}/reviews`, { method: 'POST', body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

// OTP
export async function sendOtp(email) {
  const res = await fetch(`${API}/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function verifyOtp(email, otp) {
  const res = await fetch(`${API}/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

// Public — check inquiry by email
export async function checkEnquiryByEmail(email) {
  const res = await fetch(`${API}/inquiries/check-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

// Public — check phone already registered
export async function checkPhone(phone) {
  const res = await fetch(`${API}/inquiries/check-phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  return res.json();
}

// Public — submit inquiry (returns full json including alreadyExists flag)
export async function submitInquiry(data) {
  const res = await fetch(`${API}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  // Return full body so caller can inspect alreadyExists on 409
  if (!res.ok) return { ...json, _error: true, _status: res.status };
  return json;
}

// Admin — Inquiries
export const getAllInquiries = () => adminFetch(`${API}/inquiries`);
export const updateInquiryStatus = (id, status) =>
  adminFetch(`${API}/inquiries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
export const deleteInquiry = (id) => adminFetch(`${API}/inquiries/${id}`, { method: 'DELETE' });

// Admin — Site Images
export const getAllImages = (sec) => adminFetch(`${API}/images/all${sec ? `?section=${sec}` : ''}`);
export const uploadSiteImage = (fd) => adminFetch(`${API}/images`, { method: 'POST', body: fd });
export const updateSiteImage = (id, fd) => adminFetch(`${API}/images/${id}`, { method: 'PUT', body: fd });
export const deleteSiteImage = (id) => adminFetch(`${API}/images/${id}`, { method: 'DELETE' });
