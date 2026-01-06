import Image from "next/image";
import React from "react";
import Tilt from "react-parallax-tilt";
import ErrorImage from "../../../../shared/ErrorImage";

export default function HomeProjectCard({ item , onclick}) {
  return (
    <div 
    onClick={onclick ? onclick :null}
    data-aos="fade-up" data-aos-delay={item?.article_id * 100} key={item?.article_id}>
      <Tilt className="bg-[#ECECEC] rounded-xl h-[400px]">
        <div className="relative">
          <ErrorImage
            alt="home project image"
            image={item?.image_url}
            FALLBACK_IMG={`/images/blogs (1).webp`}
            className="object-cover w-full rounded-xl"
            width={428}
            height={238}
          />
          <div
            className={`absolute w-[59px] h-[28px] rounded-[3px] left-4 -bottom-3 text-white flex justify-center text-md items-center ${
              item?.category_key?.toLowerCase() == "Blog"?.toLowerCase() ? "bg-[#E50019]" : "bg-[#3B85C1]"
            }`}
          >
            {item?.category_name}
          </div>
        </div>
        <div className="mt-[26px] pb-4 px-4">
          <h4 className="!font-bold !text-[#264787] !text-lg 2xl:!text-xl">
            {item?.title}
          </h4>
          <div className="mt-2">
            <span className="text-[#888888] text-sm">{item?.short_text}</span>
            <span className="text-[#3B85C1] text-sm font-medium cursor-pointer">
              Read More
            </span>
          </div>
        </div>
      </Tilt>
    </div>
  );
}
