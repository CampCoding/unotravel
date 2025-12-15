"use client";

import React, { useMemo, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Users,
  PlaneTakeoff,
  ChevronDown,
} from "lucide-react";

export default function FlightSearchHeader({
  defaultValues,
  onSearch,
  className = "",
  sticky = true,
}) {
  const initial = useMemo(
    () => ({
      tripType: "return",
      from: "Stockholm, Sweden",
      to: "Dubai International Airport (DXB)",
      departDate: "2024-08-23",
      returnDate: "2024-08-30",
      passengers: 1,
      cabin: "economy",
      airline: "",
      flex3days: false,
      directOnly: false,
      _optsOpen: true, // ✅ خليها ظاهرة افتراضيًا زي الصورة
      ...defaultValues,
    }),
    [defaultValues]
  );

  const [v, setV] = useState(initial);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(v);
  };

  const TripPill = ({ id, label }) => {
    const active = v.tripType === id;
    return (
      <button
        type="button"
        onClick={() => setV((s) => ({ ...s, tripType: id }))}
        className={[
          "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition w-full justify-center",
          active
            ? "text-white bg-white/15 ring-1 ring-white/25"
            : "text-white/80 hover:text-white hover:bg-white/10",
        ].join(" ")}
        aria-pressed={active}
      >
        <span
          className={[
            "h-4 w-4 rounded-full border grid place-items-center",
            active ? "border-[#F4B400]" : "border-white/50",
          ].join(" ")}
        >
          {active ? (
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4B400]" />
          ) : null}
        </span>
        {label}
      </button>
    );
  };

  return (
    <div
      className={[sticky ? "sticky top-0 z-40" : "", "w-full", className].join(
        " "
      )}
    >
      <div className="w-full bg-[#3C4A63]">
       {/*  <div className="text-center pt-3">
          <p className="text-white text-3xl font-medium ">
            <span className="">Flight </span>
            <span className="">Search</span>
          </p>
        </div> */}
        <form onSubmit={submit} className="mx-auto max-w-6xl px-4 md:px-6 py-5">
          {/* Trip type */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <TripPill id="oneway" label="One Way" />
            <TripPill id="return" label="Return" />
            <TripPill id="multitrip" label="Multi Trip" />
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            <Field
              className="lg:col-span-3"
              label="Leaving From"
              icon={<MapPin className="h-4 w-4" />}
            >
              <input
                value={v.from}
                onChange={(e) => setV((s) => ({ ...s, from: e.target.value }))}
                className={inputCls}
                placeholder="City or airport"
              />
            </Field>

            <Field
              className="lg:col-span-3"
              label="Leaving To"
              icon={<MapPin className="h-4 w-4" />}
            >
              <input
                value={v.to}
                onChange={(e) => setV((s) => ({ ...s, to: e.target.value }))}
                className={inputCls}
                placeholder="City or airport"
              />
            </Field>

            <Field
              className="lg:col-span-3"
              label="Departing on"
              icon={<CalendarDays className="h-4 w-4" />}
            >
              {v.tripType === "oneway" ? (
                <input
                  type="date"
                  value={v.departDate}
                  onChange={(e) =>
                    setV((s) => ({ ...s, departDate: e.target.value }))
                  }
                  className={inputCls}
                />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={v.departDate}
                    onChange={(e) =>
                      setV((s) => ({ ...s, departDate: e.target.value }))
                    }
                    className={inputCls}
                    aria-label="Departure date"
                  />
                  <input
                    type="date"
                    value={v.returnDate}
                    onChange={(e) =>
                      setV((s) => ({ ...s, returnDate: e.target.value }))
                    }
                    className={inputCls}
                    aria-label="Return date"
                  />
                </div>
              )}
            </Field>

            <Field
              className="lg:col-span-3"
              label="Passenger"
              icon={<Users className="h-4 w-4" />}
            >
              <select
                value={v.passengers}
                onChange={(e) =>
                  setV((s) => ({ ...s, passengers: Number(e.target.value) }))
                }
                className={inputCls}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Passenger{i ? "s" : ""}
                  </option>
                ))}
              </select>
            </Field>

            {/* Less options */}
            <div className="lg:col-span-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-1">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
                onClick={() => setV((s) => ({ ...s, _optsOpen: !s._optsOpen }))}
              >
                {v._optsOpen ? "Less options" : "More options"}
                <ChevronDown
                  className={[
                    "h-4 w-4 transition",
                    v._optsOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {/* ✅ على الموبايل بتتفتح/تقفل - وعلى md+ دايمًا ظاهرة */}
              <div
                className={[
                  "flex flex-wrap items-center gap-5",
                  v._optsOpen ? "flex" : "hidden md:flex",
                ].join(" ")}
              >
                <Check
                  checked={v.flex3days}
                  onChange={() =>
                    setV((s) => ({ ...s, flex3days: !s.flex3days }))
                  }
                  label="+/- 3 Days"
                />
                <Check
                  checked={v.directOnly}
                  onChange={() =>
                    setV((s) => ({ ...s, directOnly: !s.directOnly }))
                  }
                  label="Direct Flight"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Cabin + Airline + Search (زي تظبيطتك) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
            <div>
              <div className="relative">
                <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <select
                  value={v.cabin}
                  onChange={(e) =>
                    setV((s) => ({ ...s, cabin: e.target.value }))
                  }
                  className={[inputCls, "pl-9"].join(" ")}
                >
                  <option value="economy">Economy</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First</option>
                </select>
              </div>
            </div>

            <div>
              <div className="relative">
                <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <select
                  value={v.airline}
                  onChange={(e) =>
                    setV((s) => ({ ...s, airline: e.target.value }))
                  }
                  className={[inputCls, "pl-9"].join(" ")}
                >
                  <option value="">Select Airline</option>
                  <option value="qatar">Qatar</option>
                  <option value="emirates">Emirates</option>
                  <option value="pegasus">Pegasus</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#5B90C8] hover:opacity-95 text-white font-semibold h-11 md:h-[52px] text-base md:text-lg shadow-sm"
              >
                Search For Flight
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

const inputCls =
  "w-full h-11 md:h-[52px] rounded-md bg-white border border-white/60 px-3 text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#69A7E3]";

function Field({ label, icon, children, className = "" }) {
  return (
    <div className={className}>
      <div className="text-white font-semibold text-sm mb-1">{label}</div>

      {/* ✅ أيقونة + input بدون padding wrapper غريب */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          {icon}
        </div>

        {/* هنا بندفع المحتوى يمين شوية */}
        <div className="pl-9">{children}</div>
      </div>
    </div>
  );
}

function Check({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-2 text-white/90 text-sm cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[#2F5F9A]"
      />
      {label}
    </label>
  );
}
