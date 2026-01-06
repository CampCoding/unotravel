"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";
import ErrorImage from "../../../shared/ErrorImage";

const data = [
  {
    id: 1,
    images: [
      "/images/Flights slider (1).webp",
      "/images/Flights slider (2).webp",
      "/images/Flights slider (3).webp",
    ],
    main_title: "Uno Travel",
    tab_title: "Flights",
    icon: "/images/Flights.svg",
    desc: "We Make Your Life Easier And More Comfortable With A Wide Range Of Professional Travel And Booking Services.",
  },
  {
    id: 2,
    images: [
      "/images/Hotel booking slider (1).webp",
      "/images/Hotel booking slider (2).webp",
      "/images/Hotel booking slider (3).webp",
    ],
    main_title: "Uno Hotels",
    tab_title: "Hotels Booking",
    icon: "/images/Hotels Booking.svg",
    desc: "We Make Your Life Easier And More Comfortable With A Wide Range Of Professional Travel And Booking Services.",
  },
  {
    id: 3,
    images: [
      "/images/Rent a car slider (1).webp",
      "/images/Rent a car slider (2).webp",
      "/images/Rent a car slider (3).webp",
    ],
    main_title: "Uno Cars",
    tab_title: "Rent a Car",
    icon: "/images/Rent a Car.svg",
    desc: "We Make Your Life Easier And More Comfortable With A Wide Range Of Professional Travel And Booking Services.",
  },
  {
    id: 4,
    images: [
      "/images/Get a Ride slider (1).webp",
      "/images/Get a Ride slider (2).webp",
      "/images/Get a Ride slider (3).webp",
    ],
    main_title: "Uno Ride",
    tab_title: "Get a Ride",
    icon: "/images/Get a Ride.svg",
    desc: "We Make Your Life Easier And More Comfortable With A Wide Range Of Professional Travel And Booking Services.",
  },
  {
    id: 5,
    images: [
      "/images/Create a Tour slider (1).webp",
      "/images/Create a Tour slider (2).webp",
      "/images/Create a Tour slider (3).webp",
    ],
    main_title: "Uno Tours",
    tab_title: "Create a Tour",
    icon: "/images/Create a Tour.svg",
    desc: "We Make Your Life Easier And More Comfortable With A Wide Range Of Professional Travel And Booking Services.",
  },
  {
    id: 6,
    images: [
      "/images/Get a Helicopter slider (1).webp",
      "/images/Get a Helicopter slider (2).webp",
      "/images/Get a Helicopter slider (3).webp",
    ],
    main_title: "Uno Helicopter",
    tab_title: "Get a Helicopter",
    icon: "/images/Get a Helicopter.svg",
    desc: "We Make Your Life Easier And More Comfortable With A Wide Range Of Professional Travel And Booking Services.",
  },
];

export default function HomeBanner({ hero_services = [] }) {
  const swiperRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [openAdultModal, setOpenAdultModal] = useState(false);

  // Set default selected tab when hero_services loads
  useEffect(() => {
    if (hero_services && hero_services.length > 0) {
      setSelectedTab(hero_services[0]);
    }
  }, [hero_services]);

  // If no services, render nothing (or fallback)
  if (!hero_services || hero_services.length === 0 || !selectedTab) {
    return null;
  }

  return (
    <div className="relative home-banner w-full  h-fit">
      {/* Only one active block driven by selectedTab */}
      <div className="block">
        <Swiper
          modules={[EffectFade, Pagination, Autoplay, Navigation]}
          effect="fade"
          // autoplay={{ delay: 4000, disableOnInteraction: false }}
          // loop
          className="mySwiper"
        >
          {selectedTab?.banners?.map((img, idx) =>
          {
     
          return(
            <SwiperSlide className="!h-screen" key={img?.banner_id}>
              <div className="relative home-banner-swiper sm:!min-h-screen flex flex-col justify-end">
                <ErrorImage
                  isImg={img?.media_type === "image"}
                  image={img?.media_url} // e.g. "/uploads/banners/search-flights.jpg"
                  FALLBACK_IMG={data[img?.idx]?.images[img?.banner_id]}
                  alt={img?.banner_title || "Hero banner"}
                  className="object-cover !min-h-[100vh]"
                  priority={idx === 0}
                  width={1920}
                  height={900}
                />

                {/* Floating logo */}
                <Image
                  src="/images/logo hover.svg"
                  width={300}
                  height={300}
                  alt="logo hover"
                  className="absolute z-50 block right-4 sm:right-10 top-4 sm:top-10"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Content */}
                <div className="py-4 !z-[9999] container absolute bottom-0 flex flex-col justify-center items-center sm:bottom-10 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6 text-white">
                  <div className= "w-full  h-fit">
                    {/* Title */}
                    <motion.h2
                      style={{
                        textShadow: "0px 0px 10px rgba(255,255,255,0.64)",
                      }}
                      dangerouslySetInnerHTML={{__html : img?.banner_title || data[selectedTab?.service_id]?.main_title}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-[32px] sm:text-[40px] md:text-[56px] !font-[filson-bold] bg-[#16294F] px-4 flex justify-center items-center !shadow-lg h-[50px] sm:h-[60px] xl:h-[70px] rounded-md w-fit mb-2"
                    >
                    </motion.h2>

                    {/* Description (HTML from backend) */}
                    <motion.p
                      style={{
                        textShadow: "0px 0px 10px rgba(255,255,255,0.64)",
                      }}
                      dangerouslySetInnerHTML={{ __html: img?.banner_text || data[selectedTab?.service_id]?.desc}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-sm sm:text-base md:text-lg max-w-full !font-[filson-bold] md:max-w-[50%] text-white"
                    />

                    {/* Tabs (all hero services) */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="tabs bg-[#16294F] h-auto w-full rounded-md gap-2 mt-3 md:mt-6 p-2 sm:p-[6px_10px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
                    >
                      {hero_services.map((service) => (
                        <div
                          key={service?.service_id}
                          onClick={() => setSelectedTab(service)}
                          className={`cursor-pointer p-2 xl:px-[14px] h-fit flex items-center rounded-[4px] gap-2 transition-all ${
                            selectedTab?.service_id === service?.service_id
                              ? "bg-[rgba(228,76,74,0.58)]"
                              : "bg-transparent hover:bg-white/10"
                          }`}
                        >
                          <ErrorImage
                            image={service?.service_image} // "/uploads/services/.."
                            FALLBACK_IMG={data[service?.service_id]?.icon}
                            width={24}
                            height={24}
                            alt={service?.service_name || "Service icon"}
                            className="object-cover"
                          />
                          <span className="text-white text-xs sm:text-[11px">
                            {service?.service_hero_title ||
                              service?.service_name}
                          </span>
                        </div>
                      ))}
                    </motion.div>

                    {/* Booking Widget (kept as is) */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      style={{ width: "100%" }}
                    >
                      <motion.iframe
                        id="fb-widget"
                        title="Booking Widget"
                        allowTransparency={true}
                        allowFullScreen
                        style={{
                          position: "relative",
                          width: "100%",
                          border: "none",
                          minHeight: "245px",
                          marginTop: "20px",
                        }}
                        src="https://booking.aerotravels.dk/da?client_base_url=https%3A%2F%2Fwww.aerotravels.dk&amp;auth_key=1a5bd74963123cfff4b9cbcc6fe7c426"
                        height="200px"
                      />
                    </motion.div>

                    {/* Forms per tab (if you want to re-enable later)
                    <div className="mt-0 lg:mt-6">
                      {selectedTab?.service_slug === "search-flights" && (
                        <HomeBannerFlight
                          key={selectedTab?.service_id}
                          openAdultModal={openAdultModal}
                          setOpenAdultModal={setOpenAdultModal}
                        />
                      )}
                      {selectedTab?.service_slug === "hotels-booking" && (
                        <HomeBannerHotels
                          key={selectedTab?.service_id}
                          setOpenAdultModal={setOpenAdultModal}
                        />
                      )}
                      // ... etc for other slugs
                    </div>
                    */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )})}
        </Swiper>
      </div>
    </div>
  );
}
