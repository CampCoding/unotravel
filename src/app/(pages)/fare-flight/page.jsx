"use client";
import React from "react";
import ComingSoon from "@/components/shared/ComingSoon/ComingSoon";
import { PlaneTakeoff } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      title="Low Fare Flight"
      subtitle="Our low fare flight booking and comparison feature is coming soon. Get ready for unbeatable deals!"
      icon={PlaneTakeoff}
      badgeText="Coming Soon"
    />
  );
}
