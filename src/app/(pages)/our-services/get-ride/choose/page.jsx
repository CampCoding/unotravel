"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";

const PageTitle = ({ w1, w2 }) => (
  <div className="mb-6">
    <h1 className="text-3xl font-black text-gray-900">
      {w1}{" "}
      <span className="relative inline-block text-[#264787]">
        {w2}
        <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[#f0a500]" />
      </span>
    </h1>
  </div>
);

const Counter = ({ icon, label, value, onChange, min = 0 }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <span className="text-xl w-7 text-center">{icon}</span>
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
    <div className="flex items-center bg-[#264787] rounded-full overflow-hidden">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 flex items-center justify-center text-white font-black text-lg hover:bg-[#1e3a6e] transition">
        −
      </button>
      <span className="w-8 text-center text-white font-black text-sm select-none">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)}
        className="w-9 h-9 flex items-center justify-center text-white font-black text-lg hover:bg-[#1e3a6e] transition">
        +
      </button>
    </div>
  </div>
);

const inputCls = "w-full px-4 py-3.5 text-sm bg-[#f4f6f8] rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#264787]/20 placeholder:text-gray-400 text-gray-700";

export default function ChoosePage() {
  const router = useRouter();
  const [step1,      setStep1]      = useState(null);
  const [cars,       setCars]       = useState([]);
  const [selected,   setSelected]   = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [adults,     setAdults]     = useState(1);
  const [children,   setChildren]   = useState(0);
  const [childAges,  setChildAges]  = useState([]);
  const [bags,       setBags]       = useState(0);
  const [nameOnSign, setNameOnSign] = useState("");
  const [comment,    setComment]    = useState("");
  const [coupon,     setCoupon]     = useState("");

  useEffect(() => {
    try { const r = localStorage.getItem("ride_step1"); if (r) setStep1(JSON.parse(r)); } catch {}
    _get(apiRoutes.car_reservation_page)
      .then(res => { setCars(res?.data?.data?.cars ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setChildAges(prev => {
      const next = [...prev];
      while (next.length < children) next.push("");
      while (next.length > children) next.pop();
      return next;
    });
  }, [children]);

  const pickupFee = step1?.pickupFee ?? 2;
  const carPrice  = selected ? (parseFloat(selected.price) || 0) : 0;
  const tax       = (carPrice + pickupFee) * 0.15;
  const total     = carPrice + pickupFee + tax;

  const formatDate = iso => {
    try { return new Date(iso).toLocaleDateString("en-GB", { weekday:"short", day:"numeric", month:"short" }); }
    catch { return ""; }
  };

  const handleNext = () => {
    if (!selected) return alert("Please select a car.");
    try {
      localStorage.setItem("ride_step2", JSON.stringify({
        car: selected, adults, children, childAges, bags,
        nameOnSign, comment, coupon, discount: 0,
        carPrice, pickupFee, tax: parseFloat(tax.toFixed(2)), total: parseFloat(total.toFixed(2)),
      }));
    } catch {}
    router.push("/our-services/get-ride/confirm");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <PageTitle w1="Ride" w2="Details" />

        {/* Route summary card */}
        {step1 && (
          <div className="bg-[#264787] rounded-2xl p-5 mb-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📅</span>
              <span className="font-black text-sm">{formatDate(step1.date)}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-white text-[#264787] flex items-center justify-center font-black text-xs shrink-0">A</span>
                <span className="text-sm text-white/90 truncate">{step1.from}</span>
              </div>
              <div className="flex items-start gap-3 pl-3.5">
                <div className="flex flex-col items-center gap-0.5 mt-1">
                  <div className="w-0.5 h-3 bg-white/30" />
                  <div className="w-0.5 h-3 bg-white/30" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border-2 border-white text-white flex items-center justify-center font-black text-xs shrink-0">B</span>
                <span className="text-sm text-white/90 truncate">{step1.to}</span>
              </div>
            </div>
          </div>
        )}

        {/* Car selection */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <p className="text-sm font-black text-gray-700 mb-4">Choose Your Car</p>
          {loading ? (
            <div className="py-8 text-center text-sm text-gray-400">Loading cars…</div>
          ) : cars.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">No cars available.</div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {cars.map(car => (
                <button key={car.id} type="button" onClick={() => setSelected(car)}
                  className={`flex-shrink-0 w-36 rounded-2xl overflow-hidden transition-all border-2 text-left ${selected?.id === car.id ? "border-[#264787] shadow-lg" : "border-gray-100 hover:border-gray-200"}`}>
                  <div className="h-24 bg-gray-50 relative">
                    <img src={car.imgUrl || car.image_url || "/images/2.png"} alt={car.model}
                      className="w-full h-full object-contain p-2" onError={e => { e.target.src = "/images/2.png"; }} />
                  </div>
                  <div className={`py-2 text-center text-xs font-black ${selected?.id === car.id ? "bg-[#264787] text-white" : "bg-gray-50 text-gray-600"}`}>
                    {car.category || car.model}
                  </div>
                  {car.price && (
                    <div className="py-1.5 text-center text-xs font-bold text-[#264787] bg-white">
                      {car.price} {car.currency || "USD"}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Counters */}
        <div className="bg-white rounded-2xl px-5 mb-4 shadow-sm">
          <Counter icon="🧑" label="Adult's"    value={adults}   onChange={setAdults}   min={1} />
          <Counter icon="👦" label="Children's" value={children} onChange={setChildren} />
          {children > 0 && (
            <div className="pb-4 space-y-2.5">
              {childAges.map((age, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="number" min="0" max="17" value={age}
                    onChange={e => { const n = [...childAges]; n[i] = e.target.value; setChildAges(n); }}
                    placeholder={`Children ${i + 1} Age`} className={inputCls} />
                  <button type="button" onClick={() => setChildren(c => Math.max(0, c - 1))}
                    className="w-8 h-8 rounded-full bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition shrink-0">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <Counter icon="🧳" label="Bags" value={bags} onChange={setBags} />
        </div>

        {/* Extra details */}
        <div className="bg-white rounded-2xl px-5 py-2 mb-4 shadow-sm space-y-1">
          <div className="flex items-center gap-3 py-4 border-b border-gray-100">
            <span className="text-xl w-7 text-center">🪧</span>
            <input value={nameOnSign} onChange={e => setNameOnSign(e.target.value)}
              placeholder="Name On Sign For Driver" className={`${inputCls} flex-1`} />
          </div>
          <div className="flex items-start gap-3 py-4 border-b border-gray-100">
            <span className="text-xl w-7 text-center mt-1">✈️</span>
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={2}
              placeholder="Comment/ Flight Details" className={`${inputCls} flex-1 resize-none`} />
          </div>
          <div className="flex items-center gap-3 py-4">
            <span className="text-xl w-7 text-center">🎟️</span>
            <input value={coupon} onChange={e => setCoupon(e.target.value)}
              placeholder="Coupon" className={`${inputCls} flex-1`} />
          </div>
        </div>

        {/* Price summary */}
        {selected && (
          <div className="bg-[#fff8ef] rounded-2xl p-5 mb-5">
            <p className="text-xs font-black text-[#264787] uppercase tracking-wider mb-3">Price Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600"><span>Car Price</span><span className="font-semibold">{carPrice} USD</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Pickup Point Fee</span><span className="font-semibold">{pickupFee} USD</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Tax</span><span className="font-semibold">15 %</span></div>
            </div>
            <div className="mt-3 bg-gradient-to-r from-red-500 to-orange-400 rounded-xl px-5 py-3.5 flex justify-between items-center">
              <span className="text-white font-black text-sm">Total ( Include Tax )</span>
              <span className="text-white font-black text-lg">{total.toFixed(0)} $</span>
            </div>
          </div>
        )}

        <button onClick={handleNext}
          className="w-full py-4 bg-[#264787] hover:bg-[#1e3a6e] text-white font-black text-base rounded-2xl shadow-lg shadow-[#264787]/25 transition-all">
          Next →
        </button>
      </div>
    </div>
  );
}
