"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { _get } from "../../../../lib/shared/api";
import { apiRoutes } from "../../../../lib/shared/routes";

const FALLBACK_TOURS = [
  {
    id: 1,
    image: "/images/download(5).jfif",
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ...",
    price: "200",
  },
  {
    id: 2,
    image: "/images/download (3).jfif",
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ...",
    price: "200",
  },
  {
    id: 3,
    image: "/images/default-image.jpg",
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ...",
    price: "200",
  },
];

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

export default function OurOfferModal({ open, setOpen, destination, langId }) {
  const router = useRouter();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    if (!open || !destination?.slug) {
      setTours([]);
      return;
    }
    setLoading(true);
    _get(apiRoutes.tours_by_destination(destination.slug))
      .then((res) => {
        const data = res?.data?.data ?? res?.data ?? [];
        setTours(Array.isArray(data) ? data : []);
      })
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  }, [open, destination?.slug]);

  const displayTours = destination?.slug
    ? tours
    : FALLBACK_TOURS;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-[#16294F]/50 backdrop-blur-md flex items-center justify-center overflow-x-hidden overflow-y-auto py-10"
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative text-white my-auto max-w-[650px] w-full px-6 py-10 rounded-xl"
          >
            <CustomHeading
              first_title_class="!text-white"
              second_title_class="!text-[#3B85C1]"
              first_title={destination?.city || "Available"}
              second_title="Tours"
            />

            {loading && (
              <div className="mt-10 text-center text-white/70 animate-pulse">
                Loading tours...
              </div>
            )}

            {!loading && displayTours.length === 0 && (
              <div className="mt-10 text-center text-white/50">
                No tours available for this destination yet.
              </div>
            )}

            <div className="flex flex-col gap-[35px] mt-[35px]">
              {!loading && displayTours.map((item, idx) => {
                const t = getTranslation(item, langId);
                const title = t.tour_title || item.title || item.tour_slug || "";
                const subtitle = t.overview_html?.replace(/<[^>]*>/g, "").slice(0, 80) || item.subtitle || "";
                const price = item.base_price ?? item.price ?? "0";
                const image = item.thumbnail || item.image || "/images/default-image.jpg";
                const slug = item.tour_slug;

                return (
                  <div key={item.tour_id ?? item.id ?? idx} className="rounded-xl">
                    <div className="bg-[#F5F6FA] p-2 flex flex-col sm:flex-row gap-4 rounded-xl">
                      <img
                        src={image}
                        className="w-full sm:w-[136px] h-[200px] sm:h-[177px] object-cover rounded-xl"
                        alt={title}
                      />
                      <div className="flex flex-col w-full justify-between gap-4 sm:gap-0">
                        <div>
                          <h2 className="text-black !text-[14px] sm:!text-[16px] font-bold">{title}</h2>
                          <p className="text-[#B4B4B4] text-sm font-bold truncate max-w-full">{subtitle}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <p className="font-bold !text-[18px] text-[#3B85C1]">{price} $</p>
                          <button
                            onClick={() => {
                              setOpen(false);
                              if (destination?.slug && slug) {
                                router.push(`/tours/${destination.slug}/${slug}`);
                              }
                            }}
                            className="bg-[#264787] h-[45px] sm:h-[50px] text-white flex gap-2 items-center justify-center px-4 py-2 !rounded-lg text-sm"
                          >
                            <Eye color="white" />
                            <span>View Tour</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
