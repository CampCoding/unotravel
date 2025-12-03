"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Handshake, MapPin, Medal, Users } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import ErrorImage from "../../../../shared/ErrorImage";

const data = [
  {
    id: 1,
    icon: "/images/Why Choose Uno Travels (1).svg",
    title: "Number 1 worldwide travel",
  },
  {
    id: 2,
    icon: "/images/Why Choose Uno Travels (2).svg",
    title: "Selected hotels with care",
  },
  {
    id: 3,
    icon: "/images/Why Choose Uno Travels (3).svg",
    title: "Super Customer Service",
  },
  {
    id: 4,
    icon: "/images/Why Choose Uno Travels (4).svg",
    title: "Fly to over 10,000 awesome destinations",
  },
  {
    id: 5,
    icon: "/images/Why Choose Uno Travels (5).svg",
    title: "Call Center 24/7",
  },
];

const parentVariant = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const childVariant = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function HomeChooseUs({ banner = true, data: chooseUSData }) {

  useEffect(() => {
    console.log(chooseUSData?.data?.items?.map(item => item?.title));
  }, [chooseUSData]);

  return (
    <motion.div
      variants={parentVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="container mt-[100px] mb-[60px]"
    >
      <div
        dangerouslySetInnerHTML={{ __html: chooseUSData?.sectionName }}
      ></div>

      <div className="grid grid-cols-2 mt-20 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
        {chooseUSData?.data?.items?.map((item) => (
          <motion.div key={item?.item_id} variants={childVariant}>
            <Tilt
              className="bg-[#F5F6FA] h-[160px] rounded-md flex flex-col items-center justify-center px-4 py-6 text-center"
              glareEnable={true}
              glareMaxOpacity={0.3}
              glareColor="#ffffff"
              glarePosition="bottom"
              scale={1.05}
            >
              <ErrorImage
               image={item?.item_icon} 
               alt={item?.title}
               FALLBACK_IMG={data[item?.item_id]?.icon}
               className="w-[60px] h-[60px] mb-2"
               width={60}
               height={60}
              />
              <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#264787] font-medium leading-snug">
                {item?.title}
              </p>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* {banner &&  <img
      data-aos="fade-up"
      data-aos-delay={1000}
      src="/images/Image 314.png" className="object-contain lg:object-cover !rounded-lg mt-[54px] h-[198px]"/>} */}
      <div className="w-full">
        <Swiper 
        className="w-full"
        slidesPerView={1} >
          {chooseUSData?.data?.banners?.map((item) => (
            <SwiperSlide key={item?.banner_id}>
              {/* <img
                data-aos="fade-up"
                data-aos-delay={1000}
                src={item?.image_url}
                className="object-contain lg:object-cover !rounded-lg mt-[54px] h-[198px]"
              /> */}

              <ErrorImage 
              data-aos="fade-up"
                data-aos-delay={1000}
                image={item?.image_url}
                FALLBACK_IMG={"/images/Image 314.png"}
                className= "!object-contain lg:!object-cover w-full rounded-lg! mt-[54px] h-[200px]!"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
}
