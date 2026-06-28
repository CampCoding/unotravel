"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React, { useState } from "react";
import { _post } from "@/lib/shared/api";

export default function ContactUsForm({ data, langId }) {
  const translation =
    data?.translations?.find((t) => t.language_id === Number(langId)) ||
    data?.translations?.[0] ||
    {};

  const companyName = translation?.company_name;
  const description = translation?.description;
  const namePlaceholder = translation?.name_placeholder || "Your Name*";
  const emailPlaceholder = translation?.email_placeholder || "Your Email*";
  const messageTitlePlaceholder = translation?.message_title_placeholder || "Message Title*";
  const messagePlaceholder = translation?.message_placeholder || "Message";
  const checkboxLabel = translation?.checkbox_label || "I agreed and I have read and understand Samtycke";
  const submitLabel = translation?.submit_label || "Send Message";

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.message.trim()) {
      return setError("Please fill in your name and message.");
    }
    if (!agreed) return setError("Please accept the terms to continue.");
    setLoading(true);
    try {
      await _post("pages/contact-message", form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setAgreed(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(/images/purepng.com-white-cloudnaturestylenaturalbeautifulgreen-5415211264555x7ih.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="bg-[#F5F6FA] py-10"
    >
      <div className="grid container items-center grid-cols-1 md:grid-cols-2 gap-10">
        <div data-aos="fade-down-right" className="flex flex-col gap-3">
          <CustomHeading first_title={"LEAVE US"} first_title_class={"text-['#3b85c1']!"} second_title={"A MESSAGE"} />
          <div className="flex flex-col">
            {companyName && (
              <p className="font-bold my-0 py-0 !text-base 2xl:text-lg">
                {companyName}
              </p>
            )}
            {description ? (
              <div
                className="font-normal mt-1 max-w-[430px] my-0 py-0 leading-relaxed !text-base 2xl:text-lg"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : !companyName ? (
              <>
                <p className="font-bold my-0 py-0 !text-base 2xl:text-lg">
                  Uno Travel Sweden AB
                </p>
                <p className="font-normal mt-1 max-w-[430px] my-0 py-0 leading-relaxed !text-base 2xl:text-lg">
                  Please do not hesitate to contact us if you have any doubts,
                  please use the contact form below and describe your case as
                  comprehensively as possible so that we can provide you with the
                  best possible service.
                </p>
              </>
            ) : null}
          </div>
        </div>
        <div data-aos="fade-down-left" className="flex flex-col">
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl">
                ✓
              </div>
              <p className="font-bold text-[#16294F] text-lg">Message sent!</p>
              <p className="text-gray-500 text-sm">We&apos;ll get back to you as soon as possible.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 text-sm text-[#16294F] underline hover:text-[#264787] transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
              <input
                value={form.name}
                onChange={set("name")}
                placeholder={namePlaceholder}
                required
                className="rounded-[6px] h-[40px] px-3 bg-white focus:outline-none backdrop-blur-[2px] border !border-[#16294F]"
              />
              <input
                value={form.email}
                onChange={set("email")}
                type="email"
                placeholder={emailPlaceholder}
                className="rounded-[6px] h-[40px] px-3 focus:outline-none bg-white backdrop-blur-[2px] border !border-[#16294F]"
              />
              <input
                value={form.subject}
                onChange={set("subject")}
                placeholder={messageTitlePlaceholder}
                className="rounded-[6px] h-[40px] px-3 focus:outline-none bg-white backdrop-blur-[2px] border !border-[#16294F]"
              />
              <textarea
                value={form.message}
                onChange={set("message")}
                required
                className="rounded-[6px] h-[184px] p-4 focus:outline-none bg-white backdrop-blur-[2px] border !border-[#16294F]"
                placeholder={messagePlaceholder}
              />

              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 accent-[#16294F]"
                />
                <label className="text-black text-md 2xl:text-lg">
                  {checkboxLabel}
                </label>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-[6px] h-[40px] px-6 bg-[#16294F] text-white font-semibold hover:bg-[#264787] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending…
                  </>
                ) : submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
