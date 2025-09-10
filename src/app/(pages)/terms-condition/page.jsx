import HomePartners from '@/components/pages/HomePage/HomePartners/HomePartners'
import HomeSubscribe from '@/components/pages/HomePage/HomeSubscribe/HomeSubscribe'
import TermsAndConditionBanner from '@/components/pages/TermsAndCondition/TermsAndConditionBanner/TermsAndConditionBanner'
import TermsAndConditionContent from '@/components/pages/TermsAndCondition/TermsAndConditionContent/TermsAndConditionContent'
import React from 'react'

export default function page() {
  return (
    <div>
      <TermsAndConditionBanner />
      <TermsAndConditionContent/>
      <HomeSubscribe />
      <HomePartners />
    </div>
  )
}
