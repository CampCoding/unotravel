"use client";
import React, { useState, useEffect } from "react";
import ComingSoon from "@/components/shared/ComingSoon/ComingSoon";
import { Car } from "lucide-react";

/* 
// --- Original Code ---
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import CarHero     from "@/components/pages/CarReservation/CarReservationSwiper/CarReservationSwiper";
import CarFeatures from "@/components/pages/CarReservation/CarFeatures/CarFeatures";
import CarFleet    from "@/components/pages/CarReservation/CarReservationData/CarReservationData";
import CarHowItWorks from "@/components/pages/CarReservation/CarHowItWorks/CarHowItWorks";

export default function OriginalPage() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    _get(apiRoutes.car_reservation_page)
      .then(res => setPageData(res.data?.data ?? null))
      .catch(() => {});
  }, []);

  return (
    <div className="bg-gray-50">
      <CarHero     banners={pageData?.banners} hero={pageData?.hero} stats={pageData?.stats} />
      <CarFeatures features={pageData?.features} />
      <CarFleet    cars={pageData?.cars} />
      <CarHowItWorks howItWorks={pageData?.howItWorks} />
    </div>
  );
}
*/

export default function Page() {
  return (
    <ComingSoon
      title="Rent a Car"
      subtitle="Our premium car rental fleet and booking system will be available soon with seamless pickup and dropoff options!"
      icon={Car}
      badgeText="Coming Soon"
    />
  );
}
