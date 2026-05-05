import React, { useRef, useState } from "react";
import { submitInquiry, sendOtp, verifyOtp, checkPhone } from "../api/api";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCommentDots, FaWifi, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";

const contactInfo = [
  { icon: <FaPhone />, label: "Call Us",   value: "+91 8200683391",                      href: "tel:+918200683391" },
  { icon: <FaPhone />, label: "Helpdesk",  value: "079-2999-1999",                       href: "tel:07929991999" },
  { icon: <FaEnvelope />, label: "Email Us", value: "kandbnetservice3517@gmail.com",     href: "mailto:kandbnetservice3517@gmail.com" },
  { icon: <FaMapMarkerAlt />, label: "Address", value: "168/A Pratapnagar, Meghaninagar, Ahmedabad - 380016", href: null },
];

function InputField({ icon, label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <span className="text-blue-500">{icon}</span>{label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition placeholder-gray-400";

function Contact() {
  const form = useRef();
  const [loading, setLoading]           = useState(false);
  const [success, setSuccess]           = useState(false);
  const [inquiryId, setInquiryId]       = useState("");
  const [alreadyExists, setAlreadyExists] = useState(null); // { inquiryId, message }
  const [phoneExists, setPhoneExists]     = useState(null); // { inquiryId } if phone already registered
  const [phoneChecking, setPhoneChecking] = useState(false);
  const [error, setError]               = useState("");

  // OTP state
  const [email, setEmail]               = useState("");
  const [otpSent, setOtpSent]           = useState(false);
  const [otpValue, setOtpValue]         = useState("");
  const [otpVerified, setOtpVerified]   = useState(false);
  const [otpLoading, setOtpLoading]     = useState(false);
  const [otpError, setOtpError]         = useState("");
  const [otpMsg, setOtpMsg]             = useState("");
  const [countdown, setCountdown]       = useState(0);

  const startCountdown = () => {
    setCountdown(60);
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(t); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!email) { setOtpError("Please enter your email first."); return; }
    setOtpLoading(true); setOtpError(""); setOtpMsg("");
    try {
      await sendOtp(email);
      setOtpSent(true);
      setOtpMsg("OTP sent! Check your inbox.");
      startCountdown();
    } catch (err) {
      setOtpError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpValue) { setOtpError("Please enter the OTP."); return; }
    setOtpLoading(true); setOtpError(""); setOtpMsg("");
    try {
      await verifyOtp(email, otpValue);
      setOtpVerified(true);
      setOtpMsg("Email verified successfully!");
    } catch (err) {
      setOtpError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneExists) { setError("This mobile number is already registered. Please use a different number."); return; }
    if (!otpVerified) { setError("Please verify your email with OTP first."); return; }
    setLoading(true); setError(""); setAlreadyExists(null);
    const data = {
      fullName: form.current.full_name.value,
      phone:    form.current.phone.value,
      email,
      city:     form.current.city.value,
      state:    form.current.state.value,
      message:  form.current.message.value,
    };
    try {
      const res = await submitInquiry(data);
      if (res._error) {
        if (res.alreadyExists) {
          setAlreadyExists({ inquiryId: res.inquiryId, message: res.message });
        } else {
          setError(res.message || "Failed to submit. Please try again.");
        }
      } else {
        setInquiryId(res.inquiryId || "");
        setSuccess(true);
        e.target.reset();
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 font-poppins">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#17345C] to-[#1e4a7f] text-white py-14 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wide">
          <FaWifi size={12} /> GET CONNECTED TODAY
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3">Generate Inquiry</h1>
        <p className="text-blue-200 text-sm md:text-base max-w-lg mx-auto">
          Fill in your details and our team will reach out to you within 24 hours.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Left — contact info */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Contact Information</h2>
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#17345C] to-[#1e4a7f] rounded-3xl shadow-md p-6 text-white">
            <h2 className="text-base font-bold mb-4">Why Choose K&B Net Service?</h2>
            <ul className="space-y-3 text-sm">
              {["Free installation & setup","24/7 technical support","No hidden charges","Lightning fast fiber network","Govt. backed RailTel network"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-blue-100">
                  <FaCheckCircle className="text-green-400 flex-shrink-0" size={14} />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3">
          {success ? (
            <div className="bg-white rounded-3xl shadow-md p-10 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                <FaCheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Inquiry Submitted!</h3>
              <p className="text-gray-500 text-sm max-w-xs mb-6">
                Thank you! Our team will contact you within <strong>24 hours</strong> on your provided number.
              </p>

              {inquiryId && (
                <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-2xl px-8 py-4 mb-6 w-full max-w-xs">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Your Inquiry ID</p>
                  <p className="text-2xl font-black text-blue-700 tracking-widest">{inquiryId}</p>
                  <p className="text-xs text-gray-400 mt-1">Save this ID for tracking</p>
                </div>
              )}

              <p className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
                <FaEnvelope size={11} /> Confirmation email sent to <strong>{email}</strong>
              </p>

              <button
                onClick={() => { setSuccess(false); setOtpSent(false); setOtpVerified(false); setOtpValue(""); setEmail(""); setInquiryId(""); }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-md p-8">
              <h2 className="text-xl font-black text-gray-800 mb-1">Request a Call Back</h2>
              <p className="text-gray-400 text-sm mb-7">All fields marked with * are required.</p>

              {error && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>
              )}

              {alreadyExists && (
                <div className="mb-5 bg-amber-50 border-2 border-amber-300 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt size={18} className="text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-amber-800 text-sm mb-1">Inquiry Already Registered!</p>
                      <p className="text-amber-700 text-xs leading-relaxed mb-3">
                        An active inquiry already exists with this email/phone. Our team will contact you soon.
                      </p>
                      <div className="bg-white border border-amber-200 rounded-xl px-4 py-2.5 inline-block">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Your Inquiry ID</p>
                        <p className="font-black text-blue-700 text-lg tracking-widest">{alreadyExists.inquiryId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField icon={<FaUser size={12} />} label="Full Name *">
                    <input name="full_name" type="text" required placeholder="Your full name" className={inputClass} />
                  </InputField>
                  <InputField icon={<FaPhone size={12} />} label="Phone Number *">
                    <input
                      name="phone" type="tel" required placeholder="10-digit number"
                      pattern="[0-9]{10}" title="Please enter exactly 10 digits"
                      className={`${inputClass} ${phoneExists ? 'border-amber-400 ring-2 ring-amber-200' : ''}`}
                      onChange={() => { setPhoneExists(null); }}
                      onBlur={async (e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length !== 10) return;
                        setPhoneChecking(true);
                        try {
                          const res = await checkPhone(val);
                          setPhoneExists(res.exists ? { inquiryId: res.inquiryId } : null);
                        } catch {}
                        finally { setPhoneChecking(false); }
                      }}
                    />
                    {phoneChecking && (
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Checking...
                      </p>
                    )}
                    {phoneExists && (
                      <div className="mt-2 bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-3">
                        <p className="text-amber-800 font-bold text-xs mb-1">⚠️ Mobile Number Already Registered!</p>
                        <p className="text-amber-700 text-xs">An active inquiry already exists with this number. Our team will contact you soon.</p>
                        {phoneExists.inquiryId && (
                          <div className="mt-2 bg-white rounded-lg px-3 py-1.5 inline-block border border-amber-200">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Inquiry ID</p>
                            <p className="font-black text-blue-700 text-base tracking-widest">{phoneExists.inquiryId}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </InputField>
                </div>

                {/* Email + OTP */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="text-blue-500"><FaEnvelope size={12} /></span>
                    Email Address *
                    {otpVerified && (
                      <span className="flex items-center gap-1 text-green-600 text-xs font-bold ml-1">
                        <FaCheckCircle size={12} /> Verified
                      </span>
                    )}
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="email" required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setOtpSent(false); setOtpVerified(false); setOtpValue(""); setOtpMsg(""); setOtpError(""); }}
                      disabled={otpVerified}
                      className={inputClass + (otpVerified ? " opacity-60 cursor-not-allowed" : "")}
                    />
                    {!otpVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpLoading || countdown > 0}
                        className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition whitespace-nowrap"
                      >
                        {otpLoading ? "Sending..." : countdown > 0 ? `Resend (${countdown}s)` : otpSent ? "Resend OTP" : "Send OTP"}
                      </button>
                    )}
                  </div>

                  {/* OTP input */}
                  {otpSent && !otpVerified && (
                    <div className="flex flex-col gap-2 bg-blue-50 border border-blue-100 rounded-xl p-4 mt-1">
                      <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold mb-1">
                        <FaShieldAlt size={12} /> Enter the 6-digit OTP sent to your email
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="Enter OTP"
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                          className="flex-1 border border-blue-200 bg-white rounded-xl px-4 py-2.5 text-sm text-center tracking-widest font-bold text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={otpLoading || otpValue.length < 6}
                          className="flex-shrink-0 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition"
                        >
                          {otpLoading ? "Verifying..." : "Verify"}
                        </button>
                      </div>
                      {otpError && <p className="text-red-500 text-xs mt-1">{otpError}</p>}
                    </div>
                  )}

                  {otpMsg && !otpError && (
                    <p className={`text-xs font-medium mt-0.5 ${otpVerified ? "text-green-600" : "text-blue-600"}`}>
                      {otpVerified ? "✅" : "📧"} {otpMsg}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField icon={<MdLocationCity size={14} />} label="City *">
                    <input name="city" type="text" required placeholder="Your city" className={inputClass} />
                  </InputField>
                  <InputField icon={<FaMapMarkerAlt size={12} />} label="State *">
                    <input name="state" type="text" required placeholder="Your state" className={inputClass} />
                  </InputField>
                </div>

                <InputField icon={<FaCommentDots size={12} />} label="Message">
                  <textarea name="message" rows="4" placeholder="Tell us about your requirements..."
                    className={inputClass + " resize-none"} />
                </InputField>

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                  <input type="checkbox" id="human" className="w-5 h-5 accent-blue-600 cursor-pointer" required />
                  <label htmlFor="human" className="text-sm text-gray-600 cursor-pointer select-none">
                    I confirm I am a human and agree to be contacted
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !otpVerified}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-base"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <><FaWifi size={16} /> Request a Call Back</>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed">
                By submitting, you agree to our{" "}
                <a href="/privacy-policy" className="underline hover:text-blue-500">Privacy Policy</a>{" "}
                and consent to receive communications via SMS, WhatsApp, phone &amp; email.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Contact;
