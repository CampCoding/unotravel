"use client";
import { useState } from "react";
import { _post } from "@/lib/shared/api";

/**
 * useVivaPayment — redirects user to Viva Smart Checkout
 *
 * Usage:
 *   const { startPayment, paying, payError } = useVivaPayment();
 *   await startPayment({ booking_type: "car_book", booking_id: 42, amount: 150.00, ... });
 */
export function useVivaPayment() {
  const [paying,   setPaying]   = useState(false);
  const [payError, setPayError] = useState("");

  const startPayment = async ({ booking_type, booking_id, amount, currency = "EUR", description, email, full_name, phone }) => {
    if (!booking_type || !booking_id || !amount) {
      setPayError("Missing payment parameters.");
      return;
    }
    setPayError("");
    setPaying(true);
    try {
      const res = await _post("viva/create-order", {
        booking_type,
        booking_id,
        amount,
        currency,
        description,
        email,
        full_name,
        phone,
      });

      const { checkoutUrl } = res?.data?.data ?? {};
      if (!checkoutUrl) throw new Error("No checkout URL returned");

      // Hard redirect to Viva Smart Checkout
      window.location.href = checkoutUrl;
    } catch (e) {
      setPayError(e?.response?.data?.message || e.message || "Payment initiation failed.");
      setPaying(false);
    }
  };

  return { startPayment, paying, payError };
}
