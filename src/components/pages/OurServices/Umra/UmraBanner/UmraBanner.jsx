"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const FALLBACK = [
  { id: 1, image_url: "/images/Asset 1-100.webp" },
  { id: 2, image_url: "/images/NoPath - Copy (52).webp" },
];

export default function UmraBanner({ banners }) {
  const slides = banners?.length ? banners : FALLBACK;

  return (
    <div data-aos="zoom-in-right" className="overflow-hidden h-[90vh]">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={slides.length > 1}
        slidesPerView={1}
        className="w-full"
      >
        {slides.map((item, i) => (
          <SwiperSlide key={item.id ?? i}>
            <div className="relative w-full h-[90vh]">
              <Image
                src={item.image_url}
                alt={`Umrah slide ${i + 1}`}
                fill
                className="object-cover rounded-md"
                priority={i === 0}
              />
              <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent z-10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
