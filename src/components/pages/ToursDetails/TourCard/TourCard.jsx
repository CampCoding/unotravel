"use client";
import { Eye, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";

export default function TourCard({ item }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  return (
    <div className="rounded-xl">
      <div
        data-aos="fade-up"
        data-aos-delay={item?.id * 100}
        className="bg-[#F5F6FA] p-2 sm:p-2 flex flex-col sm:flex-row gap-4 rounded-xl"
      >
        {/* Image Section */}
        <img
          src={item?.image}
          className="w-full sm:w-[136px] h-[200px] sm:h-[177px] object-cover rounded-xl"
          alt={item?.title}
        />

        {/* Content */}
        <div className="flex flex-col w-full justify-between gap-4 sm:gap-0">
          <div>
            <h2 className="text-black !text-[14px] sm:!text-[16px] 2xl:!text-[23px] font-bold">
              {item?.title}
            </h2>
            <p className="text-[#B4B4B4] text-sm sm:text-[14px] 2xl:text-[20px] font-bold truncate max-w-full">
              {item?.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <p className="font-bold !text-[18px] sm:text-[20px] 2xl:text-[30px] text-[#3B85C1]">
              {item?.price} $
            </p>

            <div className="flex gap-2 items-center">
              <button
                onClick={() =>
                  router.push(`/our-offers/toursDetails/${item?.id}`)
                }
                className="bg-[#264787] w-full sm:w-auto h-[45px] sm:h-[50px] justify-center text-white flex gap-2 items-center  px-2 md:px-4 py-1 md:py-2 !rounded-lg text-sm sm:text-base"
              >
                <Eye color="white" />
                <span>View Tour</span>
              </button>
              <button
                onClick={toggleFavorite}
                className="w-[45px] sm:w-[50px] h-[45px] sm:h-[50px] flex justify-center items-center bg-[#e4e6ec] !rounded-lg transition"
              >
                <Heart
                  color={!isFavorite ? "white" : "#FF5B5B"}
                  fill={!isFavorite ? "#fff" : "#FF5B5B"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
