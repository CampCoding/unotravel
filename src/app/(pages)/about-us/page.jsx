"use client";
import AboutBanners from '@/components/pages/AboutPage/AboutBanners/AboutBanners';
import AboutContent from '@/components/pages/AboutPage/AboutContent/AboutContent';
import AboutStatistics from '@/components/pages/AboutPage/AboutStatistics/AboutStatistics';
import HomeApp from '@/components/pages/HomePage/HomeApp/HomeApp';
import HomePartners from '@/components/pages/HomePage/HomePartners/HomePartners';
import HomeSubscribe from '@/components/pages/HomePage/HomeSubscribe/HomeSubscribe';
import React from 'react'

export default function Page() {
  return (
    <div>
      <AboutBanners />
      <AboutContent />
      <HomeApp />
      <AboutStatistics />
      {/* <HomeSubscribe /> */}
      <HomePartners />
    </div>
  )
}
