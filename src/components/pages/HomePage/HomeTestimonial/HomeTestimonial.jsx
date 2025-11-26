"use client";
import React from "react";

export default function HomeTestimonial() {
  return (
   <div className="container mt-[100px]">
   <iframe
        src="https://cdn.trustindex.io/amp-widget.html#102251b5015d822aba36abca62b"
        sandbox="allow-scripts allow-same-origin"
        className="!h-[480px] md:!h-[300px] !w-full !border-none"
        // height={270}
        allowFullScreen
        title="TrustIndex Reviews"
      ></iframe>
      </div>
  );
}
