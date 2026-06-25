import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React from "react";

const getTranslation = (aboutSection, langId) =>
  aboutSection?.translations?.find((t) => t.language_id === Number(langId)) ||
  aboutSection?.translations?.[0];

export default function AboutContent({ aboutSection, langId }) {
  const t = getTranslation(aboutSection, langId);

  const baseTextClass = "!text-base 2xl:!text-[20px] text-[#16294F]";
  const paragraphClass = `${baseTextClass} !text-base font-normal mt-[30px]`;
  const headingClass = `${baseTextClass} !text-base 2xl:!text-[20px] font-bold mt-[20px]`;

  if (t?.title || t?.description) {
    return (
      <div className="container">
        <div data-aos="fade-up" className="mt-[80px]">
          <CustomHeading first_title="About" second_title="Us" />
          {t.title && (
            <h2 data-aos="fade-up" data-aos-delay="500" className={headingClass}>
              {t.title}
            </h2>
          )}
          {t.subtitle && (
            <h3 data-aos="fade-up" data-aos-delay="800" className={headingClass}>
              {t.subtitle}
            </h3>
          )}
          {t.description && (
            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className={`${baseTextClass} mt-4`}
              dangerouslySetInnerHTML={{ __html: t.description }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div data-aos="fade-up" className="mt-[80px]">
        <CustomHeading first_title="About" second_title="Us" />
        <div className="flex flex-col mt-[20px]">
          <h2 data-aos="fade-up" data-aos-delay="500" className={headingClass}>
            The Swedish company "UNO" for tourism
          </h2>
          <p data-aos="fade-up" data-aos-delay="1000" className={baseTextClass}>
            The company was established in 2015, and its headquarters is located at Arlanda Airport in Stockholm, the departures building.
          </p>
          <p data-aos="fade-up" data-aos-delay="1500" className={paragraphClass}>
            As for foreign branches, the "UNO" company has a branch in Istanbul / Turkey.. It specializes in tourism, excursions and hotel reservations.
          </p>
        </div>
        <div className="flex flex-col mt-[20px]">
          <h2 data-aos="fade-up" data-aos-delay="2000" className={headingClass}>
            "UNO" Our services are as broad as our hopes.
          </h2>
          <p data-aos="fade-up" data-aos-delay="2500" className={baseTextClass}>
            Wherever you go you will find us the best.
          </p>
        </div>
      </div>
    </div>
  );
}
