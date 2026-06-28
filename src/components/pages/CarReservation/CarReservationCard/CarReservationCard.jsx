"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Star, Zap, Wind, Users } from "lucide-react";

const CATEGORY_COLORS = {
  ECONOMY:  { bg: "bg-emerald-500", text: "text-white" },
  SEDAN:    { bg: "bg-blue-500",    text: "text-white" },
  PREMIUM:  { bg: "bg-amber-500",   text: "text-white" },
  POPULAR:  { bg: "bg-rose-500",    text: "text-white" },
};

const featureIcons = {
  Automatic: <Zap size={11} />,
  AC:        <Wind size={11} />,
};

export default function CarReservationCard({ car, itemVariants }) {
  const router = useRouter();
  const catColor = CATEGORY_COLORS[car.category] ?? { bg: "bg-gray-500", text: "text-white" };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-shadow duration-300 flex flex-col"
    >
      {/* ── Image Block ── */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50">
        <motion.img
          src={car.imgUrl}
          alt={car.model}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x300/dbeafe/264787?text=${encodeURIComponent(car.model)}`;
          }}
        />

        {/* Bottom gradient so content doesn't clash */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Category badge */}
        <span className={`absolute top-3 left-3 ${catColor.bg} ${catColor.text} text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg`}>
          {car.category}
        </span>

        {/* Rating badge */}
        {car.rating && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-amber-500 text-[11px] font-black px-2.5 py-1 rounded-full shadow">
            <Star size={11} fill="currentColor" />
            {car.rating}
          </span>
        )}

        {/* Model name overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-black text-lg leading-tight drop-shadow-md">
            {car.model}
          </h3>
        </div>
      </div>

      {/* ── Content Block ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
          {car.description}
        </p>

        {/* Feature tags */}
        {car.features?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {car.features.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-lg"
              >
                {featureIcons[feat] ?? <Users size={11} />}
                {feat}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Price + CTA */}
        <div className="flex items-end justify-between gap-3 mt-auto">
          <div>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
              Daily Rate
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#264787] leading-none">
                {parseFloat(car.price).toLocaleString()}
              </span>
              <span className="text-xs font-bold text-gray-400">{car.currency}</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">per day</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push(`/our-services/car-reservation/${car.id}`)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white text-xs font-black rounded-xl shadow-lg shadow-[#264787]/30 hover:shadow-[#3b85c1]/40 transition-shadow duration-300 shrink-0"
          >
            Book Now
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
