"use client";
import AboutStatistics from "@/components/pages/AboutPage/AboutStatistics/AboutStatistics";
import ContactUsContent from "@/components/pages/ContactPage/ContactUsContent/ContactUsContent";
import ContactUsForm from "@/components/pages/ContactPage/ContactUsForm/ContactUsForm";
import ContactUsMap from "@/components/pages/ContactPage/ContactUsMap/ContactUsMap";
import HomeChooseUs from "@/components/pages/HomePage/HomeBanner/HomeChooseUs/HomeChooseUs";
import HomePartners from "@/components/pages/HomePage/HomePartners/HomePartners";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetContactData } from "../../../lib/features/layoutSlice";

export default function Page() {
  const { contact_data, selectedLanguage } = useSelector((state) => state?.layout);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetContactData());
  }, []);

  const pageData = contact_data?.data?.data;

  return (
    <div className="overflow-x-hidden">
      <ContactUsContent
        contactHero={pageData?.contactHero}
        visitUs={pageData?.visitUs}
        langId={selectedLanguage}
      />
      <ContactUsMap visitUs={pageData?.visitUs} langId={selectedLanguage} />
      <HomeChooseUs banner={false} data={pageData?.whyChooseUs?.data} langId={selectedLanguage} />
      <ContactUsForm data={pageData?.contactForm?.data} langId={selectedLanguage} />
      <AboutStatistics />
      <HomePartners data={pageData?.brands?.data} />
    </div>
  );
}
