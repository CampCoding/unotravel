"use client";
import { Eye, Heart, Clock, Calendar } from "lucide-react";
import React, { useState } from "react";
import UmraPackageModal from "../UmraPackageModal/UmraPackageModal";
import { useLockBodyScroll } from "../../../../../../../hooks/useLockBodyScroll";

export default function UmraPackage({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useLockBodyScroll(openModal);

  const price = Number(data?.price ?? 0);

  return (
    <>
      <div data-aos="fade-up" data-aos-delay={(data?.id ?? 0) * 80}>
        <div className="bg-[#F5F6FA] rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow duration-300">

          {/* Image */}
          <div className="relative w-full sm:w-[160px] flex-shrink-0 h-[200px] sm:h-auto">
            {data?.image ? (
              <img
                src={data.image}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/logo hover.svg'; }}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-[#264787]/15 to-[#3B85C1]/25 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#264787]/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L8 6H4v4l-2 2 2 2v4h4l4 4 4-4h4v-4l2-2-2-2V6h-4L12 2z" stroke="#264787" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.5"/>
                  </svg>
                </div>
                <span className="text-[#264787]/40 text-xs font-medium">Umrah Package</span>
              </div>
            )}
            {/* Favorite */}
            <button
              onClick={() => setIsFavorite(p => !p)}
              className="absolute top-2 right-2 w-8 h-8 flex justify-center items-center bg-white/80 backdrop-blur-sm rounded-full shadow transition hover:scale-110"
            >
              <Heart size={16} color={isFavorite ? "#FF5B5B" : "#aaa"} fill={isFavorite ? "#FF5B5B" : "none"} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between flex-1 p-4 gap-3">
            <div>
              <h2 className="text-[#264787] font-bold text-base sm:text-[17px] leading-snug mb-1">
                {data?.title}
              </h2>
              {data?.subtitle && (
                <p className="text-[#9CA3AF] text-sm line-clamp-2 leading-relaxed">
                  {data.subtitle}
                </p>
              )}
            </div>

            {/* Badges */}
            {(data?.duration || data?.travel_dates) && (
              <div className="flex flex-wrap gap-2">
                {data.duration && (
                  <span className="flex items-center gap-1 text-xs font-medium text-[#3B85C1] bg-[#3B85C1]/10 px-2.5 py-1 rounded-full">
                    <Clock size={11} /> {data.duration}
                  </span>
                )}
                {data.travel_dates && (
                  <span className="flex items-center gap-1 text-xs font-medium text-[#264787] bg-[#264787]/10 px-2.5 py-1 rounded-full">
                    <Calendar size={11} /> {data.travel_dates}
                  </span>
                )}
              </div>
            )}

            {/* Price + Button */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-gray-400 block leading-none mb-0.5">Starting from</span>
                <span className="text-[#3B85C1] font-bold text-xl sm:text-2xl">
                  ${price.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setOpenModal(true)}
                className="flex items-center gap-2 bg-[#264787] hover:bg-[#3B85C1] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
              >
                <Eye size={16} /> View Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal outside data-aos to avoid position:fixed breaking inside CSS transforms */}
      <UmraPackageModal open={openModal} setOpen={setOpenModal} data={data} />
    </>
  );
}
