"use client";
import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const fromIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:30px;height:30px;border-radius:50%;background:#22c55e;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:14px">A</div>`,
  iconSize: [30, 30], iconAnchor: [15, 15],
});
const toIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:30px;height:30px;border-radius:50%;background:#ef4444;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:14px">B</div>`,
  iconSize: [30, 30], iconAnchor: [15, 15],
});

const DEFAULT = [24.7136, 46.6753];

const MapUpdater = ({ center }) => { const map = useMap(); useEffect(() => { map.setView(center, map.getZoom()); }, [center, map]); return null; };
const MapClick  = ({ onMapClick }) => { useMapEvents({ click: onMapClick }); return null; };
const MapFit    = ({ from, to }) => {
  const map = useMap();
  useEffect(() => {
    if (from[0] !== to[0] || from[1] !== to[1]) map.fitBounds([from, to], { padding: [50, 50] });
  }, [from, to, map]);
  return null;
};

const getAddress = async (lat, lng) => {
  try {
    const d = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`).then(r => r.json());
    return d?.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch { return `${lat.toFixed(5)}, ${lng.toFixed(5)}`; }
};

export default function MapSection({ mode, from, to, bothSet, onFromChange, onToChange, onModeChange, onRouteInfo }) {
  const [routePts, setRoutePts] = useState([]);
  const mapCenter = from.addr ? from.coords : DEFAULT;

  useEffect(() => {
    if (!bothSet) { setRoutePts([]); return; }
    fetch(`https://router.project-osrm.org/route/v1/driving/${from.coords[1]},${from.coords[0]};${to.coords[1]},${to.coords[0]}?overview=full&geometries=geojson`)
      .then(r => r.json())
      .then(d => {
        const route = d.routes?.[0]; if (!route) return;
        setRoutePts(route.geometry.coordinates.map(([lng, lat]) => [lat, lng]));
        onRouteInfo?.({ distanceKm: (route.distance / 1000).toFixed(1), durationMin: Math.round(route.duration / 60) });
      }).catch(() => {});
  }, [from.coords, to.coords, bothSet]);

  const handleClick = useCallback(async (e) => {
    if (!mode) return;
    const coords  = [e.latlng.lat, e.latlng.lng];
    const address = await getAddress(e.latlng.lat, e.latlng.lng);
    if (mode === "from") { onFromChange({ addr: address, coords }); onModeChange("to"); }
    else                 { onToChange({ addr: address, coords });   onModeChange(null); }
  }, [mode, onFromChange, onToChange, onModeChange]);

  return (
    <div className={`rounded-xl overflow-hidden border-2 transition-colors ${mode ? "border-[#264787]" : "border-gray-200"}`} style={{ height: 300 }}>
      <MapContainer center={mapCenter} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
        <MapUpdater center={mapCenter} />
        <MapClick onMapClick={handleClick} />
        {bothSet && <MapFit from={from.coords} to={to.coords} />}
        {from.addr && <Marker position={from.coords} icon={fromIcon} />}
        {to.addr   && <Marker position={to.coords}   icon={toIcon} />}
        {routePts.length > 0 && <Polyline positions={routePts} color="#264787" weight={4} opacity={0.8} />}
      </MapContainer>
    </div>
  );
}
