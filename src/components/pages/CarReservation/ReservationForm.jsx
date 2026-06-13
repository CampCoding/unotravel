"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, User, X } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import CustomHeading from '../../shared/CustomHeading/CustomHeading';
import Link from 'next/link';
import { FaApple } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const { RangePicker } = DatePicker;

const formatDateTime = (date) => (date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "");

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const pickupIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [1, -30],
  shadowSize: [32, 32],
});

const dropoffIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [1, -30],
  shadowSize: [32, 32],
});

const MapUpdater = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const MapClick = ({ onMapClick }) => {
  useMapEvents({ click: onMapClick });
  return null;
};

const getAddressFromCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    return data?.display_name || `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
  } catch (error) {
    return `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
  }
};

export default function ReservationForm({ selectedCar, totalPrice }) {
  const [bookingData, setBookingData] = useState({
    passengers: 1,
    bags: 1,
    children: 0,
    pickupLocation: "",
    dropoffLocation: "",
    pickupCoords: [30.7865, 30.9975],
    dropoffCoords: [30.8025, 31.0125],
  });
  const [dateRange, setDateRange] = useState([null, null]);
  const [mapCenter, setMapCenter] = useState([30.7865, 30.9975]);
  const [selectingLocation, setSelectingLocation] = useState(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const router = useRouter();
  const totalDays = dateRange[0] && dateRange[1] ? dateRange[1].diff(dateRange[0], 'day') || 1 : 0;

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentInputChange = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMapClick = useCallback(
    async (e) => {
      if (!selectingLocation) return;
      const coords = [e.latlng.lat, e.latlng.lng];
      setMapCenter(coords);
      const address = await getAddressFromCoords(e.latlng.lat, e.latlng.lng);

      if (selectingLocation === "pickup") {
        setBookingData((prev) => ({ ...prev, pickupCoords: coords, pickupLocation: address }));
      } else if (selectingLocation === "dropoff") {
        setBookingData((prev) => ({ ...prev, dropoffCoords: coords, dropoffLocation: address }));
      }
    },
    [selectingLocation]
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!dateRange[0] || !dateRange[1]) {
      alert("Please select pickup and return date & time.");
      return;
    }
    // Form validation passed, safely open the user payment modal
    setIsModalOpen(true);
  };

  const handleFinalCheckout = (e) => {
    e.preventDefault();
    const finalPayload = {
      ...bookingData,
      ...paymentData,
      startDateTime: dateRange[0].toISOString(),
      endDateTime: dateRange[1].toISOString(),
      totalDays,
      totalPrice,
      carId: selectedCar?.id,
      carModel: selectedCar?.model,
    };
    console.log("Final Booking & Payment Payload Submitted:", finalPayload);
    alert("Booking verification request submitted successfully!");
    setIsModalOpen(false);
  };

  useEffect(() =>  {
    if(isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  } , [isModalOpen])

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="lg:col-span-3"
    >
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-2xl shadow-lg p-3 border border-gray-100 space-y-4"
      >
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <h2 className="text-lg! font-bold text-gray-900">Complete your booking</h2>
            <p className="text-gray-500 mt-1 text-xs">
              Choose your rental dates, locations, and share your contact details.
            </p>
          </div>
        </div>

        {/* Date & Time */}
        <div>
          <label className="flex! flex-row! items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
            <Calendar size={14} />
            <span>Pickup &amp; return date / time</span>
          </label>
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            value={dateRange}
            onChange={(values) => setDateRange(values)}
            className="w-full h-9 rounded-lg border border-gray-200 px-2 text-xs! font-normal"
            disabledDate={(current) => current && current < dayjs().startOf("day")}
          />
        </div>

        {/* Dynamic Parameters */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="flex! flex-row! items-center gap-1 text-[11px] font-bold text-gray-700 mb-1">
              <User size={12} />
              <span>Adults</span>
            </label>
            <input
              type="number"
              min={1}
              value={bookingData.passengers}
              onChange={(e) => handleInputChange("passengers", parseInt(e.target.value) || 1)}
              className="w-full px-2 py-1 text-xs! border border-gray-200 rounded-lg focus:outline-none font-normal"
            />
          </div>
          <div>
            <label className="flex! flex-row! items-center gap-1 text-[11px] font-bold text-gray-700 mb-1">
              <User size={12} />
              <span>Children</span>
            </label>
            <input
              type="number"
              min={0}
              value={bookingData.children}
              onChange={(e) => handleInputChange("children", parseInt(e.target.value) || 0)}
              className="w-full px-2 py-1 text-xs! border border-gray-200 rounded-lg focus:outline-none font-normal"
            />
          </div>
          <div>
            <label className="flex! flex-row! items-center gap-1 text-[11px] font-bold text-gray-700 mb-1">
              <User size={12} />
              <span>Bags</span>
            </label>
            <input
              type="number"
              min={0}
              value={bookingData.bags}
              onChange={(e) => handleInputChange("bags", parseInt(e.target.value) || 0)}
              className="w-full px-2 py-1 text-xs! border border-gray-200 rounded-lg focus:outline-none font-normal"
            />
          </div>
        </div>

        {/* Locations */}
        <div className="space-y-3">
          <div>
            <label className="flex! flex-row! items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
              <MapPin size={14} />
              <span>Pickup location</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Enter pickup location"
                value={bookingData.pickupLocation}
                onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs! border border-gray-200 rounded-lg focus:outline-none font-normal"
              />
              <button
                type="button"
                onClick={() => setSelectingLocation(selectingLocation === "pickup" ? null : "pickup")}
                className={`px-3 py-1.5 font-medium rounded-xl! text-xs! shrink-0 ${selectingLocation === "pickup" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"
                  }`}
              >
                📍 Map
              </button>
            </div>
          </div>

          <div>
            <label className="flex! flex-row! items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
              <MapPin size={14} />
              <span>Drop off location</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Enter drop off location"
                value={bookingData.dropoffLocation}
                onChange={(e) => handleInputChange("dropoffLocation", e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs! border border-gray-200 rounded-lg focus:outline-none font-normal"
              />
              <button
                type="button"
                onClick={() => setSelectingLocation(selectingLocation === "dropoff" ? null : "dropoff")}
                className={`px-3 py-1.5 font-medium rounded-xl! text-xs! shrink-0 ${selectingLocation === "dropoff" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"
                  }`}
              >
                📍 Map
              </button>
            </div>
          </div>
        </div>

        {/* Map Element */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="h-40">
            <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
              <MapUpdater center={mapCenter} />
              <MapClick onMapClick={handleMapClick} />
              <Marker position={bookingData.pickupCoords} icon={pickupIcon} />
              <Marker position={bookingData.dropoffCoords} icon={dropoffIcon} />
            </MapContainer>
          </div>
        </div>

        {/* Submit Main Form */}
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white font-bold text-sm! py-2 rounded-xl! shadow-md transition-all duration-300"
        >
          Complete booking • {selectedCar?.currency || "$"}{(totalPrice || 0).toFixed(2)}
        </motion.button>
      </form>

      {/* Payment Screen Modal Layer */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative border border-gray-100 flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              {/* Modal Close Flag Header */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X size={18} />
              </button>

              <form onSubmit={handleFinalCheckout} className="p-5 overflow-y-auto space-y-4 text-left">
                {/* Heading Segment */}
                <div className="text-center pb-1">
                  <div className=" flex justify-center items-center"><CustomHeading first_title={"Payment"} second_title={"Method"} /></div>
                  {/* <h3 className="text-base font-bold text-[#264787]">Payment Method</h3> */}
                  <p className="text-[15px] font-normal text-[#505050] mt-0.5">
                    We'll use this information to send key confirmations and protect your security.
                  </p>
                  <div className="mt-2 text-[14px] text-gray-500 bg-gray-50 rounded-sm! py-2! border border-gray-100">
                    Already have an account? <Link
                      href="/sign-in"
                      className="text-[#3b85c1] font-bold cursor-pointer">Sign In</Link>
                  </div>
                </div>

                {/* Account Details Block */}
                <div className="space-y-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={paymentData.fullName}
                      onChange={(e) => handlePaymentInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-200 p-2! rounded-md! text-xs! focus:outline-none focus:border-[#3b85c1]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">Email</label>
                    <input
                      type="email"
                      required
                      value={paymentData.email}
                      onChange={(e) => handlePaymentInputChange("email", e.target.value)}
                      placeholder="name@example.com"
                      className="w-full border border-gray-200 p-2! rounded-md! text-xs! focus:outline-none focus:border-[#3b85c1]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">Your Phone Number *</label>
                    <div className="flex items-center gap-1 border p-2 rounded-md! border-gray-200 py-1">
                      <span className="text-xs! text-gray-400 font-semibold">+20</span>
                      <input
                        type="tel"
                        required
                        value={paymentData.phone}
                        onChange={(e) => handlePaymentInputChange("phone", e.target.value)}
                        placeholder="123 456 7890"
                        className="w-full text-xs! focus:outline-none"
                      />
                      <span className="text-green-500 text-xs">✓</span>
                    </div>
                  </div>
                </div>

                {/* Payment Selection Segment */}
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1.5">Choose Preferred Payment Method</label>
                  <div className="bg-[#1e3a75] text-white rounded-lg p-2 flex items-center justify-between text-xs font-semibold">
                    <span>Credit Card</span>
                    <span className="text-[10px] tracking-widest opacity-80">VISA / MC</span>
                  </div>
                </div>

                {/* Embedded Card Form Fields */}
                <div className="space-y-2 flex flex-col gap-2!">
                  <input
                    type="text"
                    required
                    value={paymentData.cardNumber}
                    onChange={(e) => handlePaymentInputChange("cardNumber", e.target.value)}
                    placeholder="Card Number"
                    className="w-full border border-gray-200 rounded-md! px-3! py-1.5! text-xs! focus:outline-none focus:border-[#3b85c1]"
                  />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-gray-200 rounded-md! px-3! py-1.5! text-xs! focus:outline-none focus:border-[#3b85c1]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={paymentData.expiryDate}
                      onChange={(e) => handlePaymentInputChange("expiryDate", e.target.value)}
                      placeholder="Expiry Date (MM/YY)"
                      className="w-full border border-gray-200 rounded-md px-3! py-1.5! text-xs! focus:outline-none focus:border-[#3b85c1]"
                    />
                    <input
                      type="password"
                      maxLength={3}
                      required
                      value={paymentData.cvv}
                      onChange={(e) => handlePaymentInputChange("cvv", e.target.value)}
                      placeholder="CVV"
                      className="w-full border border-gray-200 rounded-md! px-3! py-1.5! text-xs! focus:outline-none focus:border-[#3b85c1]"
                    />
                  </div>
                </div>

                {/* Ride Overview Summary snippet */}
                <div className="bg-gray-50 rounded-xl p-2.5 space-y-1.5 text-[11px] border border-gray-100">
                  <span className="font-bold text-[#264787] block text-xs">Ride Details</span>
                  <div className="flex items-start gap-1.5 text-gray-600">
                    <span className="text-green-500">●</span>
                    <p className="line-clamp-1"><span className="font-semibold">From:</span> {bookingData.pickupLocation || "Selected Location"}</p>
                  </div>
                  <div className="flex items-start gap-1.5 text-gray-600">
                    <span className="text-red-500">●</span>
                    <p className="line-clamp-1"><span className="font-semibold">To:</span> {bookingData.dropoffLocation || "Selected Location"}</p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className="text-red-600 pb-0 mb-0 underline">Notes :</p>
                  <p className="text-gray-500 text-[10px]! font-extralight!">You Will Be Charged The Full Amount Instantly. You Can Still Cancel Up To 24 Hours Before The Experience Starts For A Full Refund. <Link href="/" className="font-bold! underline text-black">See Cancellation Policy</Link></p>
                </div>

                <div>
                  <p className="text-[14px] text-[#264787]">Bill Details</p>
                  <div className="bg-[#FDAF46]/10 rounded-[13px]! p-2!">
                    <div className="p-1 border-b border-gray-200 flex justify-between items-center">
                      <p className="text-sm! font-normal italic! text-black">Pickup Point Fee</p>
                      <p className="text-sm! font-normal italic! text-black">50</p>
                    </div>

                    <div className="p-1 pt-2! flex justify-between items-center">
                      <p className="text-sm! font-normal italic! text-black">Tax</p>
                      <p className="text-sm! font-normal italic! text-black">15%</p>
                    </div>

                    <div className="bg-[#E44C4A] text-white rounded-[15px]! w-full px-2! flex! justify-between! items-center!">
                      <p className="text-white flex!  justify-center! items-center! h-full!  mt-3 text-sm!">Total ( Include Tax )</p>
                      <p className="text-white mt-auto! text-[17px]!">290 $</p>
                    </div>
                  </div>
                </div>
                {/* Final Submit Trigger */}
                <button
                 onClick={() => router.push("/our-services/car-reservation/success")}
                  type="submit"
                  className="w-full bg-[#264787] text-white font-semibold text-xs! py-3! rounded-xl! shadow-md hover:bg-[#264787] transition-all"
                >
                  Checkout
                </button>

                <button
                  type="submit"
                  className="w-full flex! justify-center items-center! gap-2! mt-3! bg-black text-white font-semibold text-xs! py-3! rounded-xl! shadow-md hover:bg-[#264787] transition-all"
                >
                  Pay With <FaApple />
                  Pay
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}