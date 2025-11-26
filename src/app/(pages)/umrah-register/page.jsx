"use client";
import React from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useUmrah } from "@/context/UmrahContext";
import { useRouter } from "next/navigation";
export default function page() {
   const { selectedPackage } = useUmrah();
   const router = useRouter();
   const handleSubmit = (e) => {
   e.preventDefault(); 
    router.push("/umrah-review"); 
};

  return (
    <div className="min-h-screen bg-gray-50 p-3 overflow-y-auto">
      <div className="p-5 container mx-auto py-4 lg:py-[29px]">
       {selectedPackage ? (
        <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-2xl shadow-md p-6 mb-10 flex flex-col md:flex-row gap-6 items-center">
          <img
            src={selectedPackage.image}
            alt={selectedPackage.name}
            className="w-full md:w-[350px] h-[250px] object-cover rounded-xl"
          />
          <div className="flex flex-col gap-2 text-[#264787]">
            <h2 className="!text-lg sm:!text-2xl !font-bold">{selectedPackage.name}</h2>
            <p><strong>Duration:</strong> {selectedPackage.duration}</p>
            <p>{selectedPackage.date}</p>
            <ul className="list-disc pl-5">
              {selectedPackage.costs.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3 font-semibold text-[#3B85C1] ">
              Total: {selectedPackage.totalPrice}$
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center font-[filson-bold] text-gray-500">No package selected.</p>
      )}

        {/* form */}
       <form onSubmit={handleSubmit}>
         <div data-aos="fade-up" data-aos-delay="100" className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            {/* Full Name */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">
                Phone Number *
              </label>
              <div className="flex gap-2 items-center">
                <div className="relative flex-shrink-0">
                  <select
                    name="countryCode"
                    className="min-w-[110px] md:min-w-[130px] max-w-[160px] bg-gray-100 rounded-2xl 
                               px-3 py-3 focus:outline-none focus:ring-2 
                               focus:ring-[var(--main-light-color)] text-sm md:text-base text-gray-700
                               truncate"
                    defaultValue="+966"
                  >
                    <option value="+966">🇸🇦 +966 (SA)</option>
                    <option value="+20">🇪🇬 +20 (EG)</option>
                    <option value="+971">🇦🇪 +971 (UAE)</option>
                    <option value="+965">🇰🇼 +965 (KW)</option>
                    <option value="+974">🇶🇦 +974 (QA)</option>
                    <option value="+968">🇴🇲 +968 (OM)</option>
                    <option value="+962">🇯🇴 +962 (JO)</option>
                    <option value="+90">🇹🇷 +90 (TR)</option>
                    <option value="+46">🇸🇪 +46 (SE)</option>
                    <option value="+44">🇬🇧 +44 (UK)</option>
                    <option value="+1">🇺🇸 +1 (US)</option>
                  </select>
                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder="555 000 0000"
                  className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 
                             focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] 
                             transition placeholder-gray-400 text-base"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base"
              />
            </div>

            {/* Passport Number */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">
                Passport Number
              </label>
              <input
                type="text"
                name="passportNumber"
                placeholder="Enter your passport number"
                className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">
                Gender
              </label>
              <select
                name="gender"
                className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition text-base text-gray-700"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Any Details */}
          <div className="mt-8">
            <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">
              Any Details
            </label>
            <textarea
              name="details"
              placeholder="Any additional Details..."
              className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 resize-none h-32 text-base"
            />
          </div>

          <div className='flex my-4 justify-end items-center'>
      
           <button type='submit'  className='flex gap-2 !font-[filson-bold]  items-center cursor-pointer text-white px-4 !rounded-lg py-2 bg-[var(--main-light-color)] hover:bg-[var(--main-dark-color)] hover:scale-105 transition-all'> Submit </button>
          </div>
        </div>
       </form>
      </div>
    </div>
  );
}
