import CustomHeading from '@/components/shared/CustomHeading/CustomHeading'
import React from 'react'

const DEFAULT_TITLE = "Get A Visa With";
const DEFAULT_SECOND = "Uno Travel";
const DEFAULT_DESC = "Our Visa Services Are Tailored To The Specific Requirements Of Each Country You Plan To Travel To, Including Popular Destinations Like The USA, Canada, And Schengen Countries Such As Germany, France, Belgium, Denmark, Italy, Spain, And More.";

export default function VisaContent({ intro }) {
  const fullTitle  = intro?.title || `${DEFAULT_TITLE} ${DEFAULT_SECOND}`;
  const description = intro?.description || DEFAULT_DESC;

  const spaceIdx = fullTitle.lastIndexOf(" ");
  const firstTitle  = spaceIdx > 0 ? fullTitle.slice(0, spaceIdx) : fullTitle;
  const secondTitle = spaceIdx > 0 ? fullTitle.slice(spaceIdx + 1) : "";

  return (
    <div data-aos="fade-up" className="mt-20 container">
      <CustomHeading first_title={firstTitle + " "} second_title={secondTitle} />
      {description && (
        <div
          className="text-[#16294F] 2xl:!text-lg mt-4 !text-base prose max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  )
}
