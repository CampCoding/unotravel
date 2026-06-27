"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getLatestDraft, deleteDraft, dismissForSession, isDismissedThisSession } from "@/lib/utils/draft";

const TYPE_META = {
  umrah: { icon: "🕋", color: "from-[#264787] to-[#3B85C1]", label: "Umrah Booking" },
  offer: { icon: "🎁", color: "from-[#C1823B] to-[#E6A855]", label: "Offer Registration" },
  tour:  { icon: "🗺️", color: "from-[#1e6b3e] to-[#3aaa6a]",   label: "Tour Booking" },
};

function timeAgo(ts) {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function DraftModal() {
  const router = useRouter();
  const [draft, setDraft] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isDismissedThisSession()) return;
    const timer = setTimeout(() => {
      const d = getLatestDraft();
      if (d) {
        setDraft(d);
        setVisible(true);
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setVisible(false);
    dismissForSession();
    if (draft?.path) router.push(draft.path);
  };

  const handleDontShowAgain = () => {
    setVisible(false);
    if (draft?.type) deleteDraft(draft.type);
  };

  const handleClose = () => {
    setVisible(false);
    dismissForSession();
  };

  const meta = TYPE_META[draft?.type] ?? TYPE_META.offer;

  return (
    <AnimatePresence>
      {visible && draft && (
        <motion.div
          key="draft-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        >
          <motion.div
            key="draft-modal"
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Top gradient band */}
            <div className={`bg-gradient-to-r ${meta.color} px-6 pt-6 pb-10 relative`}>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition text-sm"
              >
                ✕
              </button>

              <div className="text-4xl mb-3">{meta.icon}</div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">{meta.label}</p>
              <h2 className="text-white text-xl font-bold leading-snug">
                You were so close!
              </h2>
              <p className="text-white/70 text-sm mt-1">
                Your booking details are still saved.
              </p>
            </div>

            {/* Card that overlaps the gradient */}
            <div className="-mt-5 mx-4 bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-4">
              {draft.title && (
                <p className="font-bold text-[#264787] text-sm truncate">{draft.title}</p>
              )}
              {draft.subtitle && (
                <p className="text-gray-500 text-xs mt-0.5 truncate">{draft.subtitle}</p>
              )}
              <p className="text-gray-400 text-xs mt-2">
                Saved {timeAgo(draft.savedAt)}
              </p>
            </div>

            {/* Encouraging message */}
            <p className="px-6 text-gray-600 text-sm text-center leading-relaxed">
              Pick up right where you left off — your trip is waiting for you!
            </p>

            {/* Buttons */}
            <div className="px-6 pb-6 pt-4 flex flex-col gap-2.5">
              <button
                onClick={handleContinue}
                className={`w-full bg-gradient-to-r ${meta.color} text-white font-bold py-3 rounded-xl transition hover:opacity-90 flex items-center justify-center gap-2 shadow-sm`}
              >
                <span>Continue Booking</span>
                <span className="text-base">→</span>
              </button>
              <button
                onClick={handleDontShowAgain}
                className="w-full text-gray-400 hover:text-gray-600 text-sm font-medium py-2 transition"
              >
                Don't show again
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
