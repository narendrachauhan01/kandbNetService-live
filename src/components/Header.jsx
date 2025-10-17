import React from 'react'
import { FaPhone, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


function Header() {


    return (

        <header className='flex w-full text-white font-mono'>

            {/* Left side */}

            <div className='bg-[#17345C] flex p-2 w-screen justify-center'>
                <span className="text-sm md:text-base flex gap-2 hover:text-2xl transition-all duration-800 ease-in-out hover:cursor-pointer" ><FaPhone /> Helpdesk:  079-2999-1999, 079-2999-2999 </span>
            </div>

            {/* Right side */}
            <div className='bg-[#EAE100] flex  justify-center md:justify-end items-center gap-4 p-2 flex-none '>

                <a href="#" target="blank" className="text-black"> <FaFacebookF /></a>
                <a href="#" target="blank" className="text-black"> <FaXTwitter /> </a>
                <a href="https://www.youtube.com/@kbnet2199" target="blank" className="text-black"> <FaYoutube /> </a>
                <a href="#" target="blank" className="text-black"> <FaLinkedinIn /> </a>

            </div>


        </header>
    )
}

export default Header