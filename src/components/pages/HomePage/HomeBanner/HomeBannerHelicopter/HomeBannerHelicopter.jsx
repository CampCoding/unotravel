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

export default function HomeBannerHelicopter({ setOpenAdultModal, openAdultModal }) {
  return (
    <div className="flex flex-col mt-4 w-full">
      {/* Trip Type Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap gap-4 items-center"
      >
        {[
          { icon: <MoveRight size={25} color="#B4B4B4" />, text: "one way", active: false },
          { icon: <ArrowRightLeft size={25} color="white" />, text: "Return", active: true },
          { icon: <GitCompareArrows size={25} color="#B4B4B4" />, text: "Round Trip", active: false },
        ].map(({ icon, text, active }, i) => (
          <div key={i} className="flex cursor-pointer gap-2 items-center">
            {icon}
            <span
              className={`uppercase text-md 2xl:text-base ${
                active ? "text-white" : "text-[#B4B4B4]"
              }`}
            >
              {text}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-wrap gap-2 md:gap-4 mt-4"
      >
        {/* From Input */}
        <div className="flex items-center bg-white shadow-md h-[57px] rounded-md px-4 w-full sm:max-w-[250px]">
          <PlaneTakeoff color="#16294F" size={30} />
          <div className="flex flex-col ml-3 w-full">
            <p className="text-sm p-0 m-0 text-[#3B85C1] font-bold uppercase">From</p>
            <input
              className="w-full border-0 outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4]"
              placeholder="Sydney, Australia"
            />
          </div>
        </div>

        {/* To Input */}
        <div className="flex items-center bg-white shadow-md h-[57px] rounded-md px-4 w-full sm:max-w-[250px]">
          <PlaneLanding color="#16294F" size={30} />
          <div className="flex flex-col ml-3 w-full">
            <p className="text-sm p-0 m-0 text-[#3B85C1] font-bold uppercase">To</p>
            <input
              className="w-full border-0 outline-none text-sm font-medium text-black placeholder:text-[#B4B4B4]"
              placeholder="Sydney, Australia"
            />
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="flex items-center bg-white shadow-md h-[57px] rounded-md px-4 w-full sm:max-w-[330px]">
          <CalendarDays color="#16294F" size={30} />
          <div className="flex flex-col ml-3 w-full">
            <p className="text-sm p-0 m-0 text-[#3B85C1] font-bold uppercase">Departing on</p>
            <RangePicker
              separator={<span className="custom-separator px-2">-</span>}
              suffixIcon={null}
              className="w-full"
              placeholder={["03-06-2025", "10-06-2025"]}
            />
          </div>
        </div>

        {/* Passenger Selector */}
        <div className="relative h-[57px] w-full sm:max-w-[200px]">
          <div
            onClick={() => setOpenAdultModal((prev) => !prev)}
            className="bg-white shadow-md cursor-pointer flex items-center h-full gap-3 rounded-md px-4 w-full"
          >
            <User color="#16294F" size={30} />
            <div className="flex flex-col w-full">
              <p className="text-sm p-0 m-0 text-[#3B85C1] font-bold uppercase">Passenger</p>
              <p className="text-sm p-0 m-0 font-medium text-black">2 Adult</p>
            </div>
          </div>

          {openAdultModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute z-10 bg-white top-[60px] w-[300px] sm:w-[350px] p-4 rounded-md shadow-md"
            >
              {["Adult", "Child Year", "Infant (0-23 Month)"].map((label, i) => (
                <div key={i} className="flex justify-between items-center mb-3">
                  <p className="font-bold text-black text-sm">{label}</p>
                  <div className="flex items-center gap-2 font-bold text-black text-sm">
                    <Minus size={20} />
                    <p>1</p>
                    <Plus size={20} />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Search Button */}
        <button className="bg-[#3B85C1] text-white font-bold px-6 !rounded-md h-[57px] w-full sm:w-[200px]">
          Search Flights
        </button>
      </motion.div>

      {/* More Options */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex gap-2 mt-3 md:!mt-6 items-center text-white cursor-pointer text-sm"
      >
        <span className="uppercase">More options</span>
        <CircleChevronDown size={17} />
      </motion.p>
    </div>
  );
}
