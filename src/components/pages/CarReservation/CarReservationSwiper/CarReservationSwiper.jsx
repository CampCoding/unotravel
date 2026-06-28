"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";

const STATIC_SLIDES = [
  { id: 1, image_url: "/images/Rent a car slider  (1).webp", title: "Rent Your Dream Car",    subtitle: "Premium vehicles at unbeatable prices." },
  { id: 2, image_url: "/images/Rent a car slider  (2).webp", title: "Drive in Style",          subtitle: "Well-maintained fleet with full insurance and 24/7 support." },
  { id: 3, image_url: "/images/Rent a car slider  (3).webp", title: "Freedom on Wheels",       subtitle: "Book in minutes, pick up your car and hit the road." },
];

const STATIC_HERO = {
  badge_text:         "Car Rental Service",
  title_line1:        "Rent Your",
  title_highlight:    "Dream Car",
  description:        "Premium vehicles, comprehensive insurance, and 24/7 support — everything you need for a perfect drive.",
  cta_primary_text:   "Browse Our Fleet",
  cta_secondary_text: "Call Us Now",
  cta_secondary_url:  "tel:+46",
};

const STATIC_STATS = [
  { id: 1, value: "500+", label: "Vehicles" },
  { id: 2, value: "24/7", label: "Support"  },
  { id: 3, value: "100%", label: "Insured"  },
  { id: 4, value: "4.9★", label: "Rating"   },
];

export default function CarHero({ banners, hero, stats }) {
  const slides     = Array.isArray(banners) && banners.length > 0 ? banners : STATIC_SLIDES;
  const h          = hero  ?? STATIC_HERO;
  const statsItems = Array.isArray(stats) && stats.length > 0 ? stats : STATIC_STATS;

  const handleScroll = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[88vh] min-h-[520px] overflow-hidden">
      {/* Background Swiper */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="absolute inset-0 w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id ?? i}>
            <img
              src={slide.image_url}
              alt={slide.title ?? "Banner"}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = "/images/bg2.webp"; }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
        <div className="max-w-2xl">
          {h.badge_text && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-semibold tracking-wider uppercase mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b85c1] animate-pulse" />
              {h.badge_text}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[68px] font-black text-white leading-[1.05] mb-5"
          >
            {h.title_line1 && <>{h.title_line1}<br /></>}
            {h.title_highlight && <span className="text-[#3b85c1]">{h.title_highlight}</span>}
          </motion.h1>

          {h.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/80 text-base sm:text-lg max-w-lg leading-relaxed mb-8"
            >
              {h.description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {h.cta_primary_text && (
              <button
                onClick={handleScroll}
                className="px-8 py-3 bg-[#264787] hover:bg-[#3b85c1] text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-xl shadow-[#264787]/40 hover:shadow-[#3b85c1]/40 hover:-translate-y-0.5"
              >
                {h.cta_primary_text}
              </button>
            )}
            {h.cta_secondary_text && (
              <a
                href={h.cta_secondary_url || "#"}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-all duration-300"
              >
                {h.cta_secondary_text}
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      {statsItems.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="bg-black/30 backdrop-blur-md border-t border-white/10">
            <div className="max-w-5xl mx-auto px-6 py-4 grid divide-x divide-white/15"
              style={{ gridTemplateColumns: `repeat(${statsItems.length}, 1fr)` }}>
              {statsItems.map((s) => (
                <div key={s.id} className="text-center px-4">
                  <div className="text-xl sm:text-2xl font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/55 mt-0.5 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
