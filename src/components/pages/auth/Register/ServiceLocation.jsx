"use client";
import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { MapPin, LocateFixed } from "lucide-react";
import "leaflet/dist/leaflet.css";

export default function ServiceLocation() {
  const [position, setPosition] = useState([30.0444, 31.2357]); 
  const mapRef = useRef(null); 


  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const newPos = [e.latlng.lat, e.latlng.lng];
        setPosition(newPos);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

   
    if (!mapRef.current) mapRef.current = map;

    return (
      <Marker position={position}>
        <Popup>
          Selected location:
          <br />
          Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
        </Popup>
      </Marker>
    );
  }


  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPos);

      
          if (mapRef.current) {
            mapRef.current.flyTo(newPos, 14, { duration: 1.5 });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Please allow location access in your browser settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }

  return (
   <div className="flex flex-col items-center gap-5 w-full max-w-[600px] mx-auto px-6 md:px-8">
      {/* Header */}
      <div className="flex items-center justify-between w-full rounded-2xl">
        <div className="flex items-center gap-2">
          <MapPin className="text-[var(--main-light-color)]" />
          <p className="text-[var(--main-light-color)] font-[filson-medium] tracking-wide">
            LOCATION
          </p>
        </div>

        <button
          onClick={getCurrentLocation}
          className="text-[var(--main-light-color)] hover:text-[var(--main-dark-color)] cursor-pointer transition-all duration-300"
          title="Use my current location"
        >
          <LocateFixed size={24} />
        </button>
      </div>

      {/* Map */}
      <div className="w-full flex justify-center">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="rounded-2xl w-full"
          style={{ height: "400px", maxWidth: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}
