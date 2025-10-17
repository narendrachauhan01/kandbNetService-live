import React, { useState, useEffect } from "react";
import banner1 from "../assets/bannerImage/banner-1.png";
import banner2 from "../assets/bannerImage/banner-2.jpg";
import banner3 from "../assets/bannerImage/banner-3.jpeg";
import banner4 from "../assets/bannerImage/banner-4.jpeg";
import InternetPlan from "../Data/InternetPlan";
import About from "../pages/About";
import BsnlPlan from "../Data/BsnlPlan";
import OurPartner from "./OurPartner";
import FloatingButtons from "../components/FloatingButtons";
function Home() {
    const banners = [banner1, banner2, banner3, banner4];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 9000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="flex flex-col font-poppins ">
            {/* Banner Slider */}
            <div>
                <img
                    src={banners[current]}
                    alt="banner"
                    className="w-screen transition-opacity duration-1000"
                />
            </div>

            {/*  Here Below all import page is Attech to another page */}

            <div className="mt-8 ">
                <BsnlPlan />
                <InternetPlan />
                <About />
                <OurPartner/>
                <FloatingButtons />

            </div>
        </main>
    );
}

export default Home;
