"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const FALLBACK_IMAGES = [
  "/images/Hotel booking slider (1).webp",
  "/images/Hotel booking slider (2).webp",
  "/images/Hotel booking slider (3).webp",
];

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

export default function FlightFareBestTravels({ data, sectionName, langId }) {
  const items = data?.length
    ? data.map((item, i) => {
        const t = getTranslation(item, langId);
        return {
          id: item.traveler_id ?? i,
          name: t.traveler_name || "",
          location: t.traveler_location || "",
          cityImage: item.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
          avatar: "/images/avatar.png",
        };
      })
    : [
        { id: 1, name: "William Lyon", location: "Tokyo, Japan", cityImage: "/images/Hotel booking slider (1).webp", avatar: "/images/avatar.png" },
        { id: 2, name: "James Noah", location: "Dubai Marina, UAE", cityImage: "/images/Hotel booking slider (2).webp", avatar: "/images/avatar.png" },
        { id: 3, name: "Leni Tashira", location: "Dubai, UAE", cityImage: "/images/Hotel booking slider (3).webp", avatar: "/images/avatar.png" },
        { id: 4, name: "Sebastian Johns", location: "New York, USA", cityImage: "/images/Hotel booking slider (2).webp", avatar: "/images/avatar.png" },
      ];

  const heading = (Array.isArray(sectionName) ? sectionName.find((t) => t.language_id === Number(langId))?.title : sectionName) ||
    "Best travelers of the month";

  return (
    <section className="mt-16">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 data-aos="fade-up" className="text-left text-3xl md:text-4xl lg:text-[70px]! text-shadow-lg font-bold text-(--main-dark-color) leading-tight">
            {heading}
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button className="traveler-prev w-9 h-9 rounded-full! border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[var(--main-dark-color)] hover:text-white transition" type="button">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="traveler-next w-9 h-9 rounded-full! border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[var(--main-dark-color)] hover:text-white transition" type="button">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          grabCursor={true}
          navigation={{ nextEl: ".traveler-next", prevEl: ".traveler-prev" }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{ 0: { slidesPerView: 1.3 }, 480: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 5 } }}
        >
          {items.map((traveler, idx) => (
            <SwiperSlide className="shadow-none! pb-6" key={traveler.id}>
              <div data-aos="fade-up" data-aos-delay={80 * idx} className="relative mx-auto w-full max-w-[220px] h-[330px] rounded-[140px] bg-white! shadow-md overflow-hidden flex flex-col justify-between transition-transform duration-200">
                <div className="h-[72%]! w-full overflow-hidden rounded-t-[140px]">
                  <img src={traveler.cityImage} alt={traveler.name} className="h-full w-full object-cover" />
                </div>
                <div className="relative bg-white flex flex-col items-center justify-end pb-6 pt-7">
                  <div className="absolute -top-8">
                    <div className="h-16 w-16 rounded-full border-4 border-white shadow-md overflow-hidden">
                      <img src={traveler.avatar} alt={traveler.name} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="text-center mt-3 px-3">
                    <p className="text-sm font-semibold text-slate-900">{traveler.name}</p>
                    <p className="text-[11px] text-slate-400 mb-1">{traveler.location}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
