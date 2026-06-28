"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { base_url } from "@/lib/constants";
import BookingConfirmUI from "@/components/shared/BookingConfirmUI/BookingConfirmUI";

export default function Page() {
  const router = useRouter();
  const { selectedLanguage } = useSelector((s) => s?.layout ?? {});
  const [form, setForm]     = useState({ name: "", email: "", phone: "", notes: "", link: "" });
  const [files, setFiles]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(null);
  const [error, setError]   = useState("");
  const fileRef = useRef();

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name + f.size));
      return [...prev, ...selected.filter(f => !existing.has(f.name + f.size))];
    });
    e.target.value = "";
  };

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) { setError("Please fill all required fields."); return; }
    setLoading(true); setError("");
    try {
      const fd = new FormData();
      fd.append("name",  form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      if (form.notes) fd.append("notes", form.notes);
      if (form.link)  fd.append("link",  form.link);
      files.forEach(f => fd.append("attachments", f));

      const res = await fetch(`${base_url}pages/online-payment`, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Failed");
      let bookingId = null;
      try { const json = await res.json(); bookingId = json?.data?.id ?? null; } catch {}
      setDone({ bookingId, name: form.name, phone: form.phone, email: form.email, notes: form.notes });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  if (done) {
    const isRTL = (selectedLanguage || 1) === 2;
    return (
      <BookingConfirmUI
        type="payment"
        bookingId={done.bookingId}
        title={isRTL ? "طلب دفع إلكتروني" : "Online Payment Request"}
        details={[
          { emoji: "👤", label: isRTL ? "الاسم"   : "Full Name", value: done.name },
          { emoji: "📞", label: isRTL ? "الهاتف"  : "Phone",     value: done.phone },
          { emoji: "✉️", label: isRTL ? "البريد"  : "Email",     value: done.email },
          { emoji: "📝", label: isRTL ? "ملاحظات" : "Notes",     value: done.notes },
        ]}
        isRTL={isRTL}
        accentColor="from-[#0f4c81] to-[#3b85c1]"
        onBack={() => router.push("/our-services/online-payment")}
        onHome={() => router.push("/")}
        backLabel={isRTL ? "طلب آخر" : "← Submit Another"}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left */}
          <div className="flex flex-col justify-center items-center md:items-start bg-gradient-to-l from-white to-[#e9f3fb] rounded-2xl px-4 sm:px-6 md:px-8 py-6 gap-4">
            <img src="/images/BusinessCardLogo-removebg-preview.png" alt="Uno Travel" className="h-28 w-auto sm:h-40 object-contain" />
            <div className="w-full border-t border-gray-100 pt-4 sm:pt-6 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#264787]/5 text-[#264787] text-[11px] font-semibold uppercase tracking-wide self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b85c1]" />
                Online Payment
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">Submit your payment request</h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md">
                Fill in your details and our team will process your payment request and send you a receipt.
              </p>
            </div>
          </div>

          {/* Right */}
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center">
            {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
              <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="John Doe"
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 text-sm font-semibold" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address <span className="text-red-400">*</span></label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="john@example.com"
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 text-sm font-semibold" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
              <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 234 567 8900"
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 text-sm font-semibold" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Link (optional)</label>
              <input type="url" value={form.link} onChange={e => set("link", e.target.value)} placeholder="https://..."
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 text-sm font-semibold" />
            </div>

            {/* Multi-file upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Attachments (optional)</label>
              <div onClick={() => fileRef.current?.click()}
                className="flex items-center gap-3 px-3 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-[#3b85c1] cursor-pointer transition">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828A4 4 0 1012.343 4.17L5.757 10.757a6 6 0 108.485 8.485L20 13.5" />
                </svg>
                <span className="text-sm text-gray-500">Click to attach files (any type)</span>
              </div>
              <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFiles} />

              {files.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center justify-between px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-xs">
                      <span className="truncate text-gray-700 font-medium">{f.name}</span>
                      <button type="button" onClick={() => removeFile(i)} className="ml-2 text-gray-400 hover:text-red-500 shrink-0">✕</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Notes (optional)</label>
              <textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={3} placeholder="Describe your payment request..."
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#3b85c1] focus:ring-4 focus:ring-[#3b85c1]/20 text-sm font-semibold resize-none" />
            </div>

            <div className="pt-1">
              <button type="submit" disabled={loading}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white text-sm font-bold shadow-lg hover:brightness-110 transition-all disabled:opacity-60">
                {loading ? "Submitting…" : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
