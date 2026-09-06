"use client";
import React from "react";
import ComingSoon from "@/components/shared/ComingSoon/ComingSoon";
import { Hotel } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      title="Hotels Booking"
      subtitle="We are partnering with top worldwide hotels and luxury resorts. Hotel booking will be available soon!"
      icon={Hotel}
      badgeText="Coming Soon"
    />
  );
}
