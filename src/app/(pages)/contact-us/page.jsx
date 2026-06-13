"use client"
import AboutStatistics from '@/components/pages/AboutPage/AboutStatistics/AboutStatistics'
import ContactUsContent from '@/components/pages/ContactPage/ContactUsContent/ContactUsContent'
import ContactUsForm from '@/components/pages/ContactPage/ContactUsForm/ContactUsForm'
import ContactUsMap from '@/components/pages/ContactPage/ContactUsMap/ContactUsMap'
import HomeChooseUs from '@/components/pages/HomePage/HomeBanner/HomeChooseUs/HomeChooseUs'
import HomePartners from '@/components/pages/HomePage/HomePartners/HomePartners'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetHomeData } from '../../../lib/features/layoutSlice'

export default function Page() {
  const {
      home_data,
  
    } = useSelector((state) => state?.layout);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(handleGetHomeData());
    }, []);
  return (
    <div className='overflow-x-hidden'>
      <ContactUsContent />
      <ContactUsMap />
      <HomeChooseUs banner={false}/>
      <ContactUsForm />
      <AboutStatistics />
      <HomePartners data={home_data?.data?.data?.brands}/>
    </div>
  )
}
