"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MainBanner({ title, subtitle }) {
  return (
    <section
      className="relative w-full h-72 flex flex-col justify-center items-center text-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #264787 0%, #3b85c1 100%)",
      }}
    >
      {/* subtle wave overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('/images/wave-pattern.svg')] bg-cover bg-center"></div>

      {/* Animated text */}
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-[filson-bold] text-white drop-shadow-md tracking-wide z-10"
      >
        {title}
      </motion.h1>

      {/* underline wave */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 10"
        className="w-28 h-6 text-[#EB1C24] z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <path
          d="M0,5 Q50,-4 100,5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* subtitle text */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/90 text-sm md:text-base mt-2 max-w-lg px-4 z-10"
        >
          {subtitle}
        </motion.p>
      )}
    </section>
  );
}
