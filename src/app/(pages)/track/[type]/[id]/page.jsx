"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, XCircle, Car, Calendar,
  MapPin, Users, CreditCard, Copy, Check,
  ChevronLeft, ChevronRight, AlertCircle, RefreshCw,
  Plane, Moon, Tag, CreditCard as PayIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";

// ── Config per booking type ───────────────────────
const TYPE_CONFIG = {
  car: {
    apiRoute:     (id) => apiRoutes.car_reservation_tracking(id),
    icon:         Car,
    color:        "from-[#264787] to-[#3b85c1]",
    en: { name: "Car Reservation", back: "/our-services/car-reservation", backLabel: "Book a Car" },
    ar: { name: "حجز سيارة",      back: "/our-services/car-reservation", backLabel: "احجز سيارة" },
    fields: (b, t) => [
      { icon: Car,      label: t.model,    value: b.car_model },
      { icon: Calendar, label: t.pickup,   value: b.start_date ? new Date(b.start_date).toLocaleDateString() : null },
      { icon: Calendar, label: t.dropoff,  value: b.end_date   ? new Date(b.end_date).toLocaleDateString()   : null },
      { icon: MapPin,   label: t.from,     value: b.pickup_location },
      { icon: MapPin,   label: t.to,       value: b.dropoff_location },
      { icon: Users,    label: t.pass,     value: b.passengers > 0 ? `${b.passengers}` : null },
    ],
    price: (b) => b.total_price,
    currency: (b) => b.currency ?? "USD",
  },
  tour: {
    apiRoute:     (id) => apiRoutes.tour_booking_tracking(id),
    icon:         Plane,
    color:        "from-[#264787] to-[#3b85c1]",
    en: { name: "Tour Booking",   back: "/our-services",       backLabel: "Browse Tours" },
    ar: { name: "حجز جولة",       back: "/our-services",       backLabel: "تصفح الجولات" },
    fields: (b, t) => [
      { icon: Plane,    label: t.tour,     value: b.tour_title },
      { icon: Calendar, label: t.date,     value: b.booking_date },
      { icon: Users,    label: t.travelers,value: b.travelers > 0 ? `${b.travelers}` : null },
      { icon: MapPin,   label: t.meeting,  value: b.meeting_option },
    ],
    price: (b) => b.total_price,
    currency: () => "USD",
  },
  umrah: {
    apiRoute:     (id) => apiRoutes.umrah_booking_tracking(id),
    icon:         Moon,
    color:        "from-[#1a6645] to-[#2ea86e]",
    en: { name: "Umrah Package", back: "/umrah",               backLabel: "View Packages" },
    ar: { name: "حزمة عمرة",     back: "/umrah",               backLabel: "استعرض الباقات" },
    fields: (b, t) => [
      { icon: Moon,     label: t.package,  value: b.package_title },
      { icon: Users,    label: t.travelers,value: b.travelers > 0 ? `${b.travelers}` : null },
      { icon: Users,    label: t.gender,   value: b.gender },
    ],
    price: (b) => b.total_price,
    currency: () => "USD",
  },
  offer: {
    apiRoute:     (id) => apiRoutes.offer_booking_tracking(id),
    icon:         Tag,
    color:        "from-[#C1823B] to-[#E6A855]",
    en: { name: "Offer Registration", back: "/our-offers",    backLabel: "Browse Offers" },
    ar: { name: "تسجيل عرض",          back: "/our-offers",    backLabel: "استعرض العروض" },
    fields: (b, t) => [
      { icon: Tag, label: t.offer, value: b.offer_name },
    ],
    price: () => null,
    currency: () => "USD",
  },
  visa: {
    apiRoute:     (id) => apiRoutes.visa_app_tracking(id),
    icon:         CreditCard,
    color:        "from-[#7c3aed] to-[#a855f7]",
    en: { name: "Visa Application", back: "/our-services/Visas", backLabel: "Apply Again" },
    ar: { name: "طلب تأشيرة",        back: "/our-services/Visas", backLabel: "تقديم طلب جديد" },
    fields: (b, t) => [
      { icon: CreditCard, label: t.visaType,    value: b.visa_type },
      { icon: Users,      label: t.nationality, value: b.nationality },
      { icon: Users,      label: t.passport,    value: b.passport_type },
    ],
    price: () => null,
    currency: () => "USD",
  },
  payment: {
    apiRoute:     (id) => apiRoutes.payment_tracking(id),
    icon:         PayIcon,
    color:        "from-[#0f766e] to-[#14b8a6]",
    en: { name: "Payment Request", back: "/our-services/online-payment", backLabel: "New Request" },
    ar: { name: "طلب دفع",         back: "/our-services/online-payment", backLabel: "طلب جديد" },
    fields: (b, t) => [
      { icon: PayIcon, label: t.notes, value: b.notes },
      { icon: PayIcon, label: t.link,  value: b.link },
    ],
    price: () => null,
    currency: () => "USD",
  },
};

const LABELS = {
  en: {
    pageTitle: "Track Booking", ref: "Reference #", copyLink: "Copy Link", copied: "Copied!",
    statusTitle: "Booking Status", share: "Share this tracking link:",
    lastUpdated: "Updated", bookedBy: "Booked by", retry: "Retry", home: "Home",
    loading: "Loading…", notFound: "Booking not found.", notFoundSub: "Check the reference number and try again.",
    model: "Vehicle", pickup: "Pickup Date", dropoff: "Return Date",
    from: "From", to: "To", pass: "Passengers", tour: "Tour", date: "Date",
    travelers: "Travelers", meeting: "Meeting Option", package: "Package",
    gender: "Gender", offer: "Offer", visaType: "Visa Type",
    nationality: "Nationality", passport: "Passport Type", notes: "Notes", link: "Link",
    timeline: {
      title: "Status Timeline",
      steps: ["Submitted", "Under Review", "Confirmed", "In Progress", "Completed"],
    },
    status: {
      pending:     { label: "Pending Review",  step: 1, color: "text-amber-600 bg-amber-50 border-amber-200" },
      confirmed:   { label: "Confirmed",       step: 2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
      in_progress: { label: "In Progress",     step: 3, color: "text-blue-600 bg-blue-50 border-blue-200" },
      completed:   { label: "Completed",       step: 4, color: "text-[#264787] bg-blue-50 border-blue-200" },
      cancelled:   { label: "Cancelled",       step: -1, color: "text-red-600 bg-red-50 border-red-200" },
    },
  },
  ar: {
    pageTitle: "تتبع الحجز", ref: "رقم الحجز", copyLink: "نسخ الرابط", copied: "تم النسخ!",
    statusTitle: "حالة الحجز", share: "شارك رابط المتابعة:",
    lastUpdated: "تحديث", bookedBy: "الحجز باسم", retry: "إعادة المحاولة", home: "الرئيسية",
    loading: "جارٍ التحميل…", notFound: "الحجز غير موجود.", notFoundSub: "تحقق من رقم الحجز وأعد المحاولة.",
    model: "السيارة", pickup: "تاريخ الاستلام", dropoff: "تاريخ الإعادة",
    from: "من", to: "إلى", pass: "ركاب", tour: "الجولة", date: "التاريخ",
    travelers: "المسافرون", meeting: "خيار اللقاء", package: "الباقة",
    gender: "الجنس", offer: "العرض", visaType: "نوع التأشيرة",
    nationality: "الجنسية", passport: "نوع جواز السفر", notes: "ملاحظات", link: "رابط",
    timeline: {
      title: "مراحل الحجز",
      steps: ["تم الإرسال", "قيد المراجعة", "مؤكد", "جارٍ التنفيذ", "مكتمل"],
    },
    status: {
      pending:     { label: "قيد المراجعة",  step: 1, color: "text-amber-600 bg-amber-50 border-amber-200" },
      confirmed:   { label: "مؤكد",          step: 2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
      in_progress: { label: "جارٍ التنفيذ", step: 3, color: "text-blue-600 bg-blue-50 border-blue-200" },
      completed:   { label: "مكتمل",         step: 4, color: "text-[#264787] bg-blue-50 border-blue-200" },
      cancelled:   { label: "ملغى",          step: -1, color: "text-red-600 bg-red-50 border-red-200" },
    },
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
    <button onClick={go} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-all shrink-0">
      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
      {copied ? copiedLabel : label}
    </button>
  );
}

function Timeline({ currentStep, steps, isCancelled }) {
  return (
    <div className="pt-1">
      <div className="flex items-center">
        {steps.map((label, i) => {
          const done    = !isCancelled && i < currentStep;
          const current = !isCancelled && i === currentStep;
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCancelled ? "border-red-300 bg-red-50"
                  : done      ? "border-emerald-500 bg-emerald-500"
                  : current   ? "border-[#264787] bg-[#264787] ring-4 ring-[#264787]/20"
                  : "border-gray-200 bg-gray-50"
                }`}>
                  {isCancelled ? <XCircle size={14} className="text-red-400" />
                  : done       ? <Check size={13} className="text-white" strokeWidth={3} />
                  : current    ? <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  :              <span className="w-2 h-2 rounded-full bg-gray-300" />}
                </div>
                <span className={`text-[9px] font-bold mt-1 text-center max-w-[40px] leading-tight ${
                  current ? "text-[#264787]" : done ? "text-emerald-600" : "text-gray-300"
                }`}>{label.split(" ")[0]}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mb-4 ${done && !isCancelled ? "bg-emerald-400" : "bg-gray-200"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  const { type, id } = useParams();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});
  const isRTL = (selectedLanguage || 1) === 2;
  const t     = LABELS[isRTL ? "ar" : "en"];
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  const cfg = TYPE_CONFIG[type];

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  const load = () => {
    if (!cfg) { setError(true); setLoading(false); return; }
    setLoading(true); setError(false);
    _get(cfg.apiRoute(id))
      .then(res => { setBooking(res?.data?.data ?? null); if (!res?.data?.data) setError(true); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [type, id]);
  useEffect(() => { setPageUrl(window.location.href); }, []);

  const fmtDate = (iso) => {
    if (!iso) return null;
    try { return new Date(iso).toLocaleDateString(isRTL ? "ar-EG" : "en-GB", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return null; }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#264787] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">{t.loading}</p>
      </div>
    </div>
  );

  if (error || !booking || !cfg) return (
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
          <Link href="/" className="px-5 py-2.5 bg-[#264787] text-white rounded-xl text-sm font-bold hover:bg-[#1e3a75] transition-all">{t.home}</Link>
        </div>
      </div>
    </div>
  );

  const statusKey  = booking.status ?? "pending";
  const statusInfo = t.status[statusKey] ?? t.status.pending;
  const isCancelled = statusKey === "cancelled";
  const langCfg   = cfg[isRTL ? "ar" : "en"];
  const TypeIcon  = cfg.icon;
  const fields    = cfg.fields(booking, t);
  const total     = cfg.price(booking);
  const curr      = cfg.currency(booking);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 py-8 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-xl mx-auto space-y-4">

        {/* Top nav */}
        <div className="flex items-center justify-between">
          <Link href={langCfg.back} className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#264787] transition-colors">
            <BackIcon size={15} /> {langCfg.backLabel}
          </Link>
          <button onClick={load} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw size={13} /> {t.lastUpdated}: {fmtDate(booking.updated_at ?? booking.created_at) ?? "—"}
          </button>
        </div>

        {/* Status Hero */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className={`h-1.5 bg-gradient-to-r ${isCancelled ? "from-red-400 to-red-500" : cfg.color}`} />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {langCfg.name} · {t.pageTitle}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xl font-black text-gray-900">
                    #{String(booking.id).padStart(6, "0")}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}>
                    {isCancelled ? <XCircle size={12} /> : statusInfo.step >= 4 ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {statusInfo.label}
                  </span>
                </div>
                {booking.display_name && (
                  <p className="text-xs text-gray-500 mt-1">
                    {t.bookedBy}: <span className="font-semibold text-gray-700">{booking.display_name}</span>
                  </p>
                )}
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${isCancelled ? "from-red-400 to-red-500" : cfg.color} shadow-lg`}>
                <TypeIcon size={26} className="text-white" />
              </div>
            </div>

            {/* Timeline */}
            {!isCancelled && (
              <div className="mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t.timeline.title}</p>
                <Timeline
                  currentStep={statusInfo.step}
                  steps={t.timeline.steps}
                  isCancelled={isCancelled}
                />
              </div>
            )}

            {isCancelled && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl mt-2">
                <XCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-sm font-semibold text-red-700">{statusInfo.label}</p>
              </div>
            )}
          </div>

          {/* Share link */}
          {pageUrl && (
            <div className="px-5 pb-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.share}</p>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs text-[#264787] font-medium flex-1 truncate">{pageUrl}</p>
                <CopyBtn value={pageUrl} label={t.copyLink} copiedLabel={t.copied} />
              </div>
            </div>
          )}
        </motion.div>

        {/* Booking Details */}
        {fields.some(f => f.value) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5"
          >
            {fields.filter(f => f.value).map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-xl bg-[#264787]/8 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={15} className="text-[#264787]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{f.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{f.value}</p>
                  </div>
                </div>
              );
            })}

            {total > 0 && (
              <div className={`flex justify-between items-center mt-4 pt-4 border-t border-gray-100`}>
                <span className="font-black text-gray-900 text-sm">{isRTL ? "الإجمالي" : "Total"}</span>
                <span className="text-2xl font-black text-[#264787]">
                  {parseFloat(total).toLocaleString()} {curr}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="grid grid-cols-2 gap-3"
        >
          <Link href="/" className="py-3.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-sm rounded-2xl shadow-sm transition-all text-center">
            {t.home}
          </Link>
          <Link href={langCfg.back} className="py-3.5 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white font-bold text-sm rounded-2xl shadow-lg text-center hover:brightness-110 transition-all">
            {langCfg.backLabel}
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
