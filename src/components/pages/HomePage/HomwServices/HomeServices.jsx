"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React, { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import {
  PlaneTakeoff,
  Hotel,
  Plane,
  Car,
  Globe,
  CarTaxiFront,
  AirVent,
  BadgeCheck,
  VenetianMask,
  SmartphoneNfc,
} from "lucide-react";
import AOS from "aos";
import Image from "next/image";

export const services = [
  {
    id: 1,
    name: "Search Flights",
    icon: "/images/services icon  (1).svg",
    vip: false,
  },
  {
    id: 2,
    name: "Hotels Booking",
    icon: "/images/services icon  (2).svg",
    vip: false,
  },
  {
    id: 3,
    name: "Get a Helicopter",
    icon: "/images/services icon  (3).svg",
    vip: true,
  },
  {
    id: 4,
    name: "Rent a Car",
    icon: "/images/services icon  (4).svg",
    vip: false,
  },
  {
    id: 5,
    name: "International Tours",
    icon: "/images/services icon  (5).svg",
    vip: false,
  },
  {
    id: 6,
    name: "Get a Ride",
    icon: "/images/services icon  (6).svg",
    vip: false,
  },
  {
    id: 7,
    name: "Airport Services",
    icon: "/images/services icon  (7).svg",
    vip: false,
  },
  {
    id: 8,
    name: "Visa Services",
    icon: "/images/services icon  (8).svg",
    vip: false,
  },
  {
    id: 9,
    name: "Umrah",
    icon: "/images/services icon  (9).svg",
    vip: false,
  },
  {
    id: 10,
    name: "Online Payment",
    icon: "/images/services icon  (10).svg",
    vip: false,
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

export default function HomeServices() {
  return (
    <motion.div
      variants={parentVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="container mt-[123px]"
    >
      <CustomHeading first_title={"Our"} second_title={"Services"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-3 items-center">
        {services.map((service) => (
          <motion.div key={service.id} variants={childVariant}>
            <div
              className="bg-[#F5F6FA] relative cursor-pointer rounded-xl min-h-[126px]"
            >
              <div className="flex h-[81px] justify-center items-center">
                <Image
                  src={service?.icon}
                  width={40}
                  alt="home service"
                  height={40}
                  objectFit="cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[38px] right-0 flex text-lg 2xl:text-xl font-bold justify-center items-center text-white bg-[#3B85C1] rounded-br-[7px] rounded-bl-[7px]">
                {service.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
