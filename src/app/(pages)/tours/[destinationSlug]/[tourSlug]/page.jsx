"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { handleGetTourDetail } from "../../../../../lib/features/layoutSlice";

const FALLBACK_IMAGE = "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495567/tickets-for-barcelona-bus-turistic-a_xqynzq.jpg";

const FAQ_ITEMS = [
  { key: "faq_whats_included",     label: "What's Included" },
  { key: "faq_departure_point",    label: "Departure Point" },
  { key: "faq_what_to_expect",     label: "What to Expect" },
  { key: "faq_additional_info",    label: "Additional Info" },
  { key: "faq_cancellation_policy",label: "Cancellation Policy" },
];

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

function LocationMap({ lat, lng, label }) {
  if (!lat || !lng) return null;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      {label && (
        <div className="bg-[#264787]/5 px-4 py-2.5 flex items-center gap-2 text-sm font-semibold text-[#264787]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {label}
        </div>
      )}
      <iframe
        title="map"
        src={src}
        width="100%"
        height="220"
        className="border-0 block"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default function TourDetailPage() {
  const params   = useParams();
  const router   = useRouter();
  const dispatch = useDispatch();
  const { tour_detail_data, tour_detail_loading, selectedLanguage } = useSelector((s) => s.layout);

  const destSlug = params?.destinationSlug;
  const tourSlug = params?.tourSlug;

  const [travelers,     setTravelers]     = useState(2);
  const [selectedDate,  setSelectedDate]  = useState(() => new Date().toISOString().split("T")[0]);
  const [meetingOption, setMeetingOption] = useState("meeting");
  const [openFaq,       setOpenFaq]       = useState(null);

  useEffect(() => {
    if (destSlug && tourSlug) dispatch(handleGetTourDetail({ destSlug, tourSlug }));
  }, [destSlug, tourSlug, dispatch]);

  const tour = tour_detail_data?.data?.data ?? tour_detail_data?.data ?? null;
  const t    = getTranslation(tour, selectedLanguage);

  const title            = t.tour_title || tour?.tour_slug || "";
  const overviewHtml     = t.overview_html || "";
  const basePrice        = Number(tour?.base_price ?? 0);
  const pickupExtraPrice = Number(tour?.pickup_extra_price ?? 0);
  const maxTravelers     = Number(tour?.max_travelers ?? 15);

  const extraPrice = meetingOption === "pickup" ? pickupExtraPrice : 0;
  const totalPrice = (basePrice + extraPrice) * travelers;

  const media       = Array.isArray(tour?.media) ? tour.media : [];
  const bannerMedia = media.length > 0 ? media : [{ media_url: FALLBACK_IMAGE, media_type: "image" }];

  const meetingLat = Number(tour?.meeting_point_lat ?? 0);
  const meetingLng = Number(tour?.meeting_point_lng ?? 0);
  const pickupLat  = Number(tour?.pickup_point_lat  ?? 0);
  const pickupLng  = Number(tour?.pickup_point_lng  ?? 0);

  const handleTravelersChange = (delta) =>
    setTravelers((prev) => Math.max(1, Math.min(maxTravelers, prev + delta)));

  const handleBookNow = () => {
    const params = new URLSearchParams({
      travelers:  String(travelers),
      date:       selectedDate,
      meeting:    meetingOption,
      totalPrice: String(totalPrice.toFixed(2)),
    });
    router.push(`/tours/${destSlug}/${tourSlug}/book?${params.toString()}`);
  };

  if (tour_detail_loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#3B85C1] text-xl font-semibold animate-pulse">Loading tour...</div>
      </div>
    );
  }

  if (!tour_detail_loading && !tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-xl">Tour not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Banner Swiper */}
      <div className="relative w-full h-[430px]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={bannerMedia.length > 1}
          className="w-full h-full"
        >
          {bannerMedia.map((m, i) => (
            <SwiperSlide key={i} className="relative w-full h-[430px]">
              {m.media_type === "video" ? (
                <video src={m.media_url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="relative w-full h-full">
                  <Image src={m.media_url || FALLBACK_IMAGE} alt={title} fill className="object-cover" priority={i === 0} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="container mt-8">
        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-[#264787] 2xl:text-[50px]">{title}</h1>
          <button className="text-gray-400 hover:text-red-500 transition p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Grid: Overview + Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
          {/* Left: Overview — sticky so it stays visible while widget scrolls */}
          <div className="sticky top-8 self-start">
            <h2 className="text-xl font-bold text-[#264787] mb-4">Overview</h2>
            {overviewHtml ? (
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: overviewHtml }} />
            ) : (
              <p className="text-gray-400 italic">No overview available.</p>
            )}
          </div>

          {/* Right: Booking Widget */}
          <div className="space-y-4 self-start">

            {/* Travelers Counter */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm font-semibold text-[#264787] mb-3">Number of Travelers</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0 border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleTravelersChange(-1)}
                    className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none"
                  >
                    −
                  </button>
                  <div className="w-14 h-11 flex items-center justify-center text-[#264787] font-bold text-lg border-x-2 border-gray-200 bg-white">
                    {travelers}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTravelersChange(1)}
                    className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-400">Max {maxTravelers} travelers</span>
              </div>
            </div>

            {/* Date */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm font-semibold text-[#264787] mb-3">Select Date</p>
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B85C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-sm text-gray-700 focus:outline-none flex-1"
                />
              </div>
            </div>

            {/* Meeting Option */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm font-semibold text-[#264787] mb-3">Meeting Option</p>
              <div className="flex flex-col gap-2">
                {/* Meeting Point option */}
                <div
                  onClick={() => setMeetingOption("meeting")}
                  className={`flex flex-row items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    meetingOption === "meeting"
                      ? "border-[#3B85C1] bg-[#3B85C1]/5"
                      : "border-gray-200 bg-gray-50 hover:border-[#3B85C1]/40"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${meetingOption === "meeting" ? "border-[#3B85C1]" : "border-gray-300"}`}>
                    {meetingOption === "meeting" && <div className="w-2.5 h-2.5 rounded-full bg-[#3B85C1]" />}
                  </div>
                  <span className="text-sm text-gray-700 flex-1">Meeting Point</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Free</span>
                </div>

                {meetingOption === "meeting" && meetingLat > 0 && meetingLng > 0 && (
                  <LocationMap
                    lat={meetingLat}
                    lng={meetingLng}
                    label={tour?.meeting_point_address || "Meeting Point"}
                  />
                )}

                {/* Pickup Point option */}
                <div
                  onClick={() => setMeetingOption("pickup")}
                  className={`flex flex-row items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    meetingOption === "pickup"
                      ? "border-[#3B85C1] bg-[#3B85C1]/5"
                      : "border-gray-200 bg-gray-50 hover:border-[#3B85C1]/40"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${meetingOption === "pickup" ? "border-[#3B85C1]" : "border-gray-300"}`}>
                    {meetingOption === "pickup" && <div className="w-2.5 h-2.5 rounded-full bg-[#3B85C1]" />}
                  </div>
                  <span className="text-sm text-gray-700 flex-1">Pickup Point</span>
                  <span className="text-xs font-bold text-[#3B85C1] bg-[#3B85C1]/10 px-2 py-0.5 rounded-full">
                    +${pickupExtraPrice > 0 ? pickupExtraPrice.toFixed(0) : "0"}
                  </span>
                </div>

                {meetingOption === "pickup" && pickupLat > 0 && pickupLng > 0 && (
                  <LocationMap
                    lat={pickupLat}
                    lng={pickupLng}
                    label={tour?.pickup_point_address || "Pickup Point"}
                  />
                )}
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-[#3B85C1] text-white rounded-2xl px-6 py-5">
              <div className="text-sm opacity-80 mb-1">Total Price</div>
              <div className="text-3xl font-bold">${totalPrice.toFixed(2)}</div>
              <div className="text-xs opacity-70 mt-1">
                ${(basePrice + extraPrice).toFixed(2)} × {travelers} traveler{travelers !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Book Now */}
            <button
              onClick={handleBookNow}
              className="w-full bg-[#264787] hover:bg-[#3B85C1] text-white font-bold py-4 rounded-2xl text-lg transition-colors shadow-md shadow-[#264787]/20"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#264787] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map(({ key, label }) => {
              const content = t[key] || "";
              if (!content) return null;
              const isOpen = openFaq === key;
              return (
                <div
                  key={key}
                  className={`rounded-xl px-4 py-2 transition-all ${isOpen ? "bg-white border border-[#CED6E1]" : "bg-[#F5F6FA]"}`}
                >
                  <button
                    className="w-full flex items-center justify-between py-2 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : key)}
                  >
                    <span className="font-semibold text-[#264787] text-sm">{label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B85C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className={`transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="pb-3 text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
