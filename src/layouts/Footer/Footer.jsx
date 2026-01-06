"use client";
import {
  Facebook,
  FacebookIcon,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetLayoutData } from "../../lib/features/layoutSlice";

const services_data = [
  {
    id: 1,
    name: "Home",
    href:"/"
  },
  {
    id: 2,
    name: "Hotel",
  },
  {
    id: 3,
    name: "Book your airlines tickets",
  },
  {
    id: 4,
    name: "DUBAI",
  },
  {
    id: 5,
    name: "Low Fare Flight",
  },
  {
    id: 6,
    name: "About Us",
    href:"/about-us"
  },
  {
    id: 7,
    name: "Contact Us",
    href:"/contact-us"
  },
  {
    id: 8,
    name: "Travel terms",
  },
];

const services_data_2 = [
  {
    id: 1,
    name: "Privacy Policy",
  },
  {
    id: 2,
    name: "Term and conditions",
    href:"/terms-condition"
  },
  {
    id: 3,
    name: "Term of services",
  },
  {
    id: 4,
    name: "Term of use GDPR ",
  },
  {
    id: 5,
    name: "Our Services",
  },
  {
    id: 6,
    name: "Online Payment",
  },
  {
    id: 7,
    name: "Airport Transfers",
  },
  {
    id: 8,
    name: "Visa Services",
  },
  {
    id: 9,
    name: "Hajj and Umrah Services",
  },
];

export default function Footer() {
  const dispatch = useDispatch();
   const {layout_data , layout_loading} = useSelector(state => state?.layout);
   const [mainFooterData , setMainFooterData] = useState({});
    useEffect(() => {
      dispatch(handleGetLayoutData())
    } , [dispatch])

    useEffect(() => {
      setMainFooterData(layout_data?.data?.data?.footer?.settings)
    } , [layout_data])

    
    
  return (
    <footer data-aos="zoom-in" className=" pt-[130px] mt-5">
      <div className=" main-content">
      <div className="grid container grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-6 md:gap-20 lg:gap-[89px]">
{/*       {console.log("layout_data", layout_data?.data?.data?.logos?.find(item => item?.logo_key == "footer-logo")?.image_url)} */}
        <div className="flex flex-col">
          <Link href={`${layout_data?.data?.data?.logos?.find(item=>item?.logo_key=="footer-logo")?.logo_url || "/" }`}>
           <Image
            src={layout_data?.data?.data?.logos?.find(item => item?.logo_key == "footer-logo")?.image_url}
            alt="Uno Travel Logo"
            width={309}
            height={188}
            className="w-[170px] h-[90px] md:w-[200px] md:h-[100px] lg:w-[309px] lg:h-[188px] "
          />
          </Link>
          <div className="flex flex-col mt-4 gap-2">
            <p className="">
              <span className="text-sm font-bold text-[#16294F] font-[filson-bold] 2xl:text-base">
                UNO{" "}
              </span>
              <span
              className="text-sm font-normal text-[#16294F] font-[filson-regular] 2xl:text-base">
               {" "}

                {mainFooterData?.motto_title || `provides high-quality services designed to suit all needs,
                interests, tastes and capabilities of travelers and tourists`}
              </span>
            </p>

            <p className="flex flex-col">
              <span className="text-sm font-bold text-[#16294F] font-[filson-bold] 2xl:text-base">
                Our motto is
              </span>
              <span className="text-sm font-normal text-[#16294F] font-[filson-regular] 2xl:text-base">
                {mainFooterData?.motto_text || `"Quality in work and transparency in dealing" All you have to do
                is contact us and we will connect you to the world.`}
              </span>
            </p>
          </div>

          <div className="flex gap-[14px] items-center mt-2">
            <a href={layout_data?.data?.data?.footer?.app?.app_store_url} target="_blank">
               <Image
              src={layout_data?.data?.data?.footer?.app?.app_store_badge ?? "/images/download-on-the-app-store-apple (1).webp"}
              alt="app store"
              className="2xl:w-[149px] md:w-[120px] 2xl:h-[44px] md:h-[39px] object-cover rounded-md"
              width={149}
              height={44}
            />
            </a>

            <a href={layout_data?.data?.data?.footer?.app?.google_play_url} target="_blank">
               <Image
              src={layout_data?.data?.data?.footer?.app?.google_play_badge ?? "/images/google-play-badge.webp"}
              alt="app store"
              className="2xl:w-[149px] md:w-[120px] 2xl:h-[44px] md:h-[39px] object-cover rounded-md"
              width={149}
              height={44}
            />
            </a>
          
          </div>

          <div className="flex gap-[35px] mt-4 items-center">
            <a href={layout_data?.data?.data?.settings?.facebook_url} target="_blank">
              <Facebook fill="#16294F" color="#16294F" size={20} />
            </a>

            <a href={layout_data?.data?.data?.settings?.twitter_url} target="_blank">
            <Twitter fill="#16294F" color="#16294F" size={20} />
            </a>

            <a href={layout_data?.data?.data?.settings?.linkedin_url} target="_blank">
            <Linkedin fill="#16294F" color="#16294F" size={20} />
            </a>

            <a href={layout_data?.data?.data?.settings?.instagram_url} target="_blank">
            <Instagram color="#16294F" size={20} />
            </a>

            <a href={layout_data?.data?.data?.settings?.youtube_url} target="_blank">
            <Youtube color="#16294F" size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col text-left">
          <h2 className="!text-[18px]  2xl:!text-lg text-[#16294F] font-[filson-bold] !font-bold">
            Services
          </h2>
          <ul className="flex gap-3 lg:gap-0 flex-col h-full mt-4 !items-stretch ms-0 ps-0 !justify-between text-left">
            {layout_data?.data?.data?.footer?.servicesLinks?.length > 0 && layout_data?.data?.data?.footer?.servicesLinks?.map((service) => (
              <li
                key={service?.item_id}
                className="text-sm 2xl:text-base  text-[#16294F] font-[filson] cursor-pointer font-normal"
              >
                <Link 
                href={`${service?.item_url}`}
                 className="text-sm 2xl:text-base  !text-[#16294F] font-[filson-regular] cursor-pointer font-normal"
                >{service?.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col text-left">
          <ul className="flex flex-col h-full gap-3 lg:gap-0 !items-stretch ms-0 ps-0 !justify-between text-left">
            {layout_data?.data?.data?.footer?.policyLinks?.length > 0 && layout_data?.data?.data?.footer?.policyLinks?.map((service) => (
              <li
                key={service?.id}
                className="text-sm 2xl:text-base  text-[#16294F] font-[filson] cursor-pointer font-normal"
              >
                <Link 
                 href={`${service?.item_url}`}
                 className="text-sm 2xl:text-base  !text-[#16294F] font-[filson-regular] cursor-pointer font-normal"
                >{service?.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col text-left">
          <h2 className="!text-[18px] 2xl:!text-lg text-[#16294F] font-[filson-bold] ">
            Contact
          </h2>
          <ul className="flex flex-col h-full mt-4 !items-stretch ms-0 ps-0 !justify-between text-left">
           {layout_data?.data?.data?.footer?.branches?.length > 0 &&
           layout_data?.data?.data?.footer?.branches?.map(item =>
            <li 
            key={item?.branch_id}
            className="text-sm 2xl:text-base  text-[#16294F] font-[filson-regular] cursor-pointer ">
             {item?.title}
            </li>
            )
           }
            {/* <li className="text-sm 2xl:text-base  text-[#16294F] font-[filson-regular] cursor-pointer ">
              Uno Travel Sweden AB (Main Branch)
            </li>
            <li className="text-sm 2xl:text-base  text-[#16294F] font-[filson-regular] cursor-pointer ">
              Arlanda Airport Sky City Stockholm-Sweden
            </li> */}
            <li className="text-sm 2xl:text-base flex flex-col  text-[#16294F] font-[filson-regular] cursor-pointer ">
              <p className="my-0 py-0">
                Telephone:{" "}
                <a className="!text-[#16294F]" href={`tel:${layout_data?.data?.data?.footer?.settings?.contact_phone}`}>
                  {layout_data?.data?.data?.footer?.settings?.contact_phone}
                </a>
              </p>
              <p className="my-0 py-0">
                Mobile Phone:{" "}
                <a className="!text-[#16294F]" href={`tel:${layout_data?.data?.data?.footer?.settings?.contact_mobile}`}>
                  {layout_data?.data?.data?.footer?.settings?.contact_mobile}
                </a>
              </p>
            </li>
            <li className="text-sm 2xl:text-base flex flex-col  text-[#16294F] font-[filson-regular] cursor-pointer ">
              <p className="my-0 py-0">
                E-Post:{" "}
                <a className="!text-[#16294F]" href={`mailto:${layout_data?.data?.data?.footer?.settings?.contact_email}`}>
                 {layout_data?.data?.data?.footer?.settings?.contact_email}
                </a>
              </p>
              <p className="my-0 py-0">Org nr. {layout_data?.data?.data?.footer?.settings?.org_number}</p>
            </li>
            <li className="text-sm 2xl:text-base  text-[#16294F] font-[filson-regular] cursor-pointer ">
              <p className="my-0 py-0">Post Address:</p>
              <p className="my-0 py-0">SWEDEN</p>
              <p className="my-0 py-0">GERMANY</p>
              <p className="my-0 py-0">NETHERLAND</p>
              <p className="my-0 py-0">ENGLAND</p>
              <p className="my-0 py-0">SYRIA</p>
            </li>

            {/* <li className="text-sm 2xl:text-base flex flex-col  text-[#16294F] font-[filson-regular] cursor-pointer ">
              <p className="my-0 py-0">PELARGANGEN 1</p>
              <p className="my-0 py-0">BOX 182 POST 19046 ARLANDA</p>
            </li>

            <li className="text-sm 2xl:text-base flex flex-col  text-[#16294F] font-[filson-regular] cursor-pointer ">
              <p className="my-0 py-0">Uno Travel Sweden (City Branch) </p>
              <p className="my-0 py-0">Vårberg centrum Stockholm</p>
            </li> */}
          </ul>
        </div>
      </div>

      <div className="bottom-footer container py-10 mt-10 border-t-[2px] border-t-[#3B85C1]">
        <div className="flex !flex-wrap md:!flex-nowrap !justify-center md:!justify-between items-center">
          <p className="text-base font-normal text-[#16294F] font-[filson-regular]">{layout_data?.data?.data?.footer?.settings?.copyright_text || "Copyright © 2025 Uno Travel Sweden - Privacy Policy"}</p>
          <div className="flex  !items-center">
            <p className="text-base  font-normal !my-auto text-[#16294F] font-[filson-regular]">Powered By:</p>
            <a target="_blank" href="https://its.ae" className="flex !my-auto justify-center items-center">
            <Image alt="big bang logo" src="https://its.ae/wp-content/uploads/2020/05/bigbang-logo.svg"  className="object-cover" width={130} height={20}/>
            </a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
