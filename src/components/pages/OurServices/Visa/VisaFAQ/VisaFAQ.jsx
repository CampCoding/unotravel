"use client";
import React from "react";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/shared/Accordian/Accordian";

const DEFAULT_FAQ = [
  { question: "How early should I apply for a visa?", answer: "We recommend submitting your application at least 15 days before your planned departure." },
  { question: "What documents do I need?", answer: "A valid passport (min. 6 months validity), passport-sized photo, travel itinerary, proof of accommodation, and bank statements." },
  { question: "How long does visa processing take?", answer: "Standard processing takes 5–10 business days. Urgent processing is available for some destinations." },
  { question: "Can I track my visa application status?", answer: "Yes. Contact our team at any time for a status update and we will notify you as soon as a decision is made." },
  { question: "Cancellation Policy", answer: "Visa fees are non-refundable once the application has been submitted to the authorities." },
];

export default function VisaFAQ({ items = [] }) {
  const faqItems = items.length > 0 ? items : DEFAULT_FAQ;

  return (
    <div className="mt-20 container">
      <CustomHeading second_title_class={"text-[#264787]!"} second_title={"FAQ"} />
      <Accordion type="single" collapsible className="flex flex-col mt-10 gap-2">
        {faqItems.map((item, i) => (
          <AccordionItem key={i} value={String(i + 1)}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-[14px] leading-relaxed text-[#4B5563]">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
