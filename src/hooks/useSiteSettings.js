import { useEffect, useState } from "react";
import { _get } from "@/lib/shared/api";

let _cache = null;
const _listeners = new Set();

export function useSiteSettings() {
  const [settings, setSettings] = useState(_cache);
  const [loading, setLoading] = useState(!_cache);

  useEffect(() => {
    if (_cache) { setSettings(_cache); setLoading(false); return; }

    const listener = (data) => { setSettings(data); setLoading(false); };
    _listeners.add(listener);

    if (_listeners.size === 1) {
      _get("pages/site-settings")
        .then(res => {
          const data = res?.data?.data ?? { price_per_km: 0, pickup_base_fee: 0, currency: "SEK" };
          _cache = data;
          _listeners.forEach(fn => fn(data));
        })
        .catch(() => {
          const fallback = { price_per_km: 0, pickup_base_fee: 0, currency: "SEK" };
          _cache = fallback;
          _listeners.forEach(fn => fn(fallback));
        })
        .finally(() => _listeners.clear());
    }

    return () => _listeners.delete(listener);
  }, []);

  const calcTripPrice = (distanceKm) => {
    if (!settings) return 0;
    return parseFloat(settings.pickup_base_fee || 0) + distanceKm * parseFloat(settings.price_per_km || 0);
  };

  return {
    settings,
    loading,
    pricePerKm:    settings?.price_per_km    ?? 0,
    pickupBaseFee: settings?.pickup_base_fee ?? 0,
    currency:      settings?.currency        ?? "SEK",
    calcTripPrice,
  };
}
