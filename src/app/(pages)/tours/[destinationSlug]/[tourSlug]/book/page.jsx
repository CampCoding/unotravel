"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleGetTourDetail } from "../../../../../../lib/features/layoutSlice";
import { _post } from "../../../../../../lib/shared/api";
import { saveDraft, deleteDraft } from "@/lib/utils/draft";

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
      await _post("pages/tour-book", {
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
      setSubmitted({ ...form, phone: `${form.countryCode}${form.phone}` });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success / Confirmation screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* Green success banner */}
          <div className="bg-gradient-to-r from-[#264787] to-[#3B85C1] rounded-3xl p-8 text-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)" }} />
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white text-2xl font-bold mb-1">Booking Confirmed!</h2>
            <p className="text-white/70 text-sm">We'll contact you shortly to confirm your reservation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Tour details card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {mainImg && (
                <img src={mainImg.media_url} alt={title} className="w-full h-[160px] object-cover" />
              )}
              <div className="p-5">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Tour Details</p>
                <h3 className="font-bold text-[#264787] text-base mb-4">{title}</h3>
                <InfoRow icon="📅" label="Booking Date"   value={selectedDate} />
                <InfoRow icon="👥" label="Travelers"      value={`${travelers} person${travelers !== 1 ? "s" : ""}`} />
                <InfoRow icon="📍" label="Meeting Option" value={meetingOption === "pickup" ? "Pickup Point" : "Meeting Point (Free)"} />
                <div className="mt-4 bg-[#3B85C1] rounded-xl px-4 py-3 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs opacity-70">Price per person</p>
                    <p className="text-sm font-semibold">${pricePerPerson.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70">Total Price</p>
                    <p className="text-xl font-bold">${totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Traveler info card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Your Information</p>
              <div className="w-12 h-12 bg-[#264787]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#264787]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <InfoRow icon="👤" label="Full Name"       value={submitted.fullName} />
              <InfoRow icon="📞" label="Phone"           value={submitted.phone} />
              <InfoRow icon="✉️" label="Email"           value={submitted.email} />
              <InfoRow icon="🪪" label="Passport"        value={submitted.passportNumber} />
              <InfoRow icon="📝" label="Notes"           value={submitted.notes} />
            </div>
          </div>

          {/* What's next */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-4 flex gap-3 items-start">
            <span className="text-xl mt-0.5">💬</span>
            <div>
              <p className="text-sm font-semibold text-amber-800">What happens next?</p>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                Our team will reach out to you within 24 hours on your provided phone or email to finalize your booking details.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => router.push(`/tours/${destSlug}`)}
              className="flex-1 bg-[#264787] hover:bg-[#3B85C1] text-white font-bold py-3.5 rounded-xl transition text-sm"
            >
              ← Back to Tours
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3.5 rounded-xl transition text-sm"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
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
              <input type="text" value={form.fullName} onChange={e => set("fullName", e.target.value)} placeholder="Enter your full name" className={inp} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <select value={form.countryCode} onChange={e => set("countryCode", e.target.value)}
                  className="min-w-[110px] bg-gray-100 rounded-2xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 text-sm text-gray-700">
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
                <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="555 000 0000"
                  className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" className={inp} />
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
