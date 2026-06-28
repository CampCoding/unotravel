"use client";
import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

const STATIC_FEATURES = [
  { id: 1, icon: "ShieldCheck",   title: "Fully Insured",        description: "Every vehicle comes with comprehensive insurance — drive with complete peace of mind.", accent_color: "#3b85c1" },
  { id: 2, icon: "MapPin",        title: "GPS Navigation",        description: "Built-in GPS on all premium cars so you never worry about getting lost.",               accent_color: "#10b981" },
  { id: 3, icon: "Headphones",    title: "24/7 Support",          description: "Our team is available around the clock for assistance and roadside help.",              accent_color: "#8b5cf6" },
  { id: 4, icon: "BadgePercent",  title: "Best Price Guarantee",  description: "Market-best rates with zero hidden fees and no surprise charges at checkout.",          accent_color: "#f59e0b" },
];

function getIcon(name) {
  return LucideIcons[name] || LucideIcons.Star;
}

export default function CarFeatures({ features }) {
  const list = Array.isArray(features) && features.length > 0 ? features : STATIC_FEATURES;

  return (
    <section className="py-0 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5">

          {/* ── Left Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 bg-gradient-to-br from-[#1a3260] via-[#264787] to-[#3b85c1] px-8 py-14 lg:py-20 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/5 rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/5 rounded-full" />
            <div className="absolute top-1/2 right-0 w-32 h-32 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5">
                Drive with<br />
                <span className="text-[#7db8e8]">Confidence</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Everything you need for a smooth, worry-free car rental experience
                — from the moment you book to your final drop-off.
              </p>
            </div>

            <div className="relative z-10 mt-10 grid grid-cols-2 gap-4">
              {[
                { val: "500+", lbl: "Vehicles" },
                { val: "4.9★", lbl: "Avg Rating" },
                { val: "24/7", lbl: "Support" },
                { val: "100%", lbl: "Insured" },
              ].map((s) => (
                <div key={s.lbl} className="bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-white font-black text-lg">{s.val}</div>
                  <div className="text-white/50 text-[10px] uppercase tracking-wide">{s.lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-3 py-14 lg:py-20 px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100">
            {list.map((f, i) => {
              const IconComp = getIcon(f.icon);
              const accent   = f.accent_color || "#3b85c1";
              const num      = String(i + 1).padStart(2, "0");
              return (
                <motion.div
                  key={f.id ?? f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-white p-7 flex flex-col gap-4 hover:bg-gray-50 transition-colors duration-200 relative overflow-hidden"
                >
                  <span className="absolute top-3 right-4 text-5xl font-black text-gray-100 leading-none select-none group-hover:text-gray-50 transition-colors">
                    {num}
                  </span>

                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accent}18`, color: accent }}
                  >
                    <IconComp size={20} />
                  </div>

                  <div>
                    <h3 className="font-black text-gray-900 text-base mb-1.5">{f.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{f.description}</p>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-400"
                    style={{ backgroundColor: accent }}
                  />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
