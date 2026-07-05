"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { XCircle, RotateCcw, Home } from "lucide-react";

const REASON_LABELS = {
  cancelled:          "You cancelled the payment.",
  not_paid:           "Payment was not completed.",
  verification_error: "We could not verify the payment. Please contact support.",
  missing_params:     "Invalid payment session.",
};

export default function PaymentFailurePage() {
  const params    = useSearchParams();
  const router    = useRouter();
  const reason    = params.get("reason") ?? "";
  const orderCode = params.get("order_code") ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-red-100 p-8 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-500 text-sm mb-6">
          {REASON_LABELS[reason] ?? "Something went wrong with the payment. Please try again."}
        </p>

        {orderCode && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Code</span>
              <span className="font-mono text-gray-700">{orderCode}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 bg-[#264787] hover:bg-[#3B85C1] text-white font-bold py-3.5 rounded-xl transition"
          >
            <RotateCcw size={16} /> Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition text-sm"
          >
            <Home size={14} /> Back to Home
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-5">
          Need help? Contact us at <a href="mailto:info@unotravel.se" className="underline">info@unotravel.se</a>
        </p>
      </div>
    </div>
  );
}
