'use client';
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetHomeData, handleGetLayoutData } from "../lib/features/layoutSlice";

export default function page() {
  const dispatch = useDispatch();
  const {home_loading , home_data , selectedLanguage ,layout_loading ,layout_data} = useSelector(state => state?.layout);
  const [offerLogo , setOfferLogo]  = useState("");
  useEffect(() => {
    dispatch(handleGetHomeData())
    dispatch(handleGetLayoutData())
  } , [])

  useEffect(() => {
    setOfferLogo(layout_data?.data?.data?.logos?.find(item => item?.logo_id == 3)?.image_url)
  }, [layout_data])

  if(home_loading || layout_loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <img src="/images/milkyway-studio-rocket.gif" alt="loading gif" className="w-52 h-52"/> 
      </div>
    )
  }

  return (
    <div className="!overflow-x-hidden">
  
      <HomeBanner hero_services={home_data?.data?.data?.heroServices} />
      <HomeServices data={home_data?.data?.data?.services} />
      <HomeSalesAgent data={home_data?.data?.data?.agents}/>
      <HomeOffers logo={offerLogo} data={home_data?.data?.data?.offers}/>
      <HomeChooseUs data={home_data?.data?.data?.whyChooseUs}/>
      <HomeApp data={home_data?.data?.data?.application} />
      <HomeProjects data={home_data?.data?.data?.latestNews} />
      <HomeSubscribe data={home_data?.data?.data?.newsletter} />
      {/* <HomeTestimonial/> */}
      <HomeReels data={home_data?.data?.data?.reels} />
      <HomePartners data={home_data?.data?.data?.brands} />
    </div>
  );
}
