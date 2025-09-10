"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import Image from "next/image";
import React, { useState } from "react";
import OurOfferModal from "../OurOfferModal/OurOfferModal";

export const internationalTours = [
  {
    city: "BARCELONA",
    image: "/images/tickets-for-barcelona-bus-turistic-a.jpg",
  },
  { city: "PARIS", image: "/images/download.jfif" },
  { city: "LONDON", image: "/images/download (1).jfif" },
  { city: "Mecca", image: "/images/download (2).jfif" },
  { city: "Najrān", image: "/images/download (3).jfif" },

  { city: "BERLIN", image: "/images/download (4).jfif" },
  { city: "ROME", image: "/images/download(5).jfif" },
  { city: "VIENNA", image: "/images/download (5).jfif" },
  { city: "Riyadh", image: "/images/download (6).jfif" },
  { city: "Sakākā", image: "/images/download (7).jfif" },

  { city: "BUDAPEST", image: "/images/download (8).jfif" },
  { city: "PRAGUE", image: "/images/download (9).jfif" },
  { city: "LISBON", image: "/images/download (10).jfif" },
  { city: "Tabūk", image: "/images/download (11).jfif" },
  { city: "Yanbuʿ", image: "/images/download (12).jfif" },

  { city: "PORTO", image: "/images/download (13).jfif" },
  { city: "MILAN", image: "/images/download (14).jfif" },
  { city: "MADRID", image: "/images/download (15).jfif" },
  { city: "Ras Tanura", image: "/images/download (16).jfif" },
  { city: "Medina", image: "/images/download (17).jfif" },

  { city: "VENICE", image: "/images/download (18).jfif" },
  { city: "MOSCOW", image: "/images/download (19).jfif" },
  { city: "JIDDAH", image: "/images/download (20).jfif" },
  { city: "Jizān", image: "/images/download (21).jfif" },
  { city: "Khamis Mushayṭ", image: "/images/download (22).jfif" },
];

export default function OurOffersInternationalTours() {
  const [openModal , setOpenModal] = useState(false);
  return (
    <div>
      <div data-aos="fade-up" className="mt-[115px] container">
      <CustomHeading first_title={"International"} second_title={"Tours"} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-[60px] gap-4 md:gap-6 lg:gap-[74px] items-center">
        {internationalTours?.map((item) => (
          <div
            data-aos="fade-up"
            data-aos-delay={`${item?.id * 100}`}
            className="flex flex-col gap-[14px]"
            key={item?.city}
            onClick={() => setOpenModal(true)}
          >
            <Image
              src={item?.image}
              className="rounded-[10px] w-[214px] h-[145px] object-cover shadow-[0px_0px_3px_#0000003B]"
              width={214}
              height={145}
              alt="our_international_tour"
            />
            <h2 className="!text-[15px] 2xl:!text-lg text-center !text-[#264787] font-bold uppercase">
              {item?.city}
            </h2>
          </div>
        ))}
      </div>

    </div>
      <OurOfferModal open={openModal} setOpen={setOpenModal}/>
    </div>
  );
}
