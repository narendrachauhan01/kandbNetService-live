import React, { useRef } from "react";
import emailjs from "emailjs-com";

function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(
            (result) => {
                console.log("✅ Email sent:", result.text);
                alert("✅ Message sent successfully!");
                e.target.reset();
            },
            (error) => {
                console.error("EmailJS Error:", error.text);
                alert("Failed to send message. Please try again later!");
            }
        );
    };

    return (
        <main className="font-sans bg-gray-50 min-h-screen flex flex-col items-center">
            {/* Header */}
            <div className="text-center my-12 px-4">
                <h1 className="text-4xl font-bold text-green-700 underline decoration-green-600 underline-offset-8">
                    Generate Inquiry
                </h1>
                <p className="text-xl font-semibold mt-4 text-red-700">
                    Get In Touch With Us!
                </p>
            </div>

            {/* Contact Form */}
            <form
                ref={form}
                onSubmit={sendEmail}
                className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8 flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-red-700 mb-2">Service Details</h2>
                <hr className="mb-4" />

                {/* Full Name */}
                <label className="font-semibold text-lg">Full Name*</label>
                <input name="full_name" type="text" required placeholder="Your full name"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />

                {/* Phone */}
                <label className="font-semibold text-lg">Phone Number*</label>
                <input name="phone" type="tel" required placeholder="Your phone number" pattern="[0-9]{10}"                                                                                              title="Please enter exactly 10 digits"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />

                {/* Email */}
                <label className="font-semibold text-lg">Email*</label>
                <input name="email" type="email" required placeholder="Your email"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />

                {/* City */}
                <label className="font-semibold text-lg">City*</label>
                <input name="city" type="text" required placeholder="Your city"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />

                {/* State */}
                <label className="font-semibold text-lg">State*</label>
                <input name="state" type="text" required placeholder="Your state"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />

                {/* Message */}
                <label className="font-semibold text-lg">Message</label>
                <textarea name="message" rows="5" placeholder="Write your message here..."
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                ></textarea>

                {/* Human Verification */}
                <div className="flex items-center gap-3 mt-2">
                    <input type="checkbox" className="w-6 h-6 accent-green-600" required />
                    <label className="text-gray-700">Verify you are human</label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl mt-5 transition duration-300"
                >
                    Request a Call Back
                </button>
            </form>

            {/* Footer / Disclaimer */}
            <div className="text-center text-sm mt-8 px-4 max-w-3xl text-gray-600">
                Disclaimer: By submitting the data, I confirm that I have read the Terms &
                Conditions and Privacy Policy and I agree to receive communications on
                shared contact details by SMS, WhatsApp, phone call, Email & RCS.
            </div>
        </main>
    );
}

export default Contact;
