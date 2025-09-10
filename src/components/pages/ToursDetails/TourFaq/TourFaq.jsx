"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/shared/Accordian/Accordian"; // adjust the path if needed

export default function TourFaq() {
  return (
    <div className="container mt-20">
      <h2 className="!text-[#264787] italic !text-base 2xl:!text-xl mb-6">
        FAQ
      </h2>

      <Accordion type="single" collapsible className="flex flex-col mt-1 gap-2">
        <AccordionItem value="1">
          <AccordionTrigger>What's included</AccordionTrigger>
          <AccordionContent>
            Transportation, guide, entrance tickets, and refreshments.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>Departure Point</AccordionTrigger>
          <AccordionContent>
            The tour starts from downtown Taif at 9:00 AM.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger>What to Expect</AccordionTrigger>
          <AccordionContent>
            <p>
              <strong>Stop A:</strong> View of the mountains and valley.
            </p>
            <p>
              <strong>Stop B:</strong> Local market experience and lunch.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
