"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetOurOffersData } from "../../../lib/features/layoutSlice";
import OurOfferBanner from "@/components/pages/OurOffers/OurOfferBanner/OurOfferBanner";
import OurOffersSection from "@/components/pages/OurOffers/OurOffersSection/OurOffersSection";
import OurOffersInternationalTours from "@/components/pages/OurOffers/OurOffersInternationalTours/OurOffersInternationalTours";
import AboutStatistics from "@/components/pages/AboutPage/AboutStatistics/AboutStatistics";
import HomePartners from "@/components/pages/HomePage/HomePartners/HomePartners";

export default function Page() {
  const dispatch = useDispatch();
  const { our_offers_data, selectedLanguage } = useSelector((state) => state?.layout);

  useEffect(() => {
    dispatch(handleGetOurOffersData());
  }, []);

  const pageData = our_offers_data?.data?.data;

  return (
    <div>
      <OurOfferBanner banners={pageData?.heroBanners} />
      <OurOffersSection data={pageData?.offers?.data} sectionName={pageData?.offers?.sectionName} langId={selectedLanguage} />
      <OurOffersInternationalTours data={pageData?.tourDestinations?.data} sectionName={pageData?.tourDestinations?.sectionName} langId={selectedLanguage} />
      <AboutStatistics />
      <HomePartners data={pageData?.brands?.data} />
    </div>
  );
}
