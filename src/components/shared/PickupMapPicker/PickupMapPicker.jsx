"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's broken default marker icons in webpack/Next.js
const fixIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
};

// Custom pulsing icon for selected pickup
const pulseIcon = () =>
  L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:28px;height:28px">
        <div style="
          position:absolute;inset:0;background:#3B85C1;border-radius:50%;opacity:.25;
          animation:pulse 1.6s ease-out infinite;
        "></div>
        <div style="
          position:absolute;top:4px;left:4px;right:4px;bottom:4px;
          background:#264787;border-radius:50%;border:2.5px solid white;
          box-shadow:0 2px 8px rgba(38,71,135,.5);
        "></div>
      </div>
      <style>
        @keyframes pulse{0%{transform:scale(1);opacity:.25}70%{transform:scale(2.2);opacity:0}100%{transform:scale(2.2);opacity:0}}
      </style>
    `,
    iconSize:   [28, 28],
    iconAnchor: [14, 14],
  });

function ClickHandler({ onPick }) {
  useMapEvents({ click: (e) => onPick(e.latlng) });
  return null;
}

export default function PickupMapPicker({ defaultCenter, onChange }) {
  const [position, setPosition] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fixIcon();
    setReady(true);
  }, []);

  const center = defaultCenter ?? { lat: 30.0444, lng: 31.2357 }; // Cairo fallback

  const handlePick = (latlng) => {
    setPosition(latlng);
    onChange?.({ lat: latlng.lat, lng: latlng.lng });
  };

  if (!ready) {
    return (
      <div className="w-full h-[300px] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Loading map...
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden border-2 border-[#3B85C1]/30 shadow-sm">
      {/* Instruction bar */}
      <div className="bg-[#264787] text-white text-xs font-medium px-4 py-2.5 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        Click on the map to set your pickup location
      </div>

      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPick={handlePick} />
        {position && (
          <Marker position={position} icon={pulseIcon()} />
        )}
      </MapContainer>

      {/* Coordinates display */}
      {position ? (
        <div className="bg-[#3B85C1]/5 border-t border-[#3B85C1]/20 px-4 py-2.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#3B85C1]" />
          <span className="text-xs font-semibold text-[#264787]">
            Selected: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
          </span>
          <button
            type="button"
            onClick={() => { setPosition(null); onChange?.({ lat: null, lng: null }); }}
            className="ml-auto text-xs text-red-400 hover:text-red-600 transition font-medium"
          >
            Clear
          </button>
        </div>
      ) : (
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-2.5">
          <span className="text-xs text-gray-400">No location selected yet</span>
        </div>
      )}
    </div>
  );
}
