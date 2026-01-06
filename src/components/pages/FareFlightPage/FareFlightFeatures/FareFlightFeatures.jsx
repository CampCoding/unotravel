"use client";
import { Calendar, ClipboardList, PiggyBank } from "lucide-react";
import React from "react";
import Tilt from "react-parallax-tilt";

const features = [
  {
    id: 1,
    title: "Book & relax",
    description:
      "Turn travel ideas into plans in just a few steps – once it’s booked, all you have to do is enjoy.",
    icon: Calendar,
    circleBg: "bg-[var(--main-dark-color)]",
  },
  {
    id: 2,
    title: "Smart checklist",
    description:
      "Keep flights, documents and to-dos in one place so you never miss what matters before take-off.",
    icon: ClipboardList,
    circleBg: "bg-[var(--main-light-color)]",
  },
  {
    id: 3,
    title: "Save more",
    description:
      "Find great fares, hotel deals and bundles from trusted partners so your budget goes further.",
    icon: PiggyBank,
    circleBg: "bg-amber-400",
  },
];

export default function FareFlightFeatures() {
return (
    <section className="mt-16 bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div
          data-aos="fade-up"
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Travel to make memories
            <br />
            all around the world
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need for your next adventure in one place
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={item.id * 120}
                className="group"
              >
                <Tilt
                  glareEnable
                  glareMaxOpacity={0.2}
                  glareBorderRadius="32px"
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  className="relative bg-white h-[380px] rounded-[32px] p-8 flex flex-col justify-center items-center text-center shadow-xl shadow-slate-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/50 border border-slate-100 overflow-hidden"
                >
                  {/* Decorative gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Sparkles */}
                  <div className="absolute top-6 right-6 w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                  <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 animate-pulse" />
                  <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 delay-200 animate-pulse" />
                  <div className="absolute bottom-16 left-16 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 animate-pulse" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      className={`mb-6 mx-auto flex h-24 w-24 items-center justify-center rounded-full text-white shadow-lg ${item.circleBg} transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                    >
                      <Icon className="w-11 h-11" strokeWidth={2} />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-base leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
