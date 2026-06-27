"use client";
import Image from "next/image";
import React from "react";

const DEFAULT_ITEMS = [
  { title: "Easy & Fast Booking",          icon: "/images/Group 55212.svg", description: "Search, compare and book your tickets at the lowest fares." },
  { title: "Trustly online bank payments", icon: "/images/Group 55216.svg", description: "With Trustly's direct bank payment online, payments go directly from account to account - without a card, app download or registration requirement." },
  { title: "Multi Payment Option",         icon: "/images/Group 55214.svg", description: "Choose how you want to pay for your bookings." },
];

export default function VisaWhyChooseUs({ items = [] }) {
  const list = items.length > 0 ? items : DEFAULT_ITEMS;

  return (
    <div className="container mt-[100px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[100px]">
        {list.map((item, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={(i + 1) * 100}
            className="flex flex-col gap-[25px]"
          >
            <Image
              className="mx-auto"
              src={item.icon || "/images/Group 55212.svg"}
              width={101}
              height={101}
              alt={item.title}
            />
            <div className="flex flex-col">
              <p className="text-lg text-center 2xl:text-[24px] !font-bold text-[#16294F]">{item.title}</p>
              <p className="!text-base text-center 2xl:text-[20px] !font-normal text-[#16294F]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
