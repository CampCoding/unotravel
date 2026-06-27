"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const FALLBACK = [
  { city: "BARCELONA", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495567/tickets-for-barcelona-bus-turistic-a_xqynzq.jpg", slug: "barcelona" },
  { city: "PARIS",     image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495618/download_pqhfcx.jpg",    slug: "paris"     },
  { city: "LONDON",    image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495719/download_1_fuiq77.jpg",  slug: "london"    },
  { city: "BERLIN",    image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495941/download_4_ccrvuk.jpg",  slug: "berlin"    },
  { city: "ROME",      image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495785/download_2_q5vifg.jpg",  slug: "rome"      },
];

const getT = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] ||
  {};

export default function IntlToursDestinations({ destinations, langId }) {
  const router  = useRouter();
  const [search, setSearch] = useState("");

  const items = destinations?.length
    ? destinations.map((d) => {
        const t = getT(d, langId);
        return {
          id:    d.destination_id,
          city:  t.city_name || d.destination_slug || "",
          image: d.destination_image || "",
          slug:  d.destination_slug  || "",
        };
      })
    : FALLBACK;

  const filtered = search
    ? items.filter((i) => i.city.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <div data-aos="fade-up" className="mt-20 container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CustomHeading first_title="Our " second_title="Destinations" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-md flex items-center px-3 sm:px-4 bg-[#F5F6FA] w-full sm:max-w-[380px] h-[45px]"
        >
          <input
            placeholder="Search destinations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent text-[#3B85C1] text-sm outline-none w-full placeholder:text-sm"
          />
          <Search size={16} color="#3B85C1" />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-12 gap-4 md:gap-6">
        {filtered.map((item, i) => (
          <div
            key={item.id ?? item.city}
            data-aos="fade-up"
            data-aos-delay={`${(i % 5) * 80}`}
            className="flex flex-col gap-3 cursor-pointer group"
            onClick={() => item.slug && router.push(`/our-offers/international-tours/${item.slug}`)}
          >
            <div className="overflow-hidden rounded-xl shadow-[0px_0px_3px_#0000003B]">
              <img
                src={item.image || "/images/logo hover.svg"}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/logo hover.svg"; }}
                className="w-full h-[145px] object-cover group-hover:scale-105 transition-transform duration-300"
                alt={item.city}
              />
            </div>
            <h2 className="!text-[14px] text-center !text-[#264787] font-bold uppercase">{item.city}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
