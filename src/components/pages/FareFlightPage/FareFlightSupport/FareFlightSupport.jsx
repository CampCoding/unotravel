"use client";
import React from "react";

const supportItems = [
  {
    id: "01",
    title: "Travel requirements for Dubai",
    description:
      "Mamondo is by far one of the best travel websites for sourcing travel deals.",
  },
  {
    id: "02",
    title: "Multi-risk travel insurance",
    description:
      "Protect your trip with flexible coverage for delays, cancellations and emergencies.",
  },
  {
    id: "03",
    title: "Travel requirements by destination",
    description:
      "Check rules and documents needed for each country before you start your journey.",
  },
];

export default function FareFlightSupport() {
  return (
    <section
      data-aos="fade-up"
      data-aos-duration="900"
      className="mt-12 md:mt-16"
    >
      {/* Heading */}
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-2 mb-10">
        <p className="text-[11px] md:text-xs font-semibold tracking-[0.28em] text-slate-500 uppercase">
          TRAVEL SUPPORT
        </p>

        <h2
          className="
            text-3xl md:text-5xl lg:text-[3.3rem]
            font-bold 
            text-slate-900!
            leading-tight md:leading-[1.1]
          "
        >
          Plan your travel with confidence
        </h2>

        <p className="text-sm md:text-base tracking-wide text-slate-500">
          Find help with your bookings and travel plans, and see what to expect
          along your journey.
        </p>
      </div>

      {/* Content */}
      <div 
      
      className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: bullets */}
        <div 
        data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine"
        className="space-y-6">
          {supportItems.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-1.5">
              {/* Number pill */}
              <div className="pt-1">
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--main-dark-color), var(--main-light-color))",
                  }}
                >
                  {item.id}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm md:text-[15px] leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: image cluster (your PNG) */}
        <div 
        data-aos="fade-left"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine"
        className="flex justify-center lg:justify-end">
          <img
            src="/images/Screenshot__434_-removebg-preview.png"
            alt="Travel support illustration"
            className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
