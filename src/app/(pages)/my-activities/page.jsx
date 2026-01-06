"use client";
import React, { useState } from "react";
import { MessageCircleMore } from "lucide-react";
import { motion } from "framer-motion";
import { Modal } from "antd";
import MainBanner from "../../../components/shared/MainBanner/MainBanner";

export default function ActivityPage() {
  const [activeTabs, setActiveTabs] = useState("trips");
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const tabs = [
    { id: "trips", label: "Trips", bgColor: "bg-amber-500" },
    { id: "rides", label: "Rides", bgColor: "bg-[#264787]" },
    { id: "pastBooking", label: "Past Bookings", bgColor: "bg-gray-400" },
  ];

  const data = {
    trips: [
      {
        id: 1,
        img: "/images/Flights slider (1).webp",
        code: "DF8T-HG8T-TG8E",
        value: 250,
        status: "Completed",
        color: "text-teal-500",
      },
      {
        id: 2,
        img: "/images/Flights slider (2).webp",
        code: "XK9J-RT7U-WQ8Z",
        value: 150,
        status: "Pending",
        color: "text-amber-500",
      },
      {
        id: 3,
        img: "/images/Flights slider (3).webp",
        code: "LY7D-KH3M-VT9B",
        value: 200,
        status: "Canceled",
        color: "text-red-600",
      },
    ],
    rides: [
      {
        id: 4,
        img: "/images/download (18).jfif",
        code: "PT5Q-RN9X-ZY4F",
        value: 75,
        status: "Refused",
        color: "text-red-600",
      },
      {
        id: 5,
        img: "/images/download (6).jfif",
        code: "WU3V-TG1L-RF6B",
        value: 220,
        status: "Completed",
        color: "text-teal-500",
      },
    ],
    pastBooking: [
      {
        id: 6,
        img: "/images/download (8).jfif",
        code: "PT5Q-RN9X-ZY4F",
        value: 75,
        status: "Completed",
        color: "text-teal-600",
      },
      {
        id: 7,
        img: "/images/download (18).jfif",
        code: "WU3V-TG1L-RF6B",
        value: 220,
        status: "Completed",
        color: "text-teal-600",
      },
    ],
  };

  const handleOpenDetails = (item) => {
    setSelectedBooking(item);
    setOpenDetails(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <MainBanner
        title="My Activity"
        subtitle="Track all your recent trips, rides, and past bookings in one place."
      />

      {/* Filter & Tabs */}
      <div className="max-w-7xl mx-auto mt-12 px-6 select-none">
        <p className="text-xl text-[var(--main-dark-color)] mb-4">
          Filter For The Service
        </p>

        <div className="flex justify-start items-center w-full my-6 gap-3">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTabs(tab.id)}
              animate={activeTabs === tab.id ? "click" : "inactive"}
              variants={{
                click: {
                  x: [100, 0],
                  opacity: [0, 1],
                  transition: { duration: 0.5 },
                },
                inactive: { x: 0, opacity: 1 },
              }}
              className={`text-base cursor-pointer px-8 py-1 rounded-full transition-all duration-300 ${
                activeTabs === tab.id
                  ? `${tab.bgColor} text-white`
                  : "text-gray-400"
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {data[activeTabs].map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 150} // 👈 each card delayed 150ms more than previous
              data-aos-duration="800"
              className={`flex items-center justify-between ${
                activeTabs === "rides"
                  ? "bg-[var(--main-dark-color)] text-white"
                  : "bg-gray-100"
              } rounded-3xl p-5 lg:p-6 shadow-md hover:shadow-lg transition-all cursor-pointer`}
              onClick={() => handleOpenDetails(item)}
            >
              <div className="flex gap-3">
                <img
                  className="rounded-2xl w-28 h-32 object-cover"
                  src={item.img}
                  alt=""
                />
                <div className="flex flex-col justify-between">
                  <h4 className="text-lg font-[filson-medium] text-[var(--main-dark-color)]">
                    {item.code}
                  </h4>
                  <p className="text-sm text-gray-500">15 Travelers</p>
                  <p className="text-sm text-[var(--main-dark-color)] font-[filson-medium]">
                    Value: {item.value} SAR
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${item.color} bg-current`}
                  ></span>
                  <p className={`${item.color} text-sm`}>{item.status}</p>
                </div>
                <MessageCircleMore className="text-[var(--main-dark-color)] w-6 h-6 cursor-pointer" />
                <p className="text-xs text-gray-500">05:19 PM</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ BOOKING DETAILS MODAL ============ */}
      <Modal
        open={openDetails}
        onCancel={() => setOpenDetails(false)}
        footer={null}
        width={950}
        centered
        title={
          <h3 className="text-lg font-semibold text-[var(--main-dark-color)]">
            Booking Details
          </h3>
        }
      >
        {selectedBooking && (
          <div className="rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 text-[0.9rem]">
            {/* LEFT */}
            <div className="space-y-8 mt-3">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <h3 className="text-[var(--main-dark-color)] font-medium !text-sm md:!text-base">
                    Order ID
                  </h3>
                  <p className="text-gray-400 !text-sm">
                    {selectedBooking.code}
                  </p>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-[var(--main-dark-color)] font-medium !text-sm md:!text-base">
                    Booking Status
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--main-light-color)]"></span>
                    <p className="text-[var(--main-light-color)] my-auto !text-sm">
                      {selectedBooking.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <h3 className="text-[var(--main-dark-color)] font-medium !text-sm md:!text-base">
                  Payment Method
                </h3>
                <div className="flex gap-3">
                  <img
                    className="w-14 h-9 border object-cover rounded-md"
                    src="/images/-60bb8QP_400x400.jpg"
                    alt="Visa"
                  />
                  <img
                    className="w-12 h-9 border object-cover rounded-md"
                    src="/images/Mastercard-Simbolo.jpg"
                    alt="MasterCard"
                  />
                </div>
              </div>

              {/* Note */}

              {/* Bill Details */}
              <div>
                <h3 className="text-[var(--main-dark-color)] mb-2 !text-sm md:!text-base">
                  Bill Details
                </h3>
                <div className="bg-gray-100 p-3 rounded-2xl space-y-3 !text-sm">
                  <div className="flex justify-between">
                    <p>Pickup Point Fee</p>
                    <p>50</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax</p>
                    <p>15%</p>
                  </div>
                  <div className="bg-[var(--main-dark-color)] text-white px-3 py-2 rounded-full flex justify-between items-center !text-sm mt-3">
                    <p className="my-auto">Total (Include Tax)</p>
                    <p className="my-auto">
                      {Number(selectedBooking.value) + 50} $
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <h3 className="text-[var(--main-dark-color)] mb-2 !text-sm md:!text-base">
                My Tour
              </h3>
              <div className="bg-gray-100 flex items-stretch gap-4 p-3 rounded-2xl shadow-sm w-full">
                <img
                  width={100}
                  height={100}
                  className="rounded-2xl w-28 h-28 object-cover"
                  src={selectedBooking.img}
                  alt="Tour"
                />
                <div className="flex flex-col justify-between w-full !text-sm">
                  <p className="text-[var(--main-dark-color)] !text-base font-medium">
                    Taif City Tour
                  </p>
                  <p className="text-amber-500 !text-xs md:!text-sm">
                    15 Travelers
                  </p>
                  <h3 className="text-[var(--main-dark-color)] !text-lg font-semibold">
                    {selectedBooking.value} SAR
                  </h3>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-[var(--main-dark-color)] mb-1 !text-sm md:!text-base">
                  Note
                </h3>
                <div className="bg-gray-100 p-3 rounded-2xl text-gray-400 !text-xs md:!text-sm">
                  “On the other hand, we denounce who the charms of pleasure…”
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
