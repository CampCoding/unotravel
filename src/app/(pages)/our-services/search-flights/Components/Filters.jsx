export function filterFlights(flights, filters) {
  const {
    stopsEnabled,
    stopsDeparture,
    stopsArrival,

    priceEnabled,
    priceFrom,
    priceTo,

    airlinesEnabled,
    selectedAirlines,

    journeyTimeEnabled,
    journeyTime,
    journeyTimeArrival,
  } = filters;
  
  

  const anyStopSelected = (obj) => Object.values(obj || {}).some(Boolean);

  const isStopAllowed = (stopObj, bucket) => {
    if (!stopObj) return true;
    if (!anyStopSelected(stopObj)) return true; // nothing selected => don't filter
    return !!stopObj[bucket];
  };

  const anyAirlineSelected =
    selectedAirlines && Object.values(selectedAirlines).some(Boolean);

  const anyJourneySelected = (obj) => Object.values(obj || {}).some(Boolean);

  return (flights || []).filter((f) => {
    // -------- stops (departure/arrival) --------
    if (stopsEnabled) {
      const stops = getStopsCount(f);
      const bucket = stopsBucket(stops);

      // في الداتا الحالية عندك "رحلة واحدة" بس (مش round trip)
      // فهنطبق نفس bucket على departure & arrival filters لو الاتنين شغالين
      if (!isStopAllowed(stopsDeparture, bucket)) return false;
      if (!isStopAllowed(stopsArrival, bucket)) return false;
    }

    // -------- price --------
    if (priceEnabled) {
      const p = parsePriceToNumber(f.price);
      if (!Number.isFinite(p)) return false; // أو خليها true لو عايز تتجاهل
      if (Number.isFinite(priceFrom) && p < priceFrom) return false;
      if (Number.isFinite(priceTo) && p > priceTo) return false;
    }

    // -------- airlines --------
    if (airlinesEnabled && anyAirlineSelected) {
      const id = resolveAirlineId(f);
      if (!id) return false;
      if (!selectedAirlines[id]) return false;
    }

    // -------- journey time (departure/arrival) --------
    if (journeyTimeEnabled) {
      // departure time = flight1.time
      if (journeyTime && anyJourneySelected(journeyTime)) {
        const depBucket = timeBucket(f?.flight1?.time);
        if (!depBucket) return false;
        if (!journeyTime[depBucket]) return false;
      }

      // arrival time = last segment timeTo (flight2.timeTo else flight1.timeTo)
      if (journeyTimeArrival && anyJourneySelected(journeyTimeArrival)) {
        const arrivalTime = f?.flight2?.timeTo || f?.flight1?.timeTo;
        const arrBucket = timeBucket(arrivalTime);
        if (!arrBucket) return false;
        if (!journeyTimeArrival[arrBucket]) return false;
      }
    }

    return true;
  });
}

// ---- price ----
export function parsePriceToNumber(priceStr) {
  if (typeof priceStr === "number") return priceStr;
  if (!priceStr) return NaN;

  // keep digits + separators
  const s = String(priceStr).replace(/[^\d.,]/g, "");

  // decide decimal separator by last occurrence
  const lastDot = s.lastIndexOf(".");
  const lastComma = s.lastIndexOf(",");
  let normalized = s;

  if (lastDot !== -1 && lastComma !== -1) {
    // both exist -> last one is decimal, other is thousands
    const decimalIsComma = lastComma > lastDot;
    normalized = decimalIsComma
      ? s.replace(/\./g, "").replace(",", ".")
      : s.replace(/,/g, "");
  } else if (lastComma !== -1) {
    // only comma -> treat as decimal if it looks like decimals, else thousands
    const parts = s.split(",");
    normalized =
      parts[parts.length - 1].length <= 2
        ? s.replace(",", ".")
        : s.replace(/,/g, "");
  } else {
    normalized = s; // only dots or digits
  }

  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

// ---- time helpers ("HH:MM") ----
export function timeToMinutes(t) {
  if (!t || typeof t !== "string") return NaN;
  const [hh, mm] = t.split(":").map(Number);
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return NaN;
  return hh * 60 + mm;
}

export function timeBucket(t) {
  const m = timeToMinutes(t);
  if (!Number.isFinite(m)) return null;
  // morning: 00:00 - 11:59, afternoon: 12:00 - 23:59
  return m < 12 * 60 ? "morning" : "afternoon";
}

// ---- stops ----
// supports either `segments` array OR your current (flight1, flight2)
export function getStopsCount(f) {
  if (Array.isArray(f.segments)) return Math.max(0, f.segments.length - 1);
  const segs = [f.flight1, f.flight2].filter(Boolean).length;
  return Math.max(0, segs - 1); // 1 seg => direct, 2 seg => 1 stop
}

export function stopsBucket(stopsCount) {
  if (stopsCount <= 0) return "direct";
  if (stopsCount === 1) return "one";
  if (stopsCount === 2) return "two";
  return "twoPlus";
}

// ---- airline ----
// لو الداتا فيها airlineId استخدمه. لو لأ، هنستنتج من prefix بتاع code.
export function resolveAirlineId(f) {
  if (f.airlineId) return f.airlineId;

  const code = f?.flight1?.code || "";
  const prefix = String(code).split("-")[0]?.toUpperCase();

  const map = {
    QR: "qatar",
    PC: "pegasus",
    TK: "turkish",
    EK: "emirates",
    SV: "saudia",
    BA: "british",
    AZ: "alitalia",
    TP: "tap",
    AT: "royalairmaroc",
    KU: "kuwaitairways",
    VY: "vueling",
  };

  return map[prefix] || null;
}
