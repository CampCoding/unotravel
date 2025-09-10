import AboutStatistics from '@/components/pages/AboutPage/AboutStatistics/AboutStatistics'
import HomePartners from '@/components/pages/HomePage/HomePartners/HomePartners'
import HomeSubscribe from '@/components/pages/HomePage/HomeSubscribe/HomeSubscribe'
import UmraBanner from '@/components/pages/OurServices/Umra/UmraBanner/UmraBanner'
import UmraContent from '@/components/pages/OurServices/Umra/UmraContent/UmraContent'
import UmraPackages from '@/components/pages/OurServices/Umra/UmraPackages/UmraPackages'
import TourFaq from '@/components/pages/ToursDetails/TourFaq/TourFaq'
import React from 'react'

export default function page() {
  return (
    <div>
        <UmraBanner />
        <UmraContent/> 
        <UmraPackages />
        <TourFaq />
        <AboutStatistics />
        <HomeSubscribe/>
        <HomePartners />
    </div>
  )
}
