"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetServicesData } from "../../../lib/features/layoutSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import ErrorImage from "@/components/shared/ErrorImage";

const parentVariant = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};
const childVariant = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FALLBACK_BANNERS = [
  "/images/Create a Tour slider  (1).webp",
  "/images/Create a Tour slider  (2).webp",
  "/images/Create a Tour slider  (3).webp",
];

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { services_data, services_loading, selectedLanguage } = useSelector(
    (state) => state?.layout
  );

  useEffect(() => {
    dispatch(handleGetServicesData());
  }, []);

  const pageData = services_data?.data?.data;
  const services = pageData?.services?.data ?? [];
  const banners = pageData?.heroBanners ?? [];

  const getTranslation = (item) =>
    item?.translations?.find((t) => t.language_id === Number(selectedLanguage)) ||
    item?.translations?.[0] ||
    {};

  const handleServiceClick = (service) => {
    if (service?.service_origin_type && service.service_origin_type !== "internal") {
      router.push(`/?service_id=${service.service_id}`);
    } else {
      router.push(`/our-services/${service.service_slug}`);
    }
  };

  return (
    <div>
      {/* ── Hero Banner ───────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4 }} className="w-full">
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000 }} loop pagination={{ clickable: true }} className="w-full">
          {banners.length > 0
            ? banners.map((banner) => (
                <SwiperSlide key={banner.banner_id}>
                  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] xl:h-[600px]">
                    {banner.media_type === "video" ? (
                      <video src={banner.media_url} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <img src={banner.media_url} alt="Our Services" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4 text-center">
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-white text-[28px] sm:text-[40px] md:text-[56px] !font-bold drop-shadow-lg"
                        style={{ textShadow: "0px 3px 10px #000000" }}
                      >
                        {pageData?.services?.sectionName || "Our Services"}
                      </motion.h1>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : FALLBACK_BANNERS.map((src, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] xl:h-[600px]">
                    <img src={src} alt="Our Services" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4 text-center">
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-white text-[28px] sm:text-[40px] md:text-[56px] !font-bold drop-shadow-lg"
                        style={{ textShadow: "0px 3px 10px #000000" }}
                      >
                        Our Services
                      </motion.h1>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </motion.div>

      {/* ── Services Grid ─────────────────────────────────────────────── */}
      <div className="container mt-[80px] mb-[100px]">
        <div data-aos="fade-up" className="mb-10">
          <CustomHeading first_title="Our" second_title="Services" />
        </div>

        {services_loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-[160px] animate-pulse" />
            ))}
          </div>
        ) : services.length > 0 ? (
          <motion.div
            variants={parentVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10"
          >
            {services.map((service) => {
              const t = getTranslation(service);
              const name = t.service_name || service.service_name || service.service_slug || "";
              const description = t.service_description || service.service_description || "";
              const isExternal = service?.service_origin_type && service.service_origin_type !== "internal";

              return (
                <motion.div key={service.service_id} variants={childVariant}>
                  <div
                    onClick={() => handleServiceClick(service)}
                    className="bg-[#F5F6FA] relative cursor-pointer rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group min-h-[160px]"
                  >
                    {/* Icon area */}
                    <div className="flex justify-center items-center h-[110px] pt-4 px-4">
                      <ErrorImage
                        image={service?.service_image}
                        FALLBACK_IMG={"/images/services icon  (2).svg"}
                        width={64}
                        height={64}
                        alt={name}
                        objectFit="contain"
                      />
                    </div>

                    {/* Label */}
                    <div className="h-[42px] flex justify-center items-center text-center text-sm font-bold text-white bg-[#3B85C1] group-hover:bg-[#2a6aad] transition-colors px-2 rounded-b-xl">
                      {name}
                    </div>

                    {/* External badge */}
                    {isExternal && (
                      <span className="absolute top-2 right-2 text-[10px] font-bold bg-[#EB1C24] text-white px-1.5 py-0.5 rounded-full leading-none">
                        Online
                      </span>
                    )}
                  </div>

                  {/* Description below card */}
                  {description && (
                    <p className="mt-2 text-xs text-center text-gray-500 leading-snug px-1 line-clamp-2">
                      {description.replace(/<[^>]*>/g, "")}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-gray-400 text-lg">No services found.</div>
        )}
      </div>
    </div>
  );
}
