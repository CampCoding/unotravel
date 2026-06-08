"use client";

import { useEffect } from "react";

export function useLockBodyScroll(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyHeight = body.style.height;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.height = "100vh";

    return () => {
      html.style.overflow = 'auto';
      body.style.overflow = 'auto';
      body.style.height = 'auto';
    };
  }, [isLocked]);
}