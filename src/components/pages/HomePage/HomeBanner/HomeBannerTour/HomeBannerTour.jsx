"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, CalendarDays, Minus, Plus } from "lucide-react";
import { DatePicker } from "antd";

export default function HomeBannerTour() {
  const [travelerCount, setTravelerCount] = useState(1);

  const childVariant = {
    initial: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2 },
    },
    exit: { opacity: 0, y: 20 },
  };

  const parentVariant = {
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <motion.div
      variants={parentVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <motion.p
        variants={childVariant}
        className="text-sm sm:text-md md:text-lg text-white mb-4"
      >
        SELECT TRAVELERS:
      </motion.p>

      {/* Inputs */}
      <motion.div
        variants={childVariant}
        className="flex flex-wrap gap-2 md:gap-4 items-stretch"
      >
        {/* Traveler Count */}
        <div className="bg-white flex px-3 gap-3 items-center rounded-md shadow-md h-[57px] w-full sm:max-w-[150px]">
          <button
            onClick={() =>
              setTravelerCount((prev) => (prev < 15 ? prev + 1 : prev))
            }
            className="w-[25px] h-[25px] bg-[#3B85C1] text-white !rounded-full flex justify-center items-center"
          >
            <Plus size={17} />
          </button>
          <p className="font-bold text-sm my-auto  sm:text-base text-black">
            {travelerCount}
          </p>
          <button
            onClick={() =>
              setTravelerCount((prev) => (prev > 1 ? prev - 1 : prev))
            }
            className="w-[25px] h-[25px] bg-[#848383c7] text-white !rounded-full flex justify-center items-center"
          >
            <Minus size={17} />
          </button>
        </div>

        {/* City Input */}
        <div className="bg-white flex items-center gap-3 rounded-md shadow-md h-[57px] w-full sm:max-w-[250px] px-4">
          <MapPin color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 text-[#3B85C1] font-bold uppercase">City</p>
            <input
              className="w-full border-0 outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4]"
              placeholder="City Name"
            />
          </div>
        </div>

        {/* Tour Location */}
        <div className="bg-white flex items-center gap-3 rounded-md shadow-md h-[57px] w-full sm:max-w-[350px] px-4">
          <MapPin color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 text-[#3B85C1] font-bold uppercase">Tour Location</p>
            <input
              className="w-full border-0 outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4]"
              placeholder="Select Pickup Point"
            />
          </div>
        </div>

        {/* Tour Date */}
        <div className="bg-white flex items-center gap-3 rounded-md shadow-md h-[57px] w-full sm:max-w-[260px] px-4">
          <CalendarDays color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 text-[#3B85C1] font-bold uppercase">Tour Date</p>
            <DatePicker suffixIcon={null} className="w-full" />
          </div>
        </div>

        {/* Tour Time */}
        <div className="bg-white flex items-center gap-3 rounded-md shadow-md h-[57px] w-full sm:max-w-[260px] px-4">
          <Clock color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 text-[#3B85C1] font-bold uppercase">Tour Time</p>
            <input
              type="time"
              className="w-full border-0 outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4] hide-clock"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="bg-[#3B85C1] text-white font-bold h-[57px] px-6 !rounded-md w-full sm:w-[200px] text-sm sm:text-md">
          Submit Tour
        </button>
      </motion.div>

      {/* Note */}
      <motion.p
        variants={childVariant}
        className="text-[#E44C4A] mt-3 text-sm italic"
      >
        You can select up to 15 travelers in total.
      </motion.p>

      {/* Hide default clock icon */}
      <style jsx>{`
        .hide-clock::-webkit-calendar-picker-indicator {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}
