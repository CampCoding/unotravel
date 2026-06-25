"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { handleGetToursByDestination } from "../../../../lib/features/layoutSlice";
import CustomHeading from "../../../../components/shared/CustomHeading/CustomHeading";

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

const FALLBACK_IMAGE = "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495567/tickets-for-barcelona-bus-turistic-a_xqynzq.jpg";

export default function ToursListPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { tours_list_data, tours_list_loading, selectedLanguage } = useSelector((s) => s.layout);

  const destinationSlug = params?.destinationSlug;

  useEffect(() => {
    if (destinationSlug) {
      dispatch(handleGetToursByDestination(destinationSlug));
    }
  }, [destinationSlug, dispatch]);

  const tours = tours_list_data?.data?.data ?? tours_list_data?.data ?? [];
  const cityName = tours?.[0]?.city_name || destinationSlug || "";

  if (tours_list_loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#3B85C1] text-xl font-semibold animate-pulse">Loading tours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="w-full h-[220px] bg-gradient-to-r from-[#264787] to-[#3B85C1] flex items-center justify-center">
        <div className="container text-white">
          <h1 className="text-3xl md:text-5xl font-bold capitalize">{cityName}</h1>
          <p className="text-white/70 mt-2 text-sm md:text-base">Discover our available tours</p>
        </div>
      </div>

      <div className="container mt-[60px]">
        <CustomHeading first_title={"Available"} second_title={"Tours"} />

        {(!tours || tours.length === 0) && (
          <div className="mt-16 text-center text-gray-400 text-lg">
            No tours available for this destination yet.
          </div>
        )}

        {tours && tours.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {tours.map((tour) => {
              const t = getTranslation(tour, selectedLanguage);
              const title = t.tour_title || tour.tour_title || tour.tour_slug || "";
              const thumbnail = tour.thumbnail || FALLBACK_IMAGE;

              return (
                <div
                  key={tour.tour_id}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0px_2px_12px_#0000001A] cursor-pointer hover:shadow-[0px_4px_20px_#00000025] transition-shadow group"
                  onClick={() => router.push(`/tours/${destinationSlug}/${tour.tour_slug}`)}
                >
                  <div className="relative w-full h-[180px] overflow-hidden">
                    <Image
                      src={thumbnail}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#264787] text-base leading-snug line-clamp-2">{title}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[#3B85C1] font-semibold text-sm">
                        From ${Number(tour.base_price ?? 0).toFixed(0)}
                      </span>
                      <span className="text-xs text-gray-400">Up to {tour.max_travelers} travelers</span>
                    </div>
                    <button className="mt-3 w-full bg-[#264787] text-white text-sm font-semibold rounded-[10px] py-2 hover:bg-[#3B85C1] transition-colors">
                      View Tour
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
