import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "../assets/plan-image/1.png";
import image2 from "../assets/plan-image/2.png";
import image3 from "../assets/plan-image/3.png";

// This Plans Show Only Home page

function InternetPlan() {
  const plan1 = ["Up to 100 mbps", "Effective Price", "₹6699 12+3 month"];
  const plan2 = ["Up to 150 mbps", "Effective Price", "₹7699 12+3 month"];
  const plan3 = ["Up to 200 mbps", "Effective Price", "₹8699 12+3 month"];


  // i have use useNavigate funtion
  const navigate = useNavigate()
  const handleRedirect = () => {
    navigate("/contact-us")
  };

  return (
    <main>

      <div className="text-3xl md:text-4xl text-center font-bold font-poppins  transition duration-300">
        <h1 className="text-green-600">Explore <span className="text-amber-600">Broadband Plans</span></h1>
      </div>

      <div className="grid md:grid-cols-2  lg:grid-cols-3  2xl:grid-cols-3 text-center m-14 md:p-8 gap-16 font-serif ">
        {/* Month Plan 1 */}

        <ul className="shadow-2xl rounded-4xl p-4 flex flex-col gap-3 text-lg ">
          <div className="flex  justify-around   ">
            <img src={image1} alt="" className="rounded-3xl" />
          </div>

          {plan1.map((plan, i) => (
            <li key={i}>{plan}</li>
          ))}

          <div className="mt-6">
            <button className=" bg-amber-500 hover:bg-green-600 text-white font-bold  py-3 px-8 rounded-full transition-all duration-300 shadow-md
            " onClick={handleRedirect}> Inquire Now 🚀 </button>
          </div>

        </ul>

        {/* Month Plan 2 */}
        <ul className="shadow-2xl rounded-4xl p-4 flex flex-col gap-3 text-lg ">
          <div className="flex  justify-around  ">
            <img src={image2} alt="" className="rounded-3xl" />
          </div>
          {/* <h1 className="font-bold text-2xl">Internet Plan</h1> */}
          {plan2.map((plan, i) => (
            <li key={i}>{plan}</li>
          ))}

          <div className="mt-6">
            <button className=" bg-amber-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md
            " onClick={handleRedirect}> Inquire Now 🚀 </button>
          </div>
        </ul>

        {/* Month Plan 3 */}
        <ul className="shadow-2xl rounded-4xl p-4 flex flex-col gap-3 text-lg ">
          <div className="flex  justify-around  ">
            <img src={image3} alt="" className="rounded-3xl" />
          </div>
          {/* <h1 className="font-bold text-2xl">Internet Plan</h1> */}
          {plan3.map((plan, i) => (
            <li key={i}>{plan}</li>
          ))}

          <div className="mt-6">
            <button className=" bg-amber-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md
            " onClick={handleRedirect}> Inquire Now 🚀 </button>
          </div>

        </ul>
      </div>
    </main>
  );
}

export default InternetPlan;
