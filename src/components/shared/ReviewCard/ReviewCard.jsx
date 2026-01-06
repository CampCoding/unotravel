"use client";
import { Rate } from "antd";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

export default function ReviewCard({ name, date, text, initial, color }) {
  return (
    <div className="bg-[#f4f4f4] shadow-md rounded-md p-4 w-[250px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div
          className={`text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold`}
          style={{ backgroundColor: color }}
        >
          {initial}
        </div>
        <div className="flex-1">
          <p className="text-sm !font-semibold py-0 my-0 text-black">{name}</p>
          <p className="text-xs py-0 my-0 text-gray-500">{date}</p>
        </div>
        <Image
          src="/google-icon.svg"
          alt="Google"
          width={16}
          height={16}
          className="ml-auto"
        />
      </div>

      <div className="text-[#f6be12] flex items-center gap-2 text-lg">
        <Rate className="!text-[#f6be12] !text-[20px]" /> <span className="">
        <BadgeCheck fill="#85aff7" color="white" />
        </span>
      </div>

      <p className="text-sm font-medium text-gray-700 mt-1">{text}</p>

      <p className="text-sm text-[#c2c2c2] cursor-pointer">Read more</p>
    </div>
  );
}
