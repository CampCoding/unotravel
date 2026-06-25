"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

export default function FareFlightBanner({ banners }) {
  const hasApiData = Array.isArray(banners) && banners.length > 0;

  if (!hasApiData) {
    return (
      <div data-aos="zoom-in-up">
        <h2 className="text-center flex mt-6 flex-col gap-1 text-(--main-dark-color)! font-bold text-5! md:text-10! lg:text-[50px]!">
          <span>Find And Book</span>
          <span>A Great Experience</span>
        </h2>
        <img src="/images/Screenshot (432).png" className="w-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-fit"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-fit"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.banner_id}>
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] xl:h-[600px]">
              {banner.media_type === "video" ? (
                <video
                  src={banner.media_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={banner.media_url}
                  alt={banner.banner_title || "Fare Flight Banner"}
                  fill
                  className="object-cover"
                />
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-white text-[28px] sm:text-[36px] md:text-[48px] 2xl:text-[65px] !font-bold drop-shadow-lg leading-snug"
                  style={{ textShadow: "0px 3px 10px #000000" }}
                >
                  {banner.banner_title || "Find And Book A Great Experience"}
                </motion.h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
