import React from 'react'
import FareFlightBanner from '../../../components/pages/FareFlightPage/FareFlightBanner/FareFlightBanner'
import FareFlightPricing from '../../../components/pages/FareFlightPage/FareFlightPricing/FareFlightPricing'
import FareFlightSupport from '../../../components/pages/FareFlightPage/FareFlightSupport/FareFlightSupport'
import FareFlightFeatures from '../../../components/pages/FareFlightPage/FareFlightFeatures/FareFlightFeatures'
import FareFlightUnaccompained from '../../../components/pages/FareFlightPage/FareFlightUnaccompained/FareFlightUnaccompained'
import FlightFareBestTravels from '../../../components/pages/FareFlightPage/FlightFareBestTravels/FlightFareBestTravels'

export default function page() {
  return (
    <div className='overflow-hidden!'>
      <FareFlightBanner />
      <div className='container mt-7'>
      <FareFlightPricing />
      <FareFlightSupport />
      </div>
      <FareFlightFeatures />
      <div className='container'>
        <FareFlightUnaccompained />
        <FlightFareBestTravels />
      </div>
    </div>
  )
}
