import HomePartners from '@/components/pages/HomePage/HomePartners/HomePartners'
import OurOfferBanner from '@/components/pages/OurOffers/OurOfferBanner/OurOfferBanner'
import OurOffersInternationalTours from '@/components/pages/OurOffers/OurOffersInternationalTours/OurOffersInternationalTours'
import OurOffersSection from '@/components/pages/OurOffers/OurOffersSection/OurOffersSection'
import AboutStatistics from '@/components/pages/AboutPage/AboutStatistics/AboutStatistics';
import React from 'react'

export default function Page() {
  return (
    <div>
      <OurOfferBanner />
      <OurOffersSection />
      <OurOffersInternationalTours />
      <AboutStatistics />
      <HomePartners/>
    </div>
  )
}
