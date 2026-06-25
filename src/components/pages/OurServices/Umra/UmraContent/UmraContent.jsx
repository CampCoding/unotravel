import CustomHeading from '@/components/shared/CustomHeading/CustomHeading'
import React from 'react'

const FALLBACK = {
  title_first: "Get Umrah Visa With ",
  title_second: "Uno Travel",
  description: "Do You Want To Have An Experience That Can Deeply Change Your Life? Many Muslims Go To Makkah For Umrah And Hajj. These Pilgrimages Are Essential To Their Faith And Bring A Lot Of Cultural And Spiritual Meaning.",
};

const getT = (section, langId) =>
  section?.translations?.find(t => t.language_id === Number(langId)) ||
  section?.translations?.[0] || {};

export default function UmraContent({ section, langId }) {
  const t = getT(section, langId);
  const title   = t.section_title       || FALLBACK.title_first + FALLBACK.title_second;
  const desc    = t.section_description || FALLBACK.description;

  const [first, ...rest] = title.split(" ");
  const second = rest.join(" ");

  return (
    <div data-aos="fade-up" className='mt-20 container'>
      <CustomHeading first_title={first + " "} second_title={second} />
      <p className='text-[#16294F] 2xl:!text-lg mt-4 !text-base'>{desc}</p>
    </div>
  );
}
