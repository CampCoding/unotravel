"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Navigation, Clock } from "lucide-react";

const MapSection = dynamic(() => import("./_MapSection"), { ssr: false });

const inputCls = "w-full px-4 py-3.5 text-sm bg-[#f4f6f8] rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#264787]/20 placeholder:text-gray-400 text-gray-700";

const Step = ({ n, label, active, done }) => (
  <div className={`flex items-center gap-1.5 text-xs font-bold transition ${active ? "text-[#264787]" : done ? "text-[#264787]/60" : "text-gray-400"}`}>
    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition ${active ? "bg-[#264787] text-white shadow-md shadow-[#264787]/30" : done ? "bg-[#264787]/20 text-[#264787]" : "bg-gray-200 text-gray-400"}`}>{n}</span>
    <span className="hidden sm:block">{label}</span>
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
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="container mx-auto px-4 py-10 max-w-2xl">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            Get a{" "}
            <span className="relative inline-block text-[#264787]">
              Ride
              <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[#f0a500]" />
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-3">Select your pickup and drop-off points on the map below.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <Step n="1" label="Location" active />
          <div className="flex-1 h-px bg-gray-200" />
          <Step n="2" label="Car & Details" />
          <div className="flex-1 h-px bg-gray-200" />
          <Step n="3" label="Confirm" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
          {/* Date */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">📅 Ride Date *</label>
            <DatePicker value={date} onChange={v => setDate(v)} format="ddd, D MMM YYYY"
              disabledDate={c => c && c < dayjs().startOf("day")}
              className="w-full rounded-xl" style={{ height: 50, background: "#f4f6f8", border: "none" }} />
          </div>

          {/* From */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">🅐 Pickup Location *</label>
            <div className="flex gap-2">
              <input value={from.addr} onChange={e => setFrom(p => ({ ...p, addr: e.target.value }))}
                placeholder="Airport, hotel, or address…" className={`${inputCls} flex-1`} />
              <button type="button" onClick={() => setMode(mode === "from" ? null : "from")}
                className={`px-4 text-xs font-black rounded-xl shrink-0 transition ${mode === "from" ? "bg-[#264787] text-white" : "bg-[#f4f6f8] text-gray-600 hover:bg-gray-200"}`}>
                📍 Map
              </button>
            </div>
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">🅑 Drop-off Location *</label>
            <div className="flex gap-2">
              <input value={to.addr} onChange={e => setTo(p => ({ ...p, addr: e.target.value }))}
                placeholder="Destination address…" className={`${inputCls} flex-1`} />
              <button type="button" onClick={() => setMode(mode === "to" ? null : "to")}
                className={`px-4 text-xs font-black rounded-xl shrink-0 transition ${mode === "to" ? "bg-red-500 text-white" : "bg-[#f4f6f8] text-gray-600 hover:bg-gray-200"}`}>
                📍 Map
              </button>
            </div>
          </div>

          {mode && (
            <p className="text-xs text-center font-semibold text-[#264787] bg-[#264787]/5 rounded-xl py-2.5 animate-pulse">
              {mode === "from" ? "🅐 Click the map to set your pickup point" : "🅑 Click the map to set your drop-off point"}
            </p>
          )}

          <MapSection mode={mode} from={from} to={to} bothSet={bothSet}
            onFromChange={setFrom} onToChange={setTo} onModeChange={setMode} onRouteInfo={setRouteInfo} />

          {routeInfo && (
            <div className="bg-[#264787]/5 rounded-xl px-4 py-3 flex flex-wrap items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[#264787]"><Navigation size={13} />{routeInfo.distanceKm} km</span>
              <span className="w-px h-4 bg-[#264787]/20" />
              <span className="flex items-center gap-1.5 text-[#264787]"><Clock size={13} />~{routeInfo.durationMin} min</span>
              <span className="w-px h-4 bg-[#264787]/20" />
              <span className="text-emerald-600">Pickup fee ≈ {pickupFee} USD</span>
            </div>
          )}

          <button onClick={handleNext}
            className="w-full py-4 bg-[#264787] hover:bg-[#1e3a6e] text-white font-black text-base rounded-2xl shadow-lg shadow-[#264787]/25 transition-all">
            Next: Choose Your Car →
          </button>
        </div>
      </div>
    </div>
  );
}
