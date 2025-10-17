import React from 'react'
import { FaPhoneVolume } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import logo from "../assets/LogoImage/logo1.jpeg"
function Footer() {



    // 👇 Smooth scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className=' bg-indigo-950 flex flex-col  font-poppins'>

            {/* Center Logo with click */}
            <div className='flex justify-center mt-8'>
                <img
                    src={logo}
                    alt="logo"
                    onClick={scrollToTop}
                    className='size-20 rounded-full cursor-pointer hover:scale-110 '
                />
            </div>


            <div className='text-white text-xl p-10  flex justify-center '>

                <ul>
                    <li className='p-2 hover:text-2xl hover:text-amber-400 hover:cursor-pointer  transition-all duration-800 ease-in-out'><FaPhoneVolume className='size-10 ' />+91 8200683391, +91 9879669892</li>
                    <li className='p-2 hover:text-2xl hover:text-amber-400 hover:cursor-pointer transition-all duration-800 ease-in-out'><MdAttachEmail className='size-10' />kandbnetservice3517@gmail.com</li>
                    <li className='p-2 hover:text-1xl hover:text-amber-400 hover:cursor-pointer'><FaLocationDot className='size-10' />168/A Pratapnagar Rameshwar Cross Meghaninagar Ahmedabad,-380016, Gujarat
                    </li>
                </ul>
            </div>


            <div className=' flex justify-center gap-6 mt-10 mb-10'>

                <a href="#" className="text-black"> <FaFacebookF className=' rounded-sm size-8 text-gray-200 hover:text-blue-600' /></a>
                <a href="https://www.youtube.com/@kbnet2199" target="blank" className="text-black"> <FaYoutube className='   rounded-sm size-8 text-white hover:text-red-600 ' /> </a>
                <a href="#" className="text-black"> <FaXTwitter className='rounded-sm size-8 text-white hover:text-blue-600 ' /> </a>
                <a href="#" className="text-black"> <FaInstagram className=' rounded-sm size-8 text-white hover:text-[#ee2a7b]' /> </a>
                <a href="#" className="text-black"> <FaLinkedinIn className=' rounded-sm size-8 text-white  hover:text-blue-600' /> </a>

            </div>

            <div className="w-full text-center text-white bg-[#010a2e] p-4 font-mono">
                <p>© Copyright{new Date().getFullYear()} K&B Net Service — All Rights Reserved.</p>
                <p>Owned by <span className="font-semibold text-white">K&B Net Service Pvt. Ltd.</span></p>
                <p><a href="/privacy-policy">Privacy Policy</a> | Terms of Use | License: Proprietary | Contact: kandbnetservice3517@gmail.com</p>
            </div>

        </footer>
    )
}

export default Footer