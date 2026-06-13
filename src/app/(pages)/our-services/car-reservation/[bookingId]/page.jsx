"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ReservationForm from "../../../../../components/pages/CarReservation/ReservationForm";

const fallbackCar = {
  id: 2,
  model: "Chevrolet Optra 2021",
  category: "ECONOMY",
  description: "Rent a Chevrolet Optra from Kayan and enjoy a practical and reliable sedan for your next adventure or everyday driving.",
  features: ["Automatic", "AC", "5 Seats", "GPS"],
  price: "1100.0",
  currency: "EGP",
  imgUrl: "/images/2.png",
  rating: 4.8,
};

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const formatDateTime = (d) => (d ? d.format("DD MMM • HH:mm") : "");

export default function BookingDetails({ car }) {
  const selectedCar = car || fallbackCar;
  const [dateRange, setDateRange] = useState([null, null]);

  const totalDays = useMemo(() => {
    if (!dateRange[0] || !dateRange[1]) return 0;
    const diffHours = dateRange[1].diff(dateRange[0], "hour", true);
    return diffHours > 0 ? Math.ceil(diffHours / 24) : 0;
  }, [dateRange]);

  const dailyRate = parseFloat(selectedCar.price);
  const totalPrice = totalDays > 0 && !Number.isNaN(dailyRate) ? totalDays * dailyRate : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          
          {/* Left Column: Car Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-4"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <img
                src={selectedCar.imgUrl}
                alt={selectedCar.model}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <span className="text-[10px] font-black uppercase text-[#3b85c1] bg-blue-50 px-2 py-0.5 rounded">
                  {selectedCar.category}
                </span>
                <h2 className="text-sm! font-black text-gray-900 mt-1">{selectedCar.model}</h2>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{selectedCar.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {selectedCar.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-md">
                      <CheckIcon className="text-[#3b85c1]" />
                      <span className="text-[11px] font-bold text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-[#264787] text-white rounded-2xl p-4 shadow-md">
              <h3 className="text-sm! font-bold opacity-80 uppercase tracking-wider mb-3">Price Summary</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span>Daily rate</span><span className="font-bold">{selectedCar.price} {selectedCar.currency}</span></div>
                <div className="flex justify-between"><span>Days</span><span className="font-bold">{totalDays}</span></div>
                <div className="border-t border-white/20 pt-2 mt-2 flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-lg font-black">{totalPrice.toFixed(0)} {selectedCar.currency}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <ReservationForm 
                selectedCar={selectedCar} 
                totalPrice={totalPrice} 
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}