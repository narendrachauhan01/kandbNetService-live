import React from "react";
import aboutUs from "../assets/patten-image/about.png";

function About() {
    return (
        <main className="px-6 md:px-20 py-16 bg-gray-30 font-poppins">
            {/* Heading */}
            <div className="text-center mb-12">
                <p className="mt-2 text-gray-600 sm:text-4xl hover:text-indigo-500  transition duration-300">
                    Combining high-speed internet with seamless entertainment.
                </p>
            </div>

            {/* Image + Text Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
                {/* Left side: image */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src={aboutUs}
                        alt="About Us"
                        className="w-[80%] h-auto rounded-br-3xl shadow-lg transition-transform duration-500"
                    />
                </div>

                {/* Right side: text */}
                <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
                    <h3 className="text-2xl sm:text-3xl font-semibold  mb-4 text-amber-600">
                        Get TV service with your internet service
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed ">
                        Enjoy seamless connectivity and entertainment with our combined
                        internet and TV services. Stay connected, stay entertained, and
                        experience the best of both worlds with reliability and speed.
                    </p>
                </div>
            </div>

            {/* Feature Cards Section */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div
                    className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white 
                        p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 
                        transition-all duration-500 text-gray-800 font-semibold text-center"
                >
                    Super high consistency in Performance
                </div>

                <div
                    className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white 
                        p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 
                        transition-all duration-500 text-gray-800 font-semibold text-center"
                >
                    European technology to Indian homes
                </div>

                <div
                    className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white 
                        p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 
                        transition-all duration-500 text-gray-800 font-semibold text-center"
                >
                    Lightning fast and efficient customer support
                </div>

                <div
                    className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white 
                        p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 
                        transition-all duration-500 text-gray-800 font-semibold text-center"
                >
                    24/7 Technical Assistance
                </div>

                <div
                    className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white 
                        p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 
                        transition-all duration-500 text-gray-800 font-semibold text-center"
                >
                    Affordable Packages
                </div>

                <div
                    className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white 
                        p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 
                        transition-all duration-500 text-gray-800 font-semibold text-center"
                >
                    Wide Network Coverage
                </div>
            </div>
        </main>
    );
}

export default About;
