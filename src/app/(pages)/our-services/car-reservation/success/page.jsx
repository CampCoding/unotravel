"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function BookingSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#e0f2fe]/40 flex flex-col justify-between antialiased font-sans">
      
      {/* Main Status Card Container */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden transition-all transform hover:scale-[1.01]">
          
          {/* Calendar Status Badge Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg 
              className="w-16 h-16 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
            {/* Green Badge Checkmark overlap */}
            <div className="absolute bottom-1 right-1 bg-emerald-500 rounded-full p-1 text-white border-4 border-white shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Heading Content */}
          <h2 className="text-2xl! font-black text-[#264787] mb-3 tracking-tight">
            Your Booking Has Been Requested
          </h2>
          
          {/* Subtext description */}
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium max-w-sm mx-auto mb-8">
            We'll Send You Confirmation And Updates About Your Booking
          </p>

          {/* Call To Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              onClick={() => router.push("/")}
              className="bg-[#264787] hover:bg-[#1e3a75] text-white font-bold text-sm! py-2.5 px-4 rounded-2xl! shadow-md transition-all duration-200"
            >
              Home Page
            </button>
            <button
              onClick={() => router.push("/orders")}
              className="bg-[#fbb040] hover:bg-[#e29d34] text-white font-bold text-sm! py-2.5 px-4 rounded-2xl! shadow-md transition-all duration-200"
            >
              My Orders
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}