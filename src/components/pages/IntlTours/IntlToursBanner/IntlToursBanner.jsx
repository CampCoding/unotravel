"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const FALLBACK = [
  { id: 1, image_url: "/images/Flights slider (1).webp", title: "International Tours", subtitle: "Explore the world with Uno Travel" },
  { id: 2, image_url: "/images/Flights slider (2).webp", title: "Guided Experiences",  subtitle: "Expert-led tours across 50+ destinations" },
];

export default function IntlToursBanner({ banners }) {
  const slides = banners?.length ? banners : FALLBACK;

  return (
    <div className="overflow-hidden h-[85vh] relative">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={slides.length > 1}
        className="w-full h-[85vh]"
      >
        {slides.map((item, i) => (
          <SwiperSlide key={item.id ?? i} className="relative h-[85vh]">
            <img
              src={item.image_url}
              onError={(e) => { e.currentTarget.src = "/images/logo hover.svg"; }}
              alt={item.title || `Slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
            {/* Text */}
            {(item.title || item.subtitle) && (
              <div className="absolute bottom-0 left-0 right-0 container pb-20 text-white">
                {item.title && (
                  <h1 className="text-3xl sm:text-5xl font-bold mb-3 drop-shadow-lg">{item.title}</h1>
                )}
                {item.subtitle && (
                  <p className="text-base sm:text-xl text-white/85 max-w-xl drop-shadow">{item.subtitle}</p>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
