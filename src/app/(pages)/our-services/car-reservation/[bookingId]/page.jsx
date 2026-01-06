"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ReservationForm from "../../../../../components/pages/CarReservation/ReservationForm";

const fallbackCar = {
  id: 2,
  model: "Chevrolet Optra 2021",
  category: "ECONOMY",
  description:
    "Rent a Chevrolet Optra from Kayan and enjoy a practical and reliable sedan for your next adventure or everyday driving.",
  features: ["Automatic", "AC", "5 Seats", "GPS"],
  price: "1100.0",
  currency: "EGP",
  imgUrl: "/images/2.png",
  rating: 4.8,
  specs: {
    fuel: "Petrol",
    transmission: "Automatic",
    year: "2021",
    color: "Silver",
  },
};

const CheckIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const formatDateTime = (d) => (d ? d.format("DD MMM YYYY • HH:mm") : "");

export default function BookingDetails({ car }) {
  const selectedCar = car || fallbackCar;

  const [dateRange, setDateRange] = useState([null, null]); // [dayjs|null, dayjs|null]

  const totalDays = useMemo(() => {
    if (!dateRange[0] || !dateRange[1]) return 0;
    const diffHours = dateRange[1].diff(dateRange[0], "hour", true);
    return diffHours > 0 ? Math.ceil(diffHours / 24) : 0;
  }, [dateRange]);

  const dailyRate = parseFloat(selectedCar.price);
  const totalPrice =
    totalDays > 0 && !Number.isNaN(dailyRate)
      ? totalDays * dailyRate
      : 0;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
      <div className="relative z-10 w-full lg:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid gap-8 xl:gap-10 lg:grid-cols-5 lg:items-start">
          {/* Left Column: Car details + price */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Car card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100">
              <div className="relative">
                <img
                  src={selectedCar.imgUrl}
                  alt={selectedCar.model}
                  className="w-full h-52 sm:h-64 md:h-72 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/e0f2fe/3b85c1?text=KAYAN+CAR";
                  }}
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm shadow-lg flex items-center gap-1.5 sm:gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400 text-[10px] sm:text-xs font-black">
                    {selectedCar.rating.toFixed(1)}
                  </span>
                  <span>Customer rating</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                <span className="inline-block px-3 sm:px-4 py-1.5 bg-gradient-to-r from-[#264787]/10 to-[#3b85c1]/10 text-[#264787] text-[10px] sm:text-xs font-bold uppercase rounded-full mb-3">
                  {selectedCar.category}
                </span>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2">
                  {selectedCar.model}
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6">
                  {selectedCar.description}
                </p>

                {selectedCar.features && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-1">
                    {selectedCar.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg"
                      >
                        <span className="text-[#3b85c1]">
                          <CheckIcon />
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price summary */}
            <div className="bg-gradient-to-br from-[#264787] to-[#3b85c1] text-white rounded-3xl shadow-xl p-5 sm:p-6 space-y-4">
              <h3 className="text-sm sm:text-base md:text-lg font-bold">
                Price summary
              </h3>
              <div className="space-y-3 text-xs sm:text-sm md:text-base">
                <div className="flex justify-between">
                  <span>Daily rate</span>
                  <span className="font-bold">
                    {selectedCar.currency} {selectedCar.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Number of days</span>
                  <span className="font-bold">{totalDays || 0}</span>
                </div>
                {dateRange[1] && (
                  <div className="flex justify-between gap-4">
                    <span>Return date &amp; time</span>
                    <span className="font-semibold text-right">
                      {formatDateTime(dateRange[1])}
                    </span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-3 mt-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-black text-sm sm:text-base">
                      Total
                    </span>
                    <span className="font-black text-lg sm:text-xl md:text-2xl">
                      {selectedCar?.currency} {totalPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column: Reservation form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 lg:mt-0 mt-2"
          >
            <ReservationForm
              selectedCar={selectedCar}
              totalPrice={totalPrice}
              // if you want the form to control dateRange, pass these:
              // dateRange={dateRange}
              // setDateRange={setDateRange}
            />
          </motion.div>
        </div>
      </div>

      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-56 sm:w-72 h-56 sm:h-72 bg-[#3b85c1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-0 w-56 sm:w-72 h-56 sm:h-72 bg-[#264787]/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
