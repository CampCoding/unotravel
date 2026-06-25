"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import Image from "next/image";
import React, { useState } from "react";
import OurOfferModal from "../OurOfferModal/OurOfferModal";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const FALLBACK_TOURS = [
  { city: "BARCELONA", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495567/tickets-for-barcelona-bus-turistic-a_xqynzq.jpg" },
  { city: "PARIS", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495618/download_pqhfcx.jpg" },
  { city: "LONDON", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495719/download_1_fuiq77.jpg" },
  { city: "Mecca", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495785/download_2_q5vifg.jpg" },
  { city: "BERLIN", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495941/download_4_ccrvuk.jpg" },
];

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

export default function OurOffersInternationalTours({ data, sectionName, langId }) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [search, setSearch] = useState("");

  const hasRealData = data?.length > 0;

  const tours = hasRealData
    ? data.map((item) => {
        const t = getTranslation(item, langId);
        return {
          id: item.destination_id,
          city: t.city_name || item.destination_slug || "",
          image: item.destination_image || "",
          slug: item.destination_slug,
        };
      })
    : FALLBACK_TOURS;

  const filtered = search
    ? tours.filter((t) => t.city.toLowerCase().includes(search.toLowerCase()))
    : tours;

  return (
    <div>
      <div data-aos="fade-up" className="mt-[115px] container">
        <div className="flex justify-between items-center">
          <CustomHeading first_title={"International"} second_title={"Tours"} />
          <motion.div
            initial={{ opacity: 0, y: 20 }} exit={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="rounded-md mt-4 flex justify-between items-center px-3 sm:px-4 bg-[#F5F6FA] w-full max-w-[90%] sm:max-w-[400px] 2xl:max-w-[465px] h-[45px] sm:h-[55px]"
          >
            <input
              placeholder="Search For Tours"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 bg-transparent text-[#3B85C1] text-sm sm:text-md placeholder:text-sm sm:placeholder:text-md outline-none w-full"
            />
            <Search size={18} color="#3B85C1" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-[60px] gap-4 md:gap-6 lg:gap-[74px] items-center">
          {filtered.map((item, i) => (
            <div
              data-aos="fade-up" data-aos-delay={`${(i + 1) * 100}`}
              className="flex flex-col gap-[14px] cursor-pointer"
              key={item.id ?? item.city}
              onClick={() => setSelectedDestination(item)}
            >
              {item.image && (
                <Image
                  src={item.image}
                  className="rounded-[10px] w-[214px] h-[145px] object-cover shadow-[0px_0px_3px_#0000003B]"
                  width={214} height={145} alt={item.city}
                />
              )}
              <h2 className="!text-[15px] 2xl:!text-lg text-center !text-[#264787] font-bold uppercase">
                {item.city}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <OurOfferModal
        open={!!selectedDestination}
        setOpen={(v) => !v && setSelectedDestination(null)}
        destination={selectedDestination}
        langId={langId}
      />
    </div>
  );
}
