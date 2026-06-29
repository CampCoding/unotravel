"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { _get, _post } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import { useUserForm } from "@/hooks/useUserForm";
import { useServiceTracker } from "@/hooks/useServiceTracker";
import SuggestionInput from "@/components/shared/SuggestionInput/SuggestionInput";

const DIAL = {
  AF:"+93",AL:"+355",DZ:"+213",AD:"+376",AO:"+244",AG:"+1268",AR:"+54",AM:"+374",AU:"+61",AT:"+43",AZ:"+994",BS:"+1242",BH:"+973",BD:"+880",BB:"+1246",BY:"+375",BE:"+32",BZ:"+501",BJ:"+229",BT:"+975",BO:"+591",BA:"+387",BW:"+267",BR:"+55",BN:"+673",BG:"+359",BF:"+226",BI:"+257",CV:"+238",KH:"+855",CM:"+237",CA:"+1",CF:"+236",TD:"+235",CL:"+56",CN:"+86",CO:"+57",KM:"+269",CG:"+242",CD:"+243",CR:"+506",HR:"+385",CU:"+53",CY:"+357",CZ:"+420",DK:"+45",DJ:"+253",DM:"+1767",DO:"+1809",EC:"+593",EG:"+20",SV:"+503",GQ:"+240",ER:"+291",EE:"+372",SZ:"+268",ET:"+251",FJ:"+679",FI:"+358",FR:"+33",GA:"+241",GM:"+220",GE:"+995",DE:"+49",GH:"+233",GR:"+30",GD:"+1473",GT:"+502",GN:"+224",GW:"+245",GY:"+592",HT:"+509",HN:"+504",HU:"+36",IS:"+354",IN:"+91",ID:"+62",IR:"+98",IQ:"+964",IE:"+353",IL:"+972",IT:"+39",JM:"+1876",JP:"+81",JO:"+962",KZ:"+7",KE:"+254",KI:"+686",KP:"+850",KR:"+82",KW:"+965",KG:"+996",LA:"+856",LV:"+371",LB:"+961",LS:"+266",LR:"+231",LY:"+218",LI:"+423",LT:"+370",LU:"+352",MG:"+261",MW:"+265",MY:"+60",MV:"+960",ML:"+223",MT:"+356",MH:"+692",MR:"+222",MU:"+230",MX:"+52",FM:"+691",MD:"+373",MC:"+377",MN:"+976",ME:"+382",MA:"+212",MZ:"+258",MM:"+95",NA:"+264",NR:"+674",NP:"+977",NL:"+31",NZ:"+64",NI:"+505",NE:"+227",NG:"+234",MK:"+389",NO:"+47",OM:"+968",PK:"+92",PW:"+680",PA:"+507",PG:"+675",PY:"+595",PE:"+51",PH:"+63",PL:"+48",PT:"+351",QA:"+974",RO:"+40",RU:"+7",RW:"+250",KN:"+1869",LC:"+1758",VC:"+1784",WS:"+685",SM:"+378",ST:"+239",SA:"+966",SN:"+221",RS:"+381",SC:"+248",SL:"+232",SG:"+65",SK:"+421",SI:"+386",SB:"+677",SO:"+252",ZA:"+27",SS:"+211",ES:"+34",LK:"+94",SD:"+249",SR:"+597",SE:"+46",CH:"+41",SY:"+963",TW:"+886",TJ:"+992",TZ:"+255",TH:"+66",TL:"+670",TG:"+228",TO:"+676",TT:"+1868",TN:"+216",TR:"+90",TM:"+993",TV:"+688",UG:"+256",UA:"+380",AE:"+971",GB:"+44",US:"+1",UY:"+598",UZ:"+998",VU:"+678",VE:"+58",VN:"+84",YE:"+967",ZM:"+260",ZW:"+263",PS:"+970",XK:"+383",HK:"+852",MO:"+853",AW:"+297",BM:"+1441",KY:"+1345",GU:"+1671",CW:"+599",CK:"+682",AI:"+1264",
};

function CountrySelect({ countries, value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  const selected = countries.find(c => c.code === value) ?? countries.find(c => c.code === "SA") ?? countries[0];
  const filtered = query ? countries.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || (DIAL[c.code] ?? "").includes(query)) : countries;
  useEffect(() => {
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div ref={ref} className="relative shrink-0">
      <button type="button" onClick={() => !disabled && setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 h-full min-h-[50px] bg-[#f4f6f8] rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-200 transition whitespace-nowrap border-0 outline-none">
        <span className="text-lg leading-none">{selected?.flag ?? "🌍"}</span>
        <span className="text-xs">{selected ? (DIAL[selected.code] ?? "+?") : "+?"}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0,y:-6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-6 }} transition={{ duration:0.15 }}
            className="absolute z-50 top-full mt-1 left-0 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            <div className="p-2 border-b border-gray-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Search size={13} className="text-gray-400 shrink-0" />
                <input autoFocus type="text" placeholder="Search country…" value={query} onChange={e => setQuery(e.target.value)}
                  className="bg-transparent text-xs outline-none flex-1 placeholder:text-gray-400" />
              </div>
            </div>
            <div className="overflow-y-auto max-h-52">
              {filtered.map(c => {
                const dial = DIAL[c.code]; if (!dial) return null;
                return (
                  <button key={c.id} type="button" onClick={() => { onChange(c.code); setOpen(false); setQuery(""); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs hover:bg-gray-50 transition ${value === c.code ? "bg-[#264787]/5 text-[#264787] font-bold" : "text-gray-700"}`}>
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

const inputCls = "w-full px-4 py-3.5 text-sm bg-[#f4f6f8] rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#264787]/20 placeholder:text-gray-400 text-gray-700";
const labelCls = "block text-sm font-bold text-gray-800 mb-2";

export default function ConfirmPage() {
  const router = useRouter();
  const { prefill, suggestions, locked, handleBookingResponse } = useUserForm();
  useServiceTracker("ride");

  const [step1,       setStep1]       = useState(null);
  const [step2,       setStep2]       = useState(null);
  const [countries,   setCountries]   = useState([]);
  const [dialCountry, setDialCountry] = useState("SA");
  const [form,        setForm]        = useState({ fullName: "", email: "", phone: "" });
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState("");

  useEffect(() => {
    try { const r1 = localStorage.getItem("ride_step1"); if (r1) setStep1(JSON.parse(r1)); } catch {}
    try { const r2 = localStorage.getItem("ride_step2"); if (r2) setStep2(JSON.parse(r2)); } catch {}
    _get(apiRoutes.visa_page).then(res => setCountries(res?.data?.data?.countries ?? [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (prefill.fullName) set("fullName", prefill.fullName);
    if (prefill.email)    set("email",    prefill.email);
    if (prefill.phone)    set("phone",    prefill.phone?.replace(/^\+\d{1,4}\s?/, "").trim() ?? "");
  }, [prefill.fullName]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const car       = step2?.car ?? {};
  const carPrice  = step2?.carPrice  ?? 0;
  const pickupFee = step2?.pickupFee ?? 2;
  const tax       = step2?.tax       ?? 0;
  const total     = step2?.total     ?? 0;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.fullName.trim()) return setError("Full name is required.");
    if (!form.phone.trim())    return setError("Phone number is required.");
    setError(""); setSubmitting(true);
    try {
      const payload = {
        car_id: car.id ?? null, car_model: car.model ?? null, car_category: car.category ?? null,
        car_image_url: car.imgUrl ?? car.image_url ?? null,
        full_name: form.fullName, email: form.email, phone: form.phone,
        dial_code: DIAL[dialCountry] ?? null,
        from_location: step1?.from ?? null, to_location: step1?.to ?? null,
        from_lat: step1?.fromCoords?.[0] ?? null, from_lng: step1?.fromCoords?.[1] ?? null,
        to_lat: step1?.toCoords?.[0] ?? null, to_lng: step1?.toCoords?.[1] ?? null,
        ride_date: step1?.date ? new Date(step1.date).toISOString().slice(0,10) : null,
        passengers: step2?.adults ?? 1, children: step2?.children ?? 0,
        children_ages: JSON.stringify(step2?.childAges ?? []),
        bags: step2?.bags ?? 0, name_on_sign: step2?.nameOnSign ?? null,
        flight_details: step2?.comment ?? null, coupon_code: step2?.coupon ?? null,
        discount: 0, car_price: carPrice, pickup_fee: pickupFee, tax, total_price: total,
        currency: car.currency ?? "USD",
        route_distance_km: step1?.routeInfo?.distanceKm ?? null,
        route_duration_min: step1?.routeInfo?.durationMin ?? null,
      };
      const res = await _post(apiRoutes.ride_book, payload);
      handleBookingResponse?.(res?.data?.data);
      try {
        localStorage.setItem("ride_confirm", JSON.stringify({ bookingId: res?.data?.data?.id, status: res?.data?.data?.status ?? "pending", ...payload, car }));
        localStorage.removeItem("ride_step1");
        localStorage.removeItem("ride_step2");
      } catch {}
      router.push("/our-services/get-ride/success");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">

          {/* Left — Contact form */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-black text-gray-900">
                Payment{" "}
                <span className="relative inline-block text-[#264787]">
                  Method
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[#f0a500]" />
                </span>
              </h1>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                We'll Use This Information To Send You Confirmation And Updates About Your Booking
              </p>
            </div>

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-[#264787] font-semibold">Already Have An Account?</span>
              <Link href="/sign-in" className="px-5 py-2 bg-[#264787] text-white text-xs font-black rounded-xl hover:bg-[#1e3a6e] transition">
                Log In
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <SuggestionInput type="text" value={form.fullName} onChange={e => set("fullName", e.target.value)}
                  suggestions={suggestions.fullName} placeholder="Enter your full name" disabled={locked}
                  className={inputCls + (locked ? " opacity-70 cursor-not-allowed" : "")} />
              </div>

              <div>
                <label className={labelCls}>Email</label>
                <SuggestionInput type="email" value={form.email} onChange={e => set("email", e.target.value)}
                  suggestions={suggestions.email} placeholder="name@example.com" disabled={locked}
                  className={inputCls + (locked ? " opacity-70 cursor-not-allowed" : "")} />
              </div>

              <div>
                <label className={labelCls}>Your Phone Number *</label>
                <div className="flex gap-2 items-stretch">
                  <CountrySelect countries={countries} value={dialCountry} onChange={locked ? () => {} : setDialCountry} disabled={locked} />
                  <SuggestionInput type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                    suggestions={suggestions.phone} placeholder="xx xxx x xx" disabled={locked}
                    className={`${inputCls} flex-1${locked ? " opacity-70 cursor-not-allowed" : ""}`} />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs bg-red-50 rounded-xl p-3">{error}</p>}

              <button type="submit" disabled={submitting}
                className="w-full py-4 bg-[#264787] hover:bg-[#1e3a6e] text-white font-black text-base rounded-2xl shadow-lg shadow-[#264787]/25 transition-all disabled:opacity-70 mt-2">
                {submitting ? "Booking…" : "Confirm Booking"}
              </button>
            </form>
          </div>

          {/* Right — Ride summary + Bill */}
          <div className="space-y-5">
            {/* Ride Details */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-base font-black text-[#264787] mb-4">Ride Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <span className="w-7 h-7 rounded-full bg-[#264787] text-white flex items-center justify-center font-black text-xs shrink-0">A</span>
                    <div className="flex flex-col gap-0.5 mt-1 mb-1">
                      <div className="w-px h-2 bg-gray-300 mx-auto" />
                      <div className="w-px h-2 bg-gray-300 mx-auto" />
                      <div className="w-px h-2 bg-gray-300 mx-auto" />
                    </div>
                    <span className="w-7 h-7 rounded-full border-2 border-[#264787] text-[#264787] flex items-center justify-center font-black text-xs shrink-0">B</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between" style={{ minHeight: "70px" }}>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">From</p>
                      <p className="text-sm text-gray-700 font-semibold leading-snug">{step1?.from || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold mt-2">To</p>
                      <p className="text-sm text-gray-700 font-semibold leading-snug">{step1?.to || "—"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-[#264787] mb-1">Note:</p>
              <p className="text-xs text-red-500 leading-relaxed">
                You Will Be Charged The Full Amount Instantly. You Can Still Cancel Up To 24 Hours Before The Experience Starts For A Full Refund.{" "}
                <Link href="/" className="underline font-bold">See Cancellation Policy</Link>
              </p>
            </div>

            {/* Bill Details */}
            <div className="bg-[#fff8ef] rounded-2xl p-5">
              <h3 className="text-sm font-black text-[#264787] mb-4">Bill Details</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Pickup Point Fee</span>
                  <span className="font-bold">{pickupFee}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span className="font-bold">15 %</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-orange-400 rounded-xl px-5 py-4 flex justify-between items-center">
                <span className="text-white font-black text-sm">Total ( Include Tax )</span>
                <span className="text-white font-black text-xl">{parseFloat(total).toFixed(0)} $</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
