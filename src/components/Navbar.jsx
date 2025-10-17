import React from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import logo1 from '../assets/LogoImage/logo1.jpeg';
import { useState } from 'react';
import { Link } from 'react-router-dom';  // ✅ important import

function Navbar() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className=' bg-white flex  justify-around  items-center sticky top-0 font-sans shadow-2xl'>

            <div className='size-16 h-auto '>
                <Link to="/"> <img src={logo1} alt="Logo" className='rounded-full shadow-2xl m-1' />  </Link>
            </div>

            {/* Desktop View */}
            <ul className=' gap-8 font-semibold text-[16px]  md:flex hidden font-poppins'>
                <li className="hover:text-lime-600"><Link to="/">Home</Link></li>
                <li className="hover:text-lime-600"><Link to="/plans">Broadband Plans</Link></li>
                <li className="hover:text-lime-600"><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li className="hover:text-lime-600"><Link to="/customer-reviews">Customer-Reviews</Link></li>
                <li className="hover:text-lime-600"><Link to="/contact-us">Enquire Now</Link></li>
                <li className="hover:text-lime-600"><Link to="/my-Connection">My Connection</Link></li>




            </ul>

            {/* Mobile View */}
            {isOpen && (
                <ul className='absolute w-full font-poppins text-lg gap-3 border shadow-2xl border-gray-200 divide-y divide-gray-300 flex flex-col rounded-b-3xl
                 p-10  top-[71px] md:hidden  rounded bg-gray-100'>
                    <li className="hover:text-lime-600"><Link to="/" onClick={() => setIsOpen(false)}> Home</Link></li>
                    <li className="hover:text-lime-600"><Link to="/plans" onClick={() => setIsOpen(false)}> Broadband Plans</Link></li>
                    <li className="hover:text-lime-600"><Link to="/privacy-policy" onClick={() => setIsOpen(false)}> Privacy Policy</Link></li>
                    <li className="hover:text-lime-600"><Link to="/customer-reviews" onClick={() => setIsOpen(false)}> Customer Reviews</Link></li>
                    <li className="hover:text-lime-600"><Link to="/contact-us" onClick={() => setIsOpen(false)}> Enquire Now</Link></li>
                    <li className="hover:text-lime-600"><Link to="/my-Connection" onClick={() => setIsOpen(false)}> My Connection</Link></li>

                </ul>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className=" md:hidden text-5xl " >
                <RiMenu2Fill />
            </button>

        </nav>
    )
}

export default Navbar
