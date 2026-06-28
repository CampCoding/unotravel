"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { handleLogin, clearError } from "@/lib/features/authSlice";

export default function SignInPage() {
  const router   = useRouter();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((s) => s.auth ?? {});

  const [form, setForm]   = useState({ email: "", phone: "", password: "" });
  const [mode, setMode]   = useState("email"); // "email" | "phone"
  const [showPw, setShowPw] = useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (user?.id) router.replace("/profile");
  }, [user]);

  useEffect(() => { dispatch(clearError()); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creds = mode === "email"
      ? { email: form.email, password: form.password || undefined }
      : { phone: form.phone, password: form.password || undefined };
    const result = await dispatch(handleLogin(creds));
    if (result.meta.requestStatus === "fulfilled") router.replace("/profile");
  };

  const inp = "w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base text-gray-800";

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left side */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-black text-[#264787]">Welcome Back!</h2>
          <p className="text-[#0F3F62] font-medium text-lg max-w-xs">
            Sign in to track your bookings, access your history, and manage your profile.
          </p>
          <Image
            src="/images/BusinessCardLogo-removebg-preview.png"
            alt="Uno Travel"
            width={280}
            height={160}
            className="object-contain"
          />
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#3B85C1] font-bold hover:underline">
              Register now
            </Link>
          </p>
        </div>

        {/* Right side — form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-5">
          <div>
            <h3 className="text-2xl font-black text-[#264787]">Sign In</h3>
            <p className="text-sm text-gray-400 mt-1">Enter your credentials to continue</p>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {["email", "phone"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                  mode === m ? "bg-white shadow text-[#264787]" : "text-gray-400"
                }`}
              >
                {m === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "email" ? (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                  placeholder="your@email.com" className={inp} required />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                  placeholder="+966 5xx xxx xxxx" className={inp} required />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Password <span className="font-normal text-gray-400">(optional if no password set)</span></label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)}
                  placeholder="Enter password" className={inp + " pr-12"} />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white font-black py-4 rounded-2xl shadow-lg hover:brightness-110 transition-all disabled:opacity-60 text-base mt-2">
              {loading ? (
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              ) : <LogIn size={18} />}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
