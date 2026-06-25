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
import { _post } from "../../../../../lib/shared/api";

const FALLBACK_IMAGE = "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495567/tickets-for-barcelona-bus-turistic-a_xqynzq.jpg";

const FAQ_ITEMS = [
  { key: "faq_whats_included", label: "What's Included" },
  { key: "faq_departure_point", label: "Departure Point" },
  { key: "faq_what_to_expect", label: "What to Expect" },
  { key: "faq_additional_info", label: "Additional Info" },
  { key: "faq_cancellation_policy", label: "Cancellation Policy" },
];

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { tour_detail_data, tour_detail_loading, selectedLanguage } = useSelector((s) => s.layout);

  const destSlug = params?.destinationSlug;
  const tourSlug = params?.tourSlug;

  // Booking state
  const [travelers, setTravelers] = useState(2);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [meetingOption, setMeetingOption] = useState("meeting");
  const [openFaq, setOpenFaq] = useState(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookForm, setBookForm] = useState({ full_name: "", phone: "", email: "", notes: "" });
  const [bookLoading, setBookLoading] = useState(false);
  const [bookSuccess, setBookSuccess] = useState(false);

  useEffect(() => {
    if (destSlug && tourSlug) {
      dispatch(handleGetTourDetail({ destSlug, tourSlug }));
    }
  }, [destSlug, tourSlug, dispatch]);

  const tour = tour_detail_data?.data?.data ?? tour_detail_data?.data ?? null;
  const t = getTranslation(tour, selectedLanguage);

  const title = t.tour_title || tour?.tour_slug || "";
  const overviewHtml = t.overview_html || "";
  const basePrice = Number(tour?.base_price ?? 0);
  const pickupExtraPrice = Number(tour?.pickup_extra_price ?? 0);
  const maxTravelers = Number(tour?.max_travelers ?? 15);

  const extraPrice = meetingOption === "pickup" ? pickupExtraPrice : 0;
  const totalPrice = (basePrice + extraPrice) * travelers;

  const media = Array.isArray(tour?.media) ? tour.media : [];
  const bannerMedia = media.length > 0 ? media : [{ media_url: FALLBACK_IMAGE, media_type: "image" }];

  const handleTravelersChange = (delta) => {
    setTravelers((prev) => Math.max(1, Math.min(maxTravelers, prev + delta)));
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!bookForm.full_name || !bookForm.phone) return;
    setBookLoading(true);
    try {
      await _post("pages/tour-book", {
        tour_id: tour?.tour_id ?? null,
        tour_title: title,
        tour_slug: tourSlug,
        destination_slug: destSlug,
        full_name: bookForm.full_name,
        phone: bookForm.phone,
        email: bookForm.email,
        notes: bookForm.notes,
        travelers,
        booking_date: selectedDate,
        meeting_option: meetingOption,
        total_price: totalPrice,
      });
      setBookSuccess(true);
      setBookForm({ full_name: "", phone: "", email: "", notes: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setBookLoading(false);
    }
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
    <>
    <div className="min-h-screen pb-20">
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
                <video
                  src={m.media_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={m.media_url || FALLBACK_IMAGE}
                    alt={title}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="container mt-8">
        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl !font-bold !text-(--main-dark-color) 2xl:text-[50px] text-[#264787]">
            {title}
          </h1>
          <button className="text-gray-400 hover:text-red-500 transition p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Grid: Overview + Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Overview */}
          <div>
            <h2 className="text-xl font-bold text-[#264787] mb-4">Overview</h2>
            {overviewHtml ? (
              <div
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: overviewHtml }}
              />
            ) : (
              <p className="text-gray-400 italic">No overview available.</p>
            )}
            {overviewHtml && overviewHtml.length > 400 && (
              <button className="mt-4 text-[#3B85C1] font-semibold text-sm underline underline-offset-2 hover:text-[#264787] transition">
                Read More
              </button>
            )}
          </div>

          {/* Right: Booking Widget */}
          <div className="bg-[#F5F6FA] rounded-2xl p-6 space-y-5 self-start">
            {/* Travelers Counter */}
            <div>
              <label className="block text-sm font-semibold text-[#264787] mb-2">Travelers</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#3B85C1] rounded-[30px] h-[30px] w-[96px] justify-between px-3">
                  <button
                    onClick={() => handleTravelersChange(-1)}
                    className="text-white font-bold text-lg leading-none select-none"
                  >
                    −
                  </button>
                  <span className="text-white font-semibold text-sm">{travelers}</span>
                  <button
                    onClick={() => handleTravelersChange(1)}
                    className="text-white font-bold text-lg leading-none select-none"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500">Max {maxTravelers} travelers</span>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-semibold text-[#264787] mb-2">Date</label>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B85C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
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
            <div>
              <label className="block text-sm font-semibold text-[#264787] mb-2">Meeting Option</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="meetingOption"
                    value="meeting"
                    checked={meetingOption === "meeting"}
                    onChange={() => setMeetingOption("meeting")}
                    className="accent-[#3B85C1]"
                  />
                  <span className="text-sm text-gray-700">Meeting Point <span className="text-green-600 font-semibold">(Free)</span></span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="meetingOption"
                    value="pickup"
                    checked={meetingOption === "pickup"}
                    onChange={() => setMeetingOption("pickup")}
                    className="accent-[#3B85C1]"
                  />
                  <span className="text-sm text-gray-700">
                    Pickup Point <span className="text-[#3B85C1] font-semibold">(+${pickupExtraPrice.toFixed(0)})</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-[#3B85C1] text-white rounded-xl p-[27px]">
              <div className="text-sm opacity-80 mb-1">Total Price</div>
              <div className="text-3xl font-bold">${totalPrice.toFixed(2)}</div>
              <div className="text-xs opacity-70 mt-1">
                ${(basePrice + extraPrice).toFixed(2)} × {travelers} traveler{travelers !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Book Now */}
            <button
              onClick={() => { setBookSuccess(false); setBookingModal(true); }}
              className="bg-[#264787] rounded-[37px] h-[60px] text-xl w-full text-white font-bold hover:bg-[#3B85C1] transition-colors"
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
                  className={`rounded-[12px] px-[12px] py-[8px] transition-all ${
                    isOpen ? "bg-white border border-[#CED6E1]" : "bg-[#F5F6FA]"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between py-2 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : key)}
                  >
                    <span className="font-semibold text-[#264787] text-sm">{label}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18" height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3B85C1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div
                      className="pb-3 text-sm text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    {/* Booking Modal */}
    {bookingModal && (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setBookingModal(false)}>
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#264787] to-[#3B85C1] px-6 py-5">
            <button onClick={() => setBookingModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h2 className="text-white text-lg font-bold">{title}</h2>
            <div className="flex gap-4 mt-2 text-white/80 text-sm">
              <span>{travelers} Traveler{travelers !== 1 ? "s" : ""}</span>
              <span>·</span>
              <span>{selectedDate}</span>
              <span>·</span>
              <span className="capitalize">{meetingOption}</span>
            </div>
            <div className="mt-2 text-white font-bold text-xl">${totalPrice.toFixed(2)}</div>
          </div>

          <div className="p-6">
            {bookSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#264787] mb-1">Booking Confirmed!</h3>
                <p className="text-gray-500 text-sm">We'll contact you shortly to confirm your reservation.</p>
                <button onClick={() => setBookingModal(false)} className="mt-5 bg-[#264787] text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-[#3B85C1] transition">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" value={bookForm.full_name} onChange={(e) => setBookForm({ ...bookForm, full_name: e.target.value })} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/30 focus:border-[#3B85C1] transition" placeholder="Your full name" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                  <input type="tel" value={bookForm.phone} onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/30 focus:border-[#3B85C1] transition" placeholder="+20 1XX XXX XXXX" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input type="email" value={bookForm.email} onChange={(e) => setBookForm({ ...bookForm, email: e.target.value })} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/30 focus:border-[#3B85C1] transition" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
                  <textarea rows={2} value={bookForm.notes} onChange={(e) => setBookForm({ ...bookForm, notes: e.target.value })} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/30 focus:border-[#3B85C1] transition resize-none" placeholder="Special requests..." />
                </div>
                <button type="submit" disabled={bookLoading} className="w-full bg-[#264787] hover:bg-[#3B85C1] text-white font-bold py-3 rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                  {bookLoading && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>}
                  {bookLoading ? "Submitting..." : "Confirm Booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
