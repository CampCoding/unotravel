"use client";
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
import DraftModal from "@/components/shared/DraftModal/DraftModal";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import {
  handleGetHomeData,
  handleGetLayoutData,
} from "../lib/features/layoutSlice";

export default function Page() {
  const dispatch = useDispatch();
  const {
    home_loading,
    home_data,
    selectedLanguage,
    layout_loading,
    layout_data,
  } = useSelector((state) => state?.layout);
  const [offerLogo, setOfferLogo] = useState("");
  const [forcedHeroServiceId, setForcedHeroServiceId] = useState(null);
  const bannerRef = useRef(null);
  const searchParams = useSearchParams();

  const handleSelectHeroService = (service) => {
    setForcedHeroServiceId(service?.service_id ?? null);
    bannerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(handleGetHomeData());
    dispatch(handleGetLayoutData());
  }, []);

  // When navigated from header nav with ?service_id=X, select that service in the hero
  useEffect(() => {
    const sid = searchParams?.get("service_id");
    if (!sid) return;
    const heroServices = home_data?.data?.data?.heroServices ?? [];
    if (!heroServices.length) return;
    const match = heroServices.find((s) => String(s.service_id) === String(sid));
    if (match) {
      setForcedHeroServiceId(match.service_id);
      setTimeout(() => bannerRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, [searchParams, home_data]);

  console.log({
    home_loading,
    home_data,
    selectedLanguage,
    layout_loading,
    layout_data,
  });

  useEffect(() => {
    setOfferLogo(
      layout_data?.data?.data?.logos?.find((item) => item?.logo_id == 3)
        ?.image_url
    );
  }, [layout_data]);

  if (home_loading || layout_loading) {
    return null;
  }

  return (
    <div className="!overflow-x-hidden">
      <DraftModal />
      <div ref={bannerRef}>
        <HomeBanner
          hero_services={home_data?.data?.data?.heroServices}
          forcedServiceId={forcedHeroServiceId}
        />
      </div>
      <HomeServices
        data={home_data?.data?.data?.services}
        heroServices={home_data?.data?.data?.heroServices}
        onSelectHeroService={handleSelectHeroService}
      />
      <HomeSalesAgent data={home_data?.data?.data?.agents} />
      <HomeOffers logo={offerLogo} data={home_data?.data?.data?.offers} />
      <HomeChooseUs data={home_data?.data?.data?.whyChooseUs} />
      <HomeApp data={home_data?.data?.data?.application} />
      <HomeProjects data={home_data?.data?.data?.latestNews} />
      <HomeSubscribe data={home_data?.data?.data?.newsletter} />
      {/* <HomeTestimonial/> */}
      <HomeReels data={home_data?.data?.data?.reels} />
      <HomePartners data={home_data?.data?.data?.brands} />
    </div>
  );
}
