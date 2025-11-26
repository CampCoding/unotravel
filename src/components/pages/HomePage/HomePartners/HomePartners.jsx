"use client";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const partners = [
  {
    id: 1,
    image: "/images/partner (1).webp",
  },
  {
    id: 2,
    image: "/images/partner (5).webp",
  },
  {
    id: 3,
    image: "/images/partner (4).webp",
  },
  {
    id: 4,
    image: "/images/partner (3).webp",
  },
  {
    id: 5,
    image: "/images/partner (2).webp",
  },
];

export default function HomePartners() {
  return (
    <div className="container mt-[123px]">
      <div className="grid  gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center">
        {partners?.map((partner) => (
          <div
          data-aos="zoom-in"
          data-aos-delay = {partner?.id * 100}
          key={partner.id} className="flex justify-center items-center">
            <Image
              src={partner.image}
              alt={`Partner ${partner.id}`}
              width={120}
              height={96}
              className="object-contain sm:w-[100px] w-[120px] h-[96px] sm:h-[60px]  rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
