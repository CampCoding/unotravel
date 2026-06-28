"use client";
import { useState, useEffect } from "react";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import CarHero     from "@/components/pages/CarReservation/CarReservationSwiper/CarReservationSwiper";
import CarFeatures from "@/components/pages/CarReservation/CarFeatures/CarFeatures";
import CarFleet    from "@/components/pages/CarReservation/CarReservationData/CarReservationData";
import CarHowItWorks from "@/components/pages/CarReservation/CarHowItWorks/CarHowItWorks";

export default function Page() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    _get(apiRoutes.car_reservation_page)
      .then(res => setPageData(res.data?.data ?? null))
      .catch(() => {});
  }, []);

  return (
    <div className="bg-gray-50">
      <CarHero     banners={pageData?.banners} />
      <CarFeatures features={pageData?.features} />
      <CarFleet    cars={pageData?.cars} />
      <CarHowItWorks howItWorks={pageData?.howItWorks} />
    </div>
  );
}
