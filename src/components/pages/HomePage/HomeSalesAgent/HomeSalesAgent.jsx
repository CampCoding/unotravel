"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import Image from "next/image";
import Link from "next/link";
import ErrorImage from "../../../shared/ErrorImage";

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

export default function HomeSalesAgent({ data }) {
  return (
    <div className="container home_sales_agents mt-[123px]">
         <div
       dangerouslySetInnerHTML={{__html : data?.sectionName}}
      ></div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 items-center mt-[63px]">
        {data?.data?.map((image, idx) => (
          <Link
            variants={childVariant}
            initial="initial"
            whileInView="animate"
            href={`${image?.website_url}`}
            key={image?.agent_id}
          >
            {/* <MotionImage
              variants={childVariant}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              width={80}
              height={80}
              src={image?.logo_image}
              alt="agent-logo"
              className="object-cover mx-auto"
            /> */}

            <ErrorImage 
            variants={childVariant}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              width={80}
              height={80}
              FALLBACK_IMG={images[image?.agent_id]}
              image={image?.logo_image}
              alt="agent-logo"
              className="object-cover mx-auto"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
