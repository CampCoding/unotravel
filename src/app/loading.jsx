"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin">
      <Loader2 />
    </div>
    {/* <img src="/images/milkyway-studio-rocket.gif" alt="Loading Gif" className="w-40 h-40"/> */}
  </div>
}