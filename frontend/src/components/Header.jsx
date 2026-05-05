import React, { useEffect, useState } from 'react'
import { FaPhone, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getSocialLinks } from '../api/api';

function Header() {
  const [links, setLinks] = useState({ facebook: '#', youtube: '#', twitter: '#', linkedin: '#' });

  useEffect(() => {
    getSocialLinks().then((data) => {
      if (data) setLinks({
        facebook: data.facebook || '#',
        youtube:  data.youtube  || '#',
        twitter:  data.twitter  || '#',
        linkedin: data.linkedin || '#',
      });
    });
  }, []);

  return (
    <header className='flex w-full text-white font-mono'>

      {/* Left side */}
      <div className='bg-[#17345C] flex p-2 w-screen justify-center'>
        <span className="text-sm md:text-base flex gap-2 hover:text-2xl transition-all duration-800 ease-in-out hover:cursor-pointer">
          <FaPhone /> Helpdesk: 079-2999-1999, 079-2999-2999
        </span>
      </div>

      {/* Right side */}
      <div className='bg-[#EAE100] flex justify-center md:justify-end items-center gap-4 p-2 flex-none'>
        <a href={links.facebook} target="_blank" rel="noreferrer" className="text-black"><FaFacebookF /></a>
        <a href={links.twitter}  target="_blank" rel="noreferrer" className="text-black"><FaXTwitter /></a>
        <a href={links.youtube}  target="_blank" rel="noreferrer" className="text-black"><FaYoutube /></a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-black"><FaLinkedinIn /></a>
      </div>

    </header>
  )
}

export default Header
