import React from "react";
import bsnl1 from "../assets/plan-image/bsnl-plan1.jpeg";
import bsnl2 from "../assets/plan-image/bsnl-plan2.jpeg";
import bsnl3 from "../assets/plan-image/bsnl-plan3.jpeg";
import { useNavigate } from "react-router-dom";

function BsnlPlan() {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate("/contact-us");
    };

    return (
        <main className="mb-10  ">
            {/* Header */}
            <div className="text-center p-6 font-bold font-poppins md:text-3xl text-white  ">
                <p className="text-black">
                    <span className="text-amber-600 text-lg">Superfast Internet</span> + <span className="text-green-500 text-lg">SkyPro BSNL IFTV</span>
                </p>
            </div>

            {/* Images */}
            <div className="flex flex-col md:flex-row md:justify-center gap-16 p-10 items-center ">
                <div className="transition-transform duration-700 hover:scale-110 ">
                    <img
                        src={bsnl1}
                        alt="BSNL Plan 1"
                        className="rounded-3xl shadow-xl"
                    />
                </div>

                <div className="transition-transform duration-700 hover:scale-110">
                    <img
                        src={bsnl2}
                        alt="BSNL Plan 2"
                        className="rounded-3xl shadow-xl"
                    />
                </div>

                <div className="transition-transform duration-700 hover:scale-110">
                    <img
                        src={bsnl3}
                        alt="BSNL Plan 2"
                        className="rounded-3xl shadow-xl"
                    />
                </div>
            </div>

            {/* Promotional Content */}
            <section className="max-w-4xl mx-auto text-center px-6 md:px-12 mt-8">
                <h2 className="text-2xl md:text-3xl font-extrabold font-poppins text-amber-600 mb-4">
                    Experience Unlimited Entertainment with <span className="text-green-600">SkyPro</span> + BSNL IFTV
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed </section>">
                    Step into the future of digital connectivity with <strong>BSNL High-Speed Broadband</strong>
                    and <strong>SkyPro BSNL IFTV</strong> — bringing you lightning-fast
                    internet and premium live TV channels all in one package! Enjoy
                    uninterrupted streaming, crystal-clear video calls, and a world of
                    entertainment right at your fingertips. <br />
                    <br />
                    Whether you’re working from home, binge-watching your favorite shows,
                    or gaming online,
                    <span className="text-amber-600 font-semibold"> BSNL + SkyPro </span> 
                     ensures the fastest, most reliable, and affordable connection you can
                    trust.
                </p>

                <div className="mt-6">
                    <button
                        onClick={handleRedirect}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold font-poppins py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:cursor-progress"
                    >Get Connected Now 🚀</button>
                </div>
            </section>
        </main>
    );
}

export default BsnlPlan;
