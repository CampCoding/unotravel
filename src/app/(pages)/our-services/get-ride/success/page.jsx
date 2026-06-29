"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const TripMap = dynamic(() => import("./_TripMap"), { ssr: false });

export default function RideSuccessPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    try { const r = localStorage.getItem("ride_confirm"); if (r) setData(JSON.parse(r)); } catch {}
  }, []);

  const hasCoords = data?.from_lat && data?.from_lng && data?.to_lat && data?.to_lng;
  const formatDate = iso => { try { return new Date(iso).toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" }); } catch { return "—"; } };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="container mx-auto px-4 py-10 max-w-2xl">

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/our-services/get-ride" className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#264787] transition">
            ←
          </Link>
          <h1 className="text-3xl font-black text-gray-900">
            Trip{" "}
            <span className="relative inline-block text-[#264787]">
              Details
              <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[#f0a500]" />
            </span>
          </h1>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-sm mb-5 bg-gray-200" style={{ height: 220 }}>
          {hasCoords ? (
            <TripMap fromCoords={[parseFloat(data.from_lat), parseFloat(data.from_lng)]}
              toCoords={[parseFloat(data.to_lat), parseFloat(data.to_lng)]} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <span className="text-4xl">🗺️</span>
                <p className="text-xs text-gray-400 mt-2">Route map</p>
              </div>
            </div>
          )}
        </div>

        {/* Car + Booking Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0">
              {data?.car?.imgUrl || data?.car_image_url ? (
                <img src={data.car?.imgUrl || data.car_image_url} alt={data.car_model || "Car"}
                  className="w-full h-full object-contain p-1" onError={e => { e.target.src = "/images/2.png"; }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">🚗</div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-black text-gray-900">{data?.car_model || "Your Car"}</p>
              <p className="text-xs text-gray-400 mt-0.5">{data?.car_category || ""}</p>
            </div>
            {data?.bookingId && (
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-semibold">Booking ID</p>
                <p className="text-sm font-black text-[#264787]">#{data.bookingId}</p>
              </div>
            )}
          </div>
        </div>

        {/* Driver Details placeholder */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="text-sm font-black text-[#264787] mb-4">Booking Details</h3>
          <div className="space-y-3">
            {data?.from_location && (
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className="w-6 h-6 rounded-full bg-[#264787] text-white flex items-center justify-center font-black text-[10px] shrink-0">A</span>
                  <div className="w-px flex-1 bg-gray-200 my-1 h-6" />
                  <span className="w-6 h-6 rounded-full border-2 border-[#264787] text-[#264787] flex items-center justify-center font-black text-[10px] shrink-0">B</span>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div>
                    <p className="text-xs text-gray-400">From</p>
                    <p className="text-sm text-gray-700 font-semibold">{data.from_location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">To</p>
                    <p className="text-sm text-gray-700 font-semibold">{data.to_location}</p>
                  </div>
                </div>
              </div>
            )}
            {data?.ride_date && (
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <span className="text-lg">📅</span>
                <p className="text-sm text-gray-700 font-semibold">{formatDate(data.ride_date)}</p>
              </div>
            )}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <span className="text-lg">👤</span>
              <div>
                <p className="text-sm text-gray-700 font-semibold">{data?.full_name || "—"}</p>
                <p className="text-xs text-gray-400">{data?.dial_code} {data?.phone}</p>
              </div>
              <div className="ml-auto">
                <a href={`tel:${data?.dial_code}${data?.phone}`}
                  className="px-4 py-1.5 bg-[#3b85c1] text-white text-xs font-bold rounded-full hover:bg-[#264787] transition">
                  Call Center
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        {data?.total_price > 0 && (
          <div className="bg-[#fff8ef] rounded-2xl p-5 mb-5">
            <div className="bg-gradient-to-r from-red-500 to-orange-400 rounded-xl px-5 py-4 flex justify-between items-center">
              <span className="text-white font-black text-sm">Total ( Include Tax )</span>
              <span className="text-white font-black text-xl">{parseFloat(data.total_price).toFixed(0)} $</span>
            </div>
          </div>
        )}

        <p className="text-xs text-center text-gray-400 mb-5 leading-relaxed">
          Our team will contact you shortly to confirm your ride. You can cancel up to 24 hours before your trip for a full refund.
        </p>

        <Link href="/"
          className="block w-full py-4 bg-[#264787] hover:bg-[#1e3a6e] text-white font-black text-base rounded-2xl shadow-lg shadow-[#264787]/25 transition-all text-center">
          Rate Your Trip
        </Link>

        <Link href="/our-services/get-ride"
          className="block w-full mt-3 py-3.5 border-2 border-gray-200 text-gray-600 font-bold text-sm rounded-2xl hover:border-gray-300 transition text-center">
          Book Another Ride
        </Link>
      </div>
    </div>
  );
}
