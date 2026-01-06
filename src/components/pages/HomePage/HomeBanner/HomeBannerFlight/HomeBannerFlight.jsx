"use client";
import React, { useRef, useState, useLayoutEffect } from "react";
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

export default function HomeBannerFlight({ setOpenAdultModal, openAdultModal }) {
  const triggerRef = useRef(null);
  const [anchorRect, setAnchorRect] = useState(null);

  const openModal = () => {
    if (triggerRef.current) {
      setAnchorRect(triggerRef.current.getBoundingClientRect());
      setOpenAdultModal(true);
    }
  };

  // Keep the panel positioned on resize/scroll
  useLayoutEffect(() => {
    const sync = () => {
      if (openAdultModal && triggerRef.current) {
        setAnchorRect(triggerRef.current.getBoundingClientRect());
      }
    };
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, true);
    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync, true);
    };
  }, [openAdultModal]);

  return (
    <div className="flex flex-col">
      {/* Flight Type Switch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap mt-4 gap-4 md:gap-[30px] items-center"
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

      {/* Inputs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-wrap mt-4 gap-2 md:gap-4"
      >
        {/* From */}
        <div className="bg-white shadow-[0px_0px_10px_#140B2B0F] flex flex-1 min-w-[250px] items-center gap-3 rounded-md p-[10px_16px] h-[57px]">
          <PlaneTakeoff color="#16294F" size={30} />
          <div className="flex flex-col w-full">
            <p className="text-sm text-[#3B85C1] p-0 m-0 font-bold uppercase">From</p>
            <input className="w-full border-0 outline-none p-0 m-0 text-sm font-medium text-black placeholder:text-[#B4B4B4]" placeholder="Sydney, Australia" />
          </div>
        </div>

        {/* To */}
        <div className="bg-white shadow-[0px_0px_10px_#140B2B0F] flex flex-1 min-w-[250px] items-center gap-3 rounded-md p-[10px_16px] h-[57px]">
          <PlaneLanding color="#16294F" size={30} />
          <div className="flex flex-col w-full">
            <p className="text-sm text-[#3B85C1] p-0 m-0 font-bold uppercase">To</p>
            <input className="w-full border-0 outline-none p-0 m-0 text-sm font-medium text-black placeholder:text-[#B4B4B4]" placeholder="Cairo, Egypt" />
          </div>
        </div>

        {/* Date Picker */}
        <div className="bg-white shadow-[0px_0px_10px_#140B2B0F] flex flex-1 min-w-[250px] items-center gap-3 rounded-md p-[10px_16px] h-[57px]">
          <CalendarDays color="#16294F" size={30} />
          <div className="flex flex-col w-full">
            <p className="text-sm text-[#3B85C1] p-0 m-0 font-bold uppercase">Departing on</p>
            <RangePicker
              separator={<span className="px-2">-</span>}
              suffixIcon={null}
              className="w-full p-0 m-0"
              placeholder={["03-06-2025", "10-06-2025"]}
            />
          </div>
        </div>

        {/* Passenger (trigger) */}
        <div className="relative flex-1 min-w-[250px] h-[57px]">
          <div
            ref={triggerRef}
            onClick={openModal}
            className="bg-white cursor-pointer flex items-center gap-3 rounded-md p-[10px_16px] h-full shadow-[0px_0px_10px_#140B2B0F]"
          >
            <User color="#16294F" size={30} />
            <div className="flex flex-col w-full">
              <p className="text-sm text-[#3B85C1] p-0 m-0 font-bold uppercase">Passenger</p>
              <p className="text-sm font-medium p-0 m-0 text-black">2 Adult</p>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button className="bg-[#3B85C1] font-bold h-[57px] text-white px-6 py-2 !rounded-md w-full sm:w-auto">
          Search Flights
        </button>
      </motion.div>

      {/* More Options */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex gap-2 mt-2 md:!mt-6 items-center cursor-pointer text-white text-sm uppercase"
      >
        More options <CircleChevronDown color="white" size={17} />
      </motion.p>

      {/* ==== FIXED OVERLAY (no portal, JSX only) ==== */}
      {openAdultModal && anchorRect && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setOpenAdultModal(false)}
            aria-hidden
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="fixed z-[9999] w-[320px] rounded-md bg-white shadow-xl"
            style={{
              top: Math.min(anchorRect.bottom + 8, window.innerHeight - 200),
              left: Math.min(anchorRect.left, window.innerWidth - 320 - 16),
            }}
          >
            {[
              { label: "Adult", count: 1 },
              { label: "Child Year", count: 1 },
              { label: "Infant (0-23 Month)", count: 1 },
            ].map(({ label, count }, i) => (
              <div key={i} className="flex justify-between items-center p-3">
                <p className="font-bold text-black text-sm">{label}</p>
                <div className="flex gap-2 items-center font-bold text-black">
                  <Minus size={20} />
                  <span>{count}</span>
                  <Plus size={20} />
                </div>
              </div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
