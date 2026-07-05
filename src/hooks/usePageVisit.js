"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { _post } from "@/lib/shared/api";

export function usePageVisit() {
  const pathname = usePathname();
  const lastPath = useRef(null);

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return;
    lastPath.current = pathname;
    _post("pages/visit", { path: pathname }).catch(() => {});
  }, [pathname]);
}
