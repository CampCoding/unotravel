"use client";
import React from "react";
import ComingSoon from "@/components/shared/ComingSoon/ComingSoon";
import { Car } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      title="Rent a Car"
      subtitle="Our premium car rental fleet and booking system will be available soon with seamless pickup and dropoff options!"
      icon={Car}
      badgeText="Coming Soon"
    />
  );
}
