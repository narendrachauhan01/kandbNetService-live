import React from "react";

const COMPANY = "K&B Net Service";
const WEBSITE = "https://narendrasingh.wewp.io";
const CONTACT_EMAIL = "kandbnetservice3517@gmail.com";
const EFFECTIVE_DATE = "October 7, 2025";

function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 text-gray-800 font-sans">
            {/* Header */}
            <header className="text-center mb-12">
                <p className="text-amber-500 font-mono text-4xl font-semibold">Our Policies</p>
                <h1 className="text-4xl md:text-5xl font-extrabold mt-2 text-sky-700">
                    {COMPANY} Privacy & Terms
                </h1>
                <p className="text-gray-500 mt-2 text-sm">
                    Transparency, trust, and responsibility — the foundation of our internet service.
                </p>
            </header>

            {/* Content Grid */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                {/* Privacy Policy */}
                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                    <h2 className="text-lg font-bold mb-3 text-sky-700">Privacy Policy</h2>
                    <p>
                        This Privacy Policy explains how <b>{COMPANY}</b> ("we", "us", or "our") collects, uses,
                        and protects the personal information you provide when using our website and services.
                        We provide broadband, fiber-optic, and wireless internet connections to homes and
                        businesses, as well as OTT TV installation services.
                    </p>
                    <p className="mt-3">
                        Personal information may include your name, address, email, phone number, and service
                        usage details. We use this information solely to provide, improve, and maintain our
                        services. Our network partners include <b>RailWire, RailTel, BSNL, Trikona, and GTPL</b>{" "}
                        to ensure reliable service delivery.
                    </p>
                    <p className="mt-3">
                        We may update this policy from time to time without prior notice. Any changes will be
                        posted on our official website{" "}
                        <a href={WEBSITE} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                            {WEBSITE}
                        </a>{" "}
                        and will be deemed accepted by continued use of our services.
                    </p>
                </section>

                {/* Refund & Cancellation Policy */}
                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                    <h2 className="text-lg font-bold mb-3 text-sky-700">Refund & Cancellation Policy</h2>
                    <p>
                        {COMPANY} offers all services in good faith. We make no representations or warranties
                        regarding the completeness, accuracy, reliability, or availability of our services. Any
                        reliance you place on the services is strictly at your own risk.
                    </p>
                    <p className="mt-3">
                        Customers may cancel services according to their subscription plan. Refunds, if
                        applicable, are processed as per our internal policy and will be communicated via email
                        or customer support.
                    </p>
                    <p className="mt-3">
                        We may link to external websites, which are not controlled by {COMPANY}. The inclusion
                        of any links does not imply endorsement, and we are not responsible for the content or
                        availability of external sites.
                    </p>
                    <p className="mt-3">
                        While we strive to maintain uninterrupted services, {COMPANY} is not liable for
                        temporary service outages due to technical issues, maintenance, or factors beyond our
                        control.
                    </p>
                </section>

                {/* Terms & Disclaimer */}
                <section className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 md:col-span-2">
                    <h2 className="text-lg font-bold mb-3 text-sky-700">
                        Terms of Use & Liability Disclaimer
                    </h2>
                    <p>
                        All content and services provided by {COMPANY} are offered "AS IS" without any warranty,
                        express or implied, including but not limited to warranties of performance,
                        merchantability, or fitness for a particular purpose. We shall not be responsible for
                        any loss or damage arising from the use of our services.
                    </p>
                    <p className="mt-3">
                        By using our website and services, you agree to these terms and acknowledge that you
                        have read and understood this Privacy Policy. For any queries, please contact us at{" "}
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="text-blue-600 underline ml-1"
                        >
                            {CONTACT_EMAIL}
                        </a>.
                    </p>
                    <p className="mt-3 text-gray-500">
                        <b>Effective Date:</b> {EFFECTIVE_DATE}
                    </p>
                </section>
            </div>

            {/* Footer */}
            <footer className="text-center mt-12 text-xs text-gray-500">
                © {new Date().getFullYear()} {COMPANY}. All rights reserved.
            </footer>
        </main>
    );
}

export default PrivacyPolicy;
