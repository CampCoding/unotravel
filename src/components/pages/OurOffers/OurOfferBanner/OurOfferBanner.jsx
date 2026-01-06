"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const data = [
  { id: 1, img: "/images/Create a Tour slider  (1).webp" },
  { id: 2, img: "/images/Create a Tour slider  (2).webp" },
  { id: 3, img: "/images/Create a Tour slider  (3).webp" },
];

export default function OurOfferBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full  h-fit"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] xl:h-[600px]">
              <Image
                src={item.img}
                alt="Our Offer Banner"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-white text-[28px] sm:text-[36px] md:text-[48px] 2xl:text-[65px] !font-bold drop-shadow-lg leading-snug"
                  style={{ textShadow: "0px 3px 10px #000000" }}
                >
                  International Tours
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="rounded-md mt-4 flex justify-between items-center px-3 sm:px-4 bg-[#F5F6FA] w-full max-w-[90%] sm:max-w-[400px] 2xl:max-w-[465px] h-[45px] sm:h-[55px]"
                >
                  <input
                    placeholder="Search For Tours"
                    className="border-0 bg-transparent text-[#3B85C1] text-sm sm:text-md placeholder:text-sm sm:placeholder:text-md outline-none w-full"
                  />
                  <Search size={18} color="#3B85C1" />
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
