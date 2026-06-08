import VisaBanner from '@/components/pages/OurServices/Visa/VisaBanner/VisaBanner'
import VisaContent from '../../../../components/pages/OurServices/Visa/VisaContent/VisaContent'
import VisaServices from '../../../../components/pages/OurServices/Visa/VisaServices/VisaServices'
import TourFaq from '../../../../components/pages/ToursDetails/TourFaq/TourFaq'
import AboutStatistics from '../../../../components/pages/AboutPage/AboutStatistics/AboutStatistics'
import HomeSubscribe from '../../../../components/pages/HomePage/HomeSubscribe/HomeSubscribe'
import HomePartners from '../../../../components/pages/HomePage/HomePartners/HomePartners'
import FAQ from '../../../../components/shared/FAQ/FAQ'

export default function page() {
  return (
    <div>
      <VisaBanner />
      <VisaContent />
      <VisaServices />
      <FAQ />
      <AboutStatistics />
      <HomeSubscribe />
      <HomePartners />
    </div>
  )
}
