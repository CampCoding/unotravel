"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/lib/shared/routes";

export function usePageVisit() {
  const pathname = usePathname();
  const lastPath = useRef(null);

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return;
    lastPath.current = pathname;
    axios.post(`${BASE_URL}/pages/visit`, { path: pathname }).catch(() => {});
  }, [pathname]);
}
