"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import VisaBanner       from '@/components/pages/OurServices/Visa/VisaBanner/VisaBanner';
import VisaContent      from '@/components/pages/OurServices/Visa/VisaContent/VisaContent';
import VisaServices     from '@/components/pages/OurServices/Visa/VisaServices/VisaServices';
import VisaWhyChooseUs  from '@/components/pages/OurServices/Visa/VisaWhyChooseUs/VisaWhyChooseUs';
import VisaFAQ          from '@/components/pages/OurServices/Visa/VisaFAQ/VisaFAQ';
import HomeSubscribe    from '@/components/pages/HomePage/HomeSubscribe/HomeSubscribe';
import HomePartners     from '@/components/pages/HomePage/HomePartners/HomePartners';
import { _get } from '@/lib/shared/api';
import { apiRoutes } from '@/lib/shared/routes';

export default function Page() {
  const { selectedLanguage } = useSelector(s => s.layout);
  const [data, setData] = useState(null);

  useEffect(() => {
    _get(apiRoutes.visa_page)
      .then(res => setData(res.data?.data ?? null))
      .catch(() => {});
  }, []);

  return (
    <div>
      <VisaBanner       banners={data?.banners ?? []} />
      <VisaContent      intro={data?.intro ?? null} />
      <VisaServices
        countries={data?.countries ?? []}
        visaTypes={data?.visaTypes ?? []}
        passportTypes={data?.passportTypes ?? []}
      />
      <VisaWhyChooseUs  items={data?.whyChooseUs ?? []} />
      <VisaFAQ          items={data?.faq ?? []} />
      <HomeSubscribe    data={data?.newsletter} />
      <HomePartners     data={data?.brands?.data} />
    </div>
  );
}
