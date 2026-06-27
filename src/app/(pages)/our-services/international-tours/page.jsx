"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";

import IntlToursBanner       from "@/components/pages/IntlTours/IntlToursBanner/IntlToursBanner";
import IntlToursIntro        from "@/components/pages/IntlTours/IntlToursIntro/IntlToursIntro";
import IntlToursFeatures     from "@/components/pages/IntlTours/IntlToursFeatures/IntlToursFeatures";
import IntlToursDestinations from "@/components/pages/IntlTours/IntlToursDestinations/IntlToursDestinations";
import IntlToursPopularTours from "@/components/pages/IntlTours/IntlToursPopularTours/IntlToursPopularTours";
import IntlToursFAQ          from "@/components/pages/IntlTours/IntlToursFAQ/IntlToursFAQ";
import AboutStatistics       from "@/components/pages/AboutPage/AboutStatistics/AboutStatistics";
import HomeSubscribe         from "@/components/pages/HomePage/HomeSubscribe/HomeSubscribe";
import HomePartners          from "@/components/pages/HomePage/HomePartners/HomePartners";

export default function Page() {
  const { selectedLanguage } = useSelector((s) => s.layout);
  const [data, setData] = useState(null);

  useEffect(() => {
    _get(apiRoutes.intl_tours_page)
      .then((res) => setData(res.data?.data ?? null))
      .catch(() => {});
  }, []);

  const banners      = data?.banners      ?? [];
  const features     = data?.features     ?? [];
  const sections     = data?.sections     ?? [];
  const destinations = data?.destinations ?? [];
  const tours        = data?.tours        ?? [];

  const introSection = sections.find((s) => s.section_key === "intro");
  const faqSections  = sections
    .filter((s) => s.section_key?.startsWith("faq_"))
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div>
      <IntlToursBanner       banners={banners} />
      <IntlToursIntro        section={introSection} langId={selectedLanguage} />
      <IntlToursFeatures     features={features}    langId={selectedLanguage} />
      <IntlToursDestinations destinations={destinations} langId={selectedLanguage} />
      <IntlToursPopularTours tours={tours}          langId={selectedLanguage} />
      <IntlToursFAQ          sections={faqSections} langId={selectedLanguage} />
      <AboutStatistics />
      <HomeSubscribe />
      <HomePartners />
    </div>
  );
}
