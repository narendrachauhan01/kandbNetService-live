import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Contact from './pages/Contact'
import CustomerReviews from './pages/CustomerReviews'
import GujaratPlan from './Data/GujaratPlan'
import BsnlPlan from './Data/BsnlPlan'
import OurPartner from './pages/OurPartner'
import CheckEnquiry from './pages/CheckEnquiry'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminBanners from './admin/AdminBanners'
import AdminPlans from './admin/AdminPlans'
import AdminInquiries from './admin/AdminInquiries'
import AdminClosedInquiries from './admin/AdminClosedInquiries'
import AdminImages from './admin/AdminImages'
import AdminSocialLinks from './admin/AdminSocialLinks'
import ProtectedRoute from './admin/ProtectedRoute'

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Header />}
      {!isAdmin && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<GujaratPlan />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/customer-reviews" element={<CustomerReviews />} />
        <Route path="/testplan" element={<BsnlPlan />} />
        <Route path="/my-Connection" element={<OurPartner />} />
        <Route path="/check-enquiry" element={<CheckEnquiry />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/banners" element={<ProtectedRoute><AdminBanners /></ProtectedRoute>} />
        <Route path="/admin/plans" element={<ProtectedRoute><AdminPlans /></ProtectedRoute>} />
        <Route path="/admin/inquiries" element={<ProtectedRoute><AdminInquiries /></ProtectedRoute>} />
        <Route path="/admin/closed-inquiries" element={<ProtectedRoute><AdminClosedInquiries /></ProtectedRoute>} />
        <Route path="/admin/images" element={<ProtectedRoute><AdminImages /></ProtectedRoute>} />
        <Route path="/admin/social-links" element={<ProtectedRoute><AdminSocialLinks /></ProtectedRoute>} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
