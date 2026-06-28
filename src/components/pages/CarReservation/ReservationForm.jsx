"use client";
import React, { useCallback, useEffect, useState } from "react";
import { MapPin, Lock, Navigation, Clock } from "lucide-react";
import { MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const pickupIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [20, 32], iconAnchor: [10, 32], popupAnchor: [1, -30], shadowSize: [32, 32],
});

const dropoffIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [20, 32], iconAnchor: [10, 32], popupAnchor: [1, -30], shadowSize: [32, 32],
});

// ── Map helpers ──────────────────────────────────
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => { map.setView(center, map.getZoom()); }, [center, map]);
  return null;
};
const MapClick = ({ onMapClick }) => {
  useMapEvents({ click: onMapClick });
  return null;
};

// Auto-fit bounds when both markers are set
const MapFitBounds = ({ pickup, dropoff }) => {
  const map = useMap();
  useEffect(() => {
    const same =
      pickup[0] === dropoff[0] && pickup[1] === dropoff[1];
    if (!same) {
      map.fitBounds([pickup, dropoff], { padding: [40, 40] });
    }
  }, [pickup, dropoff, map]);
  return null;
};

// OSRM route + polyline
const RouteLayer = ({ pickup, dropoff, onRouteInfo }) => {
  const [routePoints, setRoutePoints] = useState([]);

  useEffect(() => {
    const same = pickup[0] === dropoff[0] && pickup[1] === dropoff[1];
    if (same) { setRoutePoints([]); return; }

    fetch(
      `https://router.project-osrm.org/route/v1/driving/${pickup[1]},${pickup[0]};${dropoff[1]},${dropoff[0]}?overview=full&geometries=geojson`
    )
      .then(r => r.json())
      .then(data => {
        const route = data.routes?.[0];
        if (!route) return;
        const pts = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRoutePoints(pts);
        onRouteInfo?.({
          distanceKm: (route.distance / 1000).toFixed(1),
          durationMin: Math.round(route.duration / 60),
        });
      })
      .catch(() => { });
  }, [pickup, dropoff]);

  if (!routePoints.length) return null;
  return (
    <Polyline
      positions={routePoints}
      color="#264787"
      weight={4}
      opacity={0.75}
      dashArray={null}
    />
  );
};

// ── Utilities ────────────────────────────────────
const getAddressFromCoords = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
    );
    const data = await res.json();
    return data?.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  } catch { return `${lat.toFixed(4)}, ${lon.toFixed(4)}`; }
};

const fieldCls = "w-full px-4 py-3 text-sm text-gray-800 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3b85c1]/25 focus:border-[#3b85c1] transition-all placeholder:text-gray-400";
const labelCls = "block text-xs font-bold text-gray-500 mb-1.5";

const StepBadge = ({ n, label }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <span className="w-7 h-7 rounded-full bg-[#264787] text-white text-xs font-black flex items-center justify-center shrink-0">{n}</span>
    <span className="text-sm font-black text-gray-800">{label}</span>
  </div>
);

const DRAFT_KEY = "car_booking_draft";

// ── Component ────────────────────────────────────
export default function ReservationForm({ selectedCar, onPriceChange }) {
  const DEFAULT_PICKUP = [30.7865, 30.9975];
  const DEFAULT_DROPOFF = [30.8025, 31.0125];

  const [bookingData, setBookingData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "{}");
      return {
        passengers: saved.passengers ?? 1,
        bags: saved.bags ?? 1,
        children: saved.children ?? 0,
        pickupLocation: saved.pickupLocation ?? "",
        dropoffLocation: saved.dropoffLocation ?? "",
        pickupCoords: saved.pickupCoords ?? DEFAULT_PICKUP,
        dropoffCoords: saved.dropoffCoords ?? DEFAULT_DROPOFF,
      };
    } catch { return { passengers: 1, bags: 1, children: 0, pickupLocation: "", dropoffLocation: "", pickupCoords: DEFAULT_PICKUP, dropoffCoords: DEFAULT_DROPOFF }; }
  });

  const [dateRange, setDateRange] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "{}");
      if (saved.startDate && saved.endDate) {
        return [dayjs(saved.startDate), dayjs(saved.endDate)];
      }
    } catch { }
    return [null, null];
  });

  const [mapCenter, setMapCenter] = useState(() => bookingData.pickupCoords);
  const [selectingLocation, setSelectingLoc] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [bothSet, setBothSet] = useState(() => {
    const pc = bookingData.pickupCoords;
    const dc = bookingData.dropoffCoords;
    return !(pc[0] === dc[0] && pc[1] === dc[1]);
  });
  const router = useRouter();

  // ── Derived price ──
  const PICKUP_RATE = 0.5; // USD per km, minimum $2
  const dailyRate = parseFloat(selectedCar?.price ?? 0);
  const totalDays = dateRange[0] && dateRange[1]
    ? dateRange[1].diff(dateRange[0], "day") || 1
    : 0;
  const totalPrice = totalDays > 0 && !isNaN(dailyRate) ? totalDays * dailyRate : 0;
  const pickupFee = routeInfo
    ? Math.max(2, parseFloat((parseFloat(routeInfo.distanceKm) * PICKUP_RATE).toFixed(1)))
    : 0;

  // Notify parent when price changes (for sidebar)
  useEffect(() => {
    onPriceChange?.(totalDays, totalPrice, pickupFee);
  }, [totalDays, totalPrice, pickupFee]);

  // Persist draft to localStorage on any change
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        ...bookingData,
        startDate: dateRange[0]?.toISOString() ?? null,
        endDate: dateRange[1]?.toISOString() ?? null,
      }));
    } catch { }
  }, [bookingData, dateRange]);

  const set = (k, v) => setBookingData(p => ({ ...p, [k]: v }));

  const handleMapClick = useCallback(async (e) => {
    if (!selectingLocation) return;
    const coords = [e.latlng.lat, e.latlng.lng];
    const address = await getAddressFromCoords(e.latlng.lat, e.latlng.lng);
    setMapCenter(coords);
    setBookingData(p => {
      const next = {
        ...p,
        ...(selectingLocation === "pickup"
          ? { pickupCoords: coords, pickupLocation: address }
          : { dropoffCoords: coords, dropoffLocation: address }),
      };
      setBothSet(
        !(next.pickupCoords[0] === next.dropoffCoords[0] &&
          next.pickupCoords[1] === next.dropoffCoords[1])
      );
      return next;
    });
  }, [selectingLocation]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!dateRange[0] || !dateRange[1]) {
      alert("Please select pickup and return date & time.");
      return;
    }
    try {
      localStorage.setItem("car_booking", JSON.stringify({
        car: selectedCar,
        totalDays,
        totalPrice,
        pickupFee,
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropoffLocation,
        passengers: bookingData.passengers,
        children: bookingData.children,
        bags: bookingData.bags,
        startDate: dateRange[0].toISOString(),
        endDate: dateRange[1].toISOString(),
        routeInfo,
      }));
      // Draft intentionally kept so Back→Booking restores form state
    } catch { }
    router.push("/our-services/car-reservation/payment");
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-gray-100">
        <h2 className="text-xl font-black text-gray-900">Complete Your Booking</h2>
        <p className="text-gray-400 text-sm mt-1">Fill in the details below to reserve your vehicle.</p>
      </div>

      <div className="p-6 space-y-8">

        {/* Step 1: Dates */}
        <section>
          <StepBadge n="1" label="Select Rental Dates" />
          <label className={labelCls}>Pickup &amp; return date / time</label>
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            value={dateRange}
            onChange={v => setDateRange(v ?? [null, null])}
            className="w-full rounded-xl border-gray-200"
            style={{ height: 44 }}
            disabledDate={c => c && c < dayjs().startOf("day")}
          />
          {/* Inline price preview */}
          {totalDays > 0 && (
            <p className="mt-2 text-xs text-[#264787] font-bold">
              {totalDays} day{totalDays !== 1 ? "s" : ""} ×{" "}
              {dailyRate.toLocaleString()} {selectedCar?.currency} ={" "}
              <span className="text-base">{totalPrice.toLocaleString()}</span>{" "}
              {selectedCar?.currency}
            </p>
          )}
        </section>

        {/* Step 2: Passengers */}
        <section>
          <StepBadge n="2" label="Passengers &amp; Luggage" />
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Adults</label>
              <input type="number" min={1} value={bookingData.passengers}
                onChange={e => set("passengers", parseInt(e.target.value) || 1)}
                className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Children</label>
              <input type="number" min={0} value={bookingData.children}
                onChange={e => set("children", parseInt(e.target.value) || 0)}
                className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Bags</label>
              <input type="number" min={0} value={bookingData.bags}
                onChange={e => set("bags", parseInt(e.target.value) || 0)}
                className={fieldCls} />
            </div>
          </div>
        </section>

        {/* Step 3: Locations + Map */}
        <section>
          <StepBadge n="3" label="Pickup &amp; Drop-off Locations" />
          <div className="space-y-4">
            {/* Pickup */}
            <div>
              <label className={labelCls}>Pickup location</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500 shrink-0" />
                  <input
                    type="text" required
                    placeholder="Enter pickup address"
                    value={bookingData.pickupLocation}
                    onChange={e => set("pickupLocation", e.target.value)}
                    className={`${fieldCls} pl-9`}
                  />
                </div>
                <button type="button"
                  onClick={() => setSelectingLoc(selectingLocation === "pickup" ? null : "pickup")}
                  className={`px-4 text-xs font-bold rounded-xl shrink-0 transition-all border ${selectingLocation === "pickup"
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                >
                  📍 Map
                </button>
              </div>
            </div>

            {/* Drop-off */}
            <div>
              <label className={labelCls}>Drop-off location</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500 shrink-0" />
                  <input
                    type="text" required
                    placeholder="Enter drop-off address"
                    value={bookingData.dropoffLocation}
                    onChange={e => set("dropoffLocation", e.target.value)}
                    className={`${fieldCls} pl-9`}
                  />
                </div>
                <button type="button"
                  onClick={() => setSelectingLoc(selectingLocation === "dropoff" ? null : "dropoff")}
                  className={`px-4 text-xs font-bold rounded-xl shrink-0 transition-all border ${selectingLocation === "dropoff"
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                >
                  📍 Map
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-gray-200" style={{ height: 220 }}>
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap"
                />
                <MapUpdater center={mapCenter} />
                <MapClick onMapClick={handleMapClick} />
                {bothSet && (
                  <MapFitBounds
                    pickup={bookingData.pickupCoords}
                    dropoff={bookingData.dropoffCoords}
                  />
                )}
                <Marker position={bookingData.pickupCoords} icon={pickupIcon} />
                <Marker position={bookingData.dropoffCoords} icon={dropoffIcon} />
                {bothSet && (
                  <RouteLayer
                    pickup={bookingData.pickupCoords}
                    dropoff={bookingData.dropoffCoords}
                    onRouteInfo={setRouteInfo}
                  />
                )}
              </MapContainer>
            </div>

            {/* Route info strip */}
            {routeInfo && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 bg-[#264787]/5 border border-[#264787]/15 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#264787]">
                  <Navigation size={13} />
                  {routeInfo.distanceKm} km
                </div>
                <div className="w-px h-4 bg-[#264787]/20" />
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#264787]">
                  <Clock size={13} />
                  ~{routeInfo.durationMin} min drive
                </div>
                <div className="w-px h-4 bg-[#264787]/20" />
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  Pickup fee: {pickupFee.toLocaleString()} {selectedCar?.currency}
                  <span className="font-normal text-gray-400">(0.5 {selectedCar?.currency}/km, min 2)</span>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Submit */}
      <div className="px-6 pb-6">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white text-sm font-black rounded-xl shadow-lg shadow-[#264787]/25 hover:brightness-110 transition-all"
        >
          <Lock size={15} />
          Proceed to Payment
          {totalPrice > 0 && (
            <span className="opacity-70 font-semibold">
              · {(totalPrice + pickupFee).toLocaleString()} {selectedCar?.currency}
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
