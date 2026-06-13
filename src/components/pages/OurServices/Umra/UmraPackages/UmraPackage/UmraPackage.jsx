"use client";
import { Eye, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import UmraPackageModal from "../UmraPackageModal/UmraPackageModal";
import { useLockBodyScroll } from "../../../../../../../hooks/useLockBodyScroll";

export default function UmraPackage({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useLockBodyScroll(openModal);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div>
      <div className="rounded-xl">
        <div
          data-aos="fade-up"
          data-aos-delay={data?.id * 100}
          className="bg-[#F5F6FA] p-3! flex flex-col sm:flex-row gap-4 rounded-xl"
        >
          {/* Image Section */}
          <img
            src={data?.image}
            className="w-full sm:w-[136px] h-[200px] sm:h-[177px] object-cover rounded-xl"
            alt={data?.title}
          />

          {/* Content */}
          <div className="flex flex-col  w-full justify-between gap-4 sm:gap-0">
            <div>
              <h2 className="text-black text-[14px]! sm:text-[16px]! 2xl:text-[23px]! font-bold!">
                {data?.title}
              </h2>
              
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#B4B4B4] text-sm! sm:text-[14px]! 2xl:text-[20px]! font-medium! truncate max-w-full">
                {data?.subtitle}
              </p>
              <div className="flex justify-between  items-center!">
                <p className="font-bold text-[18px]!  sm:text-[20px] my-auto! 2xl:text-[30px]! text-[#3B85C1]">
                {data?.price} $
              </p>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-[#264787] w-full  h-[45px] sm:h-[50px] justify-center text-white flex gap-2 items-center  px-2 md:px-4 py-1 md:py-2 rounded-lg! text-sm sm:text-base"
                >
                  <Eye color="white" />
                  <span>View Tour</span>
                </button>
                <button
                  onClick={toggleFavorite}
                  className="w-[45px] sm:w-[65px] h-[45px] sm:h-[50px] flex justify-center items-center bg-[#e4e6ec] rounded-lg! transition"
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
      </div>

      <UmraPackageModal open={openModal} setOpen={setOpenModal} data={data} />
    </div>
  );
}
