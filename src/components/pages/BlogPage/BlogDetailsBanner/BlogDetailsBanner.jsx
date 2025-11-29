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

export default function BlogDetailsBanner({title , subTitle}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
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
                alt="Our Blog Banner"
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
                 {title}
                </motion.h2>
                  <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-gray-300 text-[24px] sm:text-[36px] md:text-[48px] 2xl:text-[25px] !font-bold drop-shadow-lg leading-snug"
                  style={{ textShadow: "0px 3px 10px #000000" }}
                >
                 {subTitle}
                </motion.p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
