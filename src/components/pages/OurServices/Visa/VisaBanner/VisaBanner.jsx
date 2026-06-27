"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const FALLBACK = [{ id: "fallback", image_url: "/images/visa.webp" }];

export default function VisaBanner({ banners = [] }) {
  const slides = banners.length > 0 ? banners : FALLBACK;

  return (
    <div data-aos="zoom-in-right" className="overflow-hidden h-[90vh]">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        slidesPerView={1}
        className="w-full h-full overflow-hidden!"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[90vh]">
              <Image
                src={item.image_url || "/images/visa.webp"}
                alt={item.title || "Visa Banner"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent z-10" />
              {(item.title || item.subtitle) && (
                <div className="absolute bottom-16 left-0 right-0 z-20 container text-white">
                  {item.title    && <h2 className="text-4xl font-bold drop-shadow-lg">{item.title}</h2>}
                  {item.subtitle && <p  className="text-lg mt-2 drop-shadow">{item.subtitle}</p>}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
