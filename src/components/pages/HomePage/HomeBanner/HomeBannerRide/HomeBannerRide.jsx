"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  CalendarDays,
  CircleChevronDown,
  GitCompareArrows,
  Minus,
  MoveRight,
  PlaneLanding,
  PlaneTakeoff,
  Plus,
  User,
} from "lucide-react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

export default function HomeBannerRide({
  setOpenAdultModal,
  openAdultModal,
}) {
  return (
    <div className="flex flex-col">
      {/* Ride Type Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap gap-4 mt-4 items-center"
      >
        {[
          { icon: <MoveRight size={25} color="#B4B4B4" />, label: "one way", active: false },
          { icon: <ArrowRightLeft size={25} color="white" />, label: "Return", active: true },
          { icon: <GitCompareArrows size={25} color="#B4B4B4" />, label: "Round Trip", active: false },
        ].map(({ icon, label, active }, i) => (
          <div key={i} className="flex gap-2 items-center cursor-pointer">
            {icon}
            <span className={`uppercase text-md sm:text-base ${active ? "text-white" : "text-[#B4B4B4]"}`}>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Form Inputs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-wrap gap-2 md:gap-4 mt-4"
      >
        {/* From */}
        <div className="bg-white shadow-md flex items-center gap-3 rounded-md p-4 h-[57px] w-full sm:max-w-[250px]">
          <PlaneTakeoff color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 text-[#3B85C1] font-bold uppercase">From</p>
            <input
              className="w-full border-0 outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4]"
              placeholder="Sydney, Australia"
            />
          </div>
        </div>

        {/* To */}
        <div className="bg-white shadow-md flex items-center gap-3 rounded-md p-4 h-[57px] w-full sm:max-w-[250px]">
          <PlaneLanding color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 text-[#3B85C1] font-bold uppercase">To</p>
            <input
              className="w-full border-0 outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4]"
              placeholder="Cairo, Egypt"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white shadow-md flex items-center gap-3 rounded-md p-4 h-[57px] w-full sm:max-w-[330px]">
          <CalendarDays color="#16294F" size={26} />
          <div className="flex flex-col w-full">
            <p className="text-xs p-0 m-0 text-[#3B85C1] font-bold uppercase">Departing on</p>
            <RangePicker
              separator={<span className="px-2">-</span>}
              suffixIcon={null}
              className="w-full"
              placeholder={["03-06-2025", "10-06-2025"]}
            />
          </div>
        </div>

        {/* Passenger Count */}
        <div className="relative w-full sm:max-w-[200px] h-[57px]">
          <div
            onClick={() => setOpenAdultModal((prev) => !prev)}
            className="bg-white cursor-pointer shadow-md flex items-center gap-3 rounded-md p-4 h-full"
          >
            <User color="#16294F" size={26} />
            <div className="flex flex-col w-full">
              <p className="text-xs p-0 m-0 text-[#3B85C1] font-bold uppercase">Passenger</p>
              <p className="text-sm p-0 m-0 font-medium text-black">2 Adult</p>
            </div>
          </div>

          {openAdultModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute !z-50 bg-white p-3 mt-2 w-[320px] shadow-lg rounded-md"
            >
              {[
                { label: "Adult", count: 1 },
                { label: "Child Year", count: 1 },
                { label: "Infant (0-23 Month)", count: 1 },
              ].map(({ label, count }, i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <p className="font-bold text-sm text-black">{label}</p>
                  <div className="flex items-center gap-2">
                    <Minus size={20} />
                    <span>{count}</span>
                    <Plus size={20} />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Button */}
        <button className="bg-[#3B85C1] text-white font-bold w-full sm:w-[200px] h-[57px] !rounded-md px-6 text-sm sm:text-md">
          Search Rides
        </button>
      </motion.div>

      {/* More Options */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex gap-2 mt-3 md:!mt-6 items-center cursor-pointer text-white text-sm uppercase"
      >
        More options <CircleChevronDown color="white" size={17} />
      </motion.p>
    </div>
  );
}
