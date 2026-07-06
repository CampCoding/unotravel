"use client";
import AboutBanners from "@/components/pages/AboutPage/AboutBanners/AboutBanners";
import AboutContent from "@/components/pages/AboutPage/AboutContent/AboutContent";
import AboutStatistics from "@/components/pages/AboutPage/AboutStatistics/AboutStatistics";
import HomeApp from "@/components/pages/HomePage/HomeApp/HomeApp";
import HomePartners from "@/components/pages/HomePage/HomePartners/HomePartners";
import HomeSubscribe from "@/components/pages/HomePage/HomeSubscribe/HomeSubscribe";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAboutData } from "../../../lib/features/layoutSlice";

export default function Page() {
  const { about_data, selectedLanguage } = useSelector((state) => state?.layout);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetAboutData());
  }, []);

  const pageData = about_data?.data?.data;

  return (
    <div>
      <AboutBanners aboutSection={pageData?.aboutSection} />
      <AboutContent aboutSection={pageData?.aboutSection} langId={selectedLanguage} />
      <HomeApp data={pageData?.application?.data} langId={selectedLanguage} />
      <AboutStatistics />
      <HomeSubscribe data={pageData?.newsletter?.data} langId={selectedLanguage} />
      <HomePartners data={pageData?.whyChooseUs?.data} />
    </div>
  );
}
