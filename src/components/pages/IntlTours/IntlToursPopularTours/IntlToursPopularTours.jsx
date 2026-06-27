"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React from "react";
import { useRouter } from "next/navigation";
import { Eye, Heart } from "lucide-react";
import { useState } from "react";

const getT = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] ||
  {};

function TourCard({ item, langId }) {
  const router = useRouter();
  const [fav, setFav] = useState(false);
  const t = getT(item, langId);

  return (
    <div
      data-aos="fade-up"
      className="bg-[#F5F6FA] p-2 flex flex-col sm:flex-row gap-4 rounded-xl"
    >
      <img
        src={item.image || "/images/logo hover.svg"}
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/logo hover.svg"; }}
        className="w-full sm:w-[136px] h-[180px] sm:h-[160px] object-cover rounded-xl flex-shrink-0"
        alt={t.title || item.slug}
      />
      <div className="flex flex-col justify-between w-full gap-3 py-1">
        <div>
          <h3 className="text-black font-bold text-[15px] sm:text-[16px] leading-snug">{t.title || item.slug}</h3>
          <p className="text-[#B4B4B4] text-sm truncate">{t.subtitle || ""}</p>
        </div>
        {item.duration && (
          <p className="text-[#6B7280] text-xs">
            Duration: <span className="font-semibold text-[#264787]">{item.duration}</span>
          </p>
        )}
        <div className="flex items-center justify-between gap-2">
          <p className="font-bold text-[18px] text-[#3B85C1]">{item.price} <span className="text-sm">USD</span></p>
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/our-offers/toursDetails/${item.id}`)}
              className="h-[40px] bg-[#264787] text-white flex items-center gap-1.5 px-3 rounded-lg text-sm"
            >
              <Eye size={16} />
              View
            </button>
            <button
              onClick={() => setFav(!fav)}
              className="w-[40px] h-[40px] flex justify-center items-center bg-[#e4e6ec] rounded-lg transition"
            >
              <Heart size={16} color={fav ? "#FF5B5B" : "#aaa"} fill={fav ? "#FF5B5B" : "transparent"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IntlToursPopularTours({ tours, langId }) {
  if (!tours?.length) return null;

  return (
    <div data-aos="fade-up" className="mt-20 container">
      <CustomHeading first_title="Popular " second_title="Tours" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {tours.map((tour, i) => (
          <TourCard key={tour.id ?? i} item={tour} langId={langId} />
        ))}
      </div>
    </div>
  );
}
