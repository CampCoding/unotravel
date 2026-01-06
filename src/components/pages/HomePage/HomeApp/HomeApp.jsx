"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ErrorImage from "../../../shared/ErrorImage";

export default function HomeApp({data}) {
  return (
    <div className="container mt-[123px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 xl:gap-x-[241px] items-center">
        {/* Text Section */}
        <div data-aos="fade-up-left" className="flex flex-col gap-2">
          <p
          dangerouslySetInnerHTML={{__html : data?.data?.small_title || "Get Our Super App Today!"}}
          className="text-(--main-dark-color) font-medium my-0 py-0 text-[13px] xl:text-base">
         
          </p>
          <h3 
          dangerouslySetInnerHTML={{__html : data?.data?.main_title || "Manage all to-dos with one app!"}}
          className="!text-(--main-light-color) my-0 py-0 !font-bold text-[14px] xl:text-xl">
           
          </h3>
          <p 
          dangerouslySetInnerHTML={{__html : data?.data?.description || "Book appointments, view profiles, get offers, and manage everything easily in one place!"}}
          className="text-(--main-dark-color) font-medium my-0 py-0 text-[13px] xl:text-base">
           
          </p>

          <div className="mt-[30px] xl:mt-[50px] flex flex-wrap gap-3 2xl:gap-5 items-center">
           <Link href={`${data?.data?.app_store_url}`}>
              <ErrorImage
              image={data?.data?.app_store_badge}
              FALLBACK_IMG={"/images/google-play-badge.webp"}
              width={212}
              height={63}
              alt="google play badge"
              className="!w-[160px] 2xl:!w-[212px] h-auto"
            />
           </Link>

           <Link href={`${data?.data?.google_play_url}`}>
            <ErrorImage
              image={data?.data?.google_play_badge}
              FALLBACK_IMG={"/images/download-on-the-app-store-apple (1).webp"}
              width={212}
              height={63}
              alt="app store badge"
              className="!w-[160px] 2xl:!w-[212px] h-auto"
            />
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div
          data-aos="fade-up-right"
          className="w-full flex justify-center mt-10 md:mt-0"
        >
          <ErrorImage
            image={data?.data?.app_image}
            FALLBACK_IMG={"/images/Manage all to-dos with one app!.webp"}
            width={521}
            height={500}
            alt="app"
            className="w-[280px] sm:w-[350px] xl:w-[521px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
