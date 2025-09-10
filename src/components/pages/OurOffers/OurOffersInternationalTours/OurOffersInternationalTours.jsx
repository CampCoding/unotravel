"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import Image from "next/image";
import React, { useState } from "react";
import OurOfferModal from "../OurOfferModal/OurOfferModal";

export const internationalTours = [
  {
    city: "BARCELONA",
    image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495567/tickets-for-barcelona-bus-turistic-a_xqynzq.jpg",
  },
  { city: "PARIS", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495618/download_pqhfcx.jpg" },
  { city: "LONDON", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495719/download_1_fuiq77.jpg" },
  { city: "Mecca", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495785/download_2_q5vifg.jpg" },
  { city: "Najrān", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495816/download_3_ehdbkw.jpg" },

  { city: "BERLIN", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757495941/download_4_ccrvuk.jpg" },
  { city: "ROME", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496012/download_5_kiqfhj.jpg" },
  { city: "VIENNA", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496079/download_5_wbyesi.jpg" },
  { city: "Riyadh", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496079/download_5_wbyesi.jpg" },
  { city: "Sakākā", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496560/download_10_l5bdqi.jpg" },

  { city: "BUDAPEST", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496561/download_7_kjqvdj.jpg" },
  { city: "PRAGUE", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496561/download_6_d0z1ir.jpg" },
  { city: "LISBON", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496561/download_11_wglcwq.jpg" },
  { city: "Tabūk", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496561/download_9_hwesfc.jpg" },
  { city: "Yanbuʿ", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496561/download_8_odmfrq.jpg" },

  { city: "PORTO", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496724/download_13_gv5ree.jpg" },
  { city: "MILAN", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496724/download_14_kwhjav.jpg" },
  { city: "MADRID", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496724/download_15_zuhjui.jpg" },
  { city: "Ras Tanura", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496724/download_12_kijpey.jpg" },
  { city: "Medina", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496788/download_21_rzwnkf.jpg" },

  { city: "VENICE", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496788/download_20_lbnr9m.jpg" },
  { city: "MOSCOW", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496788/download_19_zbaaat.jpg" },
  { city: "JIDDAH", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496788/download_22_vyycop.jpg" },
  { city: "Jizān", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496789/download_18_cajo0k.jpg" },
  { city: "Khamis Mushayṭ", image: "https://res.cloudinary.com/dbz6ebekj/image/upload/v1757496789/download_16_xtxlds.jpg" },
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
