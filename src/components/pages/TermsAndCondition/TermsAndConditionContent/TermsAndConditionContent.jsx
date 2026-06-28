"use client";
import React, { useEffect, useState } from "react";
import { _get } from "@/lib/shared/api";

export default function TermsAndConditionContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _get("pages/legal/terms")
      .then(res => setContent(res?.data?.data?.content ?? null))
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="container mt-20 py-20 flex justify-center text-gray-400">
      <svg className="w-6 h-6 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      Loading…
    </div>
  );

  if (!content) return (
    <p className="container mt-20 py-10 text-center text-gray-400">Content not available.</p>
  );

  return (
    <div className="container mt-20 pb-20">
      <div
        className="prose prose-lg max-w-none text-[#16294F] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
