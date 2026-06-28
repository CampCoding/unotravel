"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { _post } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";

/**
 * Fire-and-forget service visit tracker.
 * Call at the top of any service page to record user interest.
 *
 * @param {string} serviceType  one of: tour | umrah | offer | visa | payment | car
 * @param {string} [serviceSlug] optional slug for finer granularity
 */
export function useServiceTracker(serviceType, serviceSlug = null) {
  const { token } = useSelector((s) => s.auth ?? {});

  useEffect(() => {
    if (!token || !serviceType) return;
    _post(apiRoutes.user_track_service, { service_type: serviceType, service_slug: serviceSlug })
      .catch(() => {});
  }, [token, serviceType, serviceSlug]);
}
