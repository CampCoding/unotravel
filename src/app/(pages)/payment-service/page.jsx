"use client";

import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
        {/* Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left */}
          <div className="flex flex-col justify-center items-center md:items-start bg-gradient-to-l from-white to-[#e9f3fb] rounded-2xl px-4 sm:px-6 md:px-8 py-6 gap-4">
            <img
              src="/images/BusinessCardLogo-removebg-preview.png"
              alt="uno travel logo"
              className="h-28 w-auto sm:h-40 object-contain"
            />

            <div className="w-full border-t border-gray-100 pt-4 sm:pt-6">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#264787]/5 text-[#264787] text-[11px] sm:!text-xs font-semibold uppercase tracking-wide self-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b85c1]" />
                  Payment service setup
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
                  Create a new payment item
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md">
                  Add the details of your service payment item. Use this section
                  to generate a clean card with price, image, and payment link.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <form className="space-y-6">
            {/* Service name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Service name
              </label>
              <input
                type="text"
                placeholder="Example: Airport pickup from Cairo"
                className="w-full px-2 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 text-sm! font-semibold"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Price
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="1100.00"
                    className="w-full px-2 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 !text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Payment link */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Payment link
              </label>
              <input
                type="url"
                placeholder="https://your-gateway.com/pay/your-item-id"
                className="w-full px-2 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 !text-sm font-semibold"
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Service image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Upload cover image
                  </p>
                 
                  <input
                    type="file"
                    accept="image/*"
                    className="block !text-xs text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#3b85c1] file:text-white hover:file:bg-[#264787] cursor-pointer"
                  />
                </div>

                {/* <div className="hidden sm:flex w-24 h-24 rounded-xl bg-gradient-to-br from-[#264787] to-[#3b85c1] text-white text-[10px] font-semibold items-center justify-center text-center shadow-lg">
                  Image preview
                </div> */}
              </div>

              {/* Show preview box under on mobile */}
              <div className="!mt-3 sm:hidden w-24 h-24 rounded-xl bg-gradient-to-br from-[#264787] to-[#3b85c1] text-white text-[10px] font-semibold flex items-center justify-center text-center shadow-lg">
                Image preview
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 !rounded-xl bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white text-sm font-bold shadow-lg shadow-[#264787]/30 hover:shadow-xl hover:brightness-110 transition-all"
              >
                Save payment
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 !rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
