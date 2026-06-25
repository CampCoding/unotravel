import React from 'react'
import CustomHeading from '@/components/shared/CustomHeading/CustomHeading'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/shared/Accordian/Accordian'

const FALLBACK_FAQS = [
  {
    question: "How early should I apply for a Saudi Umrah visa?",
    answer: "We recommend submitting your application at least 15 days before your planned departure to allow sufficient time for processing and any unexpected delays.",
  },
  {
    question: "Which visa is best to visit Saudi Arabia and explore its major cities?",
    answer: "A Tourist eVisa is the best and easiest option for visiting Saudi Arabia and exploring its major cities. It is valid for one year with multiple entries, allowing stays up to 90 days.",
  },
  {
    question: "What documents are required for Umrah?",
    answer: "You will need a valid passport (at least 6 months validity), completed visa application, recent passport-sized photos, and proof of booking. Additional documents may be required based on your country.",
  },
  {
    question: "Additional info",
    answer: "Please ensure your passport has at least 6 months validity from your travel date. Carrying printed copies of your visa confirmation is highly recommended.",
  },
  {
    question: "Cancellation Policy",
    answer: "Visa fees are non-refundable once the application has been submitted to the authorities. For details on related bookings, please refer to our general terms.",
  },
];

const getT = (section, langId) =>
  section?.translations?.find(t => t.language_id === Number(langId)) ||
  section?.translations?.[0] || {};

export default function UmrahFAQ({ sections, langId }) {
  const hasSections = sections?.length > 0;
  const faqs = hasSections
    ? sections.map(s => {
        const t = getT(s, langId);
        return {
          question: t.section_title       || "",
          answer:   t.section_description || "",
        };
      }).filter(f => f.question)
    : FALLBACK_FAQS;

  if (!faqs.length) return null;

  return (
    <div className="mt-20 container">
      <CustomHeading second_title_class={"text-[#264787]!"} second_title={"FAQ"} />
      <Accordion type="single" collapsible className="flex flex-col mt-10 gap-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={String(i)}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-[14px] leading-relaxed text-[#4B5563]">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
