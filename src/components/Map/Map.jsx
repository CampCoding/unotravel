"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const useMapEvents = dynamic(
  () => import("react-leaflet").then((m) => m.useMapEvents),
  { ssr: false }
);

// fix marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ClickHandler({ onSelect }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.state;

      onSelect({
        lat,
        lng,
        city,
        country: data.address?.country,
      });
    },
  });
  return null;
}

export default function SelectCityMap({
  value,
  onChange,
  height = 350,
  center = [30.0444, 31.2357], // Cairo default
}) {
  const [position, setPosition] = useState(value);

  useEffect(() => {
    setPosition(value);
  }, [value]);

  return (
    <div
      style={{ height }}
      className="w-full rounded-lg overflow-hidden border"
    >
      <MapContainer center={center} zoom={5} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler
          onSelect={(data) => {
            setPosition(data);
            onChange?.(data);
          }}
        />

        {position && (
          <Marker position={[position.lat, position.lng]} icon={markerIcon} />
        )}
      </MapContainer>
    </div>
  );
}
