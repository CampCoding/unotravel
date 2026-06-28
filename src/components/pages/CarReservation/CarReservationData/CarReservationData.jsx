"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { carData as staticCarData } from "../../../../utils/data";
import CarReservationCard from "../CarReservationCard/CarReservationCard";
import { _get } from "../../../../lib/shared/api";
import { apiRoutes } from "../../../../lib/shared/routes";

const FILTERS = ["All", "Economy", "Sedan", "Premium", "Popular"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25 },
  },
};


export default function CarFleet({ cars: carsProp }) {
  const [active, setActive] = useState("All");
  const [carData, setCarData] = useState(staticCarData);

  useEffect(() => {
    if (Array.isArray(carsProp) && carsProp.length > 0) {
      setCarData(carsProp);
      return;
    }
    _get(apiRoutes.car_reservation_page)
      .then(res => {
        const cars = res.data?.data?.cars;
        if (Array.isArray(cars) && cars.length > 0) setCarData(cars);
      })
      .catch(() => {});
  }, [carsProp]);

  const filtered = carData.filter((car) => {
    if (active === "All") return true;
    if (active === "Popular") return car.popular;
    return car.category.toLowerCase() === active.toLowerCase();
  });

  return (
    <section id="fleet" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3b85c1] mb-2">
            Our Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Find Your Perfect Ride
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Choose from our well-maintained fleet of vehicles — quality, comfort,
            and reliability guaranteed every time.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                active === f
                  ? "bg-[#264787] text-white shadow-lg shadow-[#264787]/25 scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#264787]/40 hover:text-[#264787]"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Result Count */}
        <p className="text-center text-sm text-gray-400 mb-8">
          Showing{" "}
          <span className="font-black text-[#264787]">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "vehicle" : "vehicles"}
        </p>

        {/* Cars Grid */}
        <motion.div
          key={active}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((car) => (
              <CarReservationCard
                key={car.id}
                car={car}
                itemVariants={itemVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🚗</div>
            <p className="font-semibold text-lg">No vehicles found</p>
            <p className="text-sm mt-1">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
