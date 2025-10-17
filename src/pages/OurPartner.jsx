import React from 'react'
import p1 from "../assets/partner-logo/1.png"
import p2 from "../assets/partner-logo/2.png"
import p3 from "../assets/partner-logo/3.png"
import p4 from "../assets/partner-logo/4.png"
import p5 from "../assets/partner-logo/airport.jpg"
import p6 from "../assets/partner-logo/station.jpeg"
import p7 from "../assets/partner-logo/nioh.png"
import p8 from "../assets/partner-logo/epfo.jpeg"
import p9 from "../assets/partner-logo/ugvcl.jpeg"
import p10 from "../assets/partner-logo/bullet.png"
import p11 from "../assets/partner-logo/boibank.jpeg"
import p12 from "../assets/partner-logo/canerabank.jpeg"
import p13 from "../assets/partner-logo/bob-bank.jpeg"
import p14 from "../assets/partner-logo/union-bank.jpeg"
import p15 from "../assets/partner-logo/ipr.jpeg"



function OurPartner() {


    return (
        <main>
            <div className='bg-[#222222] py-10 rounded-t-4xl'>

                {/* Title */}
                <div className='md:text-4xl text-2xl text-center text-white font-bold '>
                    <h2 className='text-amber-400'>Our Partners</h2>
                </div>
                <div className="text-center text-white max-w-3xl mx-auto mt-4 mb-8 px-4">
                    <p className="text-sm md:text-base leading-relaxed ">
                        We’re proud to join hands with some of the most trusted names in the industry.
                        Our partnerships reflect our shared vision of bringing faster, smarter, and more reliable
                        internet experiences to people and businesses across Gujarat.
                    </p>
                </div>

                {/* Logos Grid */}
                <div className='grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  items-center mt-0'>
                    <div className=' '>
                        <img src={p1} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  roun' />
                    </div>
                    <div className='text-center'>
                        <img src={p2} alt="Partner 2" className='w-6xl sm:w-6xl md:w-7xl mx-auto' />
                    </div>
                    <div className='text-center'>
                        <img src={p3} alt="Partner 3" className='w-6xl sm:w-6xl md:w-7xl mx-auto' />
                    </div>
                    <div className='text-center'>
                        <img src={p4} alt="Partner 4" className='w-6xl sm:w-6xl   md:w-7xl mx-auto' />
                    </div>

                </div>




                <div className='md:text-4xl text-2xl text-center text-white font-bold '>
                    <h2 className='text-amber-400'>Top Connection</h2>
                </div>
                <div className="text-center text-white max-w-3xl mx-auto mt-4 mb-8 px-4">
                    <p className="text-sm md:text-base lg:text-lg leading-relaxed ">
                        We take pride in being the trusted internet partner for some of the most reputed organizations across Ahmedabad and Gujarat.
                        From airports and railway stations to leading banks and government institutions, our reliable and high-speed connections empower
                        businesses and communities to stay connected every day.
                        These collaborations reflect our commitment to providing seamless connectivity and exceptional service quality.
                    </p>
                </div>


                <div className='grid grid-cols-2  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 items-center justify-items-center gap-6  m-6'>
                    <div className='text-center overflow-hidden '>
                        <img src={p5} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>Airport Ahmedabad, Gujarat</span>
                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p6} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>Railway Station Ahmedabad, Gujarat</span>

                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p7} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>NIOH Ahmedabad, Gujarat</span>

                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p8} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>EPFO Ahmedabad, Gujarat</span>

                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p9} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>UGVCL Ahmedabad, Gujarat</span>

                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p10} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>Bullet Train Project, Ahmedabad</span>

                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p11} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>BOI Bank Ahmedabad, Gujarat</span>

                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p12} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>Canara Bank Ahmedabad, Gujarat</span>

                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p13} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>BOB Bank Ahmedabad, Gujarat</span>

                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p14} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>Union Bank Ahmedabad, Gujarat</span>

                    </div>

                    <div className='text-center overflow-hidden'>
                        <img src={p15} alt="Partner 1" className=' w-6xl  sm:w-6xl md:w-7xl mx-auto  rounded-2xl' />
                        <span className='text-white text-xs md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px]'>IPR Ahmedabad, Gujarat</span>

                    </div>



                </div>

            </div>
        </main>
    )
}

export default OurPartner
