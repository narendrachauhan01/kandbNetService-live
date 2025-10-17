import React from "react";

function GujaratPlan() {
    const plans = {
        fup: [
            { speed: "40 Mbps", after: "2 Mbps", data: "3500 GB", month: 399, three: 1197, six: 2394, ten: 3990 },
            { speed: "50 Mbps", after: "2 Mbps", data: "3000 GB", month: 549, three: 1647, six: 3294, ten: 5490 },
            { speed: "100 Mbps", after: "5 Mbps", data: "3500 GB", month: 699, three: 2097, six: 4197, ten: 6990 },
        ],
        unlimited: [
            { speed: "10 Mbps", month: 499, three: 1497, six: 2994, ten: 4990 },
            { speed: "20 Mbps", month: 599, three: 1797, six: 3594, ten: 5990 },
            { speed: "50 Mbps", month: 799, three: 2397, six: 4794, ten: 7990 },
            { speed: "100 Mbps", month: 999, three: 2997, six: 5994, ten: 9990 },
        ],
        msme: [
            { speed: "25 Mbps", after: "5 Mbps", data: "2000 GB", month: 599 },
            { speed: "50 Mbps", after: "5 Mbps", data: "2500 GB", month: 799 },
            { speed: "75 Mbps", after: "5 Mbps", data: "3000 GB", month: 999 },
            { speed: "100 Mbps", after: "5 Mbps", data: "3500 GB", month: 1199 },
        ],
    };

    const PlanCard = ({ plan, type }) => (
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-all border border-gray-200">
            <h3 className="text-xl font-bold text-sky-700 text-center mb-3">{plan.speed}</h3>

            <div className="text-gray-600 text-sm space-y-1 mb-3">
                {plan.after && <p>After FUP: <span className="font-medium">{plan.after}</span></p>}
                {plan.data && <p>Data: <span className="font-medium">{plan.data}</span></p>}
            </div>

            <div className="text-center">
                <p className="text-3xl font-extrabold text-red-600">₹{plan.month}</p>
                <p className="text-sm text-gray-500">per month</p>
            </div>

            {type !== "msme" && (
                <div className="mt-4 text-sm text-gray-700 space-y-1">
                    <p>3 Months: ₹{plan.three}</p>
                    <p>6 Months: ₹{plan.six}</p>
                    <p>10 Months: ₹{plan.ten}</p>
                </div>
            )}
        </div>
    );

    const Section = ({ title, type, data }) => (
        <section className="mb-10">
            <h2 className="text-2xl font-bold text-center text-white bg-sky-700 py-2 rounded-t-lg mb-4">
                {title}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((plan, i) => (
                    <PlanCard key={i} plan={plan} type={type} />
                ))}
            </div>
        </section>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-6">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-sky-700">Gujarat Ka Home Internet</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        RailTel’s Home Internet - A Govt. of India Initiative
                    </p>
                </header>

                <Section title="FUP HOME PLANS" type="fup" data={plans.fup} />
                <Section title="HOME UNLIMITED PLANS" type="unlimited" data={plans.unlimited} />
                <Section title="MSME PLANS (For Enterprises)" type="msme" data={plans.msme} />

                <footer className="text-center mt-8 text-sm">
                    <p className="font-semibold text-sky-700">
                        For New Connection Call 1800 1039 139
                    </p>
                    <p className="text-gray-600 mt-1">*All plans subject to 18% GST</p>
                </footer>
            </div>
        </div>
    );
}

export default GujaratPlan;
