"use client";
import React from "react";

const FALLBACK = [
  { id: 1, badge: "01", title: "Help through the airport", description: "Our team walks with your young traveler from check-in to boarding to make every step simple and calm." },
  { id: 2, badge: "02", title: "Care on the flight", description: "Cabin crew keep an extra eye on them in the air so they stay comfortable, safe and entertained." },
  { id: 3, badge: "03", title: "Priority boarding", description: "Families and young flyers board first, giving them more time to settle in and get comfortable." },
  { id: 4, badge: "04", title: "Support when they land", description: "A dedicated team member meets them at arrival and stays until they are safely handed over." },
];

const getTranslation = (item, langId) =>
  item?.translations?.find((t) => t.language_id === Number(langId)) ||
  item?.translations?.[0] || {};

export default function FareFlightUnaccompanied({ data, sectionName, langId }) {
  const mapped = data?.length
    ? data.map((item, i) => {
        const t = getTranslation(item, langId);
        return {
          id: item.item_id ?? i,
          badge: String(i + 1).padStart(2, "0"),
          title: t.title || item.title || "",
          description: t.description || item.description || "",
        };
      })
    : [];
  const hasContent = mapped.some((item) => item.title?.trim());
  const items = hasContent ? mapped : FALLBACK;

  const heading = (Array.isArray(sectionName) ? sectionName.find((t) => t.language_id === Number(langId))?.title : sectionName) ||
    "Unaccompanied Minors Lounge";

  return (
    <section className="mt-20">
      <div className="mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] items-center">
          <div data-aos="fade-right" className="relative flex justify-center md:justify-start">
            <div className="rounded-[140px] w-full overflow-hidden">
              <img src="/images/Untitled design - 2025-12-01T132222.842.png" alt="Unaccompanied minors lounge" className="h-full w-full object-cover" />
            </div>
          </div>
          <div data-aos="fade-left" className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-[60px]! !text-shadow-lg font-bold text-slate-900 leading-tight">
                {heading}
              </h2>
            </div>
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="mt-1">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--main-dark-color)] text-xs font-semibold text-white shadow-md">
                      {item.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs md:text-sm leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
