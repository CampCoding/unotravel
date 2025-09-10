"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const data = [
  {
    id: 1,
    src: "/images/Asset 1-100.webp",
    type: "image",
  },
  {
    id: 2,
    src: "/images/NoPath - Copy (52).webp",
    type: "image",
  },
];

export default function UmraBanner() {
  return (
    <div data-aos="zoom-in-right" className="overflow-hidden">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="w-full"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[430px]">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={`slide-${item.id}`}
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              ) : (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-md"
                />
              )}

              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent z-10"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
