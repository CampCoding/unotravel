"use client";
import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion';
import { Calendar, CalendarIcon, MapPin, User } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const pickupIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const dropoffIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapUpdater = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

// MapClick component to capture map clicks
const MapClick = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick,
  });
  return null;
};

// Reverse Geocoding function
const getAddressFromCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    return (
      data?.display_name ||
      `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`
    );
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
  }
};

export default function ReservationForm({ selectedCar, totalPrice }) {
  const [bookingData, setBookingData] = useState({
    passengers: 1,
    pickupLocation: "",
    dropoffLocation: "",
    pickupCoords: [30.7865, 30.9975], // Tanta
    dropoffCoords: [30.8025, 31.0125], // Near Tanta
  });
  const [dateRange, setDateRange] = useState([null, null]); // [dayjs|null, dayjs|null]

  const [mapCenter, setMapCenter] = useState([30.7865, 30.9975]);
  const [selectingLocation, setSelectingLocation] = useState(null); // 'pickup' | 'dropoff' | null

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };


  const handleMapClick = useCallback(
    async (e) => {
      if (!selectingLocation) return;

      const coords = [e.latlng.lat, e.latlng.lng];
      setMapCenter(coords);

      const address = await getAddressFromCoords(
        e.latlng.lat,
        e.latlng.lng
      );

      if (selectingLocation === "pickup") {
        setBookingData((prev) => ({
          ...prev,
          pickupCoords: coords,
          pickupLocation: address,
        }));
      } else if (selectingLocation === "dropoff") {
        setBookingData((prev) => ({
          ...prev,
          dropoffCoords: coords,
          dropoffLocation: address,
        }));
      }
    },
    [selectingLocation]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dateRange[0] || !dateRange[1]) {
      alert("Please select pickup and return date & time.");
      return;
    }

    const payload = {
      ...bookingData,
      startDateTime: dateRange[0].toISOString(),
      endDateTime: dateRange[1].toISOString(),
      totalDays,
      totalPrice,
      carId: selectedCar.id,
      carModel: selectedCar.model,
      // add name/phone/email here when you wire them as controlled inputs
    };

    console.log("Booking submitted:", payload);
    alert("Booking request submitted. We will contact you shortly.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="lg:col-span-3"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 space-y-7"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              Complete your booking
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Choose your rental dates, locations, and share your
              contact details. We will confirm your reservation as
              soon as possible.
            </p>
          </div>
        </div>

        {/* Date & time interval using AntD RangePicker */}
        <div>
          <label className="!flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <Calendar />
            <span>Pickup &amp; return date / time</span>
          </label>
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            value={dateRange}
            onChange={(values) => setDateRange(values)}
            className="w-full h-[48px] rounded-xl border-2 border-gray-200 px-2 font-semibold"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
          {dateRange[0] && dateRange[1] && (
            <p className="mt-2 text-xs text-gray-500">
              Rental length:{" "}
              <span className="font-semibold">{totalDays}</span>{" "}
              {totalDays === 1 ? "day" : "days"} • Return:{" "}
              <span className="font-semibold">
                {formatDateTime(dateRange[1])}
              </span>
            </p>
          )}
        </div>

        {/* Number of Passengers */}
        <div>
          <label className="!flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <User />
            <span>Number of passengers</span>
          </label>
          <input
            type="number"
            value={bookingData.passengers}
            onChange={(e) =>
              handleInputChange(
                "passengers",
                parseInt(e.target.value)
              )
            }
            className="!w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#3b85c1] focus:outline-none focus:ring-4 focus:ring-[#3b85c1]/20 transition-all duration-300 font-semibold"

          />

        </div>

        {/* Locations */}
        <div className="space-y-4">
          <div>
            <label className="!flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
              <MapPin />
              <span>Pickup location</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Enter pickup location or use map"
                value={bookingData.pickupLocation}
                onChange={(e) =>
                  handleInputChange("pickupLocation", e.target.value)
                }
                className="flex-1 px-4 focus:outline-none py-3 border-2 border-gray-200 rounded-xl focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 transition-all duration-300 font-semibold"
              />
              <button
                type="button"
                onClick={() =>
                  setSelectingLocation(
                    selectingLocation === "pickup"
                      ? null
                      : "pickup"
                  )
                }
                className={`px-4 py-3 !rounded-xl font-bold transition-all duration-300 text-sm ${selectingLocation === "pickup"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                📍 Map
              </button>
            </div>
          </div>

          <div>
            <label className="!flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
              <MapPin />
              <span>Drop off location</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"

                required
                placeholder="Enter drop off location or use map"
                value={bookingData.dropoffLocation}
                onChange={(e) =>
                  handleInputChange("dropoffLocation", e.target.value)
                }
                className="flex-1 px-4 py-3 border-2 focus:outline-none border-gray-200 rounded-xl focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 transition-all duration-300 font-semibold"
              />
              <button
                type="button"
                onClick={() =>
                  setSelectingLocation(
                    selectingLocation === "dropoff"
                      ? null
                      : "dropoff"
                  )
                }
                className={`px-4 py-3 !rounded-xl font-bold transition-all duration-300 text-sm ${selectingLocation === "dropoff"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                📍 Map
              </button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="border-2 border-gray-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white px-4 py-3">
            <p className="font-bold text-xs sm:text-sm">
              {selectingLocation
                ? `Click on the map to set ${selectingLocation === "pickup"
                  ? "pickup (Green Marker)"
                  : "drop off (Red Marker)"
                } location`
                : 'Click the "Map" buttons above to select pickup and drop off points'}
            </p>
          </div>
          <div className="h-80">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <MapUpdater center={mapCenter} />
              <MapClick onMapClick={handleMapClick} />
              <Marker
                position={bookingData.pickupCoords}
                icon={pickupIcon}
              >
                <Popup>
                  <strong>Pickup location</strong>
                  <br />
                  {bookingData.pickupLocation || "Not set"}
                </Popup>
              </Marker>
              <Marker
                position={bookingData.dropoffCoords}
                icon={dropoffIcon}
              >
                <Popup>
                  <strong>Drop off location</strong>
                  <br />
                  {bookingData.dropoffLocation || "Not set"}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">
              Full name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 transition-all duration-300 font-semibold"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">
              Phone number
            </label>
            <input
              type="tel"
              required
              placeholder="+20 123 456 7890"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 transition-all duration-300 font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Email address
          </label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 transition-all duration-300 font-semibold"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white font-black text-lg py-3 !rounded-2xl shadow-xl shadow-[#3b85c1]/30 hover:shadow-2xl transition-all duration-300"
        >
          Complete booking • {selectedCar?.currency}{" "}
          {totalPrice?.toFixed(2)}
        </motion.button>
      </form>
    </motion.div>
  )
}
