"use client";
import Image from "next/image";
import React from "react";

export default function HomeSubscribe() {
  return (
    <div className="container mt-[100px] md:mt-[223px]">
      <div
        data-aos="fade-up"
        style={{
          background:
            "linear-gradient(107deg, #264787 0%, #5796CC 100%)",
        }}
        className="w-full relative overflow-x-clip rounded-[16px] flex flex-col lg:flex-row justify-between"
      >
        {/* Left Column (Text + Form) */}
        <div className="flex flex-col px-6  py-[55px] lg:px-[55px] gap-2 z-10 max-w-[550px]">
          <p className="text-white my-0 py-0 text-[15px] font-medium 2xl:text-base">
            Subscribe To The Newsletters
          </p>
          <p className="text-white my-0 py-0 text-[13px] 2xl:text-[15px]">
            So As Not To Miss Any Promotion
          </p>

          <div className="flex flex-col sm:flex-row mt-[20px] gap-4 sm:gap-[21px] items-start sm:items-center">
            <input
              placeholder="Enter Your Email"
              className="w-full sm:w-[315px] h-[50px] bg-[#F8F8F8] !rounded-lg py-[15px] px-[20px] text-[#264787] placeholder:text-[#264787] font-medium text-base outline-none"
            />
            <button className="w-full sm:w-[119px] h-[50px] flex justify-center items-center !rounded-lg text-white bg-[#63B7FF]">
              Subscribe
            </button>
          </div>

          <div className="mt-6  flex flex-col max-w-[420px] text-white text-sm leading-snug">
            <div className="flex my-0 py-0 gap-[12px]">
              <div className="min-w-[20px]  h-[20px] rounded-full flex justify-center items-center bg-[#63B7FF] text-white text-xs font-bold">
                1
              </div>
              <p className="my-0 py-0">
                By clicking "Subscribe," you consent to receive news,
                promotions, and offers via email from Uno Travel. Rest assured,
                your information will be handled in
              </p>
            </div>
            <div className="flex my-0 py-0 gap-[12px]">
              <div className="min-w-[20px] h-[20px] rounded-full flex justify-center items-center bg-[#63B7FF] text-white text-xs font-bold">
                2
              </div>
              <p>accordance with our privacy policy.</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="-mt-10 z-30 lg:mt-0 lg:absolute rotate-0 lg:-rotate-[12deg] lg:-right-[80px] !bottom-0 lg:!bottom-[70px]">
          <Image
            src="/images/form (1).webp"
            height={700}
            width={850}
            className=""
            alt="subscribe illustration"
          />
        </div>
      </div>
    </div>
  );
}
