"use client";
import { CalendarDays, Eye, MapPin } from "lucide-react";
import React, { useRef, useState } from "react";

export default function ToursBookingContent() {
  const inputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("2023-04-16");
  return (
    <div
    data-aos="fade-up-left"
    className="flex flex-col gap-4 !overflow-hidden">
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="flex sm:flex-nowrap flex-wrap gap-2 items-center justify-between"
      >
        <div className="flex flex-col gap-[2px]">
          <p className="italic py-0 my-0 !text-[#264787] !text-base 2xl:!text-[23px]">
            Select Travelers:
          </p>
          <p className="italic py-0 my-0 !text-[#E44C4A] !text-md 2xl:!text-[18px]">
            You can select up to 15 travelers in total.
          </p>
        </div>

        <div className="flex min-w-[96px] h-[30px] justify-around items-center text-white bg-[#3B85C1] rounded-[30px]">
          <button className="!text-lg 2xl:!text-2xl">+</button>
          <p className="font-bold !text-lg 2xl:!text-2xl m-0 p-0">2</p>
          <button className="!text-lg 2xl:!text-2xl">-</button>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="200"
className="flex sm:flex-nowrap flex-wrap gap-2 items-center justify-between"      >
        <label
          onClick={() => inputRef.current?.showPicker?.()}
          htmlFor="date"
          className="!flex relative gap-2 items-center"
        >
          <CalendarDays color="#3B85C1" size={42} />
          <p className="italic my-auto  text-[#264787] !text-base 2xl:!text-[23px]">
            Select Date Of Booking
          </p>

          <input
            ref={inputRef}
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </label>
        <p className="font-bold  my-auto underline text-[#EB1C24] !text-base 2xl:!text-[20px]">
          {new Date(selectedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="flex flex-col gap-2"
      >
        <p className="text-[#264787]  italic !text-base 2xl:!text-[23px]">
          Meeting Option:
        </p>
        <div className="flex flex-col gap-[15px]">
          <div className="flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
              <input
                id="metting"
                name="metting"
                type="radio"
                className="w-5 h-5 accent-[#264787]"
              />
              <label
                htmlFor="metting"
                className="!text-[#3A3737] !font-normal !text-base 2xl:text-xl"
              >
                Meeting Point
              </label>
            </div>
            <div className="2xl:!w-[43px] w-[33px] h-[33px] 2xl:!h-[43px] !rounded-lg flex justify-center items-center bg-[#264787]">
              <Eye color="white" size={23} />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
              <input
                id="pickup_metting"
                name="metting"
                type="radio"
                className="w-5 h-5 accent-[#264787]"
              />
              <label
                htmlFor="pickup_metting"
                className="!text-[#3A3737] !font-normal !text-base 2xl:text-xl"
              >
                Pickup Point
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[#E44C4A] !text-base my-auto 2xl:!text-[22px]">
                Extra <span className="font-bold">50</span> $
              </p>
              <div className="2xl:!w-[43px] w-[33px] h-[33px] 2xl:!h-[43px] !rounded-lg flex justify-center items-center bg-[#E44C4A]">
                <MapPin color="white" size={23} />
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl bg-[#3B85C1] my-3 p-[27px] text-white flex !justify-between !items-center">
            <p className="!text-white !my-auto !text-sm 2xl:!text-[17px]">
              Total Price (Including Tax)
            </p>
            <p className="!text-xl !text-white !my-auto 2xl:!text-10">
              <span className="font-bold !text-white !text-xl 2xl:!text-10">250</span>$
            </p>
          </div>

          <button className="bg-[#264787] !rounded-[37px] flex justify-center items-center h-[60px] text-white text-xl 2xl:!text-[28px]">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
