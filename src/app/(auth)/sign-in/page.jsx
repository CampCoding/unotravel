"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  return (
    <div className="bg-[#F5F6FA] overflow-hidden h-screen flex justify-center items-center">
      <div
        data-aos="zoom-in"
        className="container  grid grid-cols-2 items-center gap-20"
      >
        <div className="flex flex-col  items-center gap-2">
          <h3 className="!text-[#3B85C1] text-center text-[30px] 2xl:!text-[40px] !font-bold">
            Welcome!
          </h3>
          <p className="!text-[#0F3F62] text-center font-medium text-[19px]">
            For The First time, You need to sign in
          </p>
          <Image
            src="/images/BusinessCardLogo-removebg-preview.png"
            alt="logo"
            width={347}
            height={200}
          />
        </div>

        <div className="bg-white flex flex-col gap-3 !rounded-xl p-4">
          <p className="!text-base 2xl:!text-[23px] text-[#3B85C1] !font-bold">
            Sign in To Your Account
          </p>
          <div className="flex flex-col gap-1">
            <label className="!text-[#0F3F62] !font-medium !text-sm">
              Email
            </label>
            <input
              type="email"
              className="rounded-[6px] bg-[#E8F0FE] px-2 h-[40px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="!text-[#0F3F62] !font-medium !text-sm">
              Password
            </label>
            <input
              type="password"
              className="rounded-[6px] bg-[#E8F0FE] px-2 h-[40px]"
            />
          </div>

          <div className="flex gap-2 items-center">
            <input id="agree" type="checkbox" />
            <label
              htmlFor="agree"
              className="!text-black !font-medium !text-sm"
            >
              I agreed and I have read and understand Samtycke
            </label>
          </div>

          <p className="text-center text-sm 2xl:!text-base flex justify-center items-center">
            <span className="text-[#3B85C1]">Don't have account?</span>
            <Link className="text-[#EB1C24]" href={"/"}>
              <span>Register Now</span>
            </Link>
          </p>

          <button className="bg-[#264787] w-[394px] h-[50px] mx-auto !rounded-[27px] flex justify-center items-center text-white text-base font-bold">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
