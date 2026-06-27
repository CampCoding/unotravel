"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AboutStatistics from '@/components/pages/AboutPage/AboutStatistics/AboutStatistics'
import HomePartners from '@/components/pages/HomePage/HomePartners/HomePartners'
import HomeSubscribe from '@/components/pages/HomePage/HomeSubscribe/HomeSubscribe'
import UmraBanner from '@/components/pages/OurServices/Umra/UmraBanner/UmraBanner'
import UmraContent from '@/components/pages/OurServices/Umra/UmraContent/UmraContent'
import UmraPackages from '@/components/pages/OurServices/Umra/UmraPackages/UmraPackages'
import { _get } from '@/lib/shared/api';
import { apiRoutes } from '@/lib/shared/routes';
import UmrahFAQ from '@/components/pages/OurServices/Umra/UmrahFAQ/UmrahFAQ';

export default function Page() {
  const { selectedLanguage } = useSelector(s => s.layout);
  const [data, setData] = useState(null);

  useEffect(() => {
    _get(apiRoutes.umrah_page)
      .then(res => setData(res.data?.data ?? null))
      .catch(() => {});
  }, []);

  const banners  = data?.banners  ?? [];
  const packages = data?.packages ?? [];
  const sections = data?.sections ?? [];

  const contentSection = sections.find(s => s.section_key === 'content');
  const faqSections    = sections.filter(s => s.section_key?.startsWith('faq_')).sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div>
      <UmraBanner banners={banners} />
      <UmraContent section={contentSection} langId={selectedLanguage} />
      <UmraPackages packages={packages} langId={selectedLanguage} />
      <UmrahFAQ sections={faqSections} langId={selectedLanguage} />
      <AboutStatistics />
      <HomeSubscribe />
      <HomePartners />
    </div>
  );
}
