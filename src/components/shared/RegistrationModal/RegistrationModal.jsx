"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { _post } from "../../../lib/shared/api";

const inp = "w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/30 focus:border-[#3B85C1] transition placeholder:text-gray-400";

export default function RegistrationModal({ open, onClose, offer }) {
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const t = (en, ar) => en; // placeholder for i18n

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.phone) return;
    setLoading(true);
    try {
      await _post("pages/offer-register", {
        offer_id: offer?.offer_id ?? null,
        offer_name: offer?.offer_name ?? offer?.name ?? null,
        ...form,
      });
      setSuccess(true);
      setForm({ full_name: "", phone: "", email: "", notes: "" });
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
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#264787] to-[#3B85C1] px-6 py-5">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
              >
                <X size={16} />
              </button>
              {offer?.image_url && (
                <img src={offer.image_url} alt="" className="w-full h-[160px] object-contain rounded-xl mb-4" />
              )}
              <h2 className="text-white text-xl font-bold">
                {offer?.offer_name || offer?.name || "Register for this Offer"}
              </h2>
              {offer?.offer_description && (
                <p className="text-white/70 text-sm mt-1 line-clamp-2">{offer.offer_description}</p>
              )}
              {offer?.offer_value && (
                <span className="inline-block mt-2 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {offer.offer_value}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#264787] mb-2">Registration Submitted!</h3>
                  <p className="text-gray-500 text-sm">We'll contact you shortly to confirm your offer.</p>
                  <button
                    onClick={handleClose}
                    className="mt-6 bg-[#264787] text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-[#3B85C1] transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className={inp} placeholder="Your full name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inp} placeholder="+20 1XX XXX XXXX" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inp} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
                    <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inp + " resize-none"} placeholder="Any special requests..." />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#264787] hover:bg-[#3B85C1] text-white font-bold py-3 rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading && (
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    )}
                    {loading ? "Submitting..." : "Register Now"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
