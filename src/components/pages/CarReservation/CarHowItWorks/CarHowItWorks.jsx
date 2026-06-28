"use client";
import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

const STATIC_STEPS = [
  { id: 1, step_number: 1, icon: "Search",      title: "Choose a Vehicle", description: "Browse our premium fleet and pick the car that perfectly suits your needs and budget." },
  { id: 2, step_number: 2, icon: "CalendarDays", title: "Select Your Dates", description: "Choose your rental period and set your pickup and drop-off locations with ease." },
  { id: 3, step_number: 3, icon: "Car",          title: "Drive Away",        description: "Complete the booking in minutes and get ready to hit the road in your chosen vehicle." },
];

function getIcon(name) {
  return LucideIcons[name] || LucideIcons.ChevronRight;
}

export default function CarHowItWorks({ howItWorks }) {
  const steps = Array.isArray(howItWorks) && howItWorks.length > 0 ? howItWorks : STATIC_STEPS;

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-br from-[#1a3260] via-[#264787] to-[#3b85c1] overflow-hidden">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">How It Works</h2>
          <p className="text-white/60 mt-3 max-w-md mx-auto text-sm leading-relaxed">
            Book your rental car in just {steps.length} easy steps and be on your way in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px bg-gradient-to-r from-white/20 to-white/20" />

          {steps.map((step, i) => {
            const IconComp = getIcon(step.icon);
            return (
              <motion.div
                key={step.id ?? step.step_number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                    <IconComp size={30} className="text-white" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-7 h-7 bg-white text-[#264787] rounded-full text-xs font-black flex items-center justify-center shadow-lg">
                    {step.step_number ?? i + 1}
                  </span>
                </div>
                <h3 className="font-black text-white text-lg mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-3.5 bg-white text-[#264787] font-black text-sm rounded-xl shadow-xl shadow-black/20 hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Browse Our Fleet →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
