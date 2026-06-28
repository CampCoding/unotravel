"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useUmrah } from "@/context/UmrahContext";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { _post } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import { saveDraft, deleteDraft } from "@/lib/utils/draft";
import BookingConfirmUI from "@/components/shared/BookingConfirmUI/BookingConfirmUI";

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

const extractPrice = (str) => {
  const match = str?.match(/\$?([\d,]+)/);
  return match ? Number(match[1].replace(/,/g, "")) : null;
};

const DRAFT_KEY = "umrah";

export default function Page() {
  const { selectedPackage } = useUmrah();
  const router = useRouter();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});

  const costs    = selectedPackage?.costs ?? [];
  const basePrice = Number(selectedPackage?.price ?? 0);

  const costOptions = useMemo(() =>
    costs.map(c => ({ label: c, price: extractPrice(c) ?? basePrice })),
    [costs, basePrice]
  );

  const [selectedCost, setSelectedCost] = useState(0);
  const [adults, setAdults] = useState(selectedPackage?.adults ?? 1);

  const perPersonPrice = costOptions[selectedCost]?.price ?? basePrice;
  const totalPrice     = perPersonPrice * adults;

  const [form, setForm] = useState({
    fullName: "", countryCode: "+966", phone: "", email: "",
    passportNumber: "", gender: "", details: "",
  });
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [submitted, setSubmitted] = useState(null);

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }));

  // Auto-save draft whenever form or selection changes
  useEffect(() => {
    if (!selectedPackage) return;
    const hasInput = form.fullName || form.phone || form.email;
    if (!hasInput) return;
    saveDraft(DRAFT_KEY, {
      title:    selectedPackage.name,
      subtitle: `${selectedPackage.duration ?? ""} · Starting $${basePrice.toLocaleString()}`.replace(/^ · /, ""),
      path:     "/umrah-register",
      formData: { form, selectedCost, adults },
    });
  }, [form, selectedCost, adults]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      setError("Full name and phone are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await _post(apiRoutes.umrah_register, {
        package_id:      selectedPackage?.id    ?? null,
        package_title:   selectedPackage?.name  ?? null,
        full_name:       form.fullName,
        phone:           `${form.countryCode}${form.phone}`,
        email:           form.email          || null,
        passport_number: form.passportNumber || null,
        gender:          form.gender         || null,
        notes:           [
          costOptions[selectedCost]?.label ? `Room: ${costOptions[selectedCost].label}` : "",
          form.details,
        ].filter(Boolean).join("\n") || null,
        travelers:   adults,
        total_price: totalPrice,
      });
      deleteDraft(DRAFT_KEY);
      setSubmitted({
        ...form,
        phone:       `${form.countryCode}${form.phone}`,
        bookingId:   res?.data?.data?.id ?? null,
        roomLabel:   costOptions[selectedCost]?.label ?? null,
        adults,
        totalPrice,
        packageName: selectedPackage?.name,
        packageImg:  selectedPackage?.image,
        duration:    selectedPackage?.duration,
        travelDates: selectedPackage?.travel_dates,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inp = "w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base";

  /* ── Confirmation screen ── */
  if (submitted) {
    const isRTL = (selectedLanguage || 1) === 2;
    return (
      <BookingConfirmUI
        type="umrah"
        bookingId={submitted.bookingId}
        title={submitted.packageName}
        image={submitted.packageImg ?? null}
        details={[
          { emoji: "⏱",  label: isRTL ? "المدة"       : "Duration",    value: submitted.duration },
          { emoji: "📅",  label: isRTL ? "مواعيد السفر": "Travel Dates",value: submitted.travelDates },
          { emoji: "👥",  label: isRTL ? "البالغون"    : "Adults",      value: `${submitted.adults}` },
          { emoji: "🛏",  label: isRTL ? "نوع الغرفة"  : "Room Type",   value: submitted.roomLabel },
          { emoji: "👤",  label: isRTL ? "الاسم"       : "Full Name",   value: submitted.fullName },
          { emoji: "📞",  label: isRTL ? "الهاتف"      : "Phone",       value: submitted.phone },
          { emoji: "🪪",  label: isRTL ? "جواز السفر"  : "Passport",    value: submitted.passportNumber },
        ]}
        price={submitted.totalPrice}
        currency="USD"
        accentColor="from-[#1a6645] to-[#2ea86e]"
        isRTL={isRTL}
        onBack={() => router.push("/our-services/umrah")}
        onHome={() => router.push("/")}
        backLabel={isRTL ? "العودة للعمرة" : "← Back to Umrah"}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 lg:py-12">

        {/* Package summary card */}
        {selectedPackage ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row gap-6">
            {selectedPackage.image && (
              <img
                src={selectedPackage.image}
                alt={selectedPackage.name}
                className="w-full md:w-[260px] h-[200px] object-cover rounded-xl flex-shrink-0"
              />
            )}
            <div className="flex flex-col gap-3 flex-1 text-[#264787]">
              <h2 className="text-xl sm:text-2xl font-bold">{selectedPackage.name}</h2>

              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                {selectedPackage.duration && (
                  <span className="flex items-center gap-1.5 bg-blue-50 text-[#3B85C1] px-3 py-1 rounded-full font-medium">
                    ⏱ {selectedPackage.duration}
                  </span>
                )}
                {selectedPackage.travel_dates && (
                  <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                    📅 {selectedPackage.travel_dates}
                  </span>
                )}
              </div>

              {/* Room selector */}
              {costOptions.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-[#264787] mb-2">Select Room Type:</p>
                  <div className="flex flex-col gap-2">
                    {costOptions.map((opt, idx) => (
                      <label
                        key={idx}
                        onClick={() => setSelectedCost(idx)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedCost === idx
                            ? "border-[#3B85C1] bg-[#3B85C1]/5"
                            : "border-gray-200 bg-gray-50 hover:border-[#3B85C1]/40"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                          selectedCost === idx ? "border-[#3B85C1]" : "border-gray-300"
                        }`}>
                          {selectedCost === idx && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#3B85C1]" />
                          )}
                        </div>
                        <span className="text-sm text-gray-700 flex-1">{opt.label}</span>
                        {opt.price && (
                          <span className="text-sm font-bold text-[#3B85C1] flex-shrink-0">
                            ${opt.price.toLocaleString()}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Adults counter */}
              <div>
                <p className="text-sm font-semibold text-[#264787] mb-2">Number of Adults:</p>
                <div className="flex items-center gap-0 w-fit border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setAdults(n => Math.max(1, n - 1))}
                    className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none"
                  >
                    −
                  </button>
                  <div className="w-14 h-11 flex items-center justify-center text-[#264787] font-bold text-lg border-x-2 border-gray-200 bg-white">
                    {adults}
                  </div>
                  <button
                    type="button"
                    onClick={() => setAdults(n => Math.min(20, n + 1))}
                    className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mt-1 bg-[#3B85C1] rounded-xl px-5 py-3 flex items-center justify-between text-white">
                <span className="text-sm opacity-80">
                  {adults} adult{adults !== 1 ? "s" : ""} × ${perPersonPrice.toLocaleString()}
                </span>
                <span className="text-xl font-bold">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            No package selected. Please go back and choose a package.
          </div>
        )}

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#264787] mb-6">Personal Information</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input type="text" value={form.fullName} onChange={e => set("fullName", e.target.value)}
                placeholder="Enter your full name" className={inp} />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select value={form.countryCode} onChange={e => set("countryCode", e.target.value)}
                  className="min-w-[110px] md:min-w-[130px] bg-gray-100 rounded-2xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] text-sm text-gray-700">
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+20">🇪🇬 +20</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+965">🇰🇼 +965</option>
                  <option value="+974">🇶🇦 +974</option>
                  <option value="+968">🇴🇲 +968</option>
                  <option value="+962">🇯🇴 +962</option>
                  <option value="+90">🇹🇷 +90</option>
                  <option value="+46">🇸🇪 +46</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+1">🇺🇸 +1</option>
                </select>
                <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                  placeholder="555 000 0000"
                  className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-2">Email Address</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                placeholder="your@email.com" className={inp} />
            </div>

            {/* Passport */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-2">Passport Number</label>
              <input type="text" value={form.passportNumber} onChange={e => set("passportNumber", e.target.value)}
                placeholder="Enter your passport number" className={inp} />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-2">Gender</label>
              <select value={form.gender} onChange={e => set("gender", e.target.value)}
                className={inp + " text-gray-700"}>
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-2">Any Details</label>
            <textarea value={form.details} onChange={e => set("details", e.target.value)}
              placeholder="Any additional details..."
              className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 resize-none h-28 text-base" />
          </div>

          {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end mt-6">
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 font-[filson-bold] text-white px-8 py-3 rounded-xl bg-[var(--main-light-color)] hover:bg-[var(--main-dark-color)] hover:scale-105 transition-all disabled:opacity-60 text-base">
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
