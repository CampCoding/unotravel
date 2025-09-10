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
import React from "react";

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
  return (
    <footer data-aos="zoom-in" className=" pt-[130px] mt-5">
      <div className=" main-content">
      <div className="grid  
     
     container grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-6 md:gap-20 lg:gap-[89px]">
        <div className="flex flex-col">
          <Image
            src="/images/BusinessCardLogo-removebg-preview.png"
            alt="main-logo"
            width={309}
            height={188}
            className="w-[170px] h-[90px] md:w-[200px] md:h-[100px] lg:w-[309px] lg:h-[188px] "
          />
          <div className="flex flex-col mt-4 gap-2">
            <p className="">
              <span className="text-sm font-bold text-[#16294F] font-(family-name:--font-filson-bold) 2xl:text-base">
                UNO{" "}
              </span>
              <span className="text-sm font-normal text-[#16294F] font-(family-name:--font-filson-regular) 2xl:text-base">
                provides high-quality services designed to suit all needs,
                interests, tastes and capabilities of travelers and tourists{" "}
              </span>
            </p>

            <p className="flex flex-col">
              <span className="text-sm font-bold text-[#16294F] font-(family-name:--font-filson-bold) 2xl:text-base">
                Our motto is
              </span>
              <span className="text-sm font-normal text-[#16294F] font-(family-name:--font-filson-regular) 2xl:text-base">
                "Quality in work and transparency in dealing" All you have to do
                is contact us and we will connect you to the world.
              </span>
            </p>
          </div>

          <div className="flex gap-[14px] items-center mt-2">
            <Image
              src="/images/download-on-the-app-store-apple (1).webp"
              alt="app store"
              className="2xl:w-[149px] md:w-[120px] 2xl:h-[44px] md:h-[39px] object-cover rounded-md"
              width={149}
              height={44}
            />
            <Image
              src="/images/google-play-badge.webp"
              alt="play store"
              className="2xl:w-[149px] md:w-[120px] 2xl:h-[44px] md:h-[39px] object-cover rounded-md"
              width={149}
              height={44}
            />
          </div>

          <div className="flex gap-[35px] mt-4 items-center">
            <Facebook fill="#16294F" color="#16294F" size={20} />
            <Twitter fill="#16294F" color="#16294F" size={20} />
            <Linkedin fill="#16294F" color="#16294F" size={20} />
            <Instagram color="#16294F" size={20} />
            <Youtube color="#16294F" size={20} />
          </div>
        </div>

        <div className="flex flex-col text-left">
          <h2 className="!text-[18px]  2xl:!text-lg text-[#16294F] font-(family-name:--font-filson-bold) !font-bold">
            Services
          </h2>
          <ul className="flex gap-3 lg:gap-0 flex-col h-full mt-4 !items-stretch ms-0 ps-0 !justify-between text-left">
            {services_data?.map((service) => (
              <li
                key={service?.id}
                className="text-sm 2xl:text-base  text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal"
              >
                <Link 
                href={`${service?.href}`}
                 className="text-sm 2xl:text-base  !text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal"
                >{service?.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col text-left">
          <ul className="flex flex-col h-full gap-3 lg:gap-0 !items-stretch ms-0 ps-0 !justify-between text-left">
            {services_data_2?.map((service) => (
              <li
                key={service?.id}
                className="text-sm 2xl:text-base  text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal"
              >
                <Link 
                 href={`${service?.href}`}
                 className="text-sm 2xl:text-base  !text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal"
                >{service?.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col text-left">
          <h2 className="!text-[18px] 2xl:!text-lg text-[#16294F] font-(family-name:--font-filson-bold) !font-bold">
            Contact
          </h2>
          <ul className="flex flex-col h-full mt-4 !items-stretch ms-0 ps-0 !justify-between text-left">
            <li className="text-sm 2xl:text-base  text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal">
              Uno Travel Sweden AB (Main Branch)
            </li>
            <li className="text-sm 2xl:text-base  text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal">
              Arlanda Airport Sky City Stockholm-Sweden
            </li>
            <li className="text-sm 2xl:text-base flex flex-col  text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal">
              <p className="my-0 py-0">
                Telephone:{" "}
                <a className="!text-[#16294F]" href="tel:(0046) 850780055">
                  (0046) 850780055
                </a>
              </p>
              <p className="my-0 py-0">
                Mobile Phone:{" "}
                <a className="!text-[#16294F]" href="tel:(0046) 0700097767">
                  (0046) 0700097767
                </a>
              </p>
            </li>
            <li className="text-sm 2xl:text-base flex flex-col  text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal">
              <p className="my-0 py-0">
                E-Post:{" "}
                <a className="!text-[#16294F]" href="mailto:info@unotravel.se">
                  info@unotravel.se
                </a>
              </p>
              <p className="my-0 py-0">Org nr. 559288-2707</p>
            </li>
            <li className="text-sm 2xl:text-base  text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal">
              <p className="my-0 py-0">Post Address:</p>
              <p className="my-0 py-0">SWEDEN</p>
              <p className="my-0 py-0">GERMANY</p>
              <p className="my-0 py-0">NETHERLAND</p>
              <p className="my-0 py-0">ENGLAND</p>
              <p className="my-0 py-0">SYRIA</p>
            </li>

            <li className="text-sm 2xl:text-base flex flex-col  text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal">
              <p className="my-0 py-0">PELARGANGEN 1</p>
              <p className="my-0 py-0">BOX 182 POST 19046 ARLANDA</p>
            </li>

            <li className="text-sm 2xl:text-base flex flex-col  text-[#16294F] font-(family-name:--font-filson) cursor-pointer font-normal">
              <p className="my-0 py-0">Uno Travel Sweden (City Branch) </p>
              <p className="my-0 py-0">Vårberg centrum Stockholm</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom-footer container py-10 mt-10 border-t-[2px] border-t-[#3B85C1]">
        <div className="flex !flex-wrap md:!flex-nowrap !justify-center md:!justify-between items-center">
          <p className="text-base font-normal text-[#16294F] font-(family-name:--font-filson)">Copyright © 2025 Uno Travel Sweden - Privacy Policy</p>
          <div className="flex  !items-center">
            <p className="text-base  font-normal !my-auto text-[#16294F] font-(family-name:--font-filson)">Powered By:</p>
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
