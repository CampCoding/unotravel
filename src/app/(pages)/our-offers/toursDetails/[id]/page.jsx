import HomePartners from '@/components/pages/HomePage/HomePartners/HomePartners'
import TourFaq from '@/components/pages/ToursDetails/TourFaq/TourFaq'
import ToursContent from '@/components/pages/ToursDetails/ToursContent/ToursContent'
import ToursDetailsBanner from '@/components/pages/ToursDetails/ToursDetailsBanner/ToursDetailsBanner'
import React from 'react'

export default function Page() {
  return (
    <div className='!overflow-x-hidden'>
        <ToursDetailsBanner/>
        <ToursContent />
        <TourFaq/>
        <HomePartners />
    </div>
  )
}
