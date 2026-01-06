"use client";

import React, { useMemo, useState } from "react";
import { Radio, Checkbox, Select, Input, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import {
  MapPin,
  PlaneTakeoff,
  CalendarDays,
  Users,
  ChevronDown,
  Search,
} from "lucide-react";

const { RangePicker } = DatePicker;

export default function FlightFiltersAntd({
  setFilterOpen,
  defaultValues,
  onSearch,
  className = "",
}) {
  const initial = useMemo(
    () => ({
      tripType: "return",
      from: "Stockholm, Sweden",
      to: "Dubai International Airport (DXB)",
      departDate: dayjs("2024-08-23"),
      returnDate: dayjs("2024-08-30"),
      passengersLabel: "1 Passenger",
      cabin: "economy",
      airline: "",
      flex3days: false,
      directOnly: false,
      optsOpen: true,
      loading: false,
      ...defaultValues,
    }),
    [defaultValues]
  );

  const [v, setV] = useState(initial);

  async function submit(e) {
    e.preventDefault();
    try {
      setV((s) => ({ ...s, loading: true }));
      await onSearch?.({
        ...v,
        departDate: v.departDate?.format?.("YYYY-MM-DD") ?? v.departDate,
        returnDate: v.returnDate?.format?.("YYYY-MM-DD") ?? v.returnDate,
      });
    } finally {
      setV((s) => ({ ...s, loading: false }));
    }
  }

  return (
    <section
      className={["relative w-full overflow-hidden !px-0", className].join(" ")}
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(10,18,40,.65), rgba(10,18,40,.82)), url('/images/10117.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header>
        <div className=" container !px-0 py-6">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="h-10 w-10 !rounded-full transition-all hover:bg-white/10 grid place-items-center text-white"
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

            {/* filter button mobile only */}
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="h-10 w-10 rounded-full hover:bg-white/10 grid place-items-center text-white lg:hidden"
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
      <div className=" container !px-0  py-10">
        {/* Title */}
        <div className="inline-flex items-center rounded-xl bg-[#142b55]/90 px-6 py-2 shadow-lg ring-1 ring-white/10">
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-white
            drop-shadow-[0_0_8px_#22d3ee]
            drop-shadow-[0_0_22px_#22d3ee]"
          >
            Flights Details
          </h1>
        </div>

        <p className="mt-3 text-sm font-semibold text-white/90">
          Find and book flights to your favourite destinations in seconds.
        </p>

        {/* Modern Card */}
        <form
          onSubmit={submit}
          className="mt-6 rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl "
        >
          <div className="p-3 sm:p-5">
            {/* Row 1 */}
            <div className="flex flex-col  lg:flex-row lg:items-center lg:justify-between">
              {/* Trip radios */}
              <Radio.Group
                value={v.tripType}
                onChange={(e) =>
                  setV((s) => ({ ...s, tripType: e.target.value }))
                }
                className="flight-antd-radio !text-white"
              >
                <Radio value="oneway">One Way</Radio>
                <Radio value="return">Return</Radio>
                <Radio value="multitrip">Multi Trip</Radio>
              </Radio.Group>

              {/* Advanced + checks + selects */}
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex ms-2 justify-between items-center">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-slate-900"
                    onClick={() =>
                      setV((s) => ({ ...s, optsOpen: !s.optsOpen }))
                    }
                  >
                    Advanced
                    <ChevronDown
                      className={[
                        "h-4 w-4 transition",
                        v.optsOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  <div
                    className={`flex ${
                      v.optsOpen ? "opacity-100" : "opacity-0"
                    } flex-col gap-3 sm:flex-row`}
                  >
                    <Checkbox
                      checked={v.flex3days}
                      className="text-white"
                      onChange={(e) => {
                        console.log(e);

                        setV((s) => ({ ...s, flex3days: e.target.checked }));
                      }}
                    >
                      +/- 3 days
                    </Checkbox>
                    <Checkbox
                      checked={v.directOnly}
                      className="text-white"
                      onChange={(e) => {
                        console.log(e);

                        setV((s) => ({ ...s, directOnly: e.target.checked }));
                      }}
                    >
                      Direct Flights
                    </Checkbox>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <Select
                    value={v.cabin}
                    onChange={(val) => setV((s) => ({ ...s, cabin: val }))}
                    className="flight-antd-select sm:w-52"
                    options={[
                      { value: "economy", label: "Economy" },
                      { value: "premium", label: "Premium Economy" },
                      { value: "business", label: "Business" },
                      { value: "first", label: "First" },
                    ]}
                  />

                  <Select
                    value={v.airline}
                    onChange={(val) => setV((s) => ({ ...s, airline: val }))}
                    className="flight-antd-select sm:w-52"
                    placeholder="Select Airline"
                    options={[
                      { value: "", label: "Select Airline" },
                      { value: "qatar", label: "Qatar" },
                      { value: "emirates", label: "Emirates" },
                      { value: "pegasus", label: "Pegasus" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 h-px w-full bg-slate-200/70" />

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
              <Field
                label="Leaving From"
                icon={<MapPin className="h-4 w-4 " />}
                className="lg:col-span-3"
              >
                <Input
                  value={v.from}
                  onChange={(e) =>
                    setV((s) => ({ ...s, from: e.target.value }))
                  }
                  className="flight-antd-input"
                  placeholder="City or airport"
                />
              </Field>

              <Field
                label="Leaving To"
                icon={<MapPin className="h-4 w-4" />}
                className="lg:col-span-3"
              >
                <Input
                  value={v.to}
                  onChange={(e) => setV((s) => ({ ...s, to: e.target.value }))}
                  className="flight-antd-input"
                  placeholder="City or airport"
                />
              </Field>

              <Field
                label={
                  v.tripType === "oneway" ? "Departing on" : "Departing on"
                }
                icon={<CalendarDays className="h-4 w-4" />}
                className="lg:col-span-3"
              >
                <RangePicker
                  value={[v.departDate, v.returnDate]}
                  onChange={(vals) =>
                    setV((s) => ({
                      ...s,
                      departDate: vals?.[0] ?? s.departDate,
                      returnDate: vals?.[1] ?? s.returnDate,
                    }))
                  }
                  disabled={v.tripType === "oneway"}
                  className="flight-antd-range"
                  format="DD-MM-YYYY"
                  allowClear={false}
                />
              </Field>

              <Field
                label="Passenger"
                icon={<Users className="h-4 w-4" />}
                className="lg:col-span-3"
              >
                <Input
                  value={v.passengersLabel}
                  onChange={(e) =>
                    setV((s) => ({ ...s, passengersLabel: e.target.value }))
                  }
                  className="flight-antd-input"
                  placeholder="e.g. 1 Adult"
                />
              </Field>

              {/* CTA */}
              <div className="lg:col-span-12 pt-2">
                <Button
                  htmlType="submit"
                  loading={v.loading}
                  className="w-full !h-12 !rounded-full !bg-[#5B90C8] !border-none !text-white !font-extrabold hover:!opacity-95 !shadow-md"
                  icon={<Search className="h-4 w-4" />}
                >
                  Search For Flight
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

/* wrappers */
function Field({ label, icon, children, className = "" }) {
  return (
    <div className={className}>
      <div className="text-white/80  font-semibold text-sm mb-1">{label}</div>
      <div className="flex items-center justify-start gap-2">
        <div className="  text-white/80 pointer-events-none z-10">{icon}</div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
