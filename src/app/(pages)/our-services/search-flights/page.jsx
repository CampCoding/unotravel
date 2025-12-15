"use client";

import React, { useState } from "react";
import FlightResultCard from "./Components/FlightCard";
import { CircleX } from "lucide-react";
import FlightDetailsPage from "./Components/SearchHeader";
import FlightSearchHeader from "./Components/SearchHeader";

const flights = [
  {
    image: "/images/Airport Services.svg",
    title: "Cheapest",
    from: "Lahore",
    duration: "1h 30m",
  },
  {
    image: "/images/Airport Services.svg",
    title: "Fastest",
    from: "Lahore",
    duration: "1h 30m",
  },
  {
    image: "/images/Airport Services.svg",
    title: "best Buy",
    from: "6,384,00",
  },
  {
    image: "/images/Airport Services.svg",
    title: "Recommended",
    from: "6,384,00",
  },
];

const initialFilters = {
  stopsEnabled: true,
  stopsDeparture: { direct: false, one: false, two: false, twoPlus: false },
  stopsArrival: { direct: false, one: false, two: false, twoPlus: false },

  priceEnabled: true,
  priceMin: 9589,
  priceMax: 25540,
  priceFrom: 9589,
  priceTo: 25540,

  airlinesEnabled: true,
  airlines: [
    {
      id: "qatar",
      name: "Qatar",
      from: 9589,
      logo: "/images/Airport Services.svg",
    },
    {
      id: "pegasus",
      name: "Pegasus",
      from: 10077,
      logo: "/images/Airport Services.svg",
    },
  ],
  selectedAirlines: { qatar: false, pegasus: false },

  journeyTimeEnabled: true,
  journeyTime: { morning: false, afternoon: false },
  journeyTimeArrival: { morning: false, afternoon: false },
};

export default function FlightDetailsWeb() {
  const [filterOpen, setFilterOpen] = useState(false); // mobile
  const [filters, setFilters] = useState(initialFilters);

  const resetAll = () => setFilters(initialFilters);

  const toggleStop = (section, key) => {
    setFilters((s) => ({
      ...s,
      [section]: { ...s[section], [key]: !s[section][key] },
    }));
  };

  const toggleAirline = (id) => {
    setFilters((s) => ({
      ...s,
      selectedAirlines: {
        ...s.selectedAirlines,
        [id]: !s.selectedAirlines[id],
      },
    }));
  };

  const toggleJourney = (section, key) => {
    setFilters((s) => ({
      ...s,
      [section]: { ...s[section], [key]: !s[section][key] },
    }));
  };

  const setPriceFrom = (v) => {
    const val = Number(v);
    setFilters((s) => ({ ...s, priceFrom: Math.min(val, s.priceTo - 1) }));
  };

  const setPriceTo = (v) => {
    const val = Number(v);
    setFilters((s) => ({ ...s, priceTo: Math.max(val, s.priceFrom + 1) }));
  };

  return (
    <div className="min-h-screen">
      {/* ===== Mobile Drawer فقط ===== */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resetAll={resetAll}
        toggleStop={toggleStop}
        toggleAirline={toggleAirline}
        toggleJourney={toggleJourney}
        setPriceFrom={setPriceFrom}
        setPriceTo={setPriceTo}
      />

      {/* Top Header */}
      <header>
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="h-10 w-10 rounded-full hover:bg-white/10 grid place-items-center text-[#264787]"
              aria-label="Back"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="text-center">
              <h1 className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
                <span className="text-[#264787]">Flight </span>
                <span className="text-[#5796CC]">
                  <UnderlineTitle>Details</UnderlineTitle>
                </span>
              </h1>
            </div>

            {/* filter button mobile only */}
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="h-10 w-10 rounded-full hover:bg-white/10 grid place-items-center text-[#264787] lg:hidden"
              aria-label="Filter"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 5h16l-6 7v6l-4 2v-8L4 5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="hidden lg:block w-10" />
          </div>
        </div>
      </header>

      <div className="my-4">
        <FlightDetailsPage />
      </div>

      {/* ✅ هنا الصفحة نفسها بتسكرول (no overflow-hidden / no left scroll) */}
      <main className="mx-auto container px-3 md:px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* LEFT content (normal page scroll) */}
          <section className="min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {flights.map((flight) => (
                <div
                  key={flight.title}
                  className="bg-white text-[#264787] border border-white/60 rounded-2xl px-4 pt-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition"
                >
                  <div className="flex flex-col items-end justify-center">
                    <div>
                      <img src={flight.image} className="w-full my-1" alt="" />
                    </div>
                    <p className="text-[15px] font-semibold">{flight.title}</p>
                    <div className="flex justify-center text-[10px] font-light gap-2">
                      <span className="text-[#264787]/70 text-[10px]">
                        {flight.duration}
                      </span>
                      <p className="text-[#264787]/70">
                        from kr. :{flight.from}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full relative mt-10 bg-[url(/images/Banner.webp)] bg-cover bg-center h-[200px] md:h-[350px] rounded-lg">
              <div className="bg-black/50 absolute w-full h-full opacity-40 inset-0"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 py-6">
              <FlightResultCard />
              <FlightResultCard
                refundable={false}
                refundableType="Non Refundable"
              />
              <FlightResultCard />
              <FlightResultCard
                refundable={false}
                refundableType="Non Refundable"
              />
              <FlightResultCard />
              <FlightResultCard
                refundable={false}
                refundableType="Non Refundable"
              />
            </div>
          </section>

          {/* ✅ RIGHT sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 self-start">
              {/* لو طويل: خلي اسكرول داخلي */}
              <div className=" overflow-y-auto">
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  resetAll={resetAll}
                  toggleStop={toggleStop}
                  toggleAirline={toggleAirline}
                  toggleJourney={toggleJourney}
                  setPriceFrom={setPriceFrom}
                  setPriceTo={setPriceTo}
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ---------------- Title underline ---------------- */
function UnderlineTitle({ children }) {
  return (
    <span className="relative inline-block">
      <span className="text-[#69A7E3] font-semibold">{children}</span>
      <svg
        className="absolute -left-1 rotate-180 -bottom-3 w-full h-3"
        viewBox="0 0 220 30"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M5 20 C 55 30, 165 30, 214 20"
          stroke="#69A7E3"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* ---------------- Desktop Panel ---------------- */
function FilterPanel(props) {
  return (
    <aside className="bg-white border border-slate-200 shadow-sm">
      <FilterInner {...props} showClose={false} />
    </aside>
  );
}

/* ---------------- Mobile Drawer ---------------- */
function FilterDrawer({ open, onClose, ...rest }) {
  return (
    <>
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed top-0 right-0 z-50 h-screen w-[320px] bg-white border-l border-slate-200 shadow-xl transition-transform lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="h-full overflow-y-auto">
          <FilterInner {...rest} showClose onClose={onClose} />
        </div>
      </aside>
    </>
  );
}

/* ---------------- Shared Sidebar Content ---------------- */
function FilterInner({
  filters,
  setFilters,
  resetAll,
  toggleStop,
  toggleAirline,
  toggleJourney,
  setPriceFrom,
  setPriceTo,
  showClose,
  onClose,
}) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">
          Filter your results
        </h3>

        {showClose ? (
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 grid place-items-center rounded bg-red-600"
          >
            <CircleX className="text-white" />
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      <div className="px-4 pt-3">
        <button
          type="button"
          onClick={resetAll}
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-sm hover:opacity-90"
        >
          RESET ALL
        </button>
      </div>

      <div className="px-4 py-4 space-y-3">
        <SectionHeader
          label="Stops"
          enabled={filters.stopsEnabled}
          onToggle={() =>
            setFilters((s) => ({ ...s, stopsEnabled: !s.stopsEnabled }))
          }
        />

        {filters.stopsEnabled && (
          <>
            <div className="bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
              Departure
            </div>
            <div className="px-3 py-3 flex flex-col space-y-2">
              <CheckRow
                label="Direct"
                checked={filters.stopsDeparture.direct}
                onChange={() => toggleStop("stopsDeparture", "direct")}
              />
              <CheckRow
                label="1 Stop"
                checked={filters.stopsDeparture.one}
                onChange={() => toggleStop("stopsDeparture", "one")}
              />
              <CheckRow
                label="2 stops"
                checked={filters.stopsDeparture.two}
                onChange={() => toggleStop("stopsDeparture", "two")}
              />
              <CheckRow
                label="2+ stops"
                checked={filters.stopsDeparture.twoPlus}
                onChange={() => toggleStop("stopsDeparture", "twoPlus")}
              />
            </div>

            <div className="bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 border-t border-slate-200">
              Arrival
            </div>
            <div className="px-3 py-3 flex flex-col space-y-2">
              <CheckRow
                label="Direct"
                checked={filters.stopsArrival.direct}
                onChange={() => toggleStop("stopsArrival", "direct")}
              />
              <CheckRow
                label="1 Stop"
                checked={filters.stopsArrival.one}
                onChange={() => toggleStop("stopsArrival", "one")}
              />
              <CheckRow
                label="2 stops"
                checked={filters.stopsArrival.two}
                onChange={() => toggleStop("stopsArrival", "two")}
              />
              <CheckRow
                label="2+ stops"
                checked={filters.stopsArrival.twoPlus}
                onChange={() => toggleStop("stopsArrival", "twoPlus")}
              />
            </div>
          </>
        )}

        <SectionHeader
          label="SEK Price"
          enabled={filters.priceEnabled}
          onToggle={() =>
            setFilters((s) => ({ ...s, priceEnabled: !s.priceEnabled }))
          }
        />

        {filters.priceEnabled && (
          <div className="pt-1">
            <div className="flex items-center justify-between text-[#2F5F9A] font-semibold text-sm mb-2">
              <span>{formatSEK(filters.priceFrom)}</span>
              <span>{formatSEK(filters.priceTo)}</span>
            </div>
            <div className="relative h-8">
              <input
                type="range"
                min={filters.priceMin}
                max={filters.priceMax}
                value={filters.priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className="absolute inset-0 w-full accent-[#2F5F9A]"
              />
              <input
                type="range"
                min={filters.priceMin}
                max={filters.priceMax}
                value={filters.priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                className="absolute inset-0 w-full accent-[#2F5F9A]"
              />
            </div>
          </div>
        )}

        <SectionHeader
          label="Airlines"
          enabled={filters.airlinesEnabled}
          onToggle={() =>
            setFilters((s) => ({ ...s, airlinesEnabled: !s.airlinesEnabled }))
          }
        />

        {filters.airlinesEnabled && (
          <div className="space-y-3">
            {filters.airlines.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!filters.selectedAirlines[a.id]}
                    onChange={() => toggleAirline(a.id)}
                    className="h-4 w-4 accent-[#2F5F9A]"
                  />
                  <img
                    src={a.logo}
                    alt={a.name}
                    className="h-5 w-5 object-contain"
                  />
                  <span className="text-sm text-slate-700">{a.name}</span>
                </div>
                <span className="text-xs text-slate-500 font-semibold">
                  From {formatSEK(a.from)} kr
                </span>
              </div>
            ))}
          </div>
        )}

        <SectionHeader
          label="Journey Time"
          enabled={filters.journeyTimeEnabled}
          onToggle={() =>
            setFilters((s) => ({
              ...s,
              journeyTimeEnabled: !s.journeyTimeEnabled,
            }))
          }
        />

        {filters.journeyTimeEnabled && (
          <>
            <div className="bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
              Departure Show Flights Between
            </div>
            <div className="px-3 py-3 flex flex-col space-y-2">
              <CheckRow
                label={
                  <span className="text-black">
                    <span className="text-[10px] text-[#264787]">Morning</span>{" "}
                    00:00 to 11:59
                  </span>
                }
                checked={filters.journeyTime.morning}
                onChange={() => toggleJourney("journeyTime", "morning")}
              />
              <CheckRow
                label={
                  <span className="text-black">
                    <span className="text-[10px] text-[#264787]">
                      Afternoon
                    </span>{" "}
                    12:00 to 23:59
                  </span>
                }
                checked={filters.journeyTime.afternoon}
                onChange={() => toggleJourney("journeyTime", "afternoon")}
              />
            </div>

            <div className="bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 border-t border-slate-200">
              Arrival Show Flights Between
            </div>
            <div className="px-3 py-3 flex flex-col space-y-2">
              <CheckRow
                label={
                  <span className="text-black">
                    <span className="text-[10px] text-[#264787]">Morning</span>{" "}
                    00:00 to 11:59
                  </span>
                }
                checked={filters.journeyTimeArrival.morning}
                onChange={() => toggleJourney("journeyTimeArrival", "morning")}
              />
              <CheckRow
                label={
                  <span className="text-black">
                    <span className="text-[10px] text-[#264787]">
                      Afternoon
                    </span>{" "}
                    12:00 to 23:59
                  </span>
                }
                checked={filters.journeyTimeArrival.afternoon}
                onChange={() =>
                  toggleJourney("journeyTimeArrival", "afternoon")
                }
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

function SectionHeader({ label, enabled, onToggle }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        className="h-5 w-5 rounded-sm border border-slate-300 grid place-items-center bg-slate-100"
        aria-label={`toggle ${label}`}
      >
        {enabled ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="#2F5F9A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </button>
      <span className="font-semibold text-slate-800">{label}</span>
    </div>
  );
}

function CheckRow({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 me-2 accent-[#2F5F9A]"
      />
      {label}
    </label>
  );
}

function formatSEK(n) {
  try {
    return new Intl.NumberFormat("sv-SE").format(Number(n));
  } catch {
    return String(n);
  }
}
