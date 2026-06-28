"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Zap, Wind, Users, ChevronLeft } from "lucide-react";
import Link from "next/link";
import ReservationForm from "../../../../../components/pages/CarReservation/ReservationForm";

const fallbackCar = {
  id: 2,
  model: "Chevrolet Optra 2021",
  category: "ECONOMY",
  description:
    "Rent a Chevrolet Optra from Kayan and enjoy a practical and reliable sedan for your next adventure or everyday driving.",
  features: ["Automatic", "AC", "5 Seats", "GPS"],
  price: "22.0",
  currency: "USD",
  imgUrl: "/images/2.png",
  rating: 4.8,
};

const CATEGORY_COLORS = {
  ECONOMY: "bg-emerald-100 text-emerald-700",
  SEDAN:   "bg-blue-100 text-blue-700",
  PREMIUM: "bg-amber-100 text-amber-700",
};

const featureIcons = {
  Automatic: <Zap size={12} />,
  AC:        <Wind size={12} />,
};

export default function BookingDetails({ car }) {
  const selectedCar = car || fallbackCar;
  const [sidebarDays, setSidebarDays]       = useState(0);
  const [sidebarTotal, setSidebarTotal]     = useState(0);
  const [sidebarPickupFee, setSidebarPickup] = useState(0);

  const totalDays  = sidebarDays;
  const totalPrice = sidebarTotal;
  const pickupFee  = sidebarPickupFee;

  const catColor =
    CATEGORY_COLORS[selectedCar.category] ?? "bg-gray-100 text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link
            href="/our-services/car-reservation"
            className="flex items-center gap-1 hover:text-[#264787] transition-colors font-medium"
          >
            <ChevronLeft size={14} />
            Back to Fleet
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{selectedCar.model}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-6 items-start">

          {/* ── Left: Car Summary ── */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-4"
          >
            {/* Car Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {/* Image */}
              <div className="relative h-52 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
                <img
                  src={selectedCar.imgUrl}
                  alt={selectedCar.model}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x300/dbeafe/264787?text=${encodeURIComponent(selectedCar.model)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${catColor}`}>
                  {selectedCar.category}
                </span>
                {selectedCar.rating && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 text-amber-500 text-[11px] font-black px-2 py-0.5 rounded-full">
                    <Star size={11} fill="currentColor" />
                    {selectedCar.rating}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h2 className="text-lg font-black text-gray-900 mb-1">{selectedCar.model}</h2>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{selectedCar.description}</p>

                {/* Features */}
                {selectedCar.features?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCar.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-semibold rounded-lg"
                      >
                        {featureIcons[f] ?? <Users size={12} />}
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price Summary Card */}
            <div className="bg-gradient-to-br from-[#1a3260] to-[#3b85c1] rounded-2xl p-5 text-white shadow-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                Price Summary
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Daily rate</span>
                  <span className="font-bold">
                    {parseFloat(selectedCar.price).toLocaleString()} {selectedCar.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Days</span>
                  <span className="font-bold">{totalDays || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Rental subtotal</span>
                  <span className="font-bold">
                    {totalPrice > 0 ? `${totalPrice.toLocaleString()} ${selectedCar.currency}` : "—"}
                  </span>
                </div>
                {pickupFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Pickup fee</span>
                    <span className="font-bold">{pickupFee.toLocaleString()} {selectedCar.currency}</span>
                  </div>
                )}
                <div className="h-px bg-white/20 my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">Estimated Total</span>
                  <span className="text-2xl font-black">
                    {totalPrice > 0
                      ? `${(totalPrice + pickupFee).toLocaleString()} ${selectedCar.currency}`
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Included perks */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                What's Included
              </p>
              {[
                "Comprehensive insurance",
                "Free cancellation (24h)",
                "24/7 roadside support",
                "Unlimited mileage",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.aside>

          {/* ── Right: Booking Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <ReservationForm
              selectedCar={selectedCar}
              onPriceChange={(days, price, fee) => {
                setSidebarDays(days);
                setSidebarTotal(price);
                setSidebarPickup(fee ?? 0);
              }}
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
