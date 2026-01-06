"use client";

import { DatePicker } from "antd";
import { CalendarDays, CircleCheck, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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

export default function HomeBannerCars() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <motion.div
      variants={parentVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className="w-full mt-4"
    >
      {/* Title */}
      <motion.p
        variants={childVariant}
        className="text-sm sm:text-md md:text-lg text-white mb-4"
      >
        SEARCH FOR CAR RENTAL
      </motion.p>

      {/* Main Fields */}
      <motion.div
        variants={childVariant}
        className="flex flex-wrap gap-2 md:gap-4 items-stretch"
      >
        {/* Pickup Location */}
        <div className="bg-white shadow-[0_0_10px_#140B2B0F] flex items-center gap-3 rounded-md p-[10px_16px] h-[57px] w-full md:max-w-[500px]">
          <MapPin color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 sm:text-sm text-[#3B85C1] font-bold uppercase">
              Pickup Location
            </p>
            <input
              className="w-full border-0 outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4]"
              placeholder="e.g. city, region, hotel"
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="bg-white shadow-[0_0_10px_#140B2B0F] flex items-center gap-3 rounded-md p-[10px_16px] h-[57px] w-full sm:max-w-[260px]">
          <CalendarDays color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 sm:text-sm text-[#3B85C1] font-bold uppercase">
              Start Date
            </p>
            <DatePicker suffixIcon={null} className="w-full" />
          </div>
        </div>

        {/* End Date */}
        <div className="bg-white shadow-[0_0_10px_#140B2B0F] flex items-center gap-3 rounded-md p-[10px_16px] h-[57px] w-full sm:max-w-[260px]">
          <CalendarDays color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 sm:text-sm text-[#3B85C1] font-bold uppercase">
              End Date
            </p>
            <DatePicker suffixIcon={null} className="w-full" />
          </div>
        </div>

        {/* Button */}
        <button className="bg-[#3B85C1] text-white font-bold w-full sm:w-[200px] h-[57px] !rounded-md px-6 text-sm sm:text-md">
          Search for cars
        </button>
      </motion.div>

      {/* Return to different location */}
      <motion.div
        className=" mt-3 md:mt-5 flex items-center gap-3 text-white text-xs sm:text-sm"
        variants={childVariant}
      >
        <input
          type="checkbox"
          id="differentLocation"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="accent-[#3B85C1] w-4 h-4"
        />
        <label htmlFor="differentLocation" className="font-bold cursor-pointer">
          RETURN TO A DIFFERENT LOCATION
        </label>
      </motion.div>

      {/* Return Location Field */}
      {isChecked && (
        <motion.div
          variants={childVariant}
          className="mt-4 bg-white shadow-[0_0_10px_#140B2B0F] flex items-center gap-3 rounded-md p-[10px_16px] h-[57px] w-full md:max-w-[500px]"
        >
          <MapPin color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 sm:text-sm text-[#3B85C1] font-bold uppercase">
              Return Location
            </p>
            <input
              className="w-full border-0 outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4]"
              placeholder="e.g. another city or airport"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
