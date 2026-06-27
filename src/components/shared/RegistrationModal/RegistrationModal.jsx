"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { _post } from "../../../lib/shared/api";
import { saveDraft, deleteDraft } from "../../../lib/utils/draft";

const inp = "w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base text-gray-800";

export default function RegistrationModal({ open, onClose, offer }) {
  const [form, setForm]       = useState({ full_name: "", countryCode: "+966", phone: "", email: "", notes: "" });
  const [travelers, setTravelers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }));

  // Auto-save draft whenever user types
  useEffect(() => {
    if (!open) return;
    const hasInput = form.full_name || form.phone || form.email;
    if (!hasInput) return;
    saveDraft("offer", {
      title:    offer?.offer_name ?? offer?.name ?? "Offer Registration",
      subtitle: offer?.offer_value ?? "",
      path:     "/our-offers/register",
      formData: { form, travelers },
    });
  }, [form, travelers, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.phone) return;
    setLoading(true);
    try {
      await _post("pages/offer-register", {
        offer_id:   offer?.offer_id ?? null,
        offer_name: offer?.offer_name ?? offer?.name ?? null,
        full_name:  form.full_name,
        phone:      `${form.countryCode}${form.phone}`,
        email:      form.email || null,
        notes:      [
          travelers > 1 ? `Travelers: ${travelers}` : "",
          form.notes,
        ].filter(Boolean).join("\n") || null,
      });
      deleteDraft("offer");
      setSuccess(true);
      setForm({ full_name: "", countryCode: "+966", phone: "", email: "", notes: "" });
      setTravelers(1);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            key="modal"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gray-50 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 shadow-sm transition"
            >
              <X size={17} />
            </button>

            {success ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#264787] mb-2">Registration Submitted!</h3>
                <p className="text-gray-500 text-sm max-w-xs">We'll contact you shortly to confirm your offer details.</p>
                <button
                  onClick={handleClose}
                  className="mt-8 bg-[#264787] text-white px-10 py-3 rounded-xl text-sm font-bold hover:bg-[#3B85C1] transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* ── Offer summary card ── */}
                <div className="bg-white rounded-3xl m-4 mb-0 shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row gap-5">
                  {offer?.image_url && (
                    <img
                      src={offer.image_url}
                      alt={offer.offer_name}
                      className="w-full sm:w-[160px] h-[180px] sm:h-[160px] object-contain rounded-xl flex-shrink-0 bg-gray-50"
                    />
                  )}
                  <div className="flex flex-col justify-center gap-2 flex-1 min-w-0">
                    <h2 className="text-[#264787] font-bold text-lg sm:text-xl leading-snug">
                      {offer?.offer_name || "Register for this Offer"}
                    </h2>
                    {offer?.offer_description && (
                      <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                        {offer.offer_description}
                      </p>
                    )}
                    {offer?.offer_value && (
                      <span className="inline-flex w-fit items-center bg-[#3B85C1]/10 text-[#3B85C1] text-sm font-bold px-3 py-1 rounded-full">
                        🏷 {offer.offer_value}
                      </span>
                    )}

                    {/* Travelers counter */}
                    <div className="mt-1">
                      <p className="text-xs font-semibold text-[#264787] mb-2">Number of Travelers:</p>
                      <div className="flex items-center gap-0 w-fit border-2 border-gray-200 rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setTravelers(n => Math.max(1, n - 1))}
                          className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none"
                        >
                          −
                        </button>
                        <div className="w-12 h-10 flex items-center justify-center text-[#264787] font-bold text-base border-x-2 border-gray-200 bg-white">
                          {travelers}
                        </div>
                        <button
                          type="button"
                          onClick={() => setTravelers(n => Math.min(20, n + 1))}
                          className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Form ── */}
                <form onSubmit={handleSubmit} className="p-4 pt-4">
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
                    <h3 className="text-base font-bold text-[#264787] mb-5">Personal Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.full_name}
                          onChange={e => set("full_name", e.target.value)}
                          placeholder="Enter your full name"
                          className={inp}
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={form.countryCode}
                            onChange={e => set("countryCode", e.target.value)}
                            className="min-w-[100px] bg-gray-100 rounded-2xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 text-sm text-gray-700"
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
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => set("email", e.target.value)}
                          placeholder="your@email.com"
                          className={inp}
                        />
                      </div>

                      {/* Notes */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
                        <textarea
                          rows={3}
                          value={form.notes}
                          onChange={e => set("notes", e.target.value)}
                          placeholder="Any special requests..."
                          className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 resize-none text-base text-gray-800"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-5 w-full bg-[#264787] hover:bg-[#3B85C1] text-white font-bold py-3.5 rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2 text-base"
                    >
                      {loading && (
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      )}
                      {loading ? "Submitting..." : "Register Now"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
