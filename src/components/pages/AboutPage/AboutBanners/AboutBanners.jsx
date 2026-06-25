"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const FALLBACK = [{ id: 1, src: "/images/why-choose-us.webp", type: "image" }];

export default function AboutBanners({ aboutSection }) {
  const slides = aboutSection?.hero_image
    ? [{ id: 1, src: aboutSection.hero_image, type: "image" }]
    : FALLBACK;

  return (
    <div data-aos="zoom-in-right" className="overflow-x-hidden h-fit">
      <Swiper>
        {slides.map((item) => (
          <SwiperSlide key={item.id} className="w-full h-fit">
            {item.type === "image" ? (
              <div className="relative">
                <img src={item.src} alt={`slide-${item.id}`} className="w-full h-[430px] object-cover" />
                <div
                  className="w-full absolute bottom-0 h-[256px]"
                  style={{ background: "transparent linear-gradient(360deg, #000000 0%, #00000000 100%) 0% 0% no-repeat padding-box" }}
                />
              </div>
            ) : (
              <video className="w-full h-[430px] object-cover" src={item.src} autoPlay loop muted playsInline />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
