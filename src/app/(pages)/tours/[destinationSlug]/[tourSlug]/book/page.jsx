"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleGetTourDetail } from "../../../../../../lib/features/layoutSlice";
import { _post } from "../../../../../../lib/shared/api";
import { saveDraft, deleteDraft } from "@/lib/utils/draft";
import BookingConfirmUI from "@/components/shared/BookingConfirmUI/BookingConfirmUI";
import SuggestionInput from "@/components/shared/SuggestionInput/SuggestionInput";
import { useUserForm } from "@/hooks/useUserForm";
import { useServiceTracker } from "@/hooks/useServiceTracker";

const PickupMapPicker = dynamic(
  () => import("@/components/shared/PickupMapPicker/PickupMapPicker"),
  { ssr: false, loading: () => (
    <div className="w-full h-[300px] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 text-sm">
      Loading map...
    </div>
  )}
);

const inp = "w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base text-gray-800";

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="text-base mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-800 break-words">{value}</p>
      </div>
    </div>
  );
}

export default function TourBookPage() {
  const params       = useParams();
  const router       = useRouter();
  const searchParams = useSearchParams();
  const dispatch     = useDispatch();
  const { tour_detail_data, selectedLanguage } = useSelector((s) => s.layout);
  const { prefill, suggestions, locked, handleBookingResponse } = useUserForm();
  useServiceTracker("tour");

  const destSlug = params?.destinationSlug;
  const tourSlug = params?.tourSlug;

  const travelers     = Number(searchParams.get("travelers") ?? 2);
  const selectedDate  = searchParams.get("date") ?? "";
  const meetingOption = searchParams.get("meeting") ?? "meeting";
  const totalPrice    = Number(searchParams.get("totalPrice") ?? 0);

  useEffect(() => {
    if (destSlug && tourSlug) dispatch(handleGetTourDetail({ destSlug, tourSlug }));
  }, [destSlug, tourSlug, dispatch]);

  const tour  = tour_detail_data?.data?.data ?? tour_detail_data?.data ?? null;
  const t     = getTranslation(tour, selectedLanguage);
  const title = t.tour_title || tour?.tour_slug || "";

  const media   = Array.isArray(tour?.media) ? tour.media : [];
  const mainImg = media.find((m) => m.is_main) ?? media[0];

  const basePrice       = Number(tour?.base_price ?? 0);
  const pickupExtra     = Number(tour?.pickup_extra_price ?? 0);
  const pricePerPerson  = meetingOption === "pickup" ? basePrice + pickupExtra : basePrice;

  const [form, setForm] = useState({
    fullName: "", countryCode: "+966", phone: "", email: "",
    passportNumber: "", notes: "",
  });

  // Pre-fill from logged-in user profile
  useEffect(() => {
    if (prefill.fullName) set("fullName", prefill.fullName);
    if (prefill.email)    set("email",    prefill.email);
    if (prefill.phone)    set("phone",    prefill.phone.replace(/^\+\d+/, "").trim());
  }, [prefill.fullName]);
  const [pickupLocation, setPickupLocation] = useState({ lat: null, lng: null });
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [submitted, setSubmitted] = useState(null);

  // Map center: tour's pickup_point_lat/lng if set, else Cairo
  const mapCenter = (tour?.pickup_point_lat && Number(tour.pickup_point_lat) !== 0)
    ? { lat: Number(tour.pickup_point_lat), lng: Number(tour.pickup_point_lng) }
    : null;

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }));

  useEffect(() => {
    if (!tour) return;
    const hasInput = form.fullName || form.phone || form.email;
    if (!hasInput) return;
    saveDraft("tour", {
      title,
      subtitle: `${travelers} traveler${travelers !== 1 ? "s" : ""} · ${selectedDate}`,
      path: `/tours/${destSlug}/${tourSlug}/book?travelers=${travelers}&date=${selectedDate}&meeting=${meetingOption}&totalPrice=${totalPrice}`,
      formData: form,
    });
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      setError("Full name and phone are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (meetingOption === "pickup" && !pickupLocation.lat) {
        setError("Please select your pickup location on the map.");
        setLoading(false);
        return;
      }
      const res = await _post("pages/tour-book", {
        tour_id:          tour?.tour_id ?? null,
        tour_title:       title,
        tour_slug:        tourSlug,
        destination_slug: destSlug,
        full_name:        form.fullName,
        phone:            `${form.countryCode}${form.phone}`,
        email:            form.email || null,
        notes:            [`Meeting: ${meetingOption}`, form.notes].filter(Boolean).join("\n"),
        travelers,
        booking_date:     selectedDate,
        meeting_option:   meetingOption,
        pickup_lat:       meetingOption === "pickup" ? pickupLocation.lat  : null,
        pickup_lng:       meetingOption === "pickup" ? pickupLocation.lng  : null,
        total_price:      totalPrice,
      });
      deleteDraft("tour");
      handleBookingResponse(res?.data?.data);
      setSubmitted({
        ...form,
        phone:      `${form.countryCode}${form.phone}`,
        bookingId:  res?.data?.data?.booking_id ?? null,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success / Confirmation screen ── */
  if (submitted) {
    const isRTL = (selectedLanguage || 1) === 2;
    return (
      <BookingConfirmUI
        type="tour"
        bookingId={submitted.bookingId}
        title={title}
        image={mainImg?.media_url ?? null}
        details={[
          { emoji: "📅", label: isRTL ? "تاريخ الحجز"    : "Booking Date",    value: selectedDate },
          { emoji: "👥", label: isRTL ? "المسافرون"       : "Travelers",       value: `${travelers} ${travelers !== 1 ? (isRTL ? "أشخاص" : "persons") : (isRTL ? "شخص" : "person")}` },
          { emoji: "📍", label: isRTL ? "خيار اللقاء"     : "Meeting Option",  value: meetingOption === "pickup" ? (isRTL ? "نقطة استلام" : "Pickup Point") : (isRTL ? "نقطة لقاء (مجانًا)" : "Meeting Point (Free)") },
          { emoji: "👤", label: isRTL ? "الاسم الكامل"    : "Full Name",       value: submitted.fullName },
          { emoji: "📞", label: isRTL ? "الهاتف"          : "Phone",           value: submitted.phone },
          { emoji: "✉️", label: isRTL ? "البريد"          : "Email",           value: submitted.email },
        ]}
        price={totalPrice}
        currency="USD"
        isRTL={isRTL}
        onBack={() => router.push(`/tours/${destSlug}`)}
        onHome={() => router.push("/")}
        backLabel={isRTL ? "العودة للجولات" : "← Back to Tours"}
      />
    );
  }

  /* ── Booking form ── */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">

        {/* Tour summary card */}
        {tour && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 flex flex-col sm:flex-row gap-5">
            {mainImg && (
              <img src={mainImg.media_url} alt={title} className="w-full sm:w-[220px] h-[170px] object-cover rounded-xl flex-shrink-0" />
            )}
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <h2 className="text-xl font-bold text-[#264787]">{title}</h2>
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 bg-blue-50 text-[#3B85C1] px-3 py-1 rounded-full font-medium text-xs">📅 {selectedDate}</span>
                <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium text-xs">👤 {travelers} traveler{travelers !== 1 ? "s" : ""}</span>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium text-xs ${meetingOption === "pickup" ? "bg-purple-50 text-purple-700" : "bg-green-50 text-green-700"}`}>
                  📍 {meetingOption === "pickup" ? "Pickup Point" : "Meeting Point"}
                </span>
              </div>
              <div className="bg-[#3B85C1] text-white rounded-xl px-5 py-3 flex items-center justify-between mt-auto">
                <span className="text-sm opacity-80">{travelers} × ${pricePerPerson.toLocaleString()}</span>
                <span className="text-xl font-bold">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#264787] mb-6">Personal Information</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
              <SuggestionInput value={form.fullName} onChange={e => set("fullName", e.target.value)}
                suggestions={suggestions.fullName} placeholder="Enter your full name"
                className={inp + (locked ? " opacity-70 cursor-not-allowed" : "")} disabled={locked} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <select value={form.countryCode} onChange={e => set("countryCode", e.target.value)}
                  disabled={locked}
                  className="min-w-[110px] bg-gray-100 rounded-2xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 text-sm text-gray-700 disabled:opacity-70">
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+20">🇪🇬 +20</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+965">🇰🇼 +965</option>
                  <option value="+974">🇶🇦 +974</option>
                  <option value="+968">🇴🇲 +968</option>
                  <option value="+962">🇯🇴 +962</option>
                  <option value="+90">🇹🇷 +90</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+1">🇺🇸 +1</option>
                </select>
                <SuggestionInput type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                  suggestions={suggestions.phone} placeholder="555 000 0000"
                  className={"flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base" + (locked ? " opacity-70 cursor-not-allowed" : "")}
                  disabled={locked} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <SuggestionInput type="email" value={form.email} onChange={e => set("email", e.target.value)}
                suggestions={suggestions.email} placeholder="your@email.com"
                className={inp + (locked ? " opacity-70 cursor-not-allowed" : "")} disabled={locked} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Passport Number</label>
              <input type="text" value={form.passportNumber} onChange={e => set("passportNumber", e.target.value)} placeholder="Enter your passport number" className={inp} />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
            <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
              placeholder="Any special requests..." className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 resize-none h-28 text-base text-gray-800" />
          </div>

          {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 justify-end mt-6">
            <button type="button" onClick={() => router.back()}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition text-sm">
              ← Back
            </button>
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 bg-[#264787] hover:bg-[#3B85C1] text-white font-bold px-8 py-3 rounded-xl transition disabled:opacity-60 text-base">
              {loading && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>}
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
