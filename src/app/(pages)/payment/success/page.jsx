"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Home } from "lucide-react";

const BOOKING_LABELS = {
  offer_register: "Offer Registration",
  tour_book:      "Tour Booking",
  umrah_register: "Umrah Registration",
  car_book:       "Car Reservation",
  ride_book:      "Ride Booking",
  visa_apply:     "Visa Application",
};

export default function PaymentSuccessPage() {
  const params      = useSearchParams();
  const router      = useRouter();
  const bookingType = params.get("booking_type") ?? "";
  const bookingId   = params.get("booking_id")   ?? "";
  const orderCode   = params.get("order_code")   ?? "";

  const [count, setCount] = useState(8);
  useEffect(() => {
    if (count <= 0) { router.push("/"); return; }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  const trackingPath = () => {
    if (!bookingId || !bookingType) return null;
    const map = {
      car_book:       `/our-services/car-reservation/booking/${bookingId}`,
      tour_book:      `/our-services/tours/booking/${bookingId}`,
      umrah_register: `/our-services/umrah-booking/${bookingId}`,
      offer_register: `/our-offers/booking/${bookingId}`,
      ride_book:      `/our-services/ride-booking/${bookingId}`,
      visa_apply:     `/our-services/visa-application/${bookingId}`,
    };
    return map[bookingType] ?? null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-green-100 p-8 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Your{bookingType ? ` ${BOOKING_LABELS[bookingType] ?? bookingType}` : " booking"} has been confirmed and payment received.
        </p>

        {/* Order info */}
        <div className="bg-gray-50 rounded-2xl p-4 text-left mb-6 space-y-2">
          {bookingId && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Booking ID</span>
              <span className="font-bold text-gray-800">#{bookingId}</span>
            </div>
          )}
          {orderCode && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order Code</span>
              <span className="font-mono text-gray-700">{orderCode}</span>
            </div>
          )}
          {bookingType && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service</span>
              <span className="font-semibold text-[#264787]">{BOOKING_LABELS[bookingType] ?? bookingType}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {trackingPath() && (
            <button
              onClick={() => router.push(trackingPath())}
              className="w-full flex items-center justify-center gap-2 bg-[#264787] hover:bg-[#3B85C1] text-white font-bold py-3.5 rounded-xl transition"
            >
              Track Booking <ArrowRight size={16} />
            </button>
          )}
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition text-sm"
          >
            <Home size={14} /> Back to Home
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-5">Redirecting to home in {count}s…</p>
      </div>
    </div>
  );
}
