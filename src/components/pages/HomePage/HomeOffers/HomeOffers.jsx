"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import ErrorImage from "../../../shared/ErrorImage";
import { useDispatch, useSelector } from "react-redux";
import { handleGetLayoutData } from "../../../../lib/features/layoutSlice";

const offers = [
  "/images/Uno Offers (1).webp",
  "/images/Uno Offers (2).webp",
  "/images/Uno Offers (3).webp",
  "/images/Uno Offers (4).webp",
  "/images/Uno Offers (5).webp",
  "/images/Uno Offers (6).webp",
];

export default function HomeOffers({data ,logo}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);


  return (
    <div
      data-aos="fade-up"
      className="flex flex-col lg:flex-row mt-10 md:mt-16 lg:mt-20 gap-6 md:gap-8 lg:gap-10 items-start px-4 md:px-6 lg:px-0"
    >
      {/* Left: Logo section */}
      <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start lg:ps-10 xl:ps-20">
        <div className="relative w-60 h-48 sm:w-72 sm:h-56 md:w-80 md:h-64 lg:w-96 lg:h-80 xl:w-[400px] xl:h-[320px] flex items-center justify-center">
          <Image
            src="/images/logo hover.svg"
            alt="Uno Travel Background"
            fill
            className="absolute object-cover w-full h-full"
          />
          <ErrorImage
            FALLBACK_IMG="/images/BusinessCardLogo-removebg-preview.png"
            image={logo}
            alt={data?.data?.sectionName}
            width={280}
            height={176}
            className="relative z-10 object-contain w-56 h-36 sm:w-64 sm:h-40 md:w-72 md:h-44 lg:w-80 lg:h-52 xl:w-[350px] xl:h-[220px]"
          />
        </div>
      </div>

      {/* Right: Offers section */}
      <div className="flex flex-col gap-4 md:gap-6 flex-1 min-w-0 w-full">
        {/* Header */}
        <div className="flex flex-row justify-between items-center gap-4 sm:gap-0">
          <div dangerouslySetInnerHTML={{__html : data?.sectionName}}></div>
          <div className="flex items-center gap-3 sm:mr-8 md:mr-12 lg:mr-16 xl:mr-20">
            <p className="text-[#3B85C1] my-auto text-base md:text-lg font-medium">
              Browse All
            </p>
            <button
              ref={prevRef}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Previous offer"
            >
              <CircleChevronLeft
                size={28}
                color="#3B85C1"
                className="sm:w-8 sm:h-8"
              />
            </button>
            <button
              ref={nextRef}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Next offer"
            >
              <CircleChevronRight
                size={28}
                color="#3B85C1"
                className="sm:w-8 sm:h-8"
              />
            </button>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="overflow-hidden  h-fit">
          <Swiper
            ref={swiperRef}
            spaceBetween={15}
            slidesPerView={1.5}
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              // Mobile phones (320px - 639px)
              320: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              // Small tablets (480px)
              480: {
                slidesPerView: 1.5,
                spaceBetween: 12,
              },
              // Large tablets (640px - 767px)
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              // Small desktops (768px - 1023px)
              768: {
                slidesPerView: 2.5,
                spaceBetween: 15,
              },
              // Medium desktops (1024px - 1219px)
              1024: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              // Large desktops (1220px - 1379px)
              1220: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              // Extra large desktops (1380px+)
              1380: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              // Ultra wide screens (1600px+)
              1600: {
                slidesPerView: 4.5,
                spaceBetween: 25,
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
            {data?.data?.map((offer, index) => (
              <SwiperSlide key={index}>
                <div className="w-full max-w-[235px] mx-auto cursor-pointer h-64 sm:h-72 md:h-80 lg:h-[300px] rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <ErrorImage
                    FALLBACK_IMG={offers[offer?.offer_id]}
                    image={`${offer?.image_url}`}
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
