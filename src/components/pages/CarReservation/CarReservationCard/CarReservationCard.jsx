"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CarReservationCard({ car, itemVariants, imageVariants }) {
  const router = useRouter();

  return (
    <motion.div
      key={car.id}
      variants={itemVariants}
      whileHover={{ y: -12, scale: 1.01 }}
      className="
        group relative bg-white rounded-[1.75rem]
        shadow-xl hover:shadow-2xl
        transition-all duration-500 overflow-hidden
        border-2 border-gray-100 hover:border-[#3b85c1]/30
        w-full
      "
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b85c1]/0 via-transparent to-[#264787]/0 group-hover:from-[#3b85c1]/5 group-hover:to-[#264787]/5 transition-all duration-500 pointer-events-none" />

      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div
          className="
            lg:w-2/5
            relative overflow-hidden
            bg-gradient-to-br from-blue-50 via-white to-blue-50/50
          "
        >
          <motion.div
            variants={imageVariants}
            className="
              h-52 xs:h-60 sm:h-72 md:h-80 lg:h-full
              p-2 sm:p-7 lg:p-10
              flex items-center
            "
          >
            <motion.img
              whileHover={{ scale: 1.15, rotate: 3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={car.imgUrl}
              alt={car.model}
              className="
                w-full h-full object-cover
                rounded-[1.5rem]
                drop-shadow-2xl
              "
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x250/e0f2fe/264787?text=${car.model.split(
                  " "
                )[0]}`;
              }}
            />
          </motion.div>

          {/* Decorative circles */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-[#3b85c1]/10 rounded-full blur-3xl" />
          <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-[#264787]/10 rounded-full blur-3xl" />
        </div>

        {/* Content Section */}
        <div
          className="
            lg:w-3/5
            p-6 sm:p-8 lg:p-10
            flex flex-col justify-between
            relative
          "
        >
          <div>
            {/* Category Badge & (space for rating if added later) */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-[#264787]/10 to-[#3b85c1]/10 text-[#264787] text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-full border border-[#3b85c1]/20">
                {car.category}
              </span>
            </div>

            {/* Car Model */}
            <h2
              className="
                text-2xl sm:text-3xl md:text-4xl
                font-black text-gray-900 mb-3 sm:mb-4
                group-hover:text-[#264787]
                transition-colors duration-300
                leading-snug sm:leading-tight
              "
            >
              {car.model}
            </h2>

            {/* Description */}
            <p
              className="
                text-sm sm:text-base md:text-lg
                text-gray-600 leading-relaxed
                mb-6 sm:mb-8
              "
            >
              {car.description}
            </p>
          </div>

          {/* Price and CTA Section */}
          <div
            className="
              flex flex-col sm:flex-row
              items-start sm:items-end
              justify-between gap-5 sm:gap-6
              pt-6 sm:pt-8
              border-t border-gray-100
            "
          >
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-[0.15em] mb-1.5 sm:mb-2">
                Daily Rate
              </p>
              <div className="flex items-baseline flex-wrap gap-1.5 sm:gap-2">
                <span
                  className="
                    text-3xl sm:text-4xl lg:text-5xl
                    font-black
                    bg-gradient-to-r from-[#264787] to-[#3b85c1]
                    bg-clip-text text-transparent
                  "
                >
                  {car?.price}
                </span>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400">
                  {car?.currency}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
                per day
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative w-full sm:w-auto
                group/btn overflow-hidden
                bg-gradient-to-r from-[#264787] to-[#3b85c1]
                text-white font-black
                px-4 sm:px-6 py-2.5 sm:py-3
                !rounded-2xl
                shadow-xl shadow-[#3b85c1]/30
                hover:shadow-2xl hover:shadow-[#3b85c1]/40
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-[#3b85c1]/50
                text-sm sm:text-base
              "
              onClick={() => router.push(`/our-services/car-reservation/${car?.id}`)}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span>Book Now</span>
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                    repeatDelay: 3,
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </span>

              {/* Hover background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b85c1] to-[#264787] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
