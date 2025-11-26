import HomeApp from "@/components/pages/HomePage/HomeApp/HomeApp";
import HomeBanner from "@/components/pages/HomePage/HomeBanner/HomeBanner";
import HomeChooseUs from "@/components/pages/HomePage/HomeBanner/HomeChooseUs/HomeChooseUs";
import HomeOffers from "@/components/pages/HomePage/HomeOffers/HomeOffers";
import HomePartners from "@/components/pages/HomePage/HomePartners/HomePartners";
import HomeProjects from "@/components/pages/HomePage/HomeProjects/HomeProjects";
import HomeReels from "@/components/pages/HomePage/HomeReels/HomeReels";
import HomeSalesAgent from "@/components/pages/HomePage/HomeSalesAgent/HomeSalesAgent";
import HomeSubscribe from "@/components/pages/HomePage/HomeSubscribe/HomeSubscribe";
import HomeTestimonial from "@/components/pages/HomePage/HomeTestimonial/HomeTestimonial";
import HomeServices from "@/components/pages/HomePage/HomwServices/HomeServices";

export default function page() {
  return (
    <div className="!overflow-x-hidden">
  
      <HomeBanner />
      <HomeServices />
      <HomeSalesAgent />
      <HomeOffers />
      <HomeChooseUs />
      <HomeApp />
      <HomeProjects />
      <HomeSubscribe />
      {/* <HomeTestimonial/> */}
      <HomeReels />
      <HomePartners />
    </div>
  );
}
