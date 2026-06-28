"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle2, MapPin, Calendar, Users, Car } from "lucide-react";
import Link from "next/link";

export default function RideSuccessPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    try { const r = localStorage.getItem("ride_confirm"); if (r) setData(JSON.parse(r)); } catch {}
  }, []);

  const formatDate = iso => { try { return new Date(iso).toLocaleDateString("en-GB", { day:"numeric",month:"long",year:"numeric" }); } catch { return "—"; } };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#264787] to-[#3b85c1] px-8 py-10 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Booking Confirmed!</h1>
          <p className="text-white/70 text-sm mt-2">Your ride has been booked successfully.</p>
          {data?.bookingId && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full">
              <span className="text-white/60 text-xs">Booking ID</span>
              <span className="text-white font-black text-sm">#{data.bookingId}</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          {data?.from_location && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0"><MapPin size={14} className="text-emerald-600" /></div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">From</p>
                <p className="text-sm text-gray-700 font-semibold">{data.from_location}</p>
              </div>
            </div>
          )}
          {data?.to_location && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0"><MapPin size={14} className="text-red-500" /></div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">To</p>
                <p className="text-sm text-gray-700 font-semibold">{data.to_location}</p>
              </div>
            </div>
          )}
          {data?.ride_date && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0"><Calendar size={14} className="text-blue-500" /></div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">Date</p>
                <p className="text-sm text-gray-700 font-semibold">{formatDate(data.ride_date)}</p>
              </div>
            </div>
          )}
          {data?.car_model && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0"><Car size={14} className="text-purple-500" /></div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">Car</p>
                <p className="text-sm text-gray-700 font-semibold">{data.car_model} <span className="text-gray-400 font-normal">({data.car_category})</span></p>
              </div>
            </div>
          )}
          {(data?.passengers > 0 || data?.bags > 0) && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0"><Users size={14} className="text-amber-500" /></div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">Passengers & Bags</p>
                <p className="text-sm text-gray-700 font-semibold">
                  {data.passengers} adult{data.passengers !== 1 ? "s" : ""}
                  {data.children > 0 ? `, ${data.children} child${data.children !== 1 ? "ren" : ""}` : ""}
                  {data.bags > 0 ? ` · ${data.bags} bag${data.bags !== 1 ? "s" : ""}` : ""}
                </p>
              </div>
            </div>
          )}

          {data?.total_price > 0 && (
            <div className="bg-[#264787]/5 border border-[#264787]/10 rounded-2xl p-4 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">Total Paid</span>
              <span className="text-xl font-black text-[#264787]">{parseFloat(data.total_price).toFixed(2)} {data.currency || "USD"}</span>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center pt-2">
            Our team will contact you shortly to confirm your ride details.
          </p>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-3">
          <Link href="/"
            className="w-full flex items-center justify-center py-3.5 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white text-sm font-black rounded-xl shadow-lg shadow-[#264787]/20 hover:brightness-110 transition">
            Back to Home
          </Link>
          <Link href="/our-services/get-ride"
            className="w-full flex items-center justify-center py-3.5 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:border-gray-300 transition">
            Book Another Ride
          </Link>
        </div>
      </div>
    </div>
  );
}
