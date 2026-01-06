"use client";

import { DatePicker } from "antd";
import { CalendarDays, CircleCheck, Search } from "lucide-react";
import { motion } from "framer-motion";

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

export default function HomeBannerHotels() {
  return (
    <motion.div
      variants={parentVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className="w-full mt-4"
    >
      <motion.p
        variants={childVariant}
        className="text-sm sm:text-md md:text-lg text-white mb-2"
      >
        2,563,000+ HOTELS, HOMES, APARTMENTS AND OTHER UNIQUE PLACES TO STAY...
      </motion.p>

      <motion.div
        variants={childVariant}
        className="flex flex-wrap gap-2 md:gap-4 items-stretch"
      >
        {/* Destination Input */}
        <div className="bg-white shadow-[0px_0px_10px_#140B2B0F] flex items-center gap-3 rounded-md p-[10px_16px] h-[57px] w-full md:max-w-[500px]">
          <Search color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs sm:text-sm p-0 m-0 text-[#3B85C1] font-bold uppercase">
              DESTINATION / PROPERTY NAME
            </p>
            <input
              className="w-full border-0  outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4]"
              placeholder="e.g. city, region, district or specific hotel"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="bg-white shadow-[0px_0px_10px_#140B2B0F] flex items-center gap-3 rounded-md p-[10px_16px] h-[57px] w-full sm:max-w-[280px]">
          <CalendarDays color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 sm:text-sm text-[#3B85C1] font-bold uppercase">
              CHECK-IN DATE
            </p>
            <DatePicker suffixIcon={null} className="w-full p-0 m-0" />
          </div>
        </div>

        {/* Check-out */}
        <div className="bg-white shadow-[0px_0px_10px_#140B2B0F] flex items-center gap-3 rounded-md p-[10px_16px] h-[57px] w-full sm:max-w-[280px]">
          <CalendarDays color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 sm:text-sm text-[#3B85C1] font-bold uppercase">
              CHECK-OUT DATE
            </p>
            <DatePicker suffixIcon={null} className="w-full p-0 m-0" />
          </div>
        </div>

        {/* Search Button */}
        <button className="bg-[#3B85C1] text-white font-bold w-full sm:w-[200px] h-[57px] !rounded-md px-6 text-sm sm:text-md">
          Search Hotels
        </button>
      </motion.div>

      {/* Optional Checkbox-like text */}
      <motion.div
        className="mt-3 md:mt-5 flex items-center gap-2 text-white text-xs sm:text-sm"
        variants={childVariant}
      >
        <CircleCheck size={17} />
        <p className="font-bold">I DON'T HAVE SPECIFIC DATES YET</p>
      </motion.div>
    </motion.div>
  );
}
