"use client";
import React, { useEffect, useState } from "react";
import { _get } from "@/lib/shared/api";
import MainBanner from "@/components/shared/MainBanner/MainBanner";

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState(null);
  const [title,   setTitle]   = useState("Privacy Policy");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _get("pages/legal/privacy")
      .then(res => {
        const d = res?.data?.data;
        if (d?.content) setContent(d.content);
        if (d?.title)   setTitle(d.title);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MainBanner title={title} subtitle="How we collect, use, and protect your data." />

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center py-20 text-gray-400">
            <svg className="w-6 h-6 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Loading…
          </div>
        ) : content ? (
          <div
            className="prose prose-lg max-w-none text-[#16294F] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-center text-gray-400 py-10">Privacy policy content not available yet.</p>
        )}
      </div>
    </div>
  );
}
