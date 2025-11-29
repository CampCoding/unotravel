"use client";
import React from "react";

const benefits = [
  {
    id: 1,
    badge: "01",
    title: "Help through the airport",
    description:
      "Our team walks with your young traveler from check-in to boarding to make every step simple and calm.",
  },
  {
    id: 2,
    badge: "02",
    title: "Care on the flight",
    description:
      "Cabin crew keep an extra eye on them in the air so they stay comfortable, safe and entertained.",
  },
  {
    id: 3,
    badge: "03",
    title: "Priority boarding",
    description:
      "Families and young flyers board first, giving them more time to settle in and get comfortable.",
  },
  {
    id: 4,
    badge: "04",
    title: "Support when they land",
    description:
      "A dedicated team member meets them at arrival and stays until they are safely handed over.",
  },
];

export default function FareFlightUnaccompanied() {
  return (
    <section className="mt-20">
      <div className="mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] items-center">
          {/* Image side */}
          <div
            data-aos="fade-right"
            className="relative flex justify-center md:justify-start"
          >
            <div className="rounded-[140px] w-full overflow-hidden">
              <img
                src="/images/Screenshot__438_-removebg-preview.png"
                alt="Unaccompanied minors lounge"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Content side */}
          <div data-aos="fade-left" className="space-y-6">
            {/* Heading */}
            <div>
              {/* <p className="text-[11px] font-semibold tracking-[0.3em] text-slate-500 uppercase mb-2">
                FOR YOUNG TRAVELERS
              </p> */}
              <h2 className="text-3xl md:text-4xl lg:text-[60px]! !text-shadow-lg font-bold text-slate-900 leading-tight">
                <span className="block">Unaccompanied</span>
                <span className="block">Minors Lounge</span>
              </h2>
              {/* <p className="mt-3 text-sm md:text-base text-slate-500 max-w-xl">
                Extra comfort and support for children traveling alone – from
                the moment they arrive at the airport until they meet their
                family at the destination.
              </p> */}
            </div>

            {/* Benefits list */}
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item.id} className="flex gap-3">
                  {/* Number pill */}
                  <div className="mt-1">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--main-dark-color)] text-xs font-semibold text-white shadow-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
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
