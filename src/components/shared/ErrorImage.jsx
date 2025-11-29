"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";

export default function ErrorImage({
  isImg = true,
  image = "/uploads/agents/condor.png",
  alt = "Media",
  FALLBACK_IMG = "/images/fallback.png",
  width = 40,
  height = 40,
  ...props
}) {
  const initialSrc = useMemo(() => {
    if (typeof image !== "string" || !image.trim()) {
      return FALLBACK_IMG;
    }

    const trimmed = image.trim();

    const isHttp = /^https?:\/\//i.test(trimmed);

    // If it's http/https → use as is (make sure domain is allowed in next.config.js for <Image />)
    if (isHttp) return trimmed;

    // If it's not http(s), treat it as a local path
    // Ensure it starts with "/"
    const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return normalized || FALLBACK_IMG;
  }, [image, FALLBACK_IMG]);

  const [src, setSrc] = useState(initialSrc);

  const handleError = () => {
    if (src !== FALLBACK_IMG) {
      setSrc(FALLBACK_IMG);
    }
  };

  // 🎥 VIDEO MODE
  if (!isImg) {
    return (
      <video
        width={width}
        height={height}
        src={src}
        onError={handleError}
        className="object-cover"
        {...props}
      />
    );
  }

  // 🖼 IMAGE MODE (next/image)
  return (
    <Image
      width={width}
      height={height}
      src={src}
      alt={alt || "Image"}
      onError={handleError } // TS sometimes complains, this is fine in practice
      className="object-cover"
      {...props}
    />
  );
}
