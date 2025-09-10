import AboutStatistics from '@/components/pages/AboutPage/AboutStatistics/AboutStatistics'
import ContactUsContent from '@/components/pages/ContactPage/ContactUsContent/ContactUsContent'
import ContactUsForm from '@/components/pages/ContactPage/ContactUsForm/ContactUsForm'
import ContactUsMap from '@/components/pages/ContactPage/ContactUsMap/ContactUsMap'
import HomeChooseUs from '@/components/pages/HomePage/HomeBanner/HomeChooseUs/HomeChooseUs'
import HomePartners from '@/components/pages/HomePage/HomePartners/HomePartners'
import React from 'react'

export default function page() {
  return (
    <div className='overflow-x-hidden'>
      <ContactUsContent />
      <ContactUsMap />
      <HomeChooseUs banner={false}/>
      <ContactUsForm />
      <AboutStatistics />
      <HomePartners />
    </div>
  )
}
