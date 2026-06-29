"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
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
  html: `<div style="width:26px;height:26px;border-radius:50%;background:#264787;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:12px">A</div>`,
  iconSize: [26,26], iconAnchor: [13,13],
});
const toIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:26px;height:26px;border-radius:50%;background:#ef4444;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:12px">B</div>`,
  iconSize: [26,26], iconAnchor: [13,13],
});

export default function TripMap({ fromCoords, toCoords }) {
  const [pts, setPts] = useState([]);
  const center = fromCoords || [24.7136, 46.6753];

  useEffect(() => {
    if (!fromCoords || !toCoords) return;
    fetch(`https://router.project-osrm.org/route/v1/driving/${fromCoords[1]},${fromCoords[0]};${toCoords[1]},${toCoords[0]}?overview=full&geometries=geojson`)
      .then(r => r.json())
      .then(d => {
        const route = d.routes?.[0]; if (!route) return;
        setPts(route.geometry.coordinates.map(([lng, lat]) => [lat, lng]));
      }).catch(() => {});
  }, []);

  return (
    <MapContainer center={center} zoom={11} style={{ height: "100%", width: "100%" }} zoomControl={false} attributionControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={fromCoords} icon={fromIcon} />
      <Marker position={toCoords}   icon={toIcon} />
      {pts.length > 0 && <Polyline positions={pts} color="#264787" weight={4} opacity={0.8} />}
    </MapContainer>
  );
}
