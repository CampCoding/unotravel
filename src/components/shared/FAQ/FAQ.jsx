import React from 'react'
import CustomHeading from '../CustomHeading/CustomHeading'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/shared/Accordian/Accordian";

export default function FAQ() {
  return (
    <div className="mt-20 container">
      <CustomHeading second_title_class={"text-[#264787]!"} second_title={"FAQ"} />

      <Accordion type="single" collapsible className="flex flex-col mt-10 gap-2">
        <AccordionItem value="1">
          <AccordionTrigger>How early should I apply for a Saudi Umrah visa?</AccordionTrigger>
          <AccordionContent>
            <p className="text-[14px] leading-relaxed text-[#4B5563]">
              We recommend submitting your application at least 15 days before your planned departure to allow sufficient time for processing and any unexpected delays.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>Which visa is best to visit Saudi Arabia and explore its major cities?</AccordionTrigger>
          <AccordionContent>
            <p className="text-[14px] leading-relaxed text-[#4B5563]">
              A Tourist eVisa is the best and easiest option for visiting Saudi Arabia and exploring its major cities. It is valid for one year with multiple entries, allowing stays up to 90 days.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger>What to Expect</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 text-[14px] leading-relaxed text-[#4B5563]">
              <div>
                <p className="font-bold text-[#1B1D4D] mb-1">Stop At :</p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <div>
                <p className="font-bold text-[#1B1D4D] mb-1">Stop At :</p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="4">
          <AccordionTrigger>Additional info</AccordionTrigger>
          <AccordionContent>
            <p className="text-[14px] leading-relaxed text-[#4B5563]">
              Please ensure your passport has at least 6 months validity from your travel date. Carrying printed copies of your visa confirmation is highly recommended.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="5">
          <AccordionTrigger>Cancellation Policy</AccordionTrigger>
          <AccordionContent>
            <p className="text-[14px] leading-relaxed text-[#4B5563]">
              Visa fees are non-refundable once the application has been submitted to the authorities. For details on related bookings, please refer to our general terms.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
