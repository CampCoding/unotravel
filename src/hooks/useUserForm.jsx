"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import { setAuthFromBooking } from "@/lib/features/authSlice";

/**
 * Hook for booking forms.
 * - Returns pre-filled values from the logged-in user profile.
 * - Fetches historical suggestions from the backend.
 * - Provides `handleBookingResponse(res)` to capture auto-registration tokens.
 *
 * Usage:
 *   const { prefill, suggestions, locked, handleBookingResponse } = useUserForm();
 *
 * `prefill.fullName`, `prefill.email`, `prefill.phone` — string or ""
 * `locked` — true when user is logged in (fields should be read-only)
 * `suggestions.fullName[]`, `suggestions.email[]`, `suggestions.phone[]`
 */
export function useUserForm() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((s) => s.auth ?? {});
  const isLoggedIn = !!(token && user?.id);

  const [suggestions, setSuggestions] = useState({ fullName: [], email: [], phone: [] });

  // Build prefill from user profile
  const prefill = {
    fullName: user ? [user.first_name, user.last_name].filter(Boolean).join(" ") : "",
    email:    user?.email    ?? "",
    phone:    user?.phone    ?? "",
    firstName: user?.first_name ?? "",
    lastName:  user?.last_name  ?? "",
  };

  // Fetch historical suggestions when logged in
  useEffect(() => {
    if (!isLoggedIn) return;
    _get(apiRoutes.user_suggestions)
      .then((res) => {
        const d = res?.data?.data;
        if (d) setSuggestions({ fullName: d.fullName ?? [], email: d.email ?? [], phone: d.phone ?? [] });
      })
      .catch(() => {});
  }, [isLoggedIn]);

  /**
   * Call this after a successful booking POST.
   * If the backend auto-registered the user, saves the token to Redux/localStorage.
   */
  const handleBookingResponse = (responseData) => {
    if (!responseData?.autoRegistered || !responseData?.accessToken) return;
    dispatch(setAuthFromBooking({
      token: responseData.accessToken,
      user: null, // will be fetched on next /auth/me call
    }));
  };

  return { prefill, suggestions, locked: isLoggedIn, handleBookingResponse, isLoggedIn };
}
