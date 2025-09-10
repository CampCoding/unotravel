"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const data = [
  {
    id: 1,
    src: "/images/2151747357.webp",
    type: "image",
  },
];

export default function AboutBanners() {
  return (
    <div data-aos="zoom-in-right" className="overflow-x-hidden">
      <Swiper>
        {data?.map((item) => (
          <SwiperSlide key={item?.id} className="w-full">
            {item?.type == "image" ? (
              <div className="relative">
                <img
                  src={item.src}
                  alt={`slide-${item.id}`}
                  className="w-full h-[430px] object-cover"
                />
                <div
                  className="w-full absolute bottom-0 h-[256px]"
                  style={{
                    background:
                      "transparent linear-gradient(360deg, #000000 0%, #00000000 100%) 0% 0% no-repeat padding-box",
                  }}
                ></div>
              </div>
            ) : (
              <video
                className="w-full h-[430px] object-cover"
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
