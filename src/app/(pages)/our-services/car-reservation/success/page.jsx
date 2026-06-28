"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, XCircle, Clock, Copy, Check, ExternalLink,
  Calendar, MapPin, Users, Car, CreditCard, Navigation,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const T = {
  en: {
    successTitle:   "Booking Request Sent!",
    failTitle:      "Booking Submitted",
    pendingTitle:   "Booking Under Review",
    successSub:     "Your reservation has been received. We'll confirm it shortly.",
    ref:            "Booking Reference",
    trackingLink:   "Tracking Link",
    copy:           "Copy",
    copied:         "Copied!",
    openTracking:   "Track Booking",
    carDetails:     "Vehicle",
    tripDetails:    "Trip Details",
    pickupDate:     "Pickup Date",
    returnDate:     "Return Date",
    duration:       (d) => `${d} day${d !== 1 ? "s" : ""}`,
    pickup:         "Pickup Location",
    dropoff:        "Drop-off Location",
    distance:       "Route Distance",
    passengers:     "Passengers",
    adults:         (n) => `${n} Adult${n !== 1 ? "s" : ""}`,
    children:       (n) => `${n} Child${n !== 1 ? "ren" : ""}`,
    bags:           (n) => `${n} Bag${n !== 1 ? "s" : ""}`,
    billTitle:      "Price Breakdown",
    rental:         "Rental",
    pickupFee:      "Pickup Fee",
    tax:            "Tax (15%)",
    total:          "Total Paid",
    contactName:    "Booked By",
    status: {
      pending:    { label: "Pending Review",  color: "text-amber-600 bg-amber-50 border-amber-200" },
      confirmed:  { label: "Confirmed",       color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
      cancelled:  { label: "Cancelled",       color: "text-red-600 bg-red-50 border-red-200" },
      completed:  { label: "Completed",       color: "text-blue-600 bg-blue-50 border-blue-200" },
    },
    home:   "Back to Home",
    fleet:  "Book Another Car",
    noData: "No booking data found.",
  },
  ar: {
    successTitle:   "تم إرسال طلب الحجز!",
    failTitle:      "تم تقديم الحجز",
    pendingTitle:   "الحجز قيد المراجعة",
    successSub:     "تم استلام حجزك. سنؤكده قريبًا.",
    ref:            "رقم الحجز",
    trackingLink:   "رابط المتابعة",
    copy:           "نسخ",
    copied:         "تم النسخ!",
    openTracking:   "تتبع الحجز",
    carDetails:     "السيارة",
    tripDetails:    "تفاصيل الرحلة",
    pickupDate:     "تاريخ الاستلام",
    returnDate:     "تاريخ الإعادة",
    duration:       (d) => `${d} ${d === 1 ? "يوم" : "أيام"}`,
    pickup:         "موقع الاستلام",
    dropoff:        "موقع التسليم",
    distance:       "المسافة",
    passengers:     "الركاب",
    adults:         (n) => `${n} بالغ`,
    children:       (n) => `${n} طفل`,
    bags:           (n) => `${n} حقيبة`,
    billTitle:      "تفاصيل الدفع",
    rental:         "إيجار السيارة",
    pickupFee:      "رسوم الاستلام",
    tax:            "ضريبة (15%)",
    total:          "الإجمالي المدفوع",
    contactName:    "اسم العميل",
    status: {
      pending:    { label: "قيد المراجعة",  color: "text-amber-600 bg-amber-50 border-amber-200" },
      confirmed:  { label: "مؤكد",          color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
      cancelled:  { label: "ملغى",          color: "text-red-600 bg-red-50 border-red-200" },
      completed:  { label: "مكتمل",         color: "text-blue-600 bg-blue-50 border-blue-200" },
    },
    home:   "العودة للرئيسية",
    fleet:  "احجز سيارة أخرى",
    noData: "لم يتم العثور على بيانات الحجز.",
  },
};

function CopyButton({ value, label, copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(value); } catch { }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
    >
      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
      {copied ? copiedLabel : label}
    </button>
  );
}

function DetailRow({ icon: Icon, label, value, className = "" }) {
  if (!value) return null;
  return (
    <div className={`flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0 ${className}`}>
      <div className="w-7 h-7 rounded-lg bg-[#264787]/8 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-[#264787]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-semibold leading-snug">{value}</p>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  const router  = useRouter();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});
  const isRTL   = (selectedLanguage || 1) === 2;
  const t       = T[isRTL ? "ar" : "en"];
  const [confirm, setConfirm] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("car_booking_confirm");
      if (raw) setConfirm(JSON.parse(raw));
    } catch {}
  }, []);

  const fmt = (iso) => {
    if (!iso) return null;
    try { return new Date(iso).toLocaleDateString(isRTL ? "ar-EG" : "en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return null; }
  };

  const trackingUrl = mounted && confirm?.bookingId
    ? `${window.location.origin}/our-services/car-reservation/track/${confirm.bookingId}`
    : null;

  const statusKey  = confirm?.status ?? "pending";
  const statusInfo = t.status[statusKey] ?? t.status.pending;

  const isSuccess = !!confirm?.bookingId;

  if (!mounted) return null;

  if (!confirm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-500">{t.noData}</p>
          <Link href="/our-services/car-reservation" className="text-[#264787] font-bold underline">
            {t.fleet}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-10 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-2xl mx-auto space-y-4">

        {/* ── Status Card ── */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Top color bar */}
          <div className={`h-1.5 w-full ${isSuccess ? "bg-gradient-to-r from-emerald-400 to-[#3b85c1]" : "bg-gradient-to-r from-amber-400 to-orange-400"}`} />

          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
              style={{ background: isSuccess ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)" }}
            >
              {isSuccess
                ? <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.8} />
                : <Clock size={44} className="text-amber-500" strokeWidth={1.8} />
              }
            </motion.div>

            <h1 className="text-2xl font-black text-gray-900 mb-2">
              {isSuccess ? t.successTitle : t.pendingTitle}
            </h1>
            <p className="text-gray-500 text-sm mb-5">{t.successSub}</p>

            {/* Status badge */}
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${statusInfo.color}`}>
              <span className="w-2 h-2 rounded-full bg-current opacity-70" />
              {statusInfo.label}
            </span>
          </div>

          {/* Reference + Tracking */}
          <div className="px-6 pb-6 space-y-3">
            {/* Booking Ref */}
            {confirm.bookingId && (
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.ref}</p>
                  <p className="text-xl font-black text-[#264787] mt-0.5">#{String(confirm.bookingId).padStart(6, "0")}</p>
                </div>
                <CopyButton value={String(confirm.bookingId)} label={t.copy} copiedLabel={t.copied} />
              </div>
            )}

            {/* Tracking Link */}
            {trackingUrl && (
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#264787]/4 rounded-2xl border border-[#264787]/15">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-[#264787]/60 uppercase tracking-wider">{t.trackingLink}</p>
                  <p className="text-xs text-[#264787] font-semibold mt-0.5 truncate">{trackingUrl}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <CopyButton value={trackingUrl} label={t.copy} copiedLabel={t.copied} />
                  <Link
                    href={`/our-services/car-reservation/track/${confirm.bookingId}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#264787] text-white hover:bg-[#1e3a75] transition-all"
                  >
                    <ExternalLink size={13} />
                    {t.openTracking}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Car + Trip Details ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Car image header */}
          {confirm.car && (
            <div className="relative h-40 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
              <img
                src={confirm.car.imgUrl}
                alt={confirm.car.model}
                className="w-full h-full object-cover opacity-80"
                onError={e => { e.target.onerror = null; e.target.src = "/images/2.png"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className={`absolute bottom-4 ${isRTL ? "right-5" : "left-5"}`}>
                <p className="text-white font-black text-xl leading-tight drop-shadow">{confirm.car.model}</p>
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest">{confirm.car.category}</span>
              </div>
              <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1`}>
                <Car size={12} className="text-white" />
                <span className="text-white text-xs font-bold">{t.carDetails}</span>
              </div>
            </div>
          )}

          <div className="p-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">{t.tripDetails}</p>

            <DetailRow icon={Calendar} label={t.pickupDate}  value={fmt(confirm.startDate)} />
            <DetailRow icon={Calendar} label={t.returnDate}  value={fmt(confirm.endDate)} />
            {confirm.totalDays > 0 && (
              <DetailRow icon={Clock} label="" value={t.duration(confirm.totalDays)} />
            )}
            <DetailRow icon={MapPin}  label={t.pickup}       value={confirm.pickupLocation} />
            <DetailRow icon={MapPin}  label={t.dropoff}      value={confirm.dropoffLocation} />
            {confirm.routeInfo?.distanceKm && (
              <DetailRow icon={Navigation} label={t.distance} value={`${confirm.routeInfo.distanceKm} km`} />
            )}
            {(confirm.passengers > 0) && (
              <DetailRow
                icon={Users}
                label={t.passengers}
                value={[
                  confirm.passengers > 0 && t.adults(confirm.passengers),
                  confirm.children > 0 && t.children(confirm.children),
                  confirm.bags > 0 && t.bags(confirm.bags),
                ].filter(Boolean).join(" · ")}
              />
            )}
            {confirm.fullName && (
              <DetailRow icon={Users} label={t.contactName} value={confirm.fullName} />
            )}
          </div>
        </motion.div>

        {/* ── Price Breakdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{t.billTitle}</p>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm text-gray-600">
              <span className="flex items-center gap-2"><CreditCard size={13} className="text-gray-400" /> {t.rental}</span>
              <span className="font-semibold">{confirm.totalPrice?.toLocaleString()} {confirm.currency}</span>
            </div>
            {confirm.pickupFee > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t.pickupFee}</span>
                <span className="font-semibold">{confirm.pickupFee?.toLocaleString()} {confirm.currency}</span>
              </div>
            )}
            {confirm.tax > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t.tax}</span>
                <span className="font-semibold">{confirm.tax?.toLocaleString()} {confirm.currency}</span>
              </div>
            )}
            <div className="h-px bg-gray-100 my-1" />
            <div className="flex justify-between items-center">
              <span className="font-black text-gray-900 text-sm">{t.total}</span>
              <span className="text-2xl font-black text-[#264787]">
                {confirm.grandTotal?.toFixed(2)} {confirm.currency}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Actions ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => router.push("/")}
            className="py-3.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-sm rounded-2xl shadow-sm transition-all hover:shadow-md"
          >
            {t.home}
          </button>
          <button
            onClick={() => router.push("/our-services/car-reservation")}
            className="py-3.5 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#264787]/25 hover:brightness-110 transition-all"
          >
            {t.fleet}
          </button>
        </motion.div>

      </div>
    </div>
  );
}
