import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/shared/Accordian/Accordian";
import React from "react";

const FALLBACK_FAQS = [
  { question: "What is included in the tour package?",      answer: "Our packages typically include accommodation, guided tours, airport transfers, and breakfast. Specific inclusions vary per package — check the tour details page." },
  { question: "Can I customise my itinerary?",              answer: "Yes! We offer tailor-made packages. Contact our travel experts and we'll build an itinerary around your preferences and budget." },
  { question: "How far in advance should I book?",          answer: "We recommend booking at least 4–6 weeks in advance to secure availability, especially for peak-season travel dates." },
  { question: "What is the cancellation policy?",           answer: "Cancellations made more than 30 days before departure receive a full refund minus admin fees. Cancellations within 30 days are subject to partial charges — see our full terms." },
  { question: "Do I need travel insurance?",                answer: "Travel insurance is strongly recommended. We can connect you with our insurance partners for comprehensive coverage." },
];

const getT = (section, langId) =>
  section?.translations?.find((t) => t.language_id === Number(langId)) ||
  section?.translations?.[0] ||
  {};

export default function IntlToursFAQ({ sections, langId }) {
  const faqs = sections?.length
    ? sections.map((s) => {
        const t = getT(s, langId);
        return { question: t.section_title || "", answer: t.section_description || "" };
      }).filter((f) => f.question)
    : FALLBACK_FAQS;

  if (!faqs.length) return null;

  return (
    <div className="mt-20 container">
      <CustomHeading second_title_class="text-[#264787]!" second_title="FAQ" />
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
