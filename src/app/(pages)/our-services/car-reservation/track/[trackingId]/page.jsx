"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, XCircle, Car, Calendar, MapPin,
  Users, CreditCard, Navigation, Copy, Check, ChevronLeft, ChevronRight,
  AlertCircle, RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";

// ── Bilingual strings ─────────────────────────────
const T = {
  en: {
    pageTitle:    "Booking Tracker",
    refLabel:     "Booking Reference",
    copyLink:     "Copy Link",
    copied:       "Copied!",
    shareMsg:     "Share this link to track your booking:",
    bookedBy:     "Booked by",
    carSection:   "Vehicle",
    tripSection:  "Trip Details",
    pickup:       "Pickup",
    dropoff:      "Drop-off",
    pickupDate:   "Pickup Date",
    returnDate:   "Return Date",
    duration:     (d) => `${d} day${d !== 1 ? "s" : ""}`,
    passengers:   "Passengers",
    adults:       (n) => `${n} Adult${n !== 1 ? "s" : ""}`,
    children:     (n) => `${n} Child${n !== 1 ? "ren" : ""}`,
    bags:         (n) => `${n} Bag${n !== 1 ? "s" : ""}`,
    distance:     "Distance",
    priceSection: "Price Breakdown",
    rental:       "Car Rental",
    pickupFee:    "Pickup Fee",
    tax:          "Tax (15%)",
    total:        "Total",
    loading:      "Loading booking…",
    notFound:     "Booking not found.",
    notFoundSub:  "Check the booking reference and try again.",
    retry:        "Retry",
    back:         "Back to Home",
    newBooking:   "Book a Car",
    lastUpdated:  "Last updated",
    timeline: {
      title: "Booking Status",
      steps: ["Submitted", "Under Review", "Confirmed", "In Progress", "Completed"],
    },
    status: {
      pending:    { label: "Pending Review",  icon: "clock",   step: 1 },
      confirmed:  { label: "Confirmed",       icon: "check",   step: 2 },
      in_progress:{ label: "In Progress",     icon: "car",     step: 3 },
      completed:  { label: "Completed",       icon: "check2",  step: 4 },
      cancelled:  { label: "Cancelled",       icon: "x",       step: -1 },
    },
  },
  ar: {
    pageTitle:    "تتبع الحجز",
    refLabel:     "رقم الحجز",
    copyLink:     "نسخ الرابط",
    copied:       "تم النسخ!",
    shareMsg:     "شارك هذا الرابط لمتابعة حجزك:",
    bookedBy:     "الحجز باسم",
    carSection:   "السيارة",
    tripSection:  "تفاصيل الرحلة",
    pickup:       "الاستلام",
    dropoff:      "التسليم",
    pickupDate:   "تاريخ الاستلام",
    returnDate:   "تاريخ الإعادة",
    duration:     (d) => `${d} ${d === 1 ? "يوم" : "أيام"}`,
    passengers:   "الركاب",
    adults:       (n) => `${n} بالغ`,
    children:     (n) => `${n} طفل`,
    bags:         (n) => `${n} حقيبة`,
    distance:     "المسافة",
    priceSection: "تفاصيل الدفع",
    rental:       "إيجار السيارة",
    pickupFee:    "رسوم الاستلام",
    tax:          "ضريبة (15%)",
    total:        "الإجمالي",
    loading:      "جارٍ تحميل بيانات الحجز…",
    notFound:     "الحجز غير موجود.",
    notFoundSub:  "تحقق من رقم الحجز وأعد المحاولة.",
    retry:        "إعادة المحاولة",
    back:         "الصفحة الرئيسية",
    newBooking:   "احجز سيارة",
    lastUpdated:  "آخر تحديث",
    timeline: {
      title: "حالة الحجز",
      steps: ["تم الإرسال", "قيد المراجعة", "مؤكد", "جارٍ التنفيذ", "مكتمل"],
    },
    status: {
      pending:     { label: "قيد المراجعة",  icon: "clock",  step: 1 },
      confirmed:   { label: "مؤكد",          icon: "check",  step: 2 },
      in_progress: { label: "جارٍ التنفيذ", icon: "car",    step: 3 },
      completed:   { label: "مكتمل",         icon: "check2", step: 4 },
      cancelled:   { label: "ملغى",          icon: "x",      step: -1 },
    },
  },
};

const STATUS_COLORS = {
  pending:     { bg: "bg-amber-500",  ring: "ring-amber-200",   text: "text-amber-700",   light: "bg-amber-50  border-amber-200" },
  confirmed:   { bg: "bg-emerald-500",ring: "ring-emerald-200", text: "text-emerald-700", light: "bg-emerald-50 border-emerald-200" },
  in_progress: { bg: "bg-blue-500",   ring: "ring-blue-200",    text: "text-blue-700",    light: "bg-blue-50   border-blue-200" },
  completed:   { bg: "bg-[#264787]",  ring: "ring-blue-300",    text: "text-[#264787]",   light: "bg-blue-50   border-blue-200" },
  cancelled:   { bg: "bg-red-500",    ring: "ring-red-200",     text: "text-red-700",     light: "bg-red-50    border-red-200" },
};

function StatusIcon({ type, size = 18 }) {
  if (type === "check" || type === "check2") return <CheckCircle2 size={size} />;
  if (type === "x")     return <XCircle size={size} />;
  if (type === "car")   return <Car size={size} />;
  return <Clock size={size} />;
}

function CopyBtn({ value, label, copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const go = async () => {
    try { await navigator.clipboard.writeText(value); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={go} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-all">
      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
      {copied ? copiedLabel : label}
    </button>
  );
}

function DetailRow({ icon: Icon, label, value, accent = false }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${accent ? "bg-[#264787]/8" : "bg-gray-100"}`}>
        <Icon size={15} className={accent ? "text-[#264787]" : "text-gray-500"} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-800 leading-snug">{value}</p>
      </div>
    </div>
  );
}

// Timeline showing which step we're at (not shown for cancelled)
function StatusTimeline({ currentStep, steps, isCancelled, isRTL }) {
  const totalSteps = steps.length;
  return (
    <div className="relative pt-1 pb-2">
      {/* Progress track */}
      <div className="flex items-center gap-0 mb-2">
        {steps.map((label, i) => {
          const stepNum    = i;
          const isDone     = !isCancelled && stepNum < currentStep;
          const isCurrent  = !isCancelled && stepNum === currentStep;
          const isUpcoming = isCancelled || stepNum > currentStep;
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCancelled ? "border-red-300 bg-red-50"
                  : isDone    ? "border-emerald-500 bg-emerald-500"
                  : isCurrent ? "border-[#264787] bg-[#264787] ring-4 ring-[#264787]/20"
                  : "border-gray-200 bg-gray-50"
                }`}>
                  {isCancelled
                    ? <XCircle size={14} className="text-red-400" />
                    : isDone
                    ? <Check size={13} className="text-white" strokeWidth={3} />
                    : isCurrent
                    ? <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    : <span className="w-2 h-2 rounded-full bg-gray-300" />
                  }
                </div>
              </div>
              {i < totalSteps - 1 && (
                <div className={`flex-1 h-0.5 ${isDone && !isCancelled ? "bg-emerald-400" : "bg-gray-200"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Labels */}
      <div className="flex items-start">
        {steps.map((label, i) => {
          const isDone    = !isCancelled && i < currentStep;
          const isCurrent = !isCancelled && i === currentStep;
          return (
            <React.Fragment key={i}>
              <div className="flex-shrink-0 w-7 flex justify-center">
                <span className={`text-[9px] font-bold text-center leading-tight ${
                  isCancelled ? "text-red-400"
                  : isCurrent ? "text-[#264787]"
                  : isDone    ? "text-emerald-600"
                  : "text-gray-300"
                }`}>
                  {label.split(" ")[0]}
                </span>
              </div>
              {i < steps.length - 1 && <div className="flex-1" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  const { trackingId } = useParams();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});
  const isRTL = (selectedLanguage || 1) === 2;
  const t     = T[isRTL ? "ar" : "en"];
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  const load = () => {
    setLoading(true);
    setError(false);
    _get(apiRoutes.car_reservation_tracking(trackingId))
      .then(res => {
        setBooking(res?.data?.data ?? null);
        if (!res?.data?.data) setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [trackingId]);
  useEffect(() => { setPageUrl(window.location.href); }, []);

  const fmt = (iso) => {
    if (!iso) return null;
    try { return new Date(iso).toLocaleDateString(isRTL ? "ar-EG" : "en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return null; }
  };

  const fmtShort = (iso) => {
    if (!iso) return null;
    try { return new Date(iso).toLocaleDateString(isRTL ? "ar-EG" : "en-GB", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return null; }
  };

  const statusKey   = booking?.status ?? "pending";
  const statusCfg   = t.status[statusKey] ?? t.status.pending;
  const statusColor = STATUS_COLORS[statusKey] ?? STATUS_COLORS.pending;
  const isCancelled = statusKey === "cancelled";

  const passengersStr = booking
    ? [
        booking.passengers > 0 && t.adults(booking.passengers),
        booking.children > 0   && t.children(booking.children),
        booking.bags > 0        && t.bags(booking.bags),
      ].filter(Boolean).join(" · ")
    : null;

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#264787] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">{t.loading}</p>
        </div>
      </div>
    );
  }

  // ── Not Found ──
  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto">
            <AlertCircle size={32} className="text-red-400" />
          </div>
          <h2 className="text-lg font-black text-gray-800">{t.notFound}</h2>
          <p className="text-sm text-gray-500">{t.notFoundSub}</p>
          <div className="flex gap-3 justify-center pt-2">
            <button onClick={load} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
              <RefreshCw size={14} /> {t.retry}
            </button>
            <Link href="/" className="px-5 py-2.5 bg-[#264787] text-white rounded-xl text-sm font-bold hover:bg-[#1e3a75] transition-all">{t.back}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 py-8 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-xl mx-auto space-y-4">

        {/* ── Top nav ── */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#264787] transition-colors">
            <BackIcon size={15} /> {t.back}
          </Link>
          <button onClick={load} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw size={13} /> {t.lastUpdated}: {fmtShort(booking.updated_at ?? booking.created_at) ?? "—"}
          </button>
        </div>

        {/* ── Status Hero Card ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Color bar */}
          <div className={`h-1.5 w-full ${isCancelled ? "bg-red-400" : "bg-gradient-to-r from-[#264787] to-[#3b85c1]"}`} />

          <div className="p-6">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t.pageTitle}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-gray-900">
                    #{String(booking.id).padStart(6, "0")}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusColor.light} ${statusColor.text}`}>
                    <StatusIcon type={statusCfg.icon} size={12} />
                    {statusCfg.label}
                  </span>
                </div>
                {booking.display_name && (
                  <p className="text-xs text-gray-500 mt-1">{t.bookedBy}: <span className="font-semibold text-gray-700">{booking.display_name}</span></p>
                )}
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ring-4 ${statusColor.bg} ${statusColor.ring}`}>
                <StatusIcon type={statusCfg.icon} size={24} />
              </div>
            </div>

            {/* Timeline */}
            {!isCancelled && (
              <div className="mb-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t.timeline.title}</p>
                <StatusTimeline
                  currentStep={statusCfg.step}
                  steps={t.timeline.steps}
                  isCancelled={isCancelled}
                  isRTL={isRTL}
                />
              </div>
            )}

            {isCancelled && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                <XCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-sm font-semibold text-red-700">{statusCfg.label}</p>
              </div>
            )}
          </div>

          {/* Share tracking link */}
          {pageUrl && (
            <div className={`px-5 pb-5`}>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.shareMsg}</p>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs text-[#264787] font-medium flex-1 truncate">{pageUrl}</p>
                <CopyBtn value={pageUrl} label={t.copyLink} copiedLabel={t.copied} />
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Vehicle Card ── */}
        {(booking.car_model || booking.car_image_url) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {booking.car_image_url && (
              <div className="relative h-36 bg-gradient-to-br from-slate-100 to-blue-50">
                <img
                  src={booking.car_image_url}
                  alt={booking.car_model}
                  className="w-full h-full object-cover opacity-80"
                  onError={e => { e.target.onerror = null; e.target.src = "/images/2.png"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className={`absolute bottom-3 ${isRTL ? "right-4" : "left-4"}`}>
                  <p className="text-white font-black text-lg drop-shadow">{booking.car_model}</p>
                  {booking.car_category && (
                    <span className="text-white/65 text-xs font-bold uppercase tracking-widest">{booking.car_category}</span>
                  )}
                </div>
                <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1`}>
                  <span className="text-white text-xs font-bold">{t.carSection}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ── Trip Details ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{t.tripSection}</p>
          <DetailRow icon={Calendar} label={t.pickupDate}  value={fmt(booking.start_date)} accent />
          <DetailRow icon={Calendar} label={t.returnDate}  value={fmt(booking.end_date)} accent />
          {booking.total_days > 0 && (
            <DetailRow icon={Clock} label="" value={t.duration(booking.total_days)} />
          )}
          <DetailRow icon={MapPin} label={t.pickup}   value={booking.pickup_location} accent />
          <DetailRow icon={MapPin} label={t.dropoff}  value={booking.dropoff_location} accent />
          {booking.route_distance_km && (
            <DetailRow icon={Navigation} label={t.distance} value={`${booking.route_distance_km} km`} />
          )}
          {passengersStr && (
            <DetailRow icon={Users} label={t.passengers} value={passengersStr} />
          )}
        </motion.div>

        {/* ── Price Breakdown ── */}
        {(booking.total_price > 0 || booking.rental_price > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{t.priceSection}</p>
            <div className="space-y-2.5">
              {booking.rental_price > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-2"><CreditCard size={13} className="text-gray-400" /> {t.rental}</span>
                  <span className="font-semibold">{parseFloat(booking.rental_price).toLocaleString()} {booking.currency}</span>
                </div>
              )}
              {booking.pickup_fee > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t.pickupFee}</span>
                  <span className="font-semibold">{parseFloat(booking.pickup_fee).toLocaleString()} {booking.currency}</span>
                </div>
              )}
              {booking.tax > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t.tax}</span>
                  <span className="font-semibold">{parseFloat(booking.tax).toLocaleString()} {booking.currency}</span>
                </div>
              )}
              <div className="h-px bg-gray-100 my-1" />
              <div className="flex justify-between items-center">
                <span className="font-black text-gray-900">{t.total}</span>
                <span className="text-2xl font-black text-[#264787]">
                  {parseFloat(booking.total_price).toFixed(2)} {booking.currency}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            href="/our-services/car-reservation"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#264787]/25 hover:brightness-110 transition-all"
          >
            <Car size={16} /> {t.newBooking}
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
