"use client";

import React, { useState } from "react";
import { IoIosAirplane } from "react-icons/io";

export default function FlightResultCard({
  id,
  selected = false,
  onSelect,
  dateText = "Fri, 23 Aug, 2024",
  fromCity = "Stockholm",
  toCity = "Dubai",
  flight1 = {
    from: "ARN",
    time: "12:05",
    to: "SAW",
    timeTo: "16:40",
    code: "PC-1280",
  },
  flight2 = {
    from: "SAW",
    time: "21:50",
    to: "DXB",
    timeTo: "03:15",
    code: "PC-740",
  },
  stopText = "1 stopp",
  durationText = "Duration 13h",
  durationText2 = "10m",
  seatsText = "Only 2 Seat(s) Available",
  baggageText = "Check in baggage incl.",
  baggageIncluded = "per Adult: 20 kg",
  refundable = true,
  refundableType = "Refundable",
  priceTitle = "Price for 1 Person(s)",
  price = "5.609,00 SEK",
  priceSub = "per Adult: 5.609,00",
  setSelectedTours,
}) {
  const [selectedType, setSelectedType] = useState(null);
  console.log(selected);

  return (
    <div
      className={[
        "w-full rounded-md border bg-white shadow-sm overflow-hidden cursor-pointer",
        selected
          ? "border-[#0B63B9] ring-2 ring-[#0B63B9]/20"
          : "border-[#9CB7D2]",
      ].join(" ")}
    >
      {/* Top header */}
      <div className="border-b border-[#D6E4F2]">
        <div className="bg-[#7F98B4] text-white px-3 py-1.5 flex items-center gap-2">
          <IoIosAirplane className="h-4 w-4" />
          <span className="text-sm font-semibold">Departure</span>
        </div>

        <div className="px-3 py-2">
          <div className="text-xs text-[#2F5F9A] font-semibold">{dateText}</div>

          <div className="mt-0.5 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-700">
              {fromCity}
            </div>

            <div className="flex items-center gap-2 text-[#2F5F9A]">
              <IoIosAirplane className="h-4 w-4" />
            </div>

            <div className="text-sm font-semibold text-slate-700">{toCity}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-3 py-3">
        {/* Select row + airline blocks */}
        <div className="flex items-start gap-3">
          <div className="pt-1"></div>

          <div className="flex-1">
            {/* airline / flight codes row */}
            <div className="flex items-center gap-6">
              <div
                onClick={() => {
                  setSelectedType(flight1.code);
                }}
                className={`${
                  selectedType === flight1.code
                    ? "bg-[#2F5F9A] text-white"
                    : "text-slate-800"
                }  p-1 !rounded-md cursor-pointer`}
              >
                <div className="flex items-center gap-2">
                  <AirlineMark />
                  <span className="text-xs">({flight1.code})</span>
                </div>
              </div>
              <div
                onClick={() => {
                  setSelectedType(flight2.code);
                }}
                className={`${
                  selectedType === flight2.code
                    ? "bg-[#2F5F9A] text-white"
                    : "text-slate-800"
                }  p-1 !rounded-md cursor-pointer`}
              >
                <div className="flex items-center gap-2">
                  <AirlineMark />
                  <span className="text-xs ">({flight2.code})</span>
                </div>
              </div>
            </div>

            {/* timetable + stop info */}
            <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              {/* left times */}
              <div className="text-sm leading-5">
                <div className="font-semibold text-[#2F5F9A]">
                  {flight1.from}{" "}
                  <span className="text-slate-700 font-semibold ml-1">
                    {flight1.time}
                  </span>
                </div>
                <div className="font-semibold text-[#2F5F9A]">
                  {flight2.from}{" "}
                  <span className="text-slate-700 font-semibold ml-1">
                    {flight2.time}
                  </span>
                </div>
              </div>

              {/* mid stop line */}
              <div className="flex flex-col items-center min-w-[110px]">
                <div className="text-xs font-semibold text-red-500">
                  {stopText}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <div className="w-14 border-t border-dashed border-slate-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <InfoIcon className="h-4 w-4 text-[#2F5F9A]" />
                </div>
                <div className="mt-1 text-xs text-[#2F5F9A] font-semibold">
                  {durationText}
                </div>
                <div className="text-xs text-[#2F5F9A] font-semibold">
                  {durationText2}
                </div>
              </div>

              {/* right times */}
              <div className="text-sm leading-5 text-right">
                <div className="font-semibold text-[#2F5F9A]">
                  {flight1.to}{" "}
                  <span className="text-slate-700 font-semibold ml-1">
                    {flight1.timeTo}
                  </span>
                </div>
                <div className="font-semibold text-[#2F5F9A]">
                  {flight2.to}{" "}
                  <span className="text-slate-700 font-semibold ml-1">
                    {flight2.timeTo}
                  </span>
                </div>
              </div>
            </div>

            {/* small notes row */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#2F5F9A]">
              <span className="inline-flex items-center gap-1">
                <SeatIcon className="h-4 w-4 text-green-600" />
                {seatsText}
              </span>

              <span className="inline-flex items-center gap-1">
                <BaggageIcon className="h-4 w-4 text-green-600" />
                {baggageText}
              </span>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-[#2F5F9A] underline underline-offset-2"
              >
                <DocIcon className="h-4 w-4 text-green-600" />
                Fare Rules
              </button>
            </div>

            {/* baggage included */}
            <div className="mt-2 rounded-sm border border-[#D6E4F2] bg-[#F6FAFF] px-2 py-1 text-xs">
              <span className="font-semibold text-[#2F5F9A] inline-flex items-center gap-1">
                <SuitcaseIcon className="h-4 w-4 text-green-600" />
                Baggage Included:
              </span>
              <span className="ml-2 text-slate-600 font-semibold">
                {baggageIncluded}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price area with ribbon */}
      <div className="relative border-t border-[#D6E4F2] bg-white px-3 pt-10 pb-3">
        {/* Ribbon */}

        <div className="absolute right-0 top-0">
          <div className="relative">
            <div
              className={`${
                refundable ? "bg-green-600" : "bg-red-600"
              }  text-white text-xs font-semibold px-4 py-1 pl-10`}
            >
              {refundableType}
            </div>
            <div className="absolute left-0 top-0 w-0 h-0 border-t-[26px] border-t-white border-r-[26px] border-r-transparent" />
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm text-slate-600 font-semibold">
            {priceTitle}
          </div>
          <div className="mt-1 text-2xl font-extrabold text-slate-800">
            {price}
          </div>
          <div className="text-xs text-slate-500 font-semibold">{priceSub}</div>
        </div>

        <button
          type="button"
          onClick={() => {
            onSelect?.();
          }}
          className={`mt-3 w-full ${
            selected ? "bg-red-600" : "bg-[#2F5F9A]"
          } text-white font-semibold py-3 rounded-sm hover:opacity-95 active:scale-[0.99] transition`}
        >
          {selected ? "Selected" : "Select"} <span className="ml-1">✈</span>
        </button>
      </div>
    </div>
  );
}

/* ------- tiny icons ------- */

function PlaneIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M2 16l20-6-20-6 4 6-4 6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 10h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InfoIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 10v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 7h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AirlineMark() {
  return (
    <div className="h-5 w-6 rounded-sm bg-amber-100 border border-amber-200 grid place-items-center">
      <span className="text-amber-500 text-xs font-black">✈</span>
    </div>
  );
}

function SeatIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M7 13V6a2 2 0 114 0v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 20v-3a4 4 0 014-4h8a4 4 0 014 4v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BaggageIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M7 7V6a3 3 0 013-3h4a3 3 0 013 3v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="7"
        width="14"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 11v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 11v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SuitcaseIcon({ className = "" }) {
  return <BaggageIcon className={className} />;
}

function DocIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3h7l3 3v15a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 11h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 15h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
