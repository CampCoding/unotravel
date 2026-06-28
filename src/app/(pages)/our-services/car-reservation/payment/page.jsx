"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronLeft, ChevronRight, Calendar, Users, CheckCircle2, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { _get, _post } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import SuggestionInput from "@/components/shared/SuggestionInput/SuggestionInput";
import { useUserForm } from "@/hooks/useUserForm";
import { useServiceTracker } from "@/hooks/useServiceTracker";

const fieldCls =
  "w-full px-4 py-3 text-sm text-gray-800 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3b85c1]/25 focus:border-[#3b85c1] transition-all placeholder:text-gray-400";
const labelCls = "block text-xs font-bold text-gray-500 mb-1.5";

const BASE_PICKUP_FEE = 2;

const T = {
  en: {
    back:            "Back to Booking",
    secure:          "Secure & encrypted payment",
    title:           "Confirm Your Booking",
    subtitle:        "Enter your contact info to complete the reservation.",
    contactInfo:     "Contact Information",
    fullName:        "Full Name",
    fullNamePh:      "Enter your full name",
    email:           "Email Address",
    emailPh:         "name@example.com",
    phone:           "Phone Number",
    phonePh:         "123 456 7890",
    required:        "*",
    tripDetails:     "Trip Details",
    dates:           "Dates",
    billDetails:     "Bill Details",
    rental:          (d) => `Rental (${d} day${d !== 1 ? "s" : ""})`,
    pickupFee:       "Pickup fee",
    tax:             "Tax (15%)",
    total:           "Total",
    included:        [
      "Comprehensive insurance included",
      "Free cancellation up to 24 hours before pickup",
      "24/7 roadside support",
    ],
    alreadyAccount:  "Already have an account?",
    signIn:          "Sign In",
    confirmBtn:      "Confirm Booking",
    processing:      "Processing…",
    policy:          "Free cancellation up to 24 hours before pickup.",
    seePolicy:       "See Policy",
    searchCountry:   "Search country or code…",
    noResults:       "No results",
  },
  ar: {
    back:            "العودة للحجز",
    secure:          "دفع آمن ومشفر",
    title:           "تأكيد الحجز",
    subtitle:        "أدخل بيانات الاتصال لإتمام الحجز.",
    contactInfo:     "معلومات الاتصال",
    fullName:        "الاسم الكامل",
    fullNamePh:      "أدخل اسمك الكامل",
    email:           "البريد الإلكتروني",
    emailPh:         "example@email.com",
    phone:           "رقم الهاتف",
    phonePh:         "123 456 7890",
    required:        "*",
    tripDetails:     "تفاصيل الرحلة",
    dates:           "التواريخ",
    billDetails:     "تفاصيل الفاتورة",
    rental:          (d) => `إيجار (${d} ${d === 1 ? "يوم" : "أيام"})`,
    pickupFee:       "رسوم الاستلام",
    tax:             "ضريبة (15%)",
    total:           "الإجمالي",
    included:        [
      "تأمين شامل مدرج",
      "إلغاء مجاني حتى 24 ساعة قبل الاستلام",
      "دعم على الطريق 24/7",
    ],
    alreadyAccount:  "هل لديك حساب بالفعل؟",
    signIn:          "تسجيل الدخول",
    confirmBtn:      "تأكيد الحجز",
    processing:      "جارٍ المعالجة…",
    policy:          "إلغاء مجاني حتى 24 ساعة قبل الاستلام.",
    seePolicy:       "اقرأ السياسة",
    searchCountry:   "ابحث بالدولة أو الرمز…",
    noResults:       "لا توجد نتائج",
  },
};

// ISO 3166-1 alpha-2 → international dial code
const DIAL = {
  AF:"+93",AL:"+355",DZ:"+213",AD:"+376",AO:"+244",AG:"+1268",AR:"+54",AM:"+374",
  AU:"+61",AT:"+43",AZ:"+994",BS:"+1242",BH:"+973",BD:"+880",BB:"+1246",BY:"+375",
  BE:"+32",BZ:"+501",BJ:"+229",BT:"+975",BO:"+591",BA:"+387",BW:"+267",BR:"+55",
  BN:"+673",BG:"+359",BF:"+226",BI:"+257",CV:"+238",KH:"+855",CM:"+237",CA:"+1",
  CF:"+236",TD:"+235",CL:"+56",CN:"+86",CO:"+57",KM:"+269",CG:"+242",CD:"+243",
  CR:"+506",HR:"+385",CU:"+53",CY:"+357",CZ:"+420",DK:"+45",DJ:"+253",DM:"+1767",
  DO:"+1809",EC:"+593",EG:"+20",SV:"+503",GQ:"+240",ER:"+291",EE:"+372",SZ:"+268",
  ET:"+251",FJ:"+679",FI:"+358",FR:"+33",GA:"+241",GM:"+220",GE:"+995",DE:"+49",
  GH:"+233",GR:"+30",GD:"+1473",GT:"+502",GN:"+224",GW:"+245",GY:"+592",HT:"+509",
  HN:"+504",HU:"+36",IS:"+354",IN:"+91",ID:"+62",IR:"+98",IQ:"+964",IE:"+353",
  IL:"+972",IT:"+39",JM:"+1876",JP:"+81",JO:"+962",KZ:"+7",KE:"+254",KI:"+686",
  KP:"+850",KR:"+82",KW:"+965",KG:"+996",LA:"+856",LV:"+371",LB:"+961",LS:"+266",
  LR:"+231",LY:"+218",LI:"+423",LT:"+370",LU:"+352",MG:"+261",MW:"+265",MY:"+60",
  MV:"+960",ML:"+223",MT:"+356",MH:"+692",MR:"+222",MU:"+230",MX:"+52",FM:"+691",
  MD:"+373",MC:"+377",MN:"+976",ME:"+382",MA:"+212",MZ:"+258",MM:"+95",NA:"+264",
  NR:"+674",NP:"+977",NL:"+31",NZ:"+64",NI:"+505",NE:"+227",NG:"+234",MK:"+389",
  NO:"+47",OM:"+968",PK:"+92",PW:"+680",PA:"+507",PG:"+675",PY:"+595",PE:"+51",
  PH:"+63",PL:"+48",PT:"+351",QA:"+974",RO:"+40",RU:"+7",RW:"+250",KN:"+1869",
  LC:"+1758",VC:"+1784",WS:"+685",SM:"+378",ST:"+239",SA:"+966",SN:"+221",RS:"+381",
  SC:"+248",SL:"+232",SG:"+65",SK:"+421",SI:"+386",SB:"+677",SO:"+252",ZA:"+27",
  SS:"+211",ES:"+34",LK:"+94",SD:"+249",SR:"+597",SE:"+46",CH:"+41",SY:"+963",
  TW:"+886",TJ:"+992",TZ:"+255",TH:"+66",TL:"+670",TG:"+228",TO:"+676",TT:"+1868",
  TN:"+216",TR:"+90",TM:"+993",TV:"+688",UG:"+256",UA:"+380",AE:"+971",GB:"+44",
  US:"+1",UY:"+598",UZ:"+998",VU:"+678",VE:"+58",VN:"+84",YE:"+967",ZM:"+260",
  ZW:"+263",PS:"+970",XK:"+383",HK:"+852",MO:"+853",AW:"+297",BM:"+1441",
  KY:"+1345",GU:"+1671",CW:"+599",CK:"+682",AI:"+1264",
};

function CountrySelect({ countries, value, onChange, isRTL, placeholder }) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const ref               = useRef(null);

  const selected = countries.find(c => c.code === value) ?? countries.find(c => c.code === "EG");
  const filtered = query
    ? countries.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        (DIAL[c.code] ?? "").includes(query)
      )
    : countries;

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 h-full min-h-[46px] bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:border-[#3b85c1] transition-colors whitespace-nowrap"
      >
        <span className="text-base leading-none">{selected?.flag ?? "🌍"}</span>
        <span>{selected ? (DIAL[selected.code] ?? "+?") : "+?"}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 top-full mt-1 ${isRTL ? "right-0" : "left-0"} w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden`}
          >
            <div className="p-2 border-b border-gray-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Search size={13} className="text-gray-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="bg-transparent text-xs outline-none flex-1 text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-56">
              {filtered.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-4">{T[isRTL ? "ar" : "en"].noResults}</p>
              ) : filtered.map(c => {
                const dial = DIAL[c.code];
                if (!dial) return null;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => { onChange(c.code); setOpen(false); setQuery(""); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs hover:bg-gray-50 transition-colors ${value === c.code ? "bg-[#264787]/5 text-[#264787] font-bold" : "text-gray-700"}`}
                  >
                    <span className="text-base leading-none w-6 shrink-0">{c.flag}</span>
                    <span className="flex-1 text-left truncate">{c.name}</span>
                    <span className="text-gray-400 font-semibold shrink-0">{dial}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});
  const { prefill, suggestions, locked, handleBookingResponse } = useUserForm();
  useServiceTracker("car");
  const langId = selectedLanguage || 1;
  const isRTL  = langId === 2;
  const t      = T[isRTL ? "ar" : "en"];
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  const [booking, setBooking]         = useState(null);
  const [countries, setCountries]     = useState([]);
  const [dialCountry, setDialCountry] = useState("EG");
  const [form, setForm]               = useState({ fullName: "", email: "", phone: "" });
  const [submitting, setSubmitting]   = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("car_booking");
      if (raw) setBooking(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (prefill.fullName) set("fullName", prefill.fullName);
    if (prefill.email)    set("email",    prefill.email);
    if (prefill.phone)    set("phone",    prefill.phone.replace(/^\+\d+/, "").trim());
  }, [prefill.fullName]);

  useEffect(() => {
    _get(apiRoutes.visa_page)
      .then(res => setCountries(res.data?.data?.countries ?? []))
      .catch(() => {});
  }, []);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const totalPrice = booking?.totalPrice ?? 0;
  const pickupFee  = booking?.pickupFee  ?? BASE_PICKUP_FEE;
  const tax        = totalPrice * 0.15;
  const grandTotal = totalPrice + tax + pickupFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const car = booking?.car ?? {};
    let bookingId = null;
    let bookingStatus = "pending";
    try {
      const res = await _post(apiRoutes.car_reservation_book, {
        car_id:             car.id ?? null,
        car_model:          car.model ?? null,
        car_category:       car.category ?? null,
        car_image_url:      car.imgUrl ?? car.image_url ?? null,
        full_name:          form.fullName,
        email:              form.email,
        phone:              form.phone,
        dial_code:          DIAL[dialCountry] ?? null,
        start_date:         booking?.startDate ?? null,
        end_date:           booking?.endDate ?? null,
        total_days:         booking?.totalDays ?? 1,
        passengers:         booking?.passengers ?? 1,
        children:           booking?.children ?? 0,
        bags:               booking?.bags ?? 0,
        pickup_location:    booking?.pickupLocation ?? null,
        dropoff_location:   booking?.dropoffLocation ?? null,
        route_distance_km:  booking?.routeInfo?.distanceKm ?? null,
        route_duration_min: booking?.routeInfo?.durationMin ?? null,
        rental_price:       totalPrice,
        pickup_fee:         pickupFee,
        tax:                parseFloat(tax.toFixed(2)),
        total_price:        parseFloat(grandTotal.toFixed(2)),
        currency:           car.currency ?? "USD",
      });
      bookingId     = res?.data?.data?.id ?? null;
      bookingStatus = res?.data?.data?.status ?? "pending";
      handleBookingResponse(res?.data?.data);
    } catch { /* proceed to success regardless */ }
    try {
      localStorage.setItem("car_booking_confirm", JSON.stringify({
        bookingId,
        status: bookingStatus,
        car,
        fullName:        form.fullName,
        email:           form.email,
        totalDays:       booking?.totalDays ?? 1,
        totalPrice,
        pickupFee,
        tax:             parseFloat(tax.toFixed(2)),
        grandTotal:      parseFloat(grandTotal.toFixed(2)),
        currency:        car.currency ?? "USD",
        startDate:       booking?.startDate ?? null,
        endDate:         booking?.endDate ?? null,
        pickupLocation:  booking?.pickupLocation ?? null,
        dropoffLocation: booking?.dropoffLocation ?? null,
        routeInfo:       booking?.routeInfo ?? null,
        passengers:      booking?.passengers ?? 1,
        children:        booking?.children ?? 0,
        bags:            booking?.bags ?? 0,
      }));
      localStorage.removeItem("car_booking");
      localStorage.removeItem("car_booking_draft");
    } catch {}
    router.push("/our-services/car-reservation/success");
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return "—"; }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            href={booking?.car?.id ? `/our-services/car-reservation/${booking.car.id}` : "/our-services/car-reservation"}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#264787] transition-colors"
          >
            <BackIcon size={15} /> {t.back}
          </Link>
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <Lock size={12} className="text-[#3b85c1]" /> {t.secure}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-5 gap-6 items-start"
        >
          {/* Order Summary */}
          <aside className="lg:col-span-2 space-y-4">
            {booking?.car && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-44 bg-gradient-to-br from-slate-100 to-blue-50">
                  <img
                    src={booking.car.imgUrl}
                    alt={booking.car.model}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = "/images/2.png"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className={`absolute bottom-3 ${isRTL ? "right-3" : "left-3"}`}>
                    <p className="text-white font-black text-base leading-snug drop-shadow">{booking.car.model}</p>
                    <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">{booking.car.category}</span>
                  </div>
                </div>
              </div>
            )}

            {booking && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t.tripDetails}</p>
                {booking.startDate && (
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar size={15} className="text-[#3b85c1] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{t.dates}</p>
                      <p className="text-gray-700 font-semibold text-xs">
                        {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                        <span className="text-gray-400 ml-1">({booking.totalDays} {booking.totalDays !== 1 ? (isRTL ? "أيام" : "days") : (isRTL ? "يوم" : "day")})</span>
                      </p>
                    </div>
                  </div>
                )}
                {booking.pickupLocation && (
                  <div className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <p className="text-xs text-gray-600 leading-relaxed">{booking.pickupLocation}</p>
                  </div>
                )}
                {booking.dropoffLocation && (
                  <div className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-500 mt-1 shrink-0" />
                    <p className="text-xs text-gray-600 leading-relaxed">{booking.dropoffLocation}</p>
                  </div>
                )}
                {(booking.passengers || booking.bags) && (
                  <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
                    <Users size={14} className="text-gray-400 shrink-0" />
                    <p className="text-xs text-gray-500">
                      {booking.passengers} {isRTL ? "بالغ" : `adult${booking.passengers !== 1 ? "s" : ""}`}
                      {booking.children > 0 && `, ${booking.children} ${isRTL ? "طفل" : `child${booking.children !== 1 ? "ren" : ""}`}`}
                      {booking.bags > 0 && ` · ${booking.bags} ${isRTL ? "حقيبة" : `bag${booking.bags !== 1 ? "s" : ""}`}`}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t.billDetails}</p>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t.rental(booking?.totalDays ?? 0)}</span>
                  <span className="font-semibold">{totalPrice > 0 ? totalPrice.toLocaleString() : "0"} {booking?.car?.currency}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {t.pickupFee}
                    {booking?.routeInfo?.distanceKm && (
                      <span className="text-xs text-gray-400 ml-1">({booking.routeInfo.distanceKm} km × 0.5)</span>
                    )}
                  </span>
                  <span className="font-semibold">{pickupFee.toLocaleString()} {booking?.car?.currency}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t.tax}</span>
                  <span className="font-semibold">{totalPrice > 0 ? tax.toFixed(1) : "0"} {booking?.car?.currency}</span>
                </div>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between items-center">
                <span className="font-black text-gray-900">{t.total}</span>
                <span className="text-xl font-black text-[#264787]">
                  {totalPrice > 0 ? grandTotal.toFixed(1) : "—"} {booking?.car?.currency}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 text-center leading-relaxed px-2">
              {t.policy}{" "}
              <Link href="/" className="text-[#3b85c1] font-semibold underline">{t.seePolicy}</Link>
            </p>
          </aside>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 pt-6 pb-5 border-b border-gray-100">
                <h1 className="text-xl font-black text-gray-900">{t.title}</h1>
                <p className="text-gray-400 text-sm mt-1">{t.subtitle}</p>
              </div>

              <div className="p-6 space-y-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t.contactInfo}</p>

                <div>
                  <label className={labelCls}>{t.fullName} <span className="text-red-400">{t.required}</span></label>
                  <SuggestionInput type="text" value={form.fullName} onChange={e => set("fullName", e.target.value)}
                    suggestions={suggestions.fullName} placeholder={t.fullNamePh} disabled={locked}
                    className={fieldCls + (locked ? " opacity-70 cursor-not-allowed" : "")} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>{t.email} <span className="text-red-400">{t.required}</span></label>
                    <SuggestionInput type="email" value={form.email} onChange={e => set("email", e.target.value)}
                      suggestions={suggestions.email} placeholder={t.emailPh} disabled={locked}
                      className={fieldCls + (locked ? " opacity-70 cursor-not-allowed" : "")} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.phone} <span className="text-red-400">{t.required}</span></label>
                    <div className="flex gap-2 items-stretch">
                      <CountrySelect
                        countries={countries}
                        value={dialCountry}
                        onChange={locked ? () => {} : setDialCountry}
                        isRTL={isRTL}
                        placeholder={t.searchCountry}
                      />
                      <SuggestionInput type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                        suggestions={suggestions.phone} placeholder={t.phonePh} disabled={locked}
                        className={`${fieldCls} flex-1${locked ? " opacity-70 cursor-not-allowed" : ""}`} />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
                  {t.included.map(item => (
                    <div key={item} className="flex items-center gap-2.5 text-xs text-blue-700">
                      <CheckCircle2 size={14} className="shrink-0 text-blue-500" />
                      {item}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400 text-center">
                  {t.alreadyAccount}{" "}
                  <Link href="/sign-in" className="text-[#3b85c1] font-bold hover:underline">{t.signIn}</Link>
                </p>
              </div>

              <div className="px-6 pb-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white text-base font-black rounded-xl shadow-lg shadow-[#264787]/25 hover:brightness-110 transition-all disabled:opacity-70"
                >
                  <CheckCircle2 size={18} />
                  {submitting ? t.processing : t.confirmBtn}
                </button>
              </div>
            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
