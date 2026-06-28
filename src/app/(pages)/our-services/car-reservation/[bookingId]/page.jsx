"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Zap, Wind, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import ReservationForm from "../../../../../components/pages/CarReservation/ReservationForm";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";

const T = {
  en: {
    back: "Back to Fleet",
    priceSummary: "Price Summary",
    dailyRate: "Daily rate",
    days: "Days",
    rentalSubtotal: "Rental subtotal",
    pickupFee: "Pickup fee",
    estimatedTotal: "Estimated Total",
    whatsIncluded: "What's Included",
    included: [
      "Comprehensive insurance",
      "Free cancellation (24h)",
      "24/7 roadside support",
      "Unlimited mileage",
    ],
    loading: "Loading car details…",
    notFound: "Car not found.",
    perDay: "per day",
  },
  ar: {
    back: "العودة للأسطول",
    priceSummary: "ملخص السعر",
    dailyRate: "السعر اليومي",
    days: "أيام",
    rentalSubtotal: "إجمالي الإيجار",
    pickupFee: "رسوم الاستلام",
    estimatedTotal: "الإجمالي التقديري",
    whatsIncluded: "ما يشمله الحجز",
    included: [
      "تأمين شامل",
      "إلغاء مجاني (24 ساعة)",
      "دعم على الطريق 24/7",
      "مسافة غير محدودة",
    ],
    loading: "جارٍ تحميل بيانات السيارة…",
    notFound: "السيارة غير موجودة.",
    perDay: "يوميًا",
  },
};

const CATEGORY_COLORS = {
  ECONOMY: "bg-emerald-100 text-emerald-700",
  SEDAN:   "bg-blue-100 text-blue-700",
  PREMIUM: "bg-amber-100 text-amber-700",
};

const featureIcons = {
  Automatic: <Zap size={12} />,
  AC:        <Wind size={12} />,
};

export default function BookingDetails() {
  const { bookingId } = useParams();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});
  const langId = selectedLanguage || 1;
  const isRTL = langId === 2;
  const t = T[isRTL ? "ar" : "en"];

  const [car, setCar]                        = useState(null);
  const [loading, setLoading]                = useState(true);
  const [sidebarDays, setSidebarDays]        = useState(0);
  const [sidebarTotal, setSidebarTotal]      = useState(0);
  const [sidebarPickupFee, setSidebarPickup] = useState(0);

  useEffect(() => {
    _get(apiRoutes.car_reservation_page)
      .then(res => {
        const cars = res?.data?.data?.cars ?? [];
        const found = cars.find(c => String(c.id) === String(bookingId));
        setCar(found ?? null);
      })
      .catch(() => setCar(null))
      .finally(() => setLoading(false));
  }, [bookingId]);

  const totalDays  = sidebarDays;
  const totalPrice = sidebarTotal;
  const pickupFee  = sidebarPickupFee;
  const catColor   = CATEGORY_COLORS[car?.category] ?? "bg-gray-100 text-gray-700";
  const BackIcon   = isRTL ? ChevronRight : ChevronLeft;

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

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-500">{t.notFound}</p>
          <Link href="/our-services/car-reservation" className="text-[#264787] font-bold underline">
            {t.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link
            href="/our-services/car-reservation"
            className="flex items-center gap-1 hover:text-[#264787] transition-colors font-medium"
          >
            <BackIcon size={14} />
            {t.back}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{car.model}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-6 items-start">

          {/* ── Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-4"
          >
            {/* Car Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-52 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
                <img
                  src={car.imgUrl}
                  alt={car.model}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x300/dbeafe/264787?text=${encodeURIComponent(car.model)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${catColor}`}>
                  {car.category}
                </span>
                {car.rating && (
                  <span className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} flex items-center gap-1 bg-white/90 text-amber-500 text-[11px] font-black px-2 py-0.5 rounded-full`}>
                    <Star size={11} fill="currentColor" />
                    {car.rating}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h2 className="text-lg font-black text-gray-900 mb-1">{car.model}</h2>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{car.description}</p>
                {car.features?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-semibold rounded-lg"
                      >
                        {featureIcons[f] ?? <Users size={12} />}
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-br from-[#1a3260] to-[#3b85c1] rounded-2xl p-5 text-white shadow-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                {t.priceSummary}
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">{t.dailyRate}</span>
                  <span className="font-bold">
                    {parseFloat(car.price).toLocaleString()} {car.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">{t.days}</span>
                  <span className="font-bold">{totalDays || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">{t.rentalSubtotal}</span>
                  <span className="font-bold">
                    {totalPrice > 0 ? `${totalPrice.toLocaleString()} ${car.currency}` : "—"}
                  </span>
                </div>
                {pickupFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/70">{t.pickupFee}</span>
                    <span className="font-bold">{pickupFee.toLocaleString()} {car.currency}</span>
                  </div>
                )}
                <div className="h-px bg-white/20 my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">{t.estimatedTotal}</span>
                  <span className="text-2xl font-black">
                    {totalPrice > 0
                      ? `${(totalPrice + pickupFee).toLocaleString()} ${car.currency}`
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                {t.whatsIncluded}
              </p>
              {t.included.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.aside>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <ReservationForm
              selectedCar={car}
              isRTL={isRTL}
              onPriceChange={(days, price, fee) => {
                setSidebarDays(days);
                setSidebarTotal(price);
                setSidebarPickup(fee ?? 0);
              }}
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
