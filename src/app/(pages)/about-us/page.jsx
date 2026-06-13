"use client";
import AboutBanners from '@/components/pages/AboutPage/AboutBanners/AboutBanners';
import AboutContent from '@/components/pages/AboutPage/AboutContent/AboutContent';
import AboutStatistics from '@/components/pages/AboutPage/AboutStatistics/AboutStatistics';
import HomeApp from '@/components/pages/HomePage/HomeApp/HomeApp';
import HomePartners from '@/components/pages/HomePage/HomePartners/HomePartners';
import HomeSubscribe from '@/components/pages/HomePage/HomeSubscribe/HomeSubscribe';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleGetHomeData, handleGetLayoutData } from '../../../lib/features/layoutSlice';

export default function Page() {
  const {
    home_loading,
    home_data,
    selectedLanguage,
    layout_loading,
    layout_data,
  } = useSelector((state) => state?.layout);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetHomeData());
    dispatch(handleGetLayoutData());
  }, []);

  return (
    <div>
      <AboutBanners />
      <AboutContent />
      <HomeApp />
      <AboutStatistics />
      <HomeSubscribe />
      <HomePartners data={home_data?.data?.data?.brands} />
    </div>
  )
}
