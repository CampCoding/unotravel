"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { _get, _post } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import HomePartners from "@/components/pages/HomePage/HomePartners/HomePartners";
import BookingConfirmUI from "@/components/shared/BookingConfirmUI/BookingConfirmUI";
import SuggestionInput from "@/components/shared/SuggestionInput/SuggestionInput";
import { useUserForm } from "@/hooks/useUserForm";
import { useServiceTracker } from "@/hooks/useServiceTracker";
import { useVivaPayment } from "@/hooks/useVivaPayment";
import { saveDraft, deleteDraft } from "@/lib/utils/draft";
import { Tag, Percent, BadgePercent, ChevronLeft, CreditCard } from "lucide-react";

const inp = "w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base text-gray-800";

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

function calcFinalPrice(offerValue, discountValue, discountType) {
  const price = parseFloat(offerValue);
  const disc  = parseFloat(discountValue);
  if (isNaN(price) || isNaN(disc) || disc <= 0) return null;
  if (discountType === "percentage") return Math.max(0, price - (price * disc) / 100);
  return Math.max(0, price - disc); // fixed amount
}

export default function OfferDetailPage() {
  const { id } = useParams();
  const router  = useRouter();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});
  const { prefill, suggestions, locked, handleBookingResponse } = useUserForm();
  const { startPayment, paying, payError } = useVivaPayment();
  useServiceTracker("offer");

  const [offer,     setOffer]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(false);

  // Form state
  const [travelers, setTravelers] = useState(1);
  const [form,      setForm]      = useState({ fullName: "", countryCode: "+966", phone: "", email: "", notes: "" });
  const [formErr,   setFormErr]   = useState("");
  const [submitting,setSubmitting]= useState(false);
  const [submitted, setSubmitted] = useState(null);

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }));

  useEffect(() => {
    if (prefill.fullName) set("fullName", prefill.fullName);
    if (prefill.email)    set("email",    prefill.email);
    if (prefill.phone)    set("phone",    prefill.phone.replace(/^\+\d{1,4}\s?/, "").trim());
  }, [prefill.fullName]);

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("uno_selected_offer");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (String(parsed.offer_id) === String(id)) {
          setOffer(parsed);
          setLoading(false);
        }
      }
    } catch {}

    _get(apiRoutes.offer_detail(id))
      .then((res) => {
        const data = res?.data?.data;
        if (data) { setOffer(data); sessionStorage.setItem("uno_selected_offer", JSON.stringify(data)); }
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  // Auto-save draft
  useEffect(() => {
    if (!offer) return;
    const hasInput = form.fullName || form.phone || form.email;
    if (!hasInput) return;
    saveDraft("offer", {
      title:    offer.offer_name ?? "Offer Registration",
      subtitle: offer.offer_value ?? "",
      path:     `/our-offers/toursDetails/${id}`,
      formData: { form, travelers },
    });
  }, [form, travelers, offer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      setFormErr("Full name and phone are required.");
      return;
    }
    setFormErr("");
    setSubmitting(true);
    try {
      const res = await _post("pages/offer-register", {
        offer_id:   offer?.offer_id   ?? null,
        offer_name: offer?.offer_name ?? null,
        full_name:  form.fullName,
        phone:      `${form.countryCode}${form.phone}`,
        email:      form.email || null,
        notes:      [travelers > 1 ? `Travelers: ${travelers}` : "", form.notes].filter(Boolean).join("\n") || null,
      });
      deleteDraft("offer");
      handleBookingResponse(res?.data?.data);
      const bookingId = res?.data?.data?.id ?? null;

      // If offer has a price → go to Viva payment
      const payableAmount = finalPrice ?? (parseFloat(offer?.offer_value) || 0);
      if (payableAmount > 0 && bookingId) {
        await startPayment({
          booking_type: "offer_register",
          booking_id:   bookingId,
          amount:       payableAmount,
          currency:     "EUR",
          description:  `Offer Registration — ${offerName || offer?.offer_name}`,
          email:        form.email || undefined,
          full_name:    form.fullName,
          phone:        `${form.countryCode}${form.phone}`,
        });
        return; // startPayment redirects the page
      }

      // No price → show confirmation directly
      setSubmitted({
        ...form,
        phone:      `${form.countryCode}${form.phone}`,
        bookingId,
        travelers,
        offerName:  offer?.offer_name,
        offerImg:   offer?.image_url,
        offerValue: offer?.offer_value,
        offerDesc:  offer?.offer_description,
      });
    } catch {
      setFormErr("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-[#264787] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-2xl font-bold text-[#264787]">Offer not found</p>
        <button onClick={() => router.push("/our-offers")} className="text-[#3B85C1] underline text-sm">← Back to Offers</button>
      </div>
    );
  }

  const isRTL = (selectedLanguage || 1) === 2;
  const t = getTranslation(offer, selectedLanguage);
  const offerName = t.offer_name || offer?.offer_name || "";
  const offerDesc = t.offer_description || offer?.offer_description || "";

  const discountLabel = offer.discount_value
    ? offer.discount_type === "percentage"
      ? `${offer.discount_value}% OFF`
      : `${offer.discount_value} OFF`
    : null;

  const finalPrice = calcFinalPrice(offer.offer_value, offer.discount_value, offer.discount_type);
  const originalPrice = parseFloat(offer.offer_value);

  if (submitted) {
    return (
      <BookingConfirmUI
        type="offer"
        bookingId={submitted.bookingId}
        title={submitted.offerName ?? (isRTL ? "تسجيل العرض" : "Offer Registration")}
        image={submitted.offerImg ?? null}
        details={[
          { emoji: "🏷",  label: isRTL ? "قيمة العرض"  : "Offer Value", value: submitted.offerValue },
          { emoji: "👥",  label: isRTL ? "المسافرون"   : "Travelers",   value: `${submitted.travelers} ${submitted.travelers !== 1 ? (isRTL ? "أشخاص" : "persons") : (isRTL ? "شخص" : "person")}` },
          { emoji: "👤",  label: isRTL ? "الاسم"       : "Full Name",   value: submitted.fullName },
          { emoji: "📞",  label: isRTL ? "الهاتف"      : "Phone",       value: submitted.phone },
          { emoji: "✉️",  label: isRTL ? "البريد"      : "Email",       value: submitted.email },
          { emoji: "📝",  label: isRTL ? "ملاحظات"     : "Notes",       value: submitted.notes },
        ]}
        isRTL={isRTL}
        accentColor="from-[#C1823B] to-[#E6A855]"
        onBack={() => router.push("/our-offers")}
        onHome={() => router.push("/")}
        backLabel={isRTL ? "العودة للعروض" : "← Back to Offers"}
      />
    );
  }

  return (
    <div className="!overflow-x-hidden">
      {/* Header image */}
      {offer.image_url && (
        <div className="relative w-full h-[380px] md:h-[480px] overflow-hidden">
          <img src={offer.image_url} alt={offerName} className="w-full h-full object-contain bg-gray-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button
            onClick={() => router.back()}
            className="absolute top-5 left-5 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/40 transition"
          >
            <ChevronLeft size={22} />
          </button>
          {discountLabel && (
            <div className="absolute top-5 right-5 bg-red-500 text-white font-black px-4 py-2 rounded-2xl text-sm shadow-lg">
              {discountLabel}
            </div>
          )}
          {offerName && (
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-white text-2xl md:text-4xl font-black drop-shadow-lg">{offerName}</h1>
            </div>
          )}
        </div>
      )}

      <div className="container mt-10 pb-20">
        {!offer.image_url && (
          <div className="flex items-start gap-3 mb-6">
            <button onClick={() => router.back()} className="mt-1 text-[#264787] hover:opacity-70 transition">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl md:text-5xl font-black text-[#264787]">{offerName}</h1>
          </div>
        )}

        {/* Badges row — no Visit Link */}
        <div className="flex flex-wrap gap-3 mt-4">
          {offer.offer_value && (
            <span className="inline-flex items-center gap-1.5 bg-[#264787]/10 text-[#264787] font-bold px-4 py-2 rounded-full text-sm">
              <Tag size={14} />
              {offer.offer_value}
            </span>
          )}
          {discountLabel && (
            <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 font-bold px-4 py-2 rounded-full text-sm">
              <BadgePercent size={14} />
              {discountLabel}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">

          {/* ── Left: details + form ─────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Description */}
            {offerDesc && (
              <div data-aos="fade-up" className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-[#264787] mb-3">About This Offer</h2>
                <p className="text-[#505050] leading-relaxed whitespace-pre-line">{offerDesc}</p>
              </div>
            )}

            {/* Offer details table */}
            <div data-aos="fade-up" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-[#264787]/5">
                <h2 className="font-bold text-[#264787]">Offer Details</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {offer.offer_value && (
                  <div className="flex justify-between px-6 py-4">
                    <span className="text-gray-500 text-sm font-medium">Original Price</span>
                    <span className={`font-bold ${finalPrice !== null ? "line-through text-gray-400 text-sm self-center" : "text-[#264787]"}`}>
                      {originalPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {offer.discount_value && (
                  <div className="flex justify-between px-6 py-4">
                    <span className="text-gray-500 text-sm font-medium">Discount</span>
                    <span className="font-bold text-red-500">{discountLabel}</span>
                  </div>
                )}
                {finalPrice !== null && (
                  <div className="flex justify-between px-6 py-4 bg-green-50">
                    <span className="text-green-700 text-sm font-semibold">Price After Discount</span>
                    <span className="font-black text-green-700 text-lg">{finalPrice.toLocaleString()}</span>
                  </div>
                )}
                {offer.discount_type && (
                  <div className="flex justify-between px-6 py-4">
                    <span className="text-gray-500 text-sm font-medium">Discount Type</span>
                    <span className="font-semibold capitalize text-gray-700">{offer.discount_type}</span>
                  </div>
                )}
                {offer.offer_id && (
                  <div className="flex justify-between px-6 py-4">
                    <span className="text-gray-500 text-sm font-medium">Offer ID</span>
                    <span className="font-semibold text-gray-600">#{offer.offer_id}</span>
                  </div>
                )}
              </div>
            </div>

            {/* ── Booking Form (inline) ─────────────────────────── */}
            <div data-aos="fade-up" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-[#264787]/5">
                <h2 className="font-bold text-[#264787]">Register for This Offer</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">

                {/* Travelers counter */}
                <div>
                  <p className="text-sm font-semibold text-[#264787] mb-3">Number of Travelers</p>
                  <div className="flex items-center gap-0 w-fit border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button type="button" onClick={() => setTravelers(n => Math.max(1, n - 1))}
                      className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none">−</button>
                    <div className="w-14 h-11 flex items-center justify-center text-[#264787] font-bold text-lg border-x-2 border-gray-200 bg-white">{travelers}</div>
                    <button type="button" onClick={() => setTravelers(n => Math.min(20, n + 1))}
                      className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 text-xl font-bold transition select-none">+</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <SuggestionInput value={form.fullName} onChange={e => set("fullName", e.target.value)}
                      suggestions={suggestions.fullName} placeholder="Enter your full name"
                      className={inp + (locked ? " opacity-70 cursor-not-allowed" : "")} disabled={locked} />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <select value={form.countryCode} onChange={e => set("countryCode", e.target.value)} disabled={locked}
                        className="min-w-[110px] bg-gray-100 rounded-2xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 text-sm text-gray-700 disabled:opacity-70">
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+965">🇰🇼 +965</option>
                        <option value="+974">🇶🇦 +974</option>
                        <option value="+968">🇴🇲 +968</option>
                        <option value="+962">🇯🇴 +962</option>
                        <option value="+46">🇸🇪 +46</option>
                        <option value="+90">🇹🇷 +90</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+1">🇺🇸 +1</option>
                      </select>
                      <SuggestionInput type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                        suggestions={suggestions.phone} placeholder="555 000 0000"
                        className={"flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base" + (locked ? " opacity-70 cursor-not-allowed" : "")}
                        disabled={locked} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <SuggestionInput type="email" value={form.email} onChange={e => set("email", e.target.value)}
                      suggestions={suggestions.email} placeholder="your@email.com"
                      className={inp + (locked ? " opacity-70 cursor-not-allowed" : "")} disabled={locked} />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
                    placeholder="Any special requests..."
                    className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 resize-none h-28 text-base text-gray-800" />
                </div>

                {(formErr || payError) && <p className="text-red-500 text-sm">{formErr || payError}</p>}

                <button type="submit" disabled={submitting || paying}
                  className="w-full flex items-center justify-center gap-2 bg-[#264787] hover:bg-[#3B85C1] text-white font-black py-4 rounded-xl transition disabled:opacity-60 text-base">
                  {(submitting || paying) && (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                  )}
                  {paying ? "Redirecting to payment…" : submitting ? "Submitting…" : (
                    (finalPrice ?? parseFloat(offer?.offer_value ?? 0)) > 0
                      ? <><CreditCard size={16}/> Register & Pay Now</>
                      : "Register Now"
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* ── Right: summary card ───────────────────────────────── */}
          <div className="lg:col-span-1">
            <div data-aos="fade-left" className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-5">
              <h3 className="text-xl font-black text-[#264787]">Price Summary</h3>

              {/* Original */}
              {offer.offer_value && (
                <div className="bg-[#264787]/5 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Tag size={16} className="text-[#264787] flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Original Price</p>
                    <span className={`font-black text-lg ${finalPrice !== null ? "line-through text-gray-400" : "text-[#264787]"}`}>
                      {originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Discount */}
              {discountLabel && (
                <div className="bg-red-50 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Percent size={16} className="text-red-500 flex-shrink-0" />
                  <span className="text-red-500 font-bold text-sm">{discountLabel}</span>
                </div>
              )}

              {/* Final price */}
              {finalPrice !== null && (
                <div className="bg-green-50 rounded-xl px-4 py-3 flex items-center gap-2 border border-green-200">
                  <Tag size={16} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-green-600 font-medium uppercase tracking-wide">After Discount</p>
                    <span className="text-green-700 font-black text-2xl">{finalPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => router.push("/our-offers")}
                className="w-full border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition text-sm"
              >
                ← Browse All Offers
              </button>
            </div>
          </div>

        </div>
      </div>

      <HomePartners />
    </div>
  );
}
