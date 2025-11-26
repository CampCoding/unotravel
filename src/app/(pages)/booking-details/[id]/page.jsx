"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import MainBanner from "../../../../components/shared/MainBanner/MainBanner";


export default function BookingDetailsPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const value = searchParams.get("value");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen bg-gray-50 font-filson">
      {/* Header */}
      <MainBanner title={"Booking Details"}/>

      {/* Content */}
      <div className="max-w-7xl mx-auto bg-white p-10 rounded-3xl shadow-md grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-[var(--main-dark-color)] font-medium">Order ID</h3>
              <p className="text-gray-400">{code}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-[var(--main-dark-color)] font-medium">Booking Status</h3>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--main-light-color)]"></span>
                <p className="text-[var(--main-light-color)]">{status}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[var(--main-dark-color)] font-medium">Payment Method</h3>
            <div className="flex gap-4">
              <img className="w-16 h-10 border object-cover rounded-md" src={"/images/-60bb8QP_400x400.jpg"} alt="Visa" />
              <img className="w-14 h-10 border object-cover rounded-md" src={"/images/Mastercard-Simbolo.jpg"} alt="MasterCard" />
            </div>
          </div>

          <div>
            <h3 className="text-[var(--main-dark-color)] mb-2">Note</h3>
            <div className="bg-gray-100 p-5 rounded-2xl text-gray-400">
              “On the other hand, we denounce who the charms of pleasure...”
            </div>
          </div>

          <div>
            <h3 className="text-[var(--main-dark-color)] mb-3">Bill Details</h3>
            <div className="bg-gray-100 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between">
                <p>Pickup Point Fee</p>
                <p>50</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>15%</p>
              </div>
              <div className="bg-[var(--main-dark-color)] text-white px-4 py-2 rounded-full flex justify-between items-center">
                <p>Total (Include Tax)</p>
                <p>{Number(value) + 50} $</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="text-[var(--main-dark-color)] mb-3">My Tour</h3>
          <div className="bg-gray-100 flex items-stretch gap-6 p-5 rounded-2xl shadow-sm w-full">
            <img
              width={120}
              height={120}
              className="rounded-2xl w-32 h-32 object-cover"
              src={"/images/-60bb8QP_400x400.jpg"}
              alt="Tour"
            />
            <div className="flex flex-col justify-between w-full">
              <p className="text-[var(--main-dark-color)] text-lg">Taif City Tour</p>
              <p className="text-amber-500 text-sm">15 Travelers</p>
              <h3 className="text-[var(--main-dark-color)] text-2xl">{value} SAR</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
