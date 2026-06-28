"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Copy, Check, ExternalLink } from "lucide-react";

// ── Bilingual strings ─────────────────────────────
const T = {
  en: {
    successTitle:  "Request Submitted!",
    successSub:    "We'll contact you shortly to confirm your booking.",
    ref:           "Reference",
    trackingLink:  "Tracking Link",
    copy:          "Copy",
    copied:        "Copied!",
    trackBtn:      "Track",
    whatsNext:     "What happens next?",
    whatsNextBody: "Our team will reach out within 24 hours on your phone or email to finalize your details.",
    total:         "Total",
  },
  ar: {
    successTitle:  "تم تقديم الطلب!",
    successSub:    "سنتواصل معك قريبًا لتأكيد حجزك.",
    ref:           "رقم الحجز",
    trackingLink:  "رابط المتابعة",
    copy:          "نسخ",
    copied:        "تم النسخ!",
    trackBtn:      "تتبع",
    whatsNext:     "ماذا سيحدث بعد ذلك؟",
    whatsNextBody: "سيتواصل فريقنا معك خلال 24 ساعة عبر الهاتف أو البريد الإلكتروني لإتمام التفاصيل.",
    total:         "الإجمالي",
  },
};

function CopyBtn({ value, label, copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const go = async () => {
    try { await navigator.clipboard.writeText(value); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={go}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all shrink-0"
    >
      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
      {copied ? copiedLabel : label}
    </button>
  );
}

/**
 * Shared booking confirmation card — used inline after form submission.
 *
 * Props:
 *   type        "tour"|"umrah"|"offer"|"visa"|"payment"|"car"
 *   bookingId   number|null
 *   title       string — name of what was booked
 *   image       string|null — image URL
 *   details     Array<{ label: string, value: string|null, emoji?: string }>
 *   price       number|null
 *   currency    string — default "USD"
 *   isRTL       boolean
 *   accentColor string — tailwind bg class, default "from-[#264787] to-[#3b85c1]"
 *   onHome      () => void
 *   onBack      () => void
 *   backLabel   string
 */
export default function BookingConfirmUI({
  type = "tour",
  bookingId = null,
  title = "",
  image = null,
  details = [],
  price = null,
  currency = "USD",
  isRTL = false,
  accentColor = "from-[#264787] to-[#3b85c1]",
  onHome,
  onBack,
  backLabel = "Back",
}) {
  const t = T[isRTL ? "ar" : "en"];
  const [mounted] = useState(true);

  const trackingPath = bookingId
    ? `/track/${type}/${bookingId}`
    : null;

  const trackingUrl  = mounted && trackingPath && typeof window !== "undefined"
    ? `${window.location.origin}${trackingPath}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50 py-10 px-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-2xl mx-auto space-y-4">

        {/* ── Status Card ── */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className={`bg-gradient-to-r ${accentColor} p-8 text-center relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)" }} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, delay: 0.15 }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 size={36} className="text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-white text-2xl font-black mb-1">{t.successTitle}</h2>
            <p className="text-white/70 text-sm">{t.successSub}</p>
          </div>

          {/* Reference + tracking */}
          {bookingId && (
            <div className="px-6 py-5 space-y-3">
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.ref}</p>
                  <p className="text-xl font-black text-[#264787]">#{String(bookingId).padStart(6, "0")}</p>
                </div>
                <CopyBtn value={String(bookingId)} label={t.copy} copiedLabel={t.copied} />
              </div>

              {trackingUrl && (
                <div className="flex items-center gap-3 px-4 py-3 bg-[#264787]/4 rounded-2xl border border-[#264787]/15">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-[#264787]/60 uppercase tracking-wider">{t.trackingLink}</p>
                    <p className="text-xs text-[#264787] font-semibold mt-0.5 truncate">{trackingUrl}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <CopyBtn value={trackingUrl} label={t.copy} copiedLabel={t.copied} />
                    <a
                      href={trackingPath}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#264787] text-white hover:bg-[#1e3a75] transition-all"
                    >
                      <ExternalLink size={13} />
                      {t.trackBtn}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── What was booked ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {image && (
            <div className="relative h-44 overflow-hidden bg-gray-100">
              <img src={image} alt={title} className="w-full h-full object-cover" onError={e => { e.target.style.display = "none"; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {title && (
                <div className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"}`}>
                  <p className="text-white font-black text-lg drop-shadow leading-tight">{title}</p>
                </div>
              )}
            </div>
          )}
          <div className="p-5">
            {!image && title && (
              <h3 className="font-black text-[#264787] text-lg mb-4">{title}</h3>
            )}
            {details.filter(d => d.value).map((d, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-base shrink-0 mt-0.5">{d.emoji ?? "📌"}</span>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{d.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{d.value}</p>
                </div>
              </div>
            ))}
            {price != null && price > 0 && (
              <div className="mt-4 bg-gradient-to-r from-[#264787] to-[#3b85c1] rounded-2xl px-5 py-4 flex items-center justify-between text-white">
                <span className="text-sm font-bold opacity-80">{t.total}</span>
                <span className="text-2xl font-black">{price.toLocaleString()} {currency}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── What's Next ── */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-xl mt-0.5">💬</span>
          <div>
            <p className="text-sm font-bold text-amber-800">{t.whatsNext}</p>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">{t.whatsNextBody}</p>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onBack}
            className="py-3.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-sm rounded-2xl shadow-sm transition-all"
          >
            {backLabel}
          </button>
          <button
            onClick={onHome}
            className="py-3.5 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#264787]/25 hover:brightness-110 transition-all"
          >
            {isRTL ? "الصفحة الرئيسية" : "Go to Home"}
          </button>
        </div>

      </div>
    </motion.div>
  );
}
