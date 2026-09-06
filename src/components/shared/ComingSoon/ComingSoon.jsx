"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";

export default function ComingSoon({
  title = "Coming Soon",
  subtitle = "We're currently working hard to bring this service to you. Stay tuned!",
  icon: Icon = Sparkles,
  badgeText = "Under Development",
}) {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-16 text-center bg-gradient-to-b from-[#f8fafc] to-[#eef2f6]">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl w-full bg-white/90 backdrop-blur-md border border-[#3B85C1]/20 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden"
      >
        {/* Background glow decoration */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#3B85C1]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#264787]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3B85C1]/10 text-[#264787] text-xs sm:text-sm font-semibold mb-6">
          <Clock size={14} className="animate-spin text-[#3B85C1]" style={{ animationDuration: "8s" }} />
          <span>{badgeText}</span>
        </div>

        {/* Icon Circle */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-[#264787] to-[#3B85C1] flex items-center justify-center text-white shadow-lg shadow-[#264787]/25">
          <Icon size={38} strokeWidth={1.75} />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-[filson-bold] text-[#16294F] mb-3">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#264787] hover:bg-[#3B85C1] text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#264787]/30 hover:border-[#264787] text-[#264787] font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white"
          >
            <span>Contact Support</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
