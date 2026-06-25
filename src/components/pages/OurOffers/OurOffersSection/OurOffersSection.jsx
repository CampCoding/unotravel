"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import RegistrationModal from "@/components/shared/RegistrationModal/RegistrationModal";

const FALLBACK_OFFERS = [
  "/images/Uno Offers (1).webp",
  "/images/Uno Offers (2).webp",
  "/images/Uno Offers (3).webp",
  "/images/Uno Offers (4).webp",
  "/images/Uno Offers (5).webp",
  "/images/Uno Offers (6).webp",
];

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

export default function OurOffersSection({ data, sectionName, langId }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const hasRealData = data?.length > 0;
  const offers = hasRealData
    ? data.map((item) => {
        const t = getTranslation(item, langId);
        return {
          src: item.image_url,
          alt: t.offer_name || "",
          offerData: { ...item, offer_name: t.offer_name || "", offer_description: t.offer_description || "" },
        };
      })
    : FALLBACK_OFFERS.map((src) => ({ src, alt: "", offerData: null }));

  const heading = (Array.isArray(sectionName) ? sectionName.find((t) => t.language_id === Number(langId))?.title : sectionName) || "Uno Offers";

  return (
    <>
    <div className="mt-[115px]">
      <div data-aos="fade-up" className="container flex justify-between items-center">
        <CustomHeading first_title={"Uno"} second_title={"Offers"} />
        <div className="flex items-center gap-1">
          <p className="text-[#3B85C1] !text-sm sm:text-lg m-auto font-medium">Browse All</p>
          <button ref={prevRef} className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8 hover:opacity-70 transition-opacity" aria-label="Previous offer">
            <CircleChevronLeft className="w-full h-full" color="#3B85C1" />
          </button>
          <button ref={nextRef} className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8 hover:opacity-70 transition-opacity" aria-label="Next offer">
            <CircleChevronRight className="w-full h-full" color="#3B85C1" />
          </button>
        </div>
      </div>

      <div data-aos-delay={1000} className="!ps-[20px] md:!ps-[80px] mt-10 h-fit" data-aos="zoom-in-up">
        <div className="overflow-hidden h-fit">
          <Swiper
            ref={swiperRef}
            spaceBetween={75}
            slidesPerView={1}
            loop={true}
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              375: { slidesPerView: 1.25, spaceBetween: 10 },
              470: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2.5, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              850: { slidesPerView: 3.5, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1200: { slidesPerView: 5.5, spaceBetween: 10 },
              1380: { slidesPerView: 5.5, spaceBetween: 10 },
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {offers.map((offer, index) => (
              <SwiperSlide className="!flex !justify-center !items-center" key={index}>
                <div
                  className="w-[235px] h-[300px] rounded-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] relative group"
                  onClick={() => offer.offerData && setSelectedOffer(offer.offerData)}
                >
                  <Image src={offer.src} alt={offer.alt || `Offer ${index + 1}`} width={235} height={300} className="w-full h-full object-contain" loading="lazy" />
                  {offer.offerData && (
                    <div className="absolute inset-0 bg-[#264787]/0 group-hover:bg-[#264787]/20 transition-all duration-300 flex items-end justify-center pb-4">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#264787] text-white text-xs font-bold px-4 py-2 rounded-full">
                        Register Now
                      </span>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>

    <RegistrationModal
      open={!!selectedOffer}
      onClose={() => setSelectedOffer(null)}
      offer={selectedOffer}
    />
    </>
  );
}
