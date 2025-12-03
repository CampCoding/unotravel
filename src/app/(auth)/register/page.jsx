"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, X, Clock } from "lucide-react";
import ServiceTime from "@/components/pages/auth/Register/ServiceTime";
import ServiceLocation from "@/components/pages/auth/Register/ServiceLocation";

export default function SignUpPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  if (typeof window == undefined) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="p-5 max-w-5xl mx-auto">
        <div className="flex items-center p-5 mx-auto mb-5">
          <div className="flex flex-col items-center flex-grow">
            <h1 className="text-3xl font-[filson-bold] text-[var(--main-dark-color)] relative text-center leading-tight">
              Lead{" "}
              <span className="text-[var(--main-light-color)]">
                Uno{" "}
                <span className="relative inline-block">
                  Travel
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 10"
                    className="absolute left-1/2 -translate-x-1/2 -rotate-6 bottom-[-8px] w-18 h-3 text-[var(--main-light-color)]"
                  >
                    <path
                      d="M0,5 Q50,-4 100,5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>
          </div>
        </div>

        {/* =================== MODAL =================== */}
        {isOpen &&
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-3xl w-[90%] max-w-[650px] relative max-h-[90vh] overflow-y-auto shadow-lg px-4 py-6 md:p-6">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X />
              </button>

              {/* Modal Content */}
              <div className="flex flex-col items-center w-full gap-8">
                {/* Header */}
                <div className="flex flex-col items-center">
                  <h1 className="text-3xl font-[filson-bold] text-[var(--main-dark-color)] relative text-center">
                    Pickup{" "}
                    <span className="text-[var(--main-light-color)] relative inline-block">
                      Point
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 10"
                        className="absolute left-1/2 -translate-x-1/2 -rotate-6 bottom-[-8px] w-18 h-3 text-[var(--main-light-color)]"
                      >
                        <path
                          d="M0,5 Q50,-4 100,5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </h1>
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-3xl flex flex-col justify-center items-center w-full px-4 lg:px-6 py-10">
                  {/* TIME Section */}
                  <div className="w-full flex flex-col gap-5">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex ml-5 items-center gap-2">
                        <Clock
                          size={17}
                          className="text-[var(--main-light-color)]"
                        />
                        <p className="text-[var(--main-light-color)] font-[filson-medium] tracking-wide">
                          TIME
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      <ServiceTime />
                    </div>
                  </div>

                  {/* LOCATION Section */}
                  <div className="w-full mt-6">
                    <ServiceLocation />
                  </div>

                  {/* Confirm Button */}
                  <button className="bg-[var(--main-dark-color)] text-white text-sm font-[filson-medium] px-6 py-2 rounded-full mt-8 cursor-pointer">
                    Confirm time & location
                  </button>
                </div>
              </div>
            </div>
          </div>}

        {/* =================== MAIN SIGN-UP FORM =================== */}
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <p className="text-gray-400 text-sm font-[filson-light] my-3">
            We'll use your information to send confirmations and updates about
            your booking.
          </p>

          {/* Log In */}
          <div className="flex justify-between items-center mb-10">
            <p className="underline text-red-400 font-[filson-light] cursor-pointer">
              Already have an account?
            </p>
            <button
              onClick={() => router.push(`/sign-in`)}
              className="bg-[var(--main-dark-color)] hover:bg-[#1f3a6d] text-white font-[filson-thin] !rounded-xl px-4 py-1 transition"
            >
              Log In
            </button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            {/* Full Name */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-regular-italic] mb-3">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-regular-italic] mb-3">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-regular-italic] mb-3">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base"
              />
            </div>

            {/* Meeting / Pickup */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-regular-italic] mb-3">
                Meeting Address or Pickup Point
              </label>
              <div className="relative flex gap-3">
                <input
                  type="text"
                  name="pickupPoint"
                  placeholder="Location..."
                  className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base"
                />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-[var(--main-light-color)] hover:bg-[#3173aa] text-white p-4 !rounded-2xl flex-shrink-0"
                >
                  <MapPin size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-8">
            <label className="block text-[var(--main-dark-color)] font-[filson-regular-italic] mb-3">
              Notes
            </label>
            <textarea
              name="notes"
              placeholder="Any additional notes..."
              className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 resize-none h-32 text-base"
            />
          </div>

          {/* Continue */}
          <button
            onClick={() => router.push(`/sign-in`)}
            type="button"
            className="w-full !mt-4 bg-[var(--main-dark-color)] hover:bg-[#1f3a6d] text-white py-4 font-[filson-regular] !rounded-full cursor-pointer transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
