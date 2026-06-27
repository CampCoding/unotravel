import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React from "react";
import { MdVerified, MdFlightTakeoff, MdMap, MdPeople, MdAttachMoney, MdHeadsetMic, MdStar } from "react-icons/md";

const FALLBACK_FEATURES = [
  { IconComp: MdVerified,    color: "#264787", title: "Trusted Experts",    description: "Years of experience crafting world-class international itineraries." },
  { IconComp: MdFlightTakeoff, color: "#3B85C1", title: "Seamless Travel",  description: "Flights, hotels, and transfers arranged for a hassle-free journey." },
  { IconComp: MdMap,         color: "#E44C4A", title: "Unique Destinations", description: "Handpicked routes that take you beyond the tourist trail." },
  { IconComp: MdPeople,      color: "#264787", title: "Expert Guides",      description: "Local guides with deep knowledge of every destination." },
  { IconComp: MdAttachMoney, color: "#3B85C1", title: "Best Value",         description: "Competitive pricing with transparent, all-inclusive packages." },
  { IconComp: MdHeadsetMic,  color: "#E44C4A", title: "24/7 Support",       description: "Round-the-clock assistance wherever you are in the world." },
];

const getT = (feature, langId) =>
  feature?.translations?.find((t) => t.language_id === Number(langId)) ||
  feature?.translations?.[0] ||
  {};

export default function IntlToursFeatures({ features, langId }) {
  const items = features?.length
    ? features.map((f, i) => {
        const t = getT(f, langId);
        return {
          IconComp: FALLBACK_FEATURES[i % FALLBACK_FEATURES.length]?.IconComp ?? MdStar,
          color: f.color || "#264787",
          title: t.title || "",
          description: t.description || "",
        };
      })
    : FALLBACK_FEATURES;

  return (
    <div data-aos="fade-up" className="mt-20 container">
      <CustomHeading first_title="Why Choose " second_title="Uno Travel" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {items.map((item, i) => {
          const IC = item.IconComp;
          return (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={`${(i % 3) * 100}`}
              className="flex gap-4 p-6 rounded-2xl bg-white shadow-[0_2px_20px_rgba(38,71,135,0.08)] border border-[#EEF2FF] hover:shadow-[0_4px_30px_rgba(38,71,135,0.14)] transition-shadow"
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${item.color}18` }}
              >
                <IC size={24} style={{ color: item.color }} />
              </div>
              <div>
                <h3 className="font-bold text-[#16294F] text-[15px] mb-1">{item.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
