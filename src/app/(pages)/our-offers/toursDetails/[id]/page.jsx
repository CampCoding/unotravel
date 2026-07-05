"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import HomePartners from "@/components/pages/HomePage/HomePartners/HomePartners";
import { Tag, Percent, BadgePercent, Globe, ChevronLeft } from "lucide-react";

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

export default function OfferDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Try sessionStorage first for instant render
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

    // Always fetch fresh from backend
    _get(apiRoutes.offer_detail(id))
      .then((res) => {
        const data = res?.data?.data;
        if (data) setOffer(data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const t = offer ? getTranslation(offer, selectedLanguage) : {};
  const offerName = t.offer_name || offer?.offer_name || "";
  const offerDesc = t.offer_description || offer?.offer_description || "";

  const handleRegister = () => {
    if (offer) sessionStorage.setItem("uno_selected_offer", JSON.stringify({ ...offer, offer_name: offerName, offer_description: offerDesc }));
    router.push("/our-offers/register");
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

  const discountLabel = offer.discount_value
    ? offer.discount_type === "percentage"
      ? `${offer.discount_value}% OFF`
      : `${offer.discount_value} OFF`
    : null;

  return (
    <div className="!overflow-x-hidden">
      {/* Header image */}
      {offer.image_url && (
        <div className="relative w-full h-[380px] md:h-[480px] overflow-hidden">
          <img
            src={offer.image_url}
            alt={offerName}
            className="w-full h-full object-contain bg-gray-50"
          />
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
        {/* Title row (if no image) */}
        {!offer.image_url && (
          <div className="flex items-start gap-3 mb-6">
            <button onClick={() => router.back()} className="mt-1 text-[#264787] hover:opacity-70 transition">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl md:text-5xl font-black text-[#264787]">{offerName}</h1>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">

          {/* Left — main content */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Badges row */}
            <div className="flex flex-wrap gap-3">
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
              {offer.link_url && (
                <a
                  href={offer.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full text-sm hover:bg-green-200 transition"
                >
                  <Globe size={14} />
                  Visit Link
                </a>
              )}
            </div>

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
                    <span className="text-gray-500 text-sm font-medium">Offer Value</span>
                    <span className="font-bold text-[#264787]">{offer.offer_value}</span>
                  </div>
                )}
                {offer.discount_value && (
                  <div className="flex justify-between px-6 py-4">
                    <span className="text-gray-500 text-sm font-medium">Discount</span>
                    <span className="font-bold text-red-500">{discountLabel}</span>
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

          </div>

          {/* Right — CTA card */}
          <div className="lg:col-span-1">
            <div data-aos="fade-left" className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-5">
              <h3 className="text-xl font-black text-[#264787]">Interested?</h3>
              {offer.offer_value && (
                <div className="bg-[#264787]/5 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Tag size={16} className="text-[#264787] flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Offer Price</p>
                    <span className="text-[#264787] font-black text-lg">{offer.offer_value}</span>
                  </div>
                </div>
              )}
              {discountLabel && (
                <div className="bg-red-50 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Percent size={16} className="text-red-500 flex-shrink-0" />
                  <span className="text-red-500 font-bold text-sm">{discountLabel}</span>
                </div>
              )}
              <p className="text-gray-500 text-sm">Fill in your details and our team will get back to you shortly.</p>
              <button
                onClick={handleRegister}
                className="w-full bg-[#264787] hover:bg-[#3B85C1] text-white font-black py-4 rounded-xl transition text-base"
              >
                Register Now
              </button>
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
