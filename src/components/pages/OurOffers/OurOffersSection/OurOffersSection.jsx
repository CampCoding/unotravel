"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const offers = [
  "/images/Uno Offers (1).webp",
  "/images/Uno Offers (2).webp",
  "/images/Uno Offers (3).webp",
  "/images/Uno Offers (4).webp",
  "/images/Uno Offers (5).webp",
  "/images/Uno Offers (6).webp",
];

export default function OurOffersSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  return (
    <div className="mt-[115px]">
      <div
        data-aos="fade-up"
        className="container flex justify-between items-center"
      >
        <CustomHeading first_title={"Uno"} second_title={"Offers"} />
        <div className="flex items-center gap-1">
          <p className="text-[#3B85C1] !text-sm sm:text-lg m-auto font-medium">
            Browse All
          </p>
          <button
            ref={prevRef}
            className="cursor-pointer 
            w-6 h-6 sm:w-8 sm:h-8
            hover:opacity-70 transition-opacity"
            aria-label="Previous offer"
          >
            <CircleChevronLeft className="w-full h-full" color="#3B85C1" />
          </button>
          <button
            ref={nextRef}
            className="cursor-pointer 
            w-6 h-6 sm:w-8 sm:h-8
            hover:opacity-70 transition-opacity"
            aria-label="Next offer"
          >
            <CircleChevronRight className="w-full h-full" color="#3B85C1" />
          </button>
        </div>
      </div>

      <div
        data-aos-delay={1000}
        className="!ps-[20px] md:!ps-[80px] mt-10  h-fit"
        data-aos="zoom-in-up"
      >
        <div className="overflow-hidden  h-fit">
          <Swiper
            ref={swiperRef}
            spaceBetween={75}
            slidesPerView={1}
            loop={true}
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              375: {
                slidesPerView: 1.25,
                spaceBetween: 10,
              },
              470: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
               850: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1100 : {
                  slidesPerView: 4,
                spaceBetween: 10,
              },
              1200 : {
                slidesPerView: 5.5,
                spaceBetween: 10,
              },
              1380: {
                slidesPerView: 5.5,
                spaceBetween: 10,
              },
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {offers.map((offer, index) => (
              <SwiperSlide className="!flex !justify-center !items-center" key={index}>
                <div className="w-[235px] h-[300px] rounded-md overflow-hidden  hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={offer}
                    alt={`Offer ${index + 1}`}
                    width={235}
                    height={300}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
