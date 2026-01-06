"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

function Accordion(props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className="flex flex-col gap-0"
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={`bg-[#F5F6FA] !text-[13px] !text-[#1B1D4D] data-[state=open]:text-[#3B85C1] data-[state=open]:bg-white data-[state=open]:border data-[state=open]:border-[#CED6E1] rounded-[12px] px-[12px] py-[8px] transition-all duration-300 ${
        className || ""
      }`}
      data-aos="fade-up"
      data-aos-duration="500"
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={`w-full text-left text-[#1B1D4D] data-[state=open]:!text-[#3B85C1] !text-[16px] font-medium flex items-center justify-between transition-all outline-none min-h-[38px] [&[data-state=open]>svg]:rotate-180 ${
          className || ""
        }`}
        {...props}
      >
        <div
          className="flex-1 flex text-[#4C4C60]
        data-[state=open]:!text-[#3B85C1] items-center"
        >
          {children}
        </div>
        <ChevronDownIcon className="text-[#1B1D4D] size-5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }) {
  const isEmpty = typeof children === "string" ? children.trim() === "" : false;

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={`overflow-hidden
         text-[#4B5563] text-[15px] transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${
           isEmpty ? "flex justify-center items-center h-[80px]" : ""
         }`}
      {...props}
    >
      <div className={`pt-2 pb-2 px-1 ${className || ""}`}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
