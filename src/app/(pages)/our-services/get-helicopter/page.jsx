"use client";
import React from "react";
import ComingSoon from "@/components/shared/ComingSoon/ComingSoon";
import { Plane } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      title="Get a Helicopter"
      subtitle="Exclusive helicopter charter and sightseeing tours will be launching soon. Prepare for an unforgettable sky journey!"
      icon={Plane}
      badgeText="Coming Soon"
    />
  );
}
