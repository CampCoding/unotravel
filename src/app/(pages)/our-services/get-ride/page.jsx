"use client";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { MapPin, Navigation, Clock, ChevronRight } from "lucide-react";
import MainBanner from "@/components/shared/MainBanner/MainBanner";

const MapSection = dynamic(() => import("./_MapSection"), { ssr: false });

const fieldCls = "w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3b85c1]/25 focus:border-[#3b85c1] transition placeholder:text-gray-400";

const Step = ({ n, label, active }) => (
  <div className={`flex items-center gap-1.5 text-xs font-bold ${active ? "text-[#264787]" : "text-gray-400"}`}>
    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${active ? "bg-[#264787] text-white" : "bg-gray-200 text-gray-400"}`}>{n}</span>
    {label}
  </div>
);

export default function GetRidePage() {
  const router = useRouter();
  const [mode, setMode] = useState(null);
  const [from, setFrom] = useState({ addr: "", coords: [24.7136, 46.6753] });
  const [to,   setTo]   = useState({ addr: "", coords: [24.7136, 46.6753] });
  const [routeInfo, setRouteInfo] = useState(null);
  const [date, setDate] = useState(null);

  const pickupFee = routeInfo ? Math.max(2, parseFloat((parseFloat(routeInfo.distanceKm) * 0.5).toFixed(1))) : 0;
  const bothSet = !!from.addr && !!to.addr && !(from.coords[0] === to.coords[0] && from.coords[1] === to.coords[1]);

  const handleNext = () => {
    if (!from.addr || !to.addr) return alert("Please select both a pickup (A) and drop-off (B) location.");
    if (!date) return alert("Please select a ride date.");
    try {
      localStorage.setItem("ride_step1", JSON.stringify({
        from: from.addr, to: to.addr,
        fromCoords: from.coords, toCoords: to.coords,
        date: date.toISOString(), routeInfo, pickupFee,
      }));
    } catch {}
    router.push("/our-services/get-ride/choose");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainBanner title="Get a Ride" subtitle="Select your pickup and drop-off locations on the map." />
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="flex items-center gap-2 mb-8">
          <Step n="1" label="Location" active />
          <div className="flex-1 h-px bg-gray-200" />
          <Step n="2" label="Car & Details" active={false} />
          <div className="flex-1 h-px bg-gray-200" />
          <Step n="3" label="Confirm" active={false} />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">📅 Ride Date *</label>
            <DatePicker value={date} onChange={v => setDate(v)} format="ddd, D MMM YYYY"
              disabledDate={c => c && c < dayjs().startOf("day")}
              className="w-full rounded-xl" style={{ height: 46 }} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">🅐 Pickup Location *</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500 shrink-0" />
                <input value={from.addr} onChange={e => setFrom(p => ({ ...p, addr: e.target.value }))}
                  placeholder="Airport, hotel, or address…" className={`${fieldCls} pl-9`} />
              </div>
              <button type="button" onClick={() => setMode(mode === "from" ? null : "from")}
                className={`px-4 text-xs font-bold rounded-xl shrink-0 border transition ${mode === "from" ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
                📍 Map
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">🅑 Drop-off Location *</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500 shrink-0" />
                <input value={to.addr} onChange={e => setTo(p => ({ ...p, addr: e.target.value }))}
                  placeholder="Destination address…" className={`${fieldCls} pl-9`} />
              </div>
              <button type="button" onClick={() => setMode(mode === "to" ? null : "to")}
                className={`px-4 text-xs font-bold rounded-xl shrink-0 border transition ${mode === "to" ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
                📍 Map
              </button>
            </div>
          </div>
          {mode && (
            <p className="text-xs text-center font-semibold text-[#264787] bg-blue-50 rounded-xl py-2.5 animate-pulse">
              {mode === "from" ? "🅐 Click the map to set your pickup point" : "🅑 Click the map to set your drop-off point"}
            </p>
          )}
          <MapSection mode={mode} from={from} to={to} bothSet={bothSet}
            onFromChange={setFrom} onToChange={setTo}
            onModeChange={setMode} onRouteInfo={setRouteInfo} />
          {routeInfo && (
            <div className="flex flex-wrap items-center gap-4 px-4 py-3 bg-[#264787]/5 border border-[#264787]/15 rounded-xl text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[#264787]"><Navigation size={13} />{routeInfo.distanceKm} km</span>
              <span className="w-px h-4 bg-[#264787]/20" />
              <span className="flex items-center gap-1.5 text-[#264787]"><Clock size={13} />~{routeInfo.durationMin} min</span>
              <span className="w-px h-4 bg-[#264787]/20" />
              <span className="text-emerald-600">Pickup fee ≈ {pickupFee} USD</span>
            </div>
          )}
          <button onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white text-sm font-black rounded-xl shadow-lg shadow-[#264787]/25 hover:brightness-110 transition-all">
            Next: Choose Your Car <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
