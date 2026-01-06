"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import ErrorImage from "../../../shared/ErrorImage";

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

export default function HomePartners({ data }) {
  return (
    <div className="container mt-[123px]">
      <div className="grid  gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center">
        {data?.data?.map((partner) => (
          <Link
            href={`${partner?.website_url}`}
            data-aos="zoom-in"
            data-aos-delay={partner?.agent_id * 100}
            key={partner?.agent_id}
            className="flex justify-center items-center"
          >
            <ErrorImage
              isImg={true}
              FALLBACK_IMG={partners[partner?.agent_id]?.image}
              image={partner?.logo_image}
              alt={`Partner ${partner?.agent_id}`}
              width={120}
              height={96}
              className="!object-contain sm:w-[100px] w-[120px] h-[96px] sm:h-[60px]  rounded-md"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
