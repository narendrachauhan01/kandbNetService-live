import './App.css'
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {


  return (
    <Router>
      {/* Header and Navbar show on every page */}
      <Header />
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<GujaratPlan/>}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/customer-reviews" element={<CustomerReviews />} />
        <Route path="/testplan" element={<BsnlPlan />} />
        <Route path="/my-Connection" element={<OurPartner />} />

      </Routes>

      {/* Footer show on every page */}

      <Footer />
    </Router>

  )
}

export default App
