"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Minus, Plus } from "lucide-react";
import MainBanner from "@/components/shared/MainBanner/MainBanner";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";

const Step = ({ n, label, active }) => (
  <div className={`flex items-center gap-1.5 text-xs font-bold ${active ? "text-[#264787]" : "text-gray-400"}`}>
    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${active ? "bg-[#264787] text-white" : "bg-gray-200 text-gray-400"}`}>{n}</span>
    {label}
  </div>
);

const Counter = ({ label, value, onChange, min = 0 }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#264787] hover:text-[#264787] transition disabled:opacity-30"
        disabled={value <= min}>
        <Minus size={14} />
      </button>
      <span className="w-6 text-center font-black text-gray-900">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)}
        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#264787] hover:text-[#264787] transition">
        <Plus size={14} />
      </button>
    </div>
  </div>
);

const fieldCls = "w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3b85c1]/25 focus:border-[#3b85c1] transition placeholder:text-gray-400";

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
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount,   setDiscount]   = useState(0);

  useEffect(() => {
    try { const raw = localStorage.getItem("ride_step1"); if (raw) setStep1(JSON.parse(raw)); } catch {}
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
  const total     = carPrice + pickupFee + tax - discount;

  const handleNext = () => {
    if (!selected) return alert("Please select a car.");
    try {
      localStorage.setItem("ride_step2", JSON.stringify({
        car: selected,
        adults, children, childAges, bags,
        nameOnSign, comment, coupon, discount,
        carPrice, pickupFee, tax: parseFloat(tax.toFixed(2)), total: parseFloat(total.toFixed(2)),
      }));
    } catch {}
    router.push("/our-services/get-ride/confirm");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainBanner title="Choose Your Car" subtitle="Select the perfect vehicle for your ride." />
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-8">
          <Step n="1" label="Location" active={false} />
          <div className="flex-1 h-px bg-gray-200" />
          <Step n="2" label="Car & Details" active />
          <div className="flex-1 h-px bg-gray-200" />
          <Step n="3" label="Confirm" active={false} />
        </div>

        {/* Route summary */}
        {step1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
            <span>🅐 <strong className="text-gray-700">{step1.from}</strong></span>
            <span>→</span>
            <span>🅑 <strong className="text-gray-700">{step1.to}</strong></span>
            {step1.routeInfo && <span>· {step1.routeInfo.distanceKm} km · ~{step1.routeInfo.durationMin} min</span>}
          </div>
        )}

        {/* Car selection */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Select a Car</p>
          {loading ? (
            <div className="py-10 text-center text-sm text-gray-400">Loading cars…</div>
          ) : cars.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">No cars available.</div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
              {cars.map(car => (
                <button key={car.id} type="button" onClick={() => setSelected(car)}
                  className={`flex-shrink-0 w-52 rounded-2xl border-2 transition-all text-left overflow-hidden ${selected?.id === car.id ? "border-[#264787] shadow-lg shadow-[#264787]/15" : "border-gray-100 hover:border-gray-300"}`}>
                  <div className="h-32 bg-gray-100 relative overflow-hidden">
                    <img src={car.imgUrl || car.image_url || "/images/2.png"} alt={car.model}
                      className="w-full h-full object-cover" onError={e => { e.target.src = "/images/2.png"; }} />
                    {selected?.id === car.id && (
                      <div className="absolute inset-0 bg-[#264787]/10 flex items-center justify-center">
                        <span className="w-8 h-8 rounded-full bg-[#264787] text-white flex items-center justify-center text-lg font-black">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-black text-gray-900 text-sm leading-snug">{car.model}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{car.category}</p>
                    <p className="text-[#264787] font-black text-base mt-2">{car.price} <span className="text-xs font-semibold text-gray-400">{car.currency || "USD"}</span></p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Passengers & details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Passengers & Luggage</p>
          <Counter label="Adults" value={adults} onChange={setAdults} min={1} />
          <Counter label="Children" value={children} onChange={setChildren} />
          <Counter label="Bags" value={bags} onChange={setBags} />
          {children > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs font-bold text-gray-500">Children ages</p>
              <div className="grid grid-cols-3 gap-2">
                {childAges.map((age, i) => (
                  <input key={i} type="number" min="0" max="17" value={age} placeholder={`Child ${i+1} age`}
                    onChange={e => { const next = [...childAges]; next[i] = e.target.value; setChildAges(next); }}
                    className={fieldCls} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Extra details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5 space-y-4">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400">Extra Details</p>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">Name on Sign for Driver</label>
            <input value={nameOnSign} onChange={e => setNameOnSign(e.target.value)}
              placeholder="Name to display on driver's sign" className={fieldCls} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">Comment / Flight Details</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3}
              placeholder="Flight number, special requests, notes…" className={fieldCls + " resize-none"} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">Coupon Code</label>
            <div className="flex gap-2">
              <input value={coupon} onChange={e => { setCoupon(e.target.value); setCouponApplied(false); }}
                placeholder="Enter code" className={fieldCls} />
              <button type="button"
                onClick={() => { if (coupon.trim()) { setCouponApplied(true); setDiscount(0); } }}
                className="px-5 text-xs font-black rounded-xl border border-gray-200 hover:border-[#264787] hover:text-[#264787] transition whitespace-nowrap">
                Apply
              </button>
            </div>
            {couponApplied && <p className="text-xs text-amber-600 mt-1">Coupon applied (discount managed by admin).</p>}
          </div>
        </div>

        {/* Price summary */}
        {selected && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5 space-y-2.5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Price Summary</p>
            <div className="flex justify-between text-sm text-gray-600"><span>Car price</span><span className="font-semibold">{carPrice} USD</span></div>
            <div className="flex justify-between text-sm text-gray-600"><span>Pickup fee</span><span className="font-semibold">{pickupFee} USD</span></div>
            <div className="flex justify-between text-sm text-gray-600"><span>Tax (15%)</span><span className="font-semibold">{tax.toFixed(2)} USD</span></div>
            {discount > 0 && <div className="flex justify-between text-sm text-emerald-600"><span>Discount</span><span className="font-semibold">-{discount} USD</span></div>}
            <div className="h-px bg-gray-100" />
            <div className="flex justify-between items-center">
              <span className="font-black text-gray-900">Total</span>
              <span className="text-xl font-black text-[#264787]">{total.toFixed(2)} USD</span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-4 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:border-gray-300 transition">
            <ChevronLeft size={16} /> Back
          </button>
          <button type="button" onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white text-sm font-black rounded-xl shadow-lg shadow-[#264787]/25 hover:brightness-110 transition-all">
            Next: Confirm Booking <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
