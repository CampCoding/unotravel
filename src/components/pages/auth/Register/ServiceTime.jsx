
"use client";
import React, { useState } from "react";
import { ChevronDown ,ChevronUp  } from "lucide-react";
import { motion } from "framer-motion";


// ! This component was created with LOVE by M_Sayed 💖

const ServiceTime = () => {
  const [hour, setHour] = useState(11);
  const [minute, setMinute] = useState(10);
  const [period, setPeriod] = useState("AM");

  const increment = (type) => {
    if (type === "hour") {
      setHour((prev) => (prev % 12) + 1);
    } else if (type === "minute") {
      setMinute((prev) => (prev + 1) % 60);
    }
  };

  const decrement = (type) => {
    if (type === "hour") {
      setHour((prev) => (prev - 1 === 0 ? 12 : prev - 1));
    } else if (type === "minute") {
      setMinute((prev) => (prev - 1 < 0 ? 59 : prev - 1));
    }
  };

  const togglePeriod = () => {
    setPeriod((prev) => (prev === "AM" ? "PM" : "AM"));
  };

  return (
 <div className="select-none w-full rounded-3xl p-3">
  <div className="flex items-center justify-start ml-3 gap-7 w-full">
    {/* HOURS */}
    <div className="flex flex-col bg-gray-100 w-18 lg:w-24 whitespace-nowrap px-4 py-1 rounded-3xl gap-[14.5px] items-center">
      <button
        onClick={() => increment("hour")}
        className="text-[var(--main-dark-color)] hover:scale-125 transition-transform cursor-default md:cursor-pointer"
      >
        <ChevronUp />
      </button>
      <motion.div
        key={hour}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="lg:text-3xl text-lg font-[filson-medium]"
      >
        {hour.toString().padStart(2, "0")} h
      </motion.div>
      <button
        onClick={() => decrement("hour")}
        className="text-[var(--main-dark-color)] hover:scale-125 transition-transform cursor-default md:cursor-pointer"
      >
        <ChevronDown />
      </button>
    </div>

    <div className="lg:text-[42px] text-[30px] font-[filson-regular] text-darkgreen">:</div>

    {/* MINUTES */}
    <div className="flex flex-col bg-gray-100 whitespace-nowrap w-18 lg:w-24 px-4 py-1 rounded-3xl justify-center items-center gap-[14.5px]">
      <button
        onClick={() => increment("minute")}
        className="text-[var(--main-dark-color)] w-10 hover:scale-125 transition-transform cursor-default md:cursor-pointer"
      >
        <ChevronUp />
      </button>
      <motion.div
        key={minute}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="lg:text-3xl text-lg font-[filson-medium]"
      >
        {minute.toString().padStart(2, "0")} m
      </motion.div>
      <button
        onClick={() => decrement("minute")}
        className="text-[var(--main-dark-color)] hover:scale-125 transition-transform cursor-default md:cursor-pointer"
      >
        <ChevronDown />
      </button>
    </div>

    {/* AM / PM */}
    <div className="flex flex-col bg-gray-100 px-4 py-[10px] rounded-3xl justify-between items-center">
      <button
        onClick={togglePeriod}
        className={`lg:text-lg text-sm font-[filson-medium] transition-all ${
          period === "AM"
            ? "text-[var(--main-dark-color)] scale-110"
            : "text-gray-400"
        }`}
      >
        AM
      </button>
      <button
        onClick={togglePeriod}
        className={`lg:text-lg text-sm font-[filson-medium] transition-all ${
          period === "PM"
            ? "text-[var(--main-dark-color)] scale-110"
            : "text-gray-400"
        }`}
      >
        PM
      </button>
    </div>
  </div>
</div>


  );
};

export default ServiceTime;

