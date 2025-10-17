import React from 'react'
import { FaQuoteRight } from "react-icons/fa";
import image4 from '../assets/customerImage/4.jpeg';
import image1 from '../assets/customerImage/1.jpg';
import image2 from '../assets/customerImage/2.png';
import image3 from '../assets/customerImage/3.png';
import image5 from '../assets/customerImage/5.jpeg';

import ReviewIframe from './ReviewIframe';

function CustomerReviews() {
    return (


        <main className="font-poppins ">

            {/* Coustmer Reviews Section */}

            <div className='w-full flex flex-col items-center pt-20 pb-60'>


                {/* Title */}
                <div className="text-amber-500 font-bold text-2xl font-mono mb-2">
                    Testimonial
                </div>
                <div className="text-3xl md:text-4xl font-sans font-bold text-center mb-10">
                    What clients say about us
                </div>

                {/* Testimonial Card */}
                <div className="grid  sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 gap-8 px-6 md:px-20">

                    {/* 1.Customer-Reviews */}

                    <div className="bg-white shadow-lg rounded-2xl hover:scale-105 duration-400">
                        <div className="p-6 text-center text-gray-700 leading-relaxed ">
                            “Very good service and speed is also commendable and very fast.
                            Have not faced any issue since we have taken this connection.
                            Good quality service provider. Thank you so much for this service.”
                        </div>

                        <div className="bg-pink-100 py-8 flex flex-col items-center hover:bg-yellow-400  transition-colors duration-1000">
                            <FaQuoteRight className='text-amber-500 rotate-180 inset-0  ml-10 ' />
                            <img src={image4} alt="Customer" className="w-16 h-16 rounded-full border-4 border-white shadow-md mb-3"
                            />
                            <div className="font-bold text-lg text-gray-800">Narendra Singh</div>
                            <div className="text-gray-600 text-sm">Ahmedabad, Gujarat</div>
                        </div>
                    </div>

                    {/* 2.Customer-Reviews */}

                    <div className="bg-white shadow-lg rounded-2xl hover:scale-105 duration-400">
                        <div className="p-6 text-center text-gray-700 leading-relaxed ">
                            “Very good service and speed is also commendable and very fast.
                            Have not faced any issue since we have taken this connection.
                            Good quality service provider. Thank you so much for this service.”
                        </div>

                        <div className="bg-pink-100 py-8 flex flex-col items-center  hover:bg-yellow-400  transition-colors duration-1000">
                            <FaQuoteRight className='text-amber-500  ml-10 ' />
                            <img src={image1} alt="Customer" className="w-16 h-16 rounded-full border-4 border-white shadow-md mb-3"
                            />
                            <div className="font-bold text-lg text-gray-800">Abodh Kumar</div>
                            <div className="text-gray-600 text-sm">Rajasthan</div>
                        </div>
                    </div>


                    {/* 3.Customer-Reviews */}

                    <div className="bg-white shadow-lg rounded-2xl hover:scale-105 duration-400 ">
                        <div className="p-6 text-center text-gray-700 leading-relaxed ">
                            “Very good service and speed is also commendable and very fast.
                            Have not faced any issue since we have taken this connection.
                            Good quality service provider. Thank you so much for this service.”
                        </div>

                        <div className="bg-pink-100 py-8 flex flex-col items-center  hover:bg-yellow-400  transition-colors duration-1000">
                            <FaQuoteRight className='text-amber-500  ml-10 ' />
                            <img src={image2} alt="Customer" className="w-16 h-16 rounded-full border-4 border-white shadow-md mb-3"
                            />
                            <div className="font-bold text-lg text-gray-800">Rajan Vavadia</div>
                            <div className="text-gray-600 text-sm">Ahmedabad, Gujarat</div>
                        </div>
                    </div>

                    {/* 4.Customer-Reviews */}

                    <div className="bg-white shadow-lg rounded-2xl hover:scale-105 duration-400">
                        <div className="p-6 text-center text-gray-700 leading-relaxed ">
                            “Very good service and speed is also commendable and very fast.
                            Have not faced any issue since we have taken this connection.
                            Good quality service provider. Thank you so much for this service.”
                        </div>

                        <div className="bg-pink-100 py-8 flex flex-col items-center  hover:bg-yellow-400  transition-colors duration-1000">
                            <FaQuoteRight className='text-amber-500  ml-10 ' />
                            <img src={image3} alt="Customer" className="w-16 h-16 rounded-full border-4 border-white shadow-md mb-3"
                            />
                            <div className="font-bold text-lg text-gray-800">Rahul Singh</div>
                            <div className="text-gray-600 text-sm">Ahmedabad, Gujarat</div>
                        </div>
                    </div>

                    {/* 5.Customer-Reviews */}

                    <div className="bg-white shadow-lg rounded-2xl hover:scale-105 duration-400 ">
                        <div className="p-6 text-center text-gray-700 leading-relaxed ">
                            “Very good service and speed is also commendable and very fast.
                            Have not faced any issue since we have taken this connection.
                            Good quality service provider. Thank you so much for this service.”
                        </div>

                        <div className="bg-pink-100 py-8 flex flex-col items-center  hover:bg-yellow-400  transition-colors duration-1000 ">
                            <FaQuoteRight className='text-amber-500  ml-10 ' />
                            <img src={image5} alt="Customer" className="w-16 h-16 rounded-full border-4 border-white shadow-md mb-3"
                            />
                            <div className="font-bold text-lg text-gray-800">Narendra</div>
                            <div className="text-gray-600 text-sm">Jaunpur, Uttar Pradesh</div>
                        </div>
                    </div>


                </div>

            </div>

                <ReviewIframe/>
        </main>
    )
}

export default CustomerReviews
