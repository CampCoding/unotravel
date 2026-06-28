"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { handleRegister, clearError } from "@/lib/features/authSlice";

const COUNTRY_CODES = [
  { code: "+966", flag: "🇸🇦" }, { code: "+20",  flag: "🇪🇬" },
  { code: "+971", flag: "🇦🇪" }, { code: "+965", flag: "🇰🇼" },
  { code: "+974", flag: "🇶🇦" }, { code: "+968", flag: "🇴🇲" },
  { code: "+962", flag: "🇯🇴" }, { code: "+90",  flag: "🇹🇷" },
  { code: "+46",  flag: "🇸🇪" }, { code: "+44",  flag: "🇬🇧" },
  { code: "+1",   flag: "🇺🇸" },
];

export default function RegisterPage() {
  const router   = useRouter();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((s) => s.auth ?? {});

  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "",
    countryCode: "+966", phone: "", password: "", confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [localError, setLocalError] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => { if (user?.id) router.replace("/profile"); }, [user]);
  useEffect(() => { dispatch(clearError()); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (form.password && form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    const payload = {
      first_name: form.first_name,
      last_name:  form.last_name  || undefined,
      email:      form.email      || undefined,
      phone:      form.phone ? `${form.countryCode}${form.phone}` : undefined,
      password:   form.password   || undefined,
    };
    const result = await dispatch(handleRegister(payload));
    if (result.meta.requestStatus === "fulfilled") router.replace("/profile");
  };

  const inp = "w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base text-gray-800";
  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left */}
        <div className="flex flex-col items-center gap-4 text-center pt-8">
          <Image src="/images/BusinessCardLogo-removebg-preview.png" alt="Uno Travel" width={240} height={140} className="object-contain" />
          <h2 className="text-3xl font-black text-[#264787]">Join Uno Travel</h2>
          <p className="text-[#0F3F62] font-medium text-base max-w-xs">
            Create your account to track bookings, save your details, and get personalized service.
          </p>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#3B85C1] font-bold hover:underline">Sign in</Link>
          </p>
        </div>

        {/* Right — form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-5">
          <div>
            <h3 className="text-2xl font-black text-[#264787]">Create Account</h3>
            <p className="text-sm text-gray-400 mt-1">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">First Name <span className="text-red-400">*</span></label>
                <input type="text" value={form.first_name} onChange={e => set("first_name", e.target.value)}
                  placeholder="Mohammed" className={inp} required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Last Name</label>
                <input type="text" value={form.last_name} onChange={e => set("last_name", e.target.value)}
                  placeholder="Reda" className={inp} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                placeholder="your@email.com" className={inp} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
              <div className="flex gap-2">
                <select value={form.countryCode} onChange={e => set("countryCode", e.target.value)}
                  className="bg-gray-100 rounded-2xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 text-sm text-gray-700 min-w-[100px]">
                  {COUNTRY_CODES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                  ))}
                </select>
                <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                  placeholder="5xx xxx xxxx"
                  className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 transition placeholder-gray-400 text-base" />
              </div>
              <p className="text-xs text-gray-400 mt-1">At least email or phone is required</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Password <span className="font-normal text-gray-400">(optional)</span></label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)}
                  placeholder="Set a password to log in later" className={inp + " pr-12"} />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {form.password && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={e => set("confirmPassword", e.target.value)}
                  placeholder="Re-enter password" className={inp} />
              </div>
            )}

            {displayError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {displayError}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white font-black py-4 rounded-2xl shadow-lg hover:brightness-110 transition-all disabled:opacity-60 text-base mt-2">
              {loading ? (
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              ) : <UserPlus size={18} />}
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
