"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';


const travelers = [
  {
    id: 1,
    city: "Tokyo",
    country: "Japan",
    name: "William Lyon",
    handle: "@william_travels",
    cityImage: "/images/Hotel booking slider (1).webp",
    avatar: "/images/avatar.png",
  },
  {
    id: 2,
    city: "Dubai Marina",
    country: "UAE",
    name: "James Noah",
    handle: "@noah.on.the.go",
    cityImage: "/images/Hotel booking slider (2).webp",
    avatar: "/images/avatar.png",
  },
  {
    id: 3,
    city: "Dubai",
    country: "UAE",
    name: "Leni Tashira",
    handle: "@leni.flightnotes",
    cityImage: "/images/Hotel booking slider (3).webp",
    avatar: "/images/avatar.png",
  },
  {
    id: 4,
    city: "New York",
    country: "USA",
    name: "Sebastian Johns",
    handle: "@sebastian.journeys",
    cityImage: "/images/Hotel booking slider (2).webp",
    avatar: "/images/avatar.png",
  },
   {
    id: 5,
    city: "Tokyo",
    country: "Japan",
    name: "William Lyon",
    handle: "@william_travels",
    cityImage: "/images/Hotel booking slider (1).webp",
    avatar: "/images/avatar.png",
  },
   {
    id: 6,
    city: "Tokyo",
    country: "Japan",
    name: "William Lyon",
    handle: "@william_travels",
    cityImage: "/images/Hotel booking slider (1).webp",
    avatar: "/images/avatar.png",
  },
   {
    id: 7,
    city: "Tokyo",
    country: "Japan",
    name: "William Lyon",
    handle: "@william_travels",
    cityImage: "/images/Hotel booking slider (1).webp",
    avatar: "/images/avatar.png",
  },
   {
    id: 8,
    city: "Tokyo",
    country: "Japan",
    name: "William Lyon",
    handle: "@william_travels",
    cityImage: "/images/Hotel booking slider (1).webp",
    avatar: "/images/avatar.png",
  },
];

export default function FlightFareBestTravels() {
  return (
    <section className="mt-16">
      <div className="mx-auto px-4">
        {/* Heading + arrows */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2
            data-aos="fade-up"
            className="text-left text-3xl md:text-4xl lg:text-[70px]! text-shadow-lg font-bold text-(--main-dark-color) leading-tight"
          >
            Best travelers of the month
          </h2>

          <div className="hidden md:flex items-center gap-2">
            <button
              className="traveler-prev w-9 h-9 rounded-full! border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[var(--main-dark-color)] hover:text-white transition"
              type="button"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="traveler-next w-9 h-9 rounded-full! border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[var(--main-dark-color)] hover:text-white transition"
              type="button"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          grabCursor={true}
          navigation={{
            nextEl: ".traveler-next",
            prevEl: ".traveler-prev",
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.3 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5},
          }}
        >
          {travelers.map((traveler, idx) => (
            <SwiperSlide className="shadow-none! pb-6" key={traveler.id}>
              <div
                data-aos="fade-up"
                data-aos-delay={80 * idx}
                className="relative mx-auto w-full max-w-[220px] h-[330px] rounded-[140px] bg-white! shadow-md overflow-hidden flex flex-col justify-between transition-transform duration-200"
              >
                {/* City image */}
                <div className="h-[72%]! w-full overflow-hidden rounded-t-[140px]">
                  <img
                    src={traveler.cityImage}
                    alt={traveler.city}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* White lower area */}
                <div className="relative  bg-white flex flex-col items-center justify-end pb-6 pt-7">
                  {/* Avatar badge */}
                  <div className="absolute -top-8">
                    <div className="h-16 w-16 rounded-full border-4 border-white shadow-md overflow-hidden">
                      <img
                        src={traveler.avatar}
                        alt={traveler.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center mt-3 px-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {traveler.name}
                    </p>
                    <p className="text-[11px] text-slate-400 mb-1">
                      {traveler.handle}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500">
                      {traveler.city}, {traveler.country}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
