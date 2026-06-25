"use client";
import React, { useState } from 'react';
import { useUmrah } from "@/context/UmrahContext";
import { useRouter } from "next/navigation";
import { _post } from "../../../../lib/shared/api";
import { apiRoutes } from "../../../../lib/shared/routes";

export default function Page() {
  const { selectedPackage } = useUmrah();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "", countryCode: "+966", phone: "", email: "",
    passportNumber: "", gender: "", details: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      setError("Full name and phone are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await _post(apiRoutes.umrah_register, {
        package_id:      selectedPackage?.id     ?? null,
        package_title:   selectedPackage?.name   ?? null,
        full_name:       form.fullName,
        phone:           `${form.countryCode}${form.phone}`,
        email:           form.email     || null,
        passport_number: form.passportNumber || null,
        gender:          form.gender    || null,
        notes:           form.details   || null,
        travelers:       selectedPackage?.adults ?? 1,
        total_price:     selectedPackage?.totalPrice ?? 0,
      });
      router.push("/umrah-review");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 overflow-y-auto">
      <div className="p-5 container mx-auto py-4 lg:py-[29px]">
        {/* Package summary */}
        {selectedPackage ? (
          <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-2xl shadow-md p-6 mb-10 flex flex-col md:flex-row gap-6 items-center">
            {selectedPackage.image && (
              <img src={selectedPackage.image} alt={selectedPackage.name} className="w-full md:w-[350px] h-[250px] object-cover rounded-xl" />
            )}
            <div className="flex flex-col gap-2 text-[#264787]">
              <h2 className="!text-lg sm:!text-2xl !font-bold">{selectedPackage.name}</h2>
              {selectedPackage.duration    && <p><strong>Duration:</strong> {selectedPackage.duration}</p>}
              {selectedPackage.travel_dates && <p>{selectedPackage.travel_dates}</p>}
              {selectedPackage.costs?.length > 0 && (
                <ul className="list-disc pl-5">
                  {selectedPackage.costs.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
              <p className="mt-3 font-semibold text-[#3B85C1]">
                {selectedPackage.adults} adult{selectedPackage.adults !== 1 ? "s" : ""} × ${selectedPackage.price} = <strong>${selectedPackage.totalPrice?.toFixed(0)}</strong>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center font-[filson-bold] text-gray-500 mb-10">No package selected. Please go back and select a package.</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div data-aos="fade-up" data-aos-delay="100" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
              {/* Full Name */}
              <div>
                <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">Full Name *</label>
                <input type="text" value={form.fullName} onChange={e => set("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">Phone Number *</label>
                <div className="flex gap-2 items-center">
                  <select value={form.countryCode} onChange={e => set("countryCode", e.target.value)}
                    className="min-w-[110px] md:min-w-[130px] bg-gray-100 rounded-2xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] text-sm md:text-base text-gray-700 truncate">
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+965">🇰🇼 +965</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+968">🇴🇲 +968</option>
                    <option value="+962">🇯🇴 +962</option>
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇺🇸 +1</option>
                  </select>
                  <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                    placeholder="555 000 0000"
                    className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">Email Address</label>
                <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base" />
              </div>

              {/* Passport */}
              <div>
                <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">Passport Number</label>
                <input type="text" value={form.passportNumber} onChange={e => set("passportNumber", e.target.value)}
                  placeholder="Enter your passport number"
                  className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 text-base" />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">Gender</label>
                <select value={form.gender} onChange={e => set("gender", e.target.value)}
                  className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition text-base text-gray-700">
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-8">
              <label className="block text-[var(--main-dark-color)] font-[filson-medium-italic] mb-3">Any Details</label>
              <textarea value={form.details} onChange={e => set("details", e.target.value)}
                placeholder="Any additional details..."
                className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] transition placeholder-gray-400 resize-none h-32 text-base" />
            </div>

            {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}

            <div className="flex my-4 justify-end items-center">
              <button type="submit" disabled={loading}
                className="flex gap-2 font-[filson-bold] items-center cursor-pointer text-white px-6 rounded-lg py-2.5 bg-[var(--main-light-color)] hover:bg-[var(--main-dark-color)] hover:scale-105 transition-all disabled:opacity-60">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
