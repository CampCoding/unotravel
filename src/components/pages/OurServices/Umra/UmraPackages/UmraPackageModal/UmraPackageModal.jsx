"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useLockBodyScroll } from "../../../../../../../hooks/useLockBodyScroll";
import { useUmrah } from "@/context/UmrahContext";

export default function UmraPackageModal({ open, setOpen, data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [adults, setAdults] = useState(2);
  const router = useRouter();
  const { setSelectedPackage } = useUmrah();

  useLockBodyScroll(open);

  const basePrice = Number(data?.price ?? 0);
  const totalPrice = basePrice * adults;

  const costs = Array.isArray(data?.costs) ? data.costs : [];

  const handleRegister = () => {
    setSelectedPackage({
      id:           data?.id,
      name:         data?.title || data?.package_title || "Umrah Package",
      image:        data?.image,
      duration:     data?.duration,
      travel_dates: data?.travel_dates,
      costs,
      price:        basePrice,
      totalPrice,
      adults,
    });
    setOpen(false);
    router.push("/umrah-register");
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-[#16294F]/50 backdrop-blur-md flex items-center justify-center overflow-hidden py-10"
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-[1000px] mx-4 max-h-[92vh] overflow-y-auto bg-[#F5F6FA] rounded-xl flex flex-wrap md:flex-nowrap justify-center items-start gap-8 px-6 py-10"
          >
            <button onClick={() => setOpen(false)} className="absolute p-2 top-3 left-3 flex justify-center items-center w-10 h-10 border border-(--main-dark-color) bg-(--main-dark-color) rounded-full z-10">
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Image */}
            {data?.image
              ? <img src={data.image} className="object-cover w-full lg:w-[380px] h-[380px] rounded-xl flex-shrink-0" alt={data.title} />
              : <div className="w-full lg:w-[380px] h-[380px] bg-gray-200 rounded-xl flex-shrink-0" />
            }

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0">
              {/* Title + favorite */}
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <h2 className="text-[#264787] font-bold text-lg sm:text-2xl">{data?.title}</h2>
                <button onClick={() => setIsFavorite(p => !p)} className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#e4e6ec] transition">
                  <Heart color={isFavorite ? "#FF5B5B" : "white"} fill={isFavorite ? "#FF5B5B" : "#fff"} />
                </button>
              </div>

              {/* Adults counter */}
              <div className="flex items-center gap-4 mb-4">
                <p className="text-[#264787] font-bold">Adults</p>
                <div className="flex min-w-[96px] h-[30px] justify-around items-center text-white bg-[#3B85C1] rounded-[30px]">
                  <button onClick={() => setAdults(p => Math.max(1, p - 1))} className="px-3 text-lg font-bold">−</button>
                  <span className="font-bold">{adults}</span>
                  <button onClick={() => setAdults(p => p + 1)} className="px-3 text-lg font-bold">+</button>
                </div>
              </div>

              {/* Details */}
              <div className="max-h-[280px] flex flex-col gap-4 overflow-y-auto pr-1">
                {(data?.duration || data?.travel_dates) && (
                  <div>
                    <h3 className="font-bold text-black text-sm mb-1">Trip Specifications:</h3>
                    {data.duration    && <p className="text-sm text-black">- Duration: {data.duration}</p>}
                    {data.travel_dates && <p className="text-sm text-black">- {data.travel_dates}</p>}
                  </div>
                )}

                {costs.length > 0 && (
                  <div>
                    <h3 className="font-bold text-black text-sm mb-1">Trip Costs:</h3>
                    {costs.map((c, i) => (
                      <p key={i} className="text-sm text-black">- {c}</p>
                    ))}
                  </div>
                )}

                {data?.subtitle && (
                  <div>
                    <h3 className="font-bold text-black text-sm mb-1">Description:</h3>
                    <p className="text-sm text-black leading-relaxed">{data.subtitle}</p>
                  </div>
                )}
              </div>

              {/* Total price */}
              <div className="w-full rounded-xl bg-[#3B85C1] my-4 p-[27px] text-white flex justify-between items-center">
                <p className="text-white text-sm">Total Price (Including Tax)</p>
                <p className="font-bold text-xl">{totalPrice.toFixed(0)} $</p>
              </div>

              <button
                onClick={handleRegister}
                className="bg-[#264787] rounded-[37px] flex justify-center items-center h-[60px] text-white text-xl font-bold hover:bg-[#3B85C1] transition"
              >
                Register Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
