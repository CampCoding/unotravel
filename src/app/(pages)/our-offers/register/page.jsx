"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { _post } from "@/lib/shared/api";
import { saveDraft, deleteDraft } from "@/lib/utils/draft";

const inp = "w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base text-gray-800";

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

export default function OfferRegisterPage() {
  const router = useRouter();
  const [offer, setOffer] = useState(null);

  const [travelers, setTravelers] = useState(1);
  const [form, setForm] = useState({
    fullName: "", countryCode: "+966", phone: "", email: "", notes: "",
  });
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
      await _post("pages/offer-register", {
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
      setSubmitted({
        ...form,
        phone:     `${form.countryCode}${form.phone}`,
        travelers,
        offerName: offer?.offer_name,
        offerImg:  offer?.image_url,
        offerValue: offer?.offer_value,
        offerDesc: offer?.offer_description,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* Header banner */}
          <div className="bg-gradient-to-r from-[#C1823B] to-[#E6A855] rounded-3xl p-8 text-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)" }} />
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white text-2xl font-bold mb-1">Registration Submitted!</h2>
            <p className="text-white/70 text-sm">We'll contact you shortly to confirm your offer.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Offer details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {submitted.offerImg && (
                <img src={submitted.offerImg} alt={submitted.offerName} className="w-full h-[160px] object-contain bg-gray-50" />
              )}
              <div className="p-5">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Offer Details</p>
                <h3 className="font-bold text-[#264787] text-base mb-3">{submitted.offerName || "Offer Registration"}</h3>
                {submitted.offerDesc && (
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3">{submitted.offerDesc}</p>
                )}
                {submitted.offerValue && (
                  <span className="inline-flex items-center gap-1 bg-[#3B85C1]/10 text-[#3B85C1] text-sm font-bold px-3 py-1 rounded-full mb-3">
                    🏷 {submitted.offerValue}
                  </span>
                )}
                <InfoRow icon="👥" label="Travelers" value={`${submitted.travelers} person${submitted.travelers !== 1 ? "s" : ""}`} />
              </div>
            </div>

            {/* Your info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Your Information</p>
              <div className="w-12 h-12 bg-[#264787]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#264787]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <InfoRow icon="👤" label="Full Name" value={submitted.fullName} />
              <InfoRow icon="📞" label="Phone"     value={submitted.phone} />
              <InfoRow icon="✉️" label="Email"     value={submitted.email} />
              <InfoRow icon="📝" label="Notes"     value={submitted.notes} />
            </div>
          </div>

          {/* What's next */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-4 flex gap-3 items-start">
            <span className="text-xl mt-0.5">💬</span>
            <div>
              <p className="text-sm font-semibold text-amber-800">What happens next?</p>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                Our team will reach out to you within 24 hours on your phone or email to confirm your registration details.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => router.push("/our-offers")}
              className="flex-1 bg-[#264787] hover:bg-[#3B85C1] text-white font-bold py-3.5 rounded-xl transition text-sm"
            >
              Browse More Offers
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
              <input
                type="text"
                value={form.fullName}
                onChange={e => set("fullName", e.target.value)}
                placeholder="Enter your full name"
                className={inp}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={form.countryCode}
                  onChange={e => set("countryCode", e.target.value)}
                  className="min-w-[110px] bg-gray-100 rounded-2xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 text-sm text-gray-700"
                >
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
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  placeholder="555 000 0000"
                  className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                placeholder="your@email.com"
                className={inp}
              />
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
