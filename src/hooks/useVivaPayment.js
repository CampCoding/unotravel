"use client";
import { useState } from "react";
import { _post } from "@/lib/shared/api";

/**
 * useVivaPayment — sends booking data + amount to backend, gets Viva checkout URL
 *
 * The booking is saved in DB ONLY after Viva confirms payment.
 * No booking record exists if user cancels or payment fails.
 *
 * Usage:
 *   const { startPayment, paying, payError } = useVivaPayment();
 *   await startPayment({
 *     booking_type: "offer_register",
 *     amount: 150.00,
 *     currency: "EUR",
 *     description: "Offer Registration",
 *     booking_data: { offer_id, offer_name, full_name, phone, email, notes, ... }
 *   });
 */
export function useVivaPayment() {
  const [paying,   setPaying]   = useState(false);
  const [payError, setPayError] = useState("");

  const startPayment = async ({ booking_type, amount, currency = "EUR", description, booking_data }) => {
    if (!booking_type || !amount || !booking_data) {
      setPayError("Missing payment parameters.");
      return;
    }
    setPayError("");
    setPaying(true);
    try {
      const res = await _post("viva/initiate", {
        booking_type,
        amount,
        currency,
        description,
        booking_data,
      });

      const { checkoutUrl } = res?.data?.data ?? {};
      if (!checkoutUrl) throw new Error("No checkout URL returned");

      window.location.href = checkoutUrl;
    } catch (e) {
      setPayError(e?.response?.data?.message || e.message || "Payment initiation failed.");
      setPaying(false);
    }
  };

  return { startPayment, paying, payError };
}
