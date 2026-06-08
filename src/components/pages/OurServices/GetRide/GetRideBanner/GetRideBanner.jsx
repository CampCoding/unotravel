"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
  CarFront,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const data = [
  {
    id: 1,
    src: "/images/Get a Ride (1).webp",
    title: "Ensuring Your Journey is Secure & Convenient",
    subtitle: "Book your ride easily with safe drivers, comfortable cars, and smooth pickup service.",
  },
  {
    id: 2,
    src: "/images/Get a Ride (2).webp",
    title: "Travel Smart With Uno Travel",
    subtitle: "Choose your pickup, drop-off, date, and time in seconds.",
  },
  {
    id: 3,
    src: "/images/Get a Ride (3).webp",
    title: "Reliable Rides For Every Trip",
    subtitle: "From airport transfers to city rides, your journey starts here.",
  },
];

export default function GetRideBanner() {
  const [activeTab, setActiveTab] = useState("ride");

  return (
    <section
      data-aos="fade-up"
      className="relative overflow-hidden bg-[#F5F6FA] py-8 md:py-12 lg:py-16"
    >
      <div className="absolute left-0 top-0 h-[340px] w-[340px] rounded-full bg-[#3B85C1]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#264787]/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="grid min-h-[680px] items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-[34px] bg-black shadow-2xl shadow-blue-950/20">
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              loop
              speed={900}
              autoplay={{
                delay: 4200,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                el: ".get-ride-web-pagination",
              }}
              className="h-[520px] w-full md:h-[660px]"
            >
              {data.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div className="relative h-[520px] w-full md:h-[660px]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute inset-0 flex items-center">
                      <div className="max-w-3xl px-6 md:px-10 lg:px-14">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                          <ShieldCheck className="h-4 w-4 text-[#8DCDFF]" />
                          Safe & Convenient
                        </div>

                        <h1 className="text-[34px] font-black leading-tight text-white md:text-[52px] lg:text-[64px]">
                          {item.title}
                        </h1>

                        <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/80 md:text-lg">
                          {item.subtitle}
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-7 text-base font-black text-[#264787] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F5F6FA]"
                          >
                            Get Started
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </button>

                          <button
                            type="button"
                            className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-7 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                          >
                            View Services
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="get-ride-web-pagination absolute bottom-8 left-10 z-20 flex items-center gap-2" />
          </div>

          <div className="relative">
            <div className="absolute -right-5 -top-5 hidden h-24 w-24 rounded-[28px] bg-[#3B85C1]/10 lg:block" />
            <div className="absolute -bottom-5 -left-5 hidden h-28 w-28 rounded-full bg-[#264787]/10 lg:block" />

            <div className="relative rounded-[34px] border border-white bg-white p-5 shadow-2xl shadow-blue-950/10 md:p-7">
              <div className="mb-6 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F5F6FA]">
                  <CarFront className="h-8 w-8 text-[#264787]" />
                </div>
              </div>

              <div className="mb-7 text-center">
                <h2 className="text-2xl font-black text-[#264787] md:text-3xl">
                  UNO TRAVEL
                </h2>
                <p className="mt-2 text-sm font-semibold text-gray-400">
                  Book your ride in simple steps
                </p>
              </div>

              <div className="mb-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-[#D8E1F0] bg-[#F5F6FA] p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("ride")}
                  className={`h-12 rounded-xl text-sm font-black transition-all ${
                    activeTab === "ride"
                      ? "bg-[#264787] text-white shadow-lg shadow-blue-900/20"
                      : "text-[#264787]"
                  }`}
                >
                  Ride
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("per-hour")}
                  className={`h-12 rounded-xl text-sm font-black transition-all ${
                    activeTab === "per-hour"
                      ? "bg-[#264787] text-white shadow-lg shadow-blue-900/20"
                      : "text-[#264787]"
                  }`}
                >
                  Per Hour
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#CAD7EA] bg-[#F8FAFD] px-4">
                  <MapPin className="h-5 w-5 shrink-0 text-[#3B85C1]" />
                  <input
                    type="text"
                    placeholder="Pickup"
                    className="h-full w-full bg-transparent text-sm font-bold text-[#264787] outline-none placeholder:text-[#3B85C1]"
                  />
                </div>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#CAD7EA] bg-[#F8FAFD] px-4">
                  <MapPin className="h-5 w-5 shrink-0 text-[#3B85C1]" />
                  <input
                    type="text"
                    placeholder="Drop Off"
                    className="h-full w-full bg-transparent text-sm font-bold text-[#264787] outline-none placeholder:text-[#3B85C1]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex h-16 items-center gap-3 rounded-2xl border border-[#CAD7EA] bg-[#F8FAFD] px-4">
                    <CalendarDays className="h-5 w-5 shrink-0 text-[#3B85C1]" />
                    <div>
                      <p className="text-xs font-black text-[#3B85C1]">Date</p>
                      <input
                        type="date"
                        className="w-full bg-transparent text-sm font-black text-[#264787] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex h-16 items-center gap-3 rounded-2xl border border-[#CAD7EA] bg-[#F8FAFD] px-4">
                    <Clock3 className="h-5 w-5 shrink-0 text-[#3B85C1]" />
                    <div>
                      <p className="text-xs font-black text-[#3B85C1]">Time</p>
                      <input
                        type="time"
                        className="w-full bg-transparent text-sm font-black text-[#264787] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="group mt-2 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#264787] text-base font-black text-white shadow-xl shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1f3a70]"
                >
                  Next
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#F5F6FA] p-3 text-center">
                  <p className="text-lg font-black text-[#264787]">24/7</p>
                  <p className="text-xs font-bold text-gray-400">Support</p>
                </div>

                <div className="rounded-2xl bg-[#F5F6FA] p-3 text-center">
                  <p className="text-lg font-black text-[#264787]">Safe</p>
                  <p className="text-xs font-bold text-gray-400">Trips</p>
                </div>

                <div className="rounded-2xl bg-[#F5F6FA] p-3 text-center">
                  <p className="text-lg font-black text-[#264787]">Fast</p>
                  <p className="text-xs font-bold text-gray-400">Booking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .get-ride-web-pagination .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .get-ride-web-pagination .swiper-pagination-bullet-active {
          width: 34px;
          background: #ffffff;
        }
      `}</style>
    </section>
  );
}
// 'use client';
// import React, { useState } from 'react';
// import { 
//   Calendar, MapPin, User, Baby, Briefcase, 
//   FileText, Tag, ChevronRight, HelpCircle 
// } from 'lucide-react';

// export default function DesktopRideDetails() {
//   const [carType, setCarType] = useState('economy');
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(2);
//   const [bags, setBags] = useState(3);

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#264787]">
//       {/* Top Navbar */}
//       <header className="bg-white border-b border-slate-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center text-white font-bold">U</div>
//           <span className="font-bold text-xl tracking-wide text-slate-800">Uno Travel</span>
//         </div>
//         <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
//           <a href="#" className="hover:text-[#3B82F6]">My Bookings</a>
//           <a href="#" className="hover:text-[#3B82F6]">Support</a>
//           <button className="bg-[#264787] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition-all">
//             Sign In
//           </button>
//         </nav>
//       </header>

//       {/* Main Container */}
//       <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* LEFT & CENTER COLUMNS: Form Inputs (Spans 2 columns) */}
//         <div className="lg:col-span-2 space-y-6">
//           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ride Details</h1>
          
//           {/* Section 1: Route Summary Card */}
//           <div className="bg-gradient-to-br from-[#264787] to-[#1E3A8A] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
//             <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
//             <div className="flex items-center gap-3 mb-4 bg-white/10 w-fit px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider">
//               <Calendar className="w-4 h-4 text-[#FBBF24]" />
//               <span>Mon, 25 Aug</span>
//             </div>
            
//             <div className="relative pl-6 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/30 before:border-dashed">
//               <div className="flex items-start gap-3">
//                 <div className="w-4 h-4 rounded-full bg-[#FBBF24] border-4 border-white/20 mt-1 shrink-0" />
//                 <div>
//                   <p className="text-xs text-white/70 font-medium">Pickup Location</p>
//                   <p className="text-sm font-semibold">Airport Road, King Khalid International Airport</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="w-4 h-4 rounded-full bg-[#3B82F6] border-4 border-white/20 mt-1 shrink-0" />
//                 <div>
//                   <p className="text-xs text-white/70 font-medium">Dropoff Location</p>
//                   <p className="text-sm font-semibold">Prince Faisal Bin Fahd Bin Abdulaziz Rd.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Section 2: Choose Your Car */}
//           <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
//             <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
//               <span className="w-1.5 h-4 bg-[#3B82F6] rounded-full"></span>
//               Choose Your Vehicle
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Economy Option */}
//               <div 
//                 onClick={() => setCarType('economy')}
//                 className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
//                   carType === 'economy' ? 'border-[#3B82F6] bg-[#3B82F6]/5' : 'border-slate-100 bg-white hover:border-slate-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-20 h-12 bg-slate-100 rounded-lg flex items-center justify-center p-1">
//                     <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=120&auto=format&fit=crop&q=60" alt="Economy Car" className="object-contain max-h-full mix-blend-multiply" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-sm text-slate-800">Economy Sedan</p>
//                     <p className="text-xs text-slate-500">Toyota Camry or similar</p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${carType === 'economy' ? 'border-[#3B82F6] bg-[#3B82F6]' : 'border-slate-300'}`}>
//                   {carType === 'economy' && <div className="w-2 h-2 rounded-full bg-white" />}
//                 </div>
//               </div>

//               {/* Comfortable Option */}
//               <div 
//                 onClick={() => setCarType('comfortable')}
//                 className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
//                   carType === 'comfortable' ? 'border-[#3B82F6] bg-[#3B82F6]/5' : 'border-slate-100 bg-white hover:border-slate-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-20 h-12 bg-slate-100 rounded-lg flex items-center justify-center p-1">
//                     <img src="https://images.unsplash.com/photo-1617469767053-d3b508a0d822?w=120&auto=format&fit=crop&q=60" alt="Comfortable Car" className="object-contain max-h-full mix-blend-multiply" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-sm text-slate-800">Comfortable SUV</p>
//                     <p className="text-xs text-slate-500">BMW X3 or similar</p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${carType === 'comfortable' ? 'border-[#3B82F6] bg-[#3B82F6]' : 'border-slate-300'}`}>
//                   {carType === 'comfortable' && <div className="w-2 h-2 rounded-full bg-white" />}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Section 3: Passenger Counter Configuration */}
//           <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
//             <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
//               <span className="w-1.5 h-4 bg-[#3B82F6] rounded-full"></span>
//               Passengers & Luggage
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Adults Counter */}
//               <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
//                 <div className="flex items-center gap-3">
//                   <User className="w-5 h-5 text-slate-400" />
//                   <div>
//                     <p className="text-xs font-bold text-slate-700">Adults</p>
//                     <p className="text-[10px] text-slate-400">Age 12+</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 bg-[#264787] text-white px-2 py-1 rounded-lg shadow-sm">
//                   <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-6 font-bold hover:opacity-80 text-center">-</button>
//                   <span className="w-4 text-center font-bold text-sm">{adults}</span>
//                   <button type="button" onClick={() => setAdults(adults + 1)} className="w-6 font-bold hover:opacity-80 text-center">+</button>
//                 </div>
//               </div>

//               {/* Children Counter */}
//               <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
//                 <div className="flex items-center gap-3">
//                   <Baby className="w-5 h-5 text-slate-400" />
//                   <div>
//                     <p className="text-xs font-bold text-slate-700">Children</p>
//                     <p className="text-[10px] text-slate-400">Age 2-12</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 bg-[#264787] text-white px-2 py-1 rounded-lg shadow-sm">
//                   <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-6 font-bold hover:opacity-80 text-center">-</button>
//                   <span className="w-4 text-center font-bold text-sm">{children}</span>
//                   <button type="button" onClick={() => setChildren(children + 1)} className="w-6 font-bold hover:opacity-80 text-center">+</button>
//                 </div>
//               </div>

//               {/* Bags Counter */}
//               <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
//                 <div className="flex items-center gap-3">
//                   <Briefcase className="w-5 h-5 text-slate-400" />
//                   <div>
//                     <p className="text-xs font-bold text-slate-700">Bags</p>
//                     <p className="text-[10px] text-slate-400">Standard luggage</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 bg-[#264787] text-white px-2 py-1 rounded-lg shadow-sm">
//                   <button type="button" onClick={() => setBags(Math.max(0, bags - 1))} className="w-6 font-bold hover:opacity-80 text-center">-</button>
//                   <span className="w-4 text-center font-bold text-sm">{bags}</span>
//                   <button type="button" onClick={() => setBags(bags + 1)} className="w-6 font-bold hover:opacity-80 text-center">+</button>
//                 </div>
//               </div>
//             </div>

//             {/* Dynamic Child Age Fields conditional display */}
//             {children > 0 && (
//               <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {Array.from({ length: children }).map((_, i) => (
//                   <div key={i} className="flex flex-col gap-1.5">
//                     <label className="text-xs font-semibold text-slate-500">Child {i + 1} Age</label>
//                     <div className="relative">
//                       <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer">
//                         <option>5 Years Old</option>
//                         <option>8 Years Old</option>
//                       </select>
//                       <span className="absolute right-3 top-3 pointer-events-none text-slate-400 text-xs">▼</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Section 4: Text Inputs (Driver sign & comments) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-2">
//               <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
//                 <User className="w-3.5 h-3.5 text-slate-400" /> Name On Sign For Driver
//               </label>
//               <input 
//                 type="text" 
//                 placeholder="Name On Sign For Driver" 
//                 className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] placeholder-slate-400"
//               />
//             </div>

//             <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-2">
//               <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
//                 <FileText className="w-3.5 h-3.5 text-slate-400" /> Comment / Flight Details
//               </label>
//               <input 
//                 type="text" 
//                 placeholder="Your Message Here" 
//                 className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] placeholder-slate-400"
//               />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Sticky Summary & Checkout Side Panel */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 sticky top-24 space-y-6">
//             <h3 className="text-lg font-bold text-slate-900">Fare Summary</h3>
            
//             {/* Promo / Coupon Input Field */}
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
//                 <Tag className="w-3.5 h-3.5" /> Have a Coupon?
//               </label>
//               <div className="flex gap-2">
//                 <input 
//                   type="text" 
//                   placeholder="Enter Your Coupon Here" 
//                   className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#3B82F6] placeholder-slate-400"
//                 />
//                 <button type="button" className="bg-[#264787] text-white font-bold text-xs px-4 rounded-xl hover:bg-opacity-95 transition-all">
//                   Apply
//                 </button>
//               </div>
//             </div>

//             {/* Line items pricing breakdown */}
//             <div className="border-t border-slate-100 pt-4 space-y-3 text-sm text-slate-600">
//               <div className="flex justify-between">
//                 <span>Base Fare ({carType === 'economy' ? 'Economy' : 'Comfort'})</span>
//                 <span>$95.00</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Extra Passenger / Bags fee</span>
//                 <span>$13.00</span>
//               </div>
//               <div className="flex justify-between text-xs text-emerald-600 font-medium">
//                 <span>Discount coupon</span>
//                 <span>-$0.00</span>
//               </div>
//             </div>

//             {/* Combined Total Display Segment */}
//             <div className="bg-gradient-to-r from-[#264787] to-[#1E3A8A] text-white p-5 rounded-xl text-center shadow-inner">
//               <p className="text-[10px] uppercase font-bold tracking-widest text-white/70 mb-0.5">Total Amount (Includes Tax's)</p>
//               <p className="text-4xl font-black tracking-tight">$108</p>
//             </div>

//             {/* Call to Action Button */}
//             <button type="button" className="w-full bg-[#264787] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-opacity-90 hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2">
//               <span>Proceed to Checkout</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
            
//             <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-2">
//               <HelpCircle className="w-3.5 h-3.5" />
//               <span>Need help? Contact dispatch support</span>
//             </div>
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }