"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { ArrowDown } from "lucide-react";
import CarReservationData from "../CarReservationData/CarReservationData";

const carSlides = [
  {
    id: 1,
    title: "Business Class – Mercedes-Benz E-Class",
    subTitle:
      "Perfect for Emirates passengers landing in Dubai and heading to Downtown or Dubai Marina in total comfort.",
    img: "/images/bg2.webp", // update to your asset path
    location: "Dubai International Airport (DXB)",
    carModel: "Mercedes-Benz E-Class",
    tripType: "Airport pick-up & drop-off",
    note: "Ideal for business travelers",
  },
  {
    id: 2,
    title: "Family SUV – Toyota Prado or Similar",
    subTitle:
      "Spacious SUV for families arriving on long-haul Emirates flights, with room for kids and luggage.",
    img: "/images/bg3.webp",
    location: "Dubai & Abu Dhabi",
    carModel: "Toyota Prado / Similar",
    tripType: "City & intercity trips",
    note: "Perfect for families & groups",
  },
  {
    id: 3,
    title: "Premium Van – Mercedes-Benz V-Class",
    subTitle:
      "Luxury van for groups, ideal for Emirates Skywards members traveling together to events or conferences.",
    img: "/images/bg4.jpg",
    location: "DXB • DWC • AUH",
    carModel: "Mercedes-Benz V-Class",
    tripType: "Group airport transfers",
    note: "Up to 6–7 passengers",
  },
  {
    id: 4,
    title: "Economy – Nissan Sunny or Similar",
    subTitle:
      "Reliable, budget-friendly option if you just need a simple car after your Emirates flight lands.",
    img: "/images/bg5.webp",
    location: "All major Emirates routes in UAE",
    carModel: "Nissan Sunny / Similar",
    tripType: "Daily & weekly rental",
    note: "Best value for short stays",
  },
];

export default function CarReservationSwiper() {
  const [bookinNow , setBookinNow] =useState(false);

function handleScroll() {
        document.getElementById("cars")
            .scrollIntoView({ behavior: 'smooth' }); // Use 'behavior: smooth'
        setBookinNow(true); // Optional: Keep existing state update
    }

  return (
    <div className="mx-4 md:mx-6 lg:mx-10  h-fit">
      <Swiper
        modules={[Autoplay]}
        className="bannerSwiper"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={16}
      >
        {carSlides.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-[400px]  lg:h-screen rounded-3xl overflow-hidden shadow-xl shadow-slate-300/40">
              {/* Background image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/1600x600/264787/ffffff?text=Car+Rental+Banner";
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />

              {/* Content */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                <div className="px-4 mx-auto sm:px-8 md:px-12 max-w-5xl text-white space-y-3 sm:space-y-4">
                  {/* Heading */}
                  <h2 className="text-xl! sm:text-2xl! md:text-3xl! lg:text-[70px]! text-center font-extrabold drop-shadow-md">
                    {item.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-xs! text-center! !mx-auto sm:text-sm! md:text-[27px]! text-slate-100/90 !max-w-lg">
                    {item.subTitle}
                  </p>

                  {/* **UPDATED BUTTON DESIGN** */}
                  <button
                    className="
                      mx-auto flex items-center justify-center
                      py-2!
                      md:px-6 md:py-3 !mt-12
                      bg-white text-blue-900
                      text-sm!
                      w-[200px]
                      
                      md:text-lg font-semibold
                      rounded-full!
                      shadow-2xl shadow-blue-900/50
                      hover:bg-gray-100
                      transition duration-300 ease-in-out
                      transform hover:scale-105
                      gap-3!
                      animate-bounce
                    
                    "
                    onClick={handleScroll} // Add your booking logic here
                  >
                    <span>Book Car</span>
                    <ArrowDown />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <CarReservationData />
    </div>
  );
}