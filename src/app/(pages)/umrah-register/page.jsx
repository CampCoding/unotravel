"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useUmrah } from "@/context/UmrahContext";
import { useRouter } from "next/navigation";
import { _post } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import { saveDraft, deleteDraft } from "@/lib/utils/draft";

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
      await _post(apiRoutes.umrah_register, {
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
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* Header banner */}
          <div className="bg-gradient-to-r from-[#264787] to-[#3B85C1] rounded-3xl p-8 text-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)" }} />
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white text-2xl font-bold mb-1">Registration Submitted!</h2>
            <p className="text-white/70 text-sm">We'll contact you shortly to confirm your Umrah package.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Package details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {submitted.packageImg && (
                <img src={submitted.packageImg} alt={submitted.packageName} className="w-full h-[160px] object-cover" />
              )}
              <div className="p-5">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Package Details</p>
                <h3 className="font-bold text-[#264787] text-base mb-4">{submitted.packageName}</h3>
                {submitted.duration && (
                  <InfoRow icon="⏱" label="Duration" value={submitted.duration} />
                )}
                {submitted.travelDates && (
                  <InfoRow icon="📅" label="Travel Dates" value={submitted.travelDates} />
                )}
                <InfoRow icon="👥" label="Adults" value={`${submitted.adults} person${submitted.adults !== 1 ? "s" : ""}`} />
                {submitted.roomLabel && (
                  <InfoRow icon="🛏" label="Room Type" value={submitted.roomLabel} />
                )}
                <div className="mt-4 bg-[#3B85C1] rounded-xl px-4 py-3 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs opacity-70">Adults</p>
                    <p className="text-sm font-semibold">{submitted.adults} person{submitted.adults !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70">Total Price</p>
                    <p className="text-xl font-bold">${submitted.totalPrice.toLocaleString()}</p>
                  </div>
                </div>
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
              <InfoRow icon="👤" label="Full Name"      value={submitted.fullName} />
              <InfoRow icon="📞" label="Phone"          value={submitted.phone} />
              <InfoRow icon="✉️" label="Email"          value={submitted.email} />
              <InfoRow icon="🪪" label="Passport"       value={submitted.passportNumber} />
              <InfoRow icon="⚧" label="Gender"         value={submitted.gender} />
              <InfoRow icon="📝" label="Notes"          value={submitted.details} />
            </div>
          </div>

          {/* What's next */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-4 flex gap-3 items-start">
            <span className="text-xl mt-0.5">💬</span>
            <div>
              <p className="text-sm font-semibold text-amber-800">What happens next?</p>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                Our team will reach out to you within 24 hours on your phone or email to finalize your Umrah package details and payment.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => router.push("/our-services/umrah")}
              className="flex-1 bg-[#264787] hover:bg-[#3B85C1] text-white font-bold py-3.5 rounded-xl transition text-sm"
            >
              ← Back to Umrah
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
