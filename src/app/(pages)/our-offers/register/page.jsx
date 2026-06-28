"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { _post } from "@/lib/shared/api";
import { saveDraft, deleteDraft } from "@/lib/utils/draft";
import BookingConfirmUI from "@/components/shared/BookingConfirmUI/BookingConfirmUI";
import SuggestionInput from "@/components/shared/SuggestionInput/SuggestionInput";
import { useUserForm } from "@/hooks/useUserForm";
import { useServiceTracker } from "@/hooks/useServiceTracker";

const inp = "w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base text-gray-800";

export default function OfferRegisterPage() {
  const router = useRouter();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});
  const { prefill, suggestions, locked, handleBookingResponse } = useUserForm();
  useServiceTracker("offer");
  const [offer, setOffer] = useState(null);

  const [travelers, setTravelers] = useState(1);
  const [form, setForm] = useState({
    fullName: "", countryCode: "+966", phone: "", email: "", notes: "",
  });

  useEffect(() => {
    if (prefill.fullName) set("fullName", prefill.fullName);
    if (prefill.email)    set("email",    prefill.email);
    if (prefill.phone)    set("phone",    prefill.phone.replace(/^\+\d{1,4}\s?/, "").trim());
  }, [prefill.fullName]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [submitted, setSubmitted] = useState(null);

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }));

  // Load offer from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("uno_selected_offer");
      if (raw) setOffer(JSON.parse(raw));
    } catch {}
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (!offer) return;
    const hasInput = form.fullName || form.phone || form.email;
    if (!hasInput) return;
    saveDraft("offer", {
      title:    offer.offer_name ?? "Offer Registration",
      subtitle: offer.offer_value ?? "",
      path:     "/our-offers/register",
      formData: { form, travelers },
    });
  }, [form, travelers, offer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      setError("Full name and phone are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await _post("pages/offer-register", {
        offer_id:   offer?.offer_id   ?? null,
        offer_name: offer?.offer_name ?? null,
        full_name:  form.fullName,
        phone:      `${form.countryCode}${form.phone}`,
        email:      form.email || null,
        notes:      [
          travelers > 1 ? `Travelers: ${travelers}` : "",
          form.notes,
        ].filter(Boolean).join("\n") || null,
      });
      deleteDraft("offer");
      sessionStorage.removeItem("uno_selected_offer");
      handleBookingResponse(res?.data?.data);
      setSubmitted({
        ...form,
        phone:      `${form.countryCode}${form.phone}`,
        bookingId:  res?.data?.data?.id ?? null,
        travelers,
        offerName:  offer?.offer_name,
        offerImg:   offer?.image_url,
        offerValue: offer?.offer_value,
        offerDesc:  offer?.offer_description,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    const isRTL = (selectedLanguage || 1) === 2;
    return (
      <BookingConfirmUI
        type="offer"
        bookingId={submitted.bookingId}
        title={submitted.offerName ?? (isRTL ? "تسجيل العرض" : "Offer Registration")}
        image={submitted.offerImg ?? null}
        details={[
          { emoji: "🏷",  label: isRTL ? "قيمة العرض"  : "Offer Value", value: submitted.offerValue },
          { emoji: "👥",  label: isRTL ? "المسافرون"   : "Travelers",   value: `${submitted.travelers} ${submitted.travelers !== 1 ? (isRTL ? "أشخاص" : "persons") : (isRTL ? "شخص" : "person")}` },
          { emoji: "👤",  label: isRTL ? "الاسم"       : "Full Name",   value: submitted.fullName },
          { emoji: "📞",  label: isRTL ? "الهاتف"      : "Phone",       value: submitted.phone },
          { emoji: "✉️",  label: isRTL ? "البريد"      : "Email",       value: submitted.email },
          { emoji: "📝",  label: isRTL ? "ملاحظات"     : "Notes",       value: submitted.notes },
        ]}
        isRTL={isRTL}
        accentColor="from-[#C1823B] to-[#E6A855]"
        onBack={() => router.push("/our-offers")}
        onHome={() => router.push("/")}
        backLabel={isRTL ? "العودة للعروض" : "← Back to Offers"}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">

        {/* Offer summary card */}
        {offer && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 flex flex-col sm:flex-row gap-6">
            <img
              src={offer.image_url || '/images/logo hover.svg'}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/logo hover.svg'; }}
              alt={offer.offer_name}
              className="w-full sm:w-[200px] h-[220px] sm:h-[200px] object-contain rounded-xl flex-shrink-0 bg-gray-50"
            />
            <div className="flex flex-col justify-between gap-4 flex-1 min-w-0 py-1">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#264787] mb-2">
                  {offer.offer_name || "Offer Registration"}
                </h2>
                {offer.offer_description && (
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {offer.offer_description}
                  </p>
                )}
                {offer.offer_value && (
                  <span className="inline-flex items-center gap-1.5 mt-3 bg-[#3B85C1]/10 text-[#3B85C1] text-sm font-bold px-3 py-1 rounded-full">
                    🏷 {offer.offer_value}
                  </span>
                )}
              </div>

              {/* Travelers counter */}
              <div>
                <p className="text-sm font-semibold text-[#264787] mb-2">Number of Travelers:</p>
                <div className="flex items-center gap-0 w-fit border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setTravelers(n => Math.max(1, n - 1))}
                    className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none"
                  >
                    −
                  </button>
                  <div className="w-14 h-11 flex items-center justify-center text-[#264787] font-bold text-lg border-x-2 border-gray-200 bg-white">
                    {travelers}
                  </div>
                  <button
                    type="button"
                    onClick={() => setTravelers(n => Math.min(20, n + 1))}
                    className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#264787] mb-6">Personal Information</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <SuggestionInput value={form.fullName} onChange={e => set("fullName", e.target.value)}
                suggestions={suggestions.fullName} placeholder="Enter your full name"
                className={inp + (locked ? " opacity-70 cursor-not-allowed" : "")} disabled={locked} />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
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

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <SuggestionInput type="email" value={form.email} onChange={e => set("email", e.target.value)}
                suggestions={suggestions.email} placeholder="your@email.com"
                className={inp + (locked ? " opacity-70 cursor-not-allowed" : "")} disabled={locked} />
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
            <textarea
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              placeholder="Any special requests..."
              className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 resize-none h-28 text-base text-gray-800"
            />
          </div>

          {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition text-sm"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#264787] hover:bg-[#3B85C1] text-white font-bold px-8 py-3 rounded-xl transition disabled:opacity-60 text-base"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              )}
              {loading ? "Submitting..." : "Register Now"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
