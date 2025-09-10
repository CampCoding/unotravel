"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import Image from "next/image";

const MotionImage = motion(Image);

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

const images = [
  "/images/Authorized Sales Agent logos (2).webp",
  "/images/Authorized Sales Agent logos (4).webp",
  "/images/Authorized Sales Agent logos (6).webp",
  "/images/Authorized Sales Agent logos (1).webp",
  "/images/Authorized Sales Agent logos (7).webp",
  "/images/Authorized Sales Agent logos (3).webp",
  "/images/Authorized Sales Agent logos (5).webp",
];

export default function HomeSalesAgent() {
  return (
    <div className="container home_sales_agents mt-[123px]">
      <CustomHeading first_title={"Authorized"} second_title={"Sales Agent"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 items-center mt-[63px]">
        {images.map((image, idx) => (
          <MotionImage
            key={idx}
            variants={childVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            width={80}
            height={80}
            src={image}
            alt="agent-logo"
            className="object-cover mx-auto"
          />
        ))}
      </div>
    </div>
  );
}
