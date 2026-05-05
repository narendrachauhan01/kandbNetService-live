import React from 'react'
import { FaWifi, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function FloatingButtons() {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/contact-us")
    }

    return (
        <div className="fixed right-0 top-1/2 flex flex-col gap-3 ">
            {/* New Connection */}
            <button
                onClick={handleRedirect}
                className="flex flex-col items-center bg-[#1079f2] text-white p-2  rounded-xl shadow-lg hover:bg-[#004080] transition"
            >
                <FaWifi size={20} />
                <span className="text-[5px] md:text-xs ">New Connection</span>
            </button>

            {/* Quick Pay */}
            <button
                onClick={handleRedirect}
                className="flex flex-col items-center bg-[#e8aa00] text-white p-2 rounded-xl shadow-lg hover:bg-[#e6a300] transition"
            >
                <FaMoneyBillWave size={20} />
                <span className="text-[6px] md:text-xs ">Quick Pay</span>
            </button>
        </div>

    )
}

export default FloatingButtons

