"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetFareFlightData } from "../../../lib/features/layoutSlice";
import FareFlightBanner from "../../../components/pages/FareFlightPage/FareFlightBanner/FareFlightBanner";
import FareFlightPricing from "../../../components/pages/FareFlightPage/FareFlightPricing/FareFlightPricing";
import FareFlightSupport from "../../../components/pages/FareFlightPage/FareFlightSupport/FareFlightSupport";
import FareFlightFeatures from "../../../components/pages/FareFlightPage/FareFlightFeatures/FareFlightFeatures";
import FareFlightUnaccompained from "../../../components/pages/FareFlightPage/FareFlightUnaccompained/FareFlightUnaccompained";
import FlightFareBestTravels from "../../../components/pages/FareFlightPage/FlightFareBestTravels/FlightFareBestTravels";

export default function Page() {
  const dispatch = useDispatch();
  const { fare_flight_data, selectedLanguage } = useSelector((state) => state?.layout);

  useEffect(() => {
    dispatch(handleGetFareFlightData());
  }, []);

  const pageData = fare_flight_data?.data?.data;

  return (
    <div className="overflow-hidden!">
      <FareFlightBanner banners={pageData?.heroBanners} />
      <div className="container mt-7">
        <FareFlightPricing />
        <FareFlightSupport
          data={pageData?.travelSupport?.data}
          sectionName={pageData?.travelSupport?.sectionName}
          langId={selectedLanguage}
        />
      </div>
      <FareFlightFeatures
        data={pageData?.features?.data}
        sectionName={pageData?.features?.sectionName}
        langId={selectedLanguage}
      />
      <div className="container">
        <FareFlightUnaccompained
          data={pageData?.minorsLounge?.data}
          sectionName={pageData?.minorsLounge?.sectionName}
          langId={selectedLanguage}
        />
        <FlightFareBestTravels
          data={pageData?.bestTravelers?.data}
          sectionName={pageData?.bestTravelers?.sectionName}
          langId={selectedLanguage}
        />
      </div>
    </div>
  );
}
