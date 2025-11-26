import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React from "react";

export default function AboutContent() {
  const baseTextClass = "!text-base 2xl:!text-[20px] text-[#16294F]";
  const paragraphClass = `${baseTextClass} !text-base font-normal mt-[30px]`;
  const headingClass = `${baseTextClass} !text-base 2xl:!text-[20px] font-bold mt-[20px]`;

  return (
    <div className="container">
      <div data-aos="fade-up" className="mt-[80px]">
        <CustomHeading first_title="About" second_title="Us" />

        <div className="flex flex-col mt-[20px]">
          <h2 data-aos="fade-up" data-aos-delay="500" className={headingClass}>
            The Swedish company "UNO" for tourism
          </h2>
          <p data-aos="fade-up" data-aos-delay="1000" className={baseTextClass}>
            The company was established in 2015, and its headquarters is located
            at Arlanda Airport in Stockholm, the departures building. The
            company has another branch in southern Stockholm: Vårberg Centrum.
          </p>
          <p data-aos="fade-up" data-aos-delay="1500" className={paragraphClass}>
            As for foreign branches, the "UNO" company has a branch in Istanbul /
            Turkey.. It specializes in tourism, excursions and hotel
            reservations.
          </p>
        </div>

        <div className="flex flex-col mt-[20px]">
          <h2 data-aos="fade-up" data-aos-delay="2000" className={headingClass}>
            "UNO" Our services are as broad as our hopes.
          </h2>
          <p data-aos="fade-up" data-aos-delay="2500" className={baseTextClass}>
            Wherever you go you will find us the best. !!
          </p>
          <p data-aos="fade-up" data-aos-delay="3000" className={paragraphClass}>
            We deal transparently with our customers, which makes our company a
            source of trust for all customers.
          </p>
          <p data-aos="fade-up" data-aos-delay="3500" className={paragraphClass}>
            Uno company holds a commercial license No. 559288-2707 from the
            Companies Department in Sweden. It is a member of the International
            Aviation Organization IATA with the number 80242503.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="4000"
          className="flex gap-[5px] items-center mt-5"
        >
          <span className={`${baseTextClass} font-bold`}>UNO</span>
          <span className={baseTextClass}>
            is an authorized sales agent for most international airlines.
          </span>
        </div>

        <p data-aos="fade-up" data-aos-delay="4500" className={paragraphClass}>
          The company is managed by experts in the field of tourism and travel
          with an experience of not less than 15 years and specialists in Sweden
          as well as many neighboring countries such as Denmark, Norway and
          Germany. Most of Europe.
        </p>

        <p data-aos="fade-up" data-aos-delay="5000" className={paragraphClass}>
          UNO provides high-quality services designed to suit all needs,
          interests, tastes and capabilities of travelers and tourists.
        </p>

        <h2
          data-aos="fade-up"
          data-aos-delay="5500"
          className={`${headingClass} my-0 py-0`}
        >
          Our motto is
        </h2>

        <h2
          data-aos="fade-up"
          data-aos-delay="6000"
          className={`${headingClass} my-0 py-0`}
        >
          "Quality in work and transparency in dealing"
        </h2>

        <p data-aos="fade-up" data-aos-delay="6500" className={paragraphClass}>
          All you have to do is contact us and we will connect you to the world
        </p>
      </div>
    </div>
  );
}
