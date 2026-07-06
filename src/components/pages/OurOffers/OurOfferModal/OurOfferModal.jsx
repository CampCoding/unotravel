"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, MapPin, Users, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { _get } from "../../../../lib/shared/api";
import { apiRoutes } from "../../../../lib/shared/routes";

const FALLBACK_TOURS = [
  { id: 1, image: "/images/download(5).jfif",    title: "Tour Details Seeks Place On The Tourist Map", subtitle: "Tour Details Seeks Place On Tourist Map ...", price: "200" },
  { id: 2, image: "/images/download (3).jfif",   title: "Tour Details Seeks Place On The Tourist Map", subtitle: "Tour Details Seeks Place On Tourist Map ...", price: "200" },
  { id: 3, image: "/images/default-image.jpg",   title: "Tour Details Seeks Place On The Tourist Map", subtitle: "Tour Details Seeks Place On Tourist Map ...", price: "200" },
];

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

const stripHtml = (html) => (html ?? "").replace(/<[^>]*>/g, "").trim();

const truncate = (str, max = 100) =>
  str.length <= max ? str : str.slice(0, max).trimEnd() + "…";

export default function OurOfferModal({ open, setOpen, destination, langId }) {
  const router  = useRouter();
  const [tours,   setTours]   = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    if (!open || !destination?.slug) { setTours([]); return; }
    setLoading(true);
    _get(apiRoutes.tours_by_destination(destination.slug))
      .then((res) => {
        const data = res?.data?.data ?? res?.data ?? [];
        setTours(Array.isArray(data) ? data : []);
      })
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  }, [open, destination?.slug]);

  const displayTours = destination?.slug ? tours : FALLBACK_TOURS;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-[#16294F]/60 backdrop-blur-md flex items-center justify-center overflow-x-hidden overflow-y-auto py-10"
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto max-w-[680px] w-full mx-4 px-6 py-10 rounded-2xl bg-white/5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div>
                <CustomHeading
                  first_title_class="!text-white"
                  second_title_class="!text-[#3B85C1]"
                  first_title={destination?.city || "Available"}
                  second_title="Tours"
                />
                {destination?.city && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={13} className="text-[#3B85C1]" />
                    <span className="text-white/60 text-xs">{destination.city}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center py-14">
                <div className="w-8 h-8 rounded-full border-4 border-[#3B85C1] border-t-transparent animate-spin" />
              </div>
            )}

            {/* Empty */}
            {!loading && displayTours.length === 0 && (
              <div className="py-14 text-center text-white/50">No tours available for this destination yet.</div>
            )}

            {/* Tours list */}
            <div className="flex flex-col gap-4">
              {!loading && displayTours.map((item, idx) => {
                const t = getTranslation(item, langId);

                const title    = t.tour_title   || item.tour_title || item.title || "";
                const cityName = item.city_name  || destination?.city || "";
                const rawDesc  = stripHtml(t.overview_html || item.overview_html || item.subtitle || "");
                const desc     = truncate(rawDesc, 110);
                const price    = item.base_price ?? item.price ?? "0";
                const image    = item.thumbnail  || item.image || "/images/default-image.jpg";
                const slug     = item.tour_slug;
                const destSlug = item.destination_slug || destination?.slug;

                return (
                  <div key={item.tour_id ?? item.id ?? idx} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="sm:w-[160px] sm:flex-shrink-0">
                        <img
                          src={image}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/default-image.jpg"; }}
                          className="w-full h-[180px] sm:h-full object-cover"
                          alt={title}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-between p-4 flex-1 gap-3">
                        <div>
                          {/* City badge */}
                          {cityName && (
                            <div className="flex items-center gap-1 mb-1.5">
                              <MapPin size={12} className="text-[#3B85C1]" />
                              <span className="text-[#3B85C1] text-xs font-semibold uppercase tracking-wide">{cityName}</span>
                            </div>
                          )}

                          {/* Title */}
                          <h2 className="text-[#264787] font-bold text-[15px] leading-snug mb-1">{title}</h2>

                          {/* Description */}
                          {desc && (
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{desc}</p>
                          )}
                        </div>

                        {/* Footer row */}
                        <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            {/* Price */}
                            <span className="font-black text-[18px] text-[#3B85C1]">{price} $</span>
                            {/* Max travelers */}
                            {item.max_travelers && (
                              <div className="flex items-center gap-1 text-gray-400 text-xs">
                                <Users size={12} />
                                <span>Max {item.max_travelers}</span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              setOpen(false);
                              if (destSlug && slug) router.push(`/tours/${destSlug}/${slug}`);
                            }}
                            className="flex items-center gap-2 bg-[#264787] hover:bg-[#3B85C1] text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                          >
                            <Eye size={14} />
                            View Tour
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
