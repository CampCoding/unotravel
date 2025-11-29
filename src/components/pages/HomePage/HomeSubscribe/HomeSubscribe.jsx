"use client";
import Image from "next/image";
import React from "react";

export default function HomeSubscribe({ data }) {
  return (
    <div className="container mt-[100px] md:mt-[223px]">
      <div
        data-aos="fade-up"
        style={{
          background:
            data?.data?.bg_color ||
            "linear-gradient(107deg, #264787 0%, #5796CC 100%)",
        }}
        className="w-full relative overflow-x-clip rounded-[16px] flex flex-col lg:flex-row justify-between"
      >
        {/* Left Column (Text + Form) */}
        <div className="flex flex-col px-6  py-[55px] lg:px-[55px] gap-2 z-10 max-w-[550px]">
          <p
            dangerouslySetInnerHTML={{
              __html: data?.data?.title || "Subscribe To The Newsletters",
            }}
            className="text-white my-0 py-0 text-[15px] font-medium 2xl:text-base"
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: data?.data?.subtitle || "So As Not To Miss Any Promotion",
            }}
            className="text-white my-0 py-0 text-[13px] 2xl:text-[15px]"
          ></p>

          <div className="flex flex-col sm:flex-row mt-[20px] gap-4 sm:gap-[21px] items-start sm:items-center">
            <input
              required={data?.data?.input_required}
              type={data?.data?.input_type}
              name={data?.data?.input_name}
              placeholder={data?.data?.input_placeholder || "Enter Your Email"}
              className={`w-full border border-[${data?.data?.input_border_color}] sm:w-[315px] h-[50px] bg-[${data?.data?.input_bg_color}] !rounded-lg py-[15px] px-[20px] text-[${data?.data?.input_text_color}] placeholder:text-[${data?.data?.input_placeholder_color}] font-medium text-base outline-none`}
            />
            <button
              className={`w-full sm:w-[119px] h-[50px] flex justify-center hover:bg-[${
                data?.data?.button_hover_color
              }] items-center !rounded-lg text-[${
                data?.data?.button_text_color
              }] bg-[${data?.data?.button_color || "#63B7FF"}] `}
            >
              {data?.data?.button_label || "Subscribe"}
            </button>
          </div>

          <div className="mt-6  flex flex-col max-w-[420px] text-white text-sm leading-snug">
            <div className="flex my-0 py-0 gap-[12px]">
              <div className="min-w-[20px]  h-[20px] rounded-full flex justify-center items-center bg-[#63B7FF] text-white text-xs font-bold">
                1
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: data?.data?.note_1 }}
                className="my-0 py-0"
              >
                {/* By clicking "Subscribe," you consent to receive news,
                promotions, and offers via email from Uno Travel. Rest assured,
                your information will be handled in */}
              </p>
            </div>
            <div className="flex my-0 py-0 gap-[12px]">
              <div className="min-w-[20px] h-[20px] rounded-full flex justify-center items-center bg-[#63B7FF] text-white text-xs font-bold">
                2
              </div>
              <p dangerouslySetInnerHTML={{ __html: data?.data?.note_2 }}></p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="-mt-10 z-30 lg:mt-0 lg:absolute rotate-0 lg:-rotate-[12deg] lg:-right-[80px] !bottom-0 lg:!bottom-[70px]">
          <Image
            src={data?.data?.illustration_image || "/images/form (1).webp"}
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
