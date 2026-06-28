"use client";

import React, { useEffect, useState, useCallback } from "react";
import CustomHeading from "../../../../shared/CustomHeading/CustomHeading";
import CustomSelect from "../../../../shared/CustomSelect/CustomSelect";
import { RadioGroup } from "../../../../ui/radio-group";
import CustomRadio from "../../../../shared/CustomRadio/CustomRadio";
import { _get, _post } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";

function LegalModal({ slug, title, onClose }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _get(apiRoutes.legal_doc(slug))
      .then(res => setContent(res.data?.data?.content ?? ""))
      .catch(() => setContent("<p>Failed to load content.</p>"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleBackdrop = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 flex-shrink-0 shadow-sm">
        <h2 className="text-2xl font-bold text-[#16294F]">{title}</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-60 text-gray-400 gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Loading…
            </div>
          ) : (
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-5 border-t border-gray-100 flex justify-end flex-shrink-0">
        <button
          onClick={onClose}
          className="px-8 py-3 rounded-full bg-[#16294F] text-white font-semibold hover:bg-[#1d3a6b] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function VisaServices({ countries: rawCountries = [], visaTypes: rawVisaTypes = [], passportTypes: rawPassportTypes = [] }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [modal, setModal]           = useState(null);

  const [form, setForm] = useState({
    gender: "male",
    first_name: "",
    surname: "",
    age: "",
    nationality_id: "",
    visa_type_id: "",
    passport_type_id: "",
    passport_expiry: "",
    passport_issuing_country_id: "",
    residence_country_id: "",
    terms_accepted: false,
    gdpr_accepted: false,
  });

  const countries     = rawCountries.map(c     => ({ value: c.id, label: `${c.flag} ${c.name}` }));
  const visaTypes     = rawVisaTypes.map(v     => ({ value: v.id, label: v.name }));
  const passportTypes = rawPassportTypes.map(p => ({ value: p.id, label: p.name }));

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms_accepted) { alert("Please accept the terms and conditions"); return; }
    if (!form.gdpr_accepted)  { alert("Please accept the GDPR policy"); return; }
    setSubmitting(true);
    try {
      await _post(apiRoutes.visa_apply, form);
      setSubmitted(true);
    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "h-[40px] w-full rounded-[4px] border border-(--main-light-color) bg-white px-4 text-[14px] font-normal text-(--main-dark-color) outline-none transition-all duration-200 focus:border-[#2C5596] focus:ring-1 focus:ring-[#2C5596]";
  const labelClass =
    "mb-[9px] flex items-center text-left text-base font-normal leading-none text-(--main-light-color)!";
  const requiredClass = "ml-[4px] text-[14px] font-bold text-[#FF4B5C]";
  if (submitted) {
    return (
      <section data-aos="fade-up" className="mt-20 w-full bg-white">
        <div className="container flex flex-col items-center py-20 text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#16294F]">Application Submitted!</h2>
          <p className="text-[#6B7280] max-w-md">Your visa application has been received. Our team will review it and get back to you shortly.</p>
          <button onClick={() => { setSubmitted(false); setForm({ gender:"male", first_name:"", surname:"", age:"", nationality_id:"", visa_type_id:"", passport_type_id:"", passport_expiry:"", passport_issuing_country_id:"", residence_country_id:"", terms_accepted:false, gdpr_accepted:false }); }}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#264787] text-white font-semibold hover:bg-[#1d3a6b] transition">
            Submit Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section data-aos="fade-up" className="mt-20 w-full bg-white">
      <div className="container">
        <CustomHeading first_title="Visa" second_title="Services" />

        <form onSubmit={handleSubmit} className="mx-auto mt-[43px]">
          {/* Row 1: Passenger info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-x-[17px] gap-y-5">
            <div className="pb-1 sm:col-span-2 lg:col-span-1">
              <h3 className="mb-[25px] text-[20px]! font-bold! leading-none text-(--main-dark-color)!">
                Passenger Information
              </h3>
              <RadioGroup name="gender" value={form.gender} onValueChange={v => set("gender", v)} className="flex h-10 items-center gap-[46px]">
                <CustomRadio label="Male"   name="gender" value="male" />
                <CustomRadio label="Female" name="gender" value="female" />
              </RadioGroup>
            </div>

            <div>
              <label htmlFor="first_name" className={labelClass}>
                <span>First Name:</span><span className={requiredClass}>*</span>
              </label>
              <input id="first_name" type="text" required value={form.first_name} onChange={e => set("first_name", e.target.value)} className={inputClass} />
            </div>

            <div>
              <label htmlFor="surname" className={labelClass}>
                <span>Surname:</span><span className={requiredClass}>*</span>
              </label>
              <input id="surname" type="text" required value={form.surname} onChange={e => set("surname", e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}><span>Age:</span><span className={requiredClass}>*</span></label>
              <input id="age" type="number" min={1} max={120} value={form.age} onChange={e => set("age", e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Row 2: Details */}
          <div className="mt-[31px]">
            <h3 className="mb-[25px] text-[20px]! font-bold! leading-none text-(--main-dark-color)!">Detail</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-x-[23px] gap-y-[22px]">
              <div>
                <label className={labelClass}><span>Nationality:</span><span className={requiredClass}>*</span></label>
                <CustomSelect options={countries} selected={form.nationality_id} setSelected={v => set("nationality_id", v)}
                  placeholder="Select Country" />
              </div>

              <div>
                <label className={labelClass}><span>Visa Type:</span><span className={requiredClass}>*</span></label>
                <CustomSelect options={visaTypes} selected={form.visa_type_id} setSelected={v => set("visa_type_id", v)}
                  placeholder="Select Visa Type" />
              </div>

              <div>
                <label className={labelClass}><span>Passport Type:</span><span className={requiredClass}>*</span></label>
                <CustomSelect options={passportTypes} selected={form.passport_type_id} setSelected={v => set("passport_type_id", v)}
                  placeholder="Select Passport Type" />
              </div>

              <div>
                <label htmlFor="passport_expiry" className={labelClass}><span>Passport Expiry:</span><span className={requiredClass}>*</span></label>
                <input id="passport_expiry" type="date" value={form.passport_expiry} onChange={e => set("passport_expiry", e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}><span>Passport Issuing Country:</span><span className={requiredClass}>*</span></label>
                <CustomSelect options={countries} selected={form.passport_issuing_country_id} setSelected={v => set("passport_issuing_country_id", v)}
                  placeholder="Select Country" />
              </div>

              <div>
                <label className={labelClass}><span>Residence Country:</span><span className={requiredClass}>*</span></label>
                <CustomSelect options={countries} selected={form.residence_country_id} setSelected={v => set("residence_country_id", v)}
                  placeholder="Select Country" />
              </div>
            </div>
          </div>

          {/* Agreements */}
          <div className="mt-[41px] flex flex-col gap-[22px]">
            <label className="flex gap-2 items-center cursor-pointer">
              <input type="checkbox" checked={form.terms_accepted} onChange={e => set("terms_accepted", e.target.checked)}
                className="h-[20px] w-[20px] accent-(--main-dark-color)!" />
              <p className="text-(--main-dark-color)! my-auto! text-lg!">
                I agreed and I have read and understand the{" "}
                <button type="button" onClick={() => setModal({ slug: "terms", title: "Terms & Conditions" })}
                  className="text-[#EB1C24] underline underline-offset-2 hover:opacity-80 transition">
                  terms and condition
                </button>
              </p>
            </label>
            <label className="flex gap-2 items-center cursor-pointer">
              <input type="checkbox" checked={form.gdpr_accepted} onChange={e => set("gdpr_accepted", e.target.checked)}
                className="h-[20px] w-[20px] accent-(--main-dark-color)!" />
              <p className="text-(--main-dark-color)! my-auto! text-lg!">
                I agreed and I have read and understand the{" "}
                <button type="button" onClick={() => setModal({ slug: "gdpr", title: "GDPR Policy" })}
                  className="text-[#EB1C24] underline underline-offset-2 hover:opacity-80 transition">
                  GDPR Policy
                </button>
              </p>
            </label>
          </div>

          <div className="mt-[66px] flex justify-center">
            <button type="submit" disabled={submitting}
              className="h-[54px] w-full max-w-[530px] rounded-full! bg-(--main-dark-color) text-[24px]! text-white shadow-none transition-all duration-300 hover:bg-[#244981] disabled:opacity-60 flex items-center justify-center gap-3">
              {submitting && (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              )}
              {submitting ? "Submitting…" : "Send Request"}
            </button>
          </div>
        </form>
      </div>

      {modal && (
        <LegalModal
          slug={modal.slug}
          title={modal.title}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}
