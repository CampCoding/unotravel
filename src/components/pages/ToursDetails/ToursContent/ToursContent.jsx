"use client";
import { Calendar, CalendarDays, Heart } from "lucide-react";
import React, { useRef, useState } from "react";
import ToursBookingContent from "./ToursBookingContent/ToursBookingContent";
import ToursContentDescription from "./ToursContentDescription/ToursContentDescription";

const list_data = [
  {
    id: 1,
    title: "Shubra Palace",
  },
  {
    id: 2,
    title: "Taif’s Heart Mall",
  },
  {
    id: 3,
    title: "Taif City",
  },
  {
    id: 4,
    title: "Masjid Al Kou",
  },
  {
    id: 5,
    title: "Masjid Abdullah Ibn Abbas",
  },
  {
    id: 6,
    title: "Al Rudaf Park",
  },
];

export default function ToursContent() {
  const inputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("2023-04-16");

  return (
    <div className="container !overflow-hidden mt-[70px]">
      <div data-aos="zoom-in-up" className="flex items-center gap-4">
        <h2 className="text-xl !font-bold !text-(--main-dark-color) 2xl:text-[50px]">
          Day Tour To Bigar Waterfall
        </h2>
        <div className="w-[50px] bg-[#e4e6ec] h-[50px] rounded-full flex justify-center items-center">
          <Heart fill="#FF5B5B" stroke="#FF5B5B" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-[90px]">
        <ToursContentDescription list_data={list_data} />

        <ToursBookingContent />
      </div>
    </div>
  );
}
