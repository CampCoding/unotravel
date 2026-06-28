"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Activity, Settings, LogOut, ChevronRight,
  Clock, CheckCircle2, AlertCircle, Loader2, RefreshCw,
  Star, MapPin, Plane, Car, FileText, CreditCard,
} from "lucide-react";
import { _get, _put } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import { logout, handleUpdateMe } from "@/lib/features/authSlice";
import { useSelector as sel } from "react-redux";

// ── helpers ──────────────────────────────────────────────────────────────────
const TYPE_META = {
  tour:    { label: "Tour",      icon: <MapPin size={14} />,     color: "bg-blue-100 text-blue-700",   dot: "bg-blue-500"   },
  umrah:   { label: "Umrah",     icon: <Star size={14} />,       color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  offer:   { label: "Offer",     icon: <Star size={14} />,       color: "bg-amber-100 text-amber-700", dot: "bg-amber-500"  },
  visa:    { label: "Visa",      icon: <FileText size={14} />,   color: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
  payment: { label: "Payment",   icon: <CreditCard size={14} />, color: "bg-pink-100 text-pink-700",   dot: "bg-pink-500"   },
  car:     { label: "Car",       icon: <Car size={14} />,        color: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
};

const STATUS_STYLE = {
  pending:     "text-amber-600 bg-amber-50 border-amber-200",
  confirmed:   "text-emerald-600 bg-emerald-50 border-emerald-200",
  completed:   "text-blue-600 bg-blue-50 border-blue-200",
  cancelled:   "text-red-600 bg-red-50 border-red-200",
  "in progress": "text-violet-600 bg-violet-50 border-violet-200",
};

const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : null;

// ── sub-components ─────────────────────────────────────────────────────────

function ActivityCard({ item, isRTL }) {
  const meta   = TYPE_META[item.type] ?? TYPE_META.tour;
  const status = (item.status ?? "pending").toLowerCase();
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer p-4 flex items-center justify-between gap-4"
      onClick={() => router.push(`/track/${item.type}/${item.id}`)}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.color}`}>
          {meta.icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{item.title || `#${item.id}`}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.color}`}>{meta.label}</span>
            {item.date && <span className="text-[10px] text-gray-400">{fmtDate(item.date)}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {item.total_price > 0 && (
          <span className="text-sm font-black text-[#264787]">${Number(item.total_price).toLocaleString()}</span>
        )}
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_STYLE[status] ?? STATUS_STYLE.pending}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <ChevronRight size={16} className="text-gray-300" />
      </div>
    </motion.div>
  );
}

function ActivityTab({ userId }) {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState("all");
  const [page,    setPage]    = useState(1);
  const [meta,    setMeta]    = useState(null);

  const load = (f = filter, p = page) => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "10", page: String(p) });
    if (f !== "all") params.set("type", f);
    _get(`${apiRoutes.user_my_activity}?${params}`)
      .then(res => {
        setItems(res?.data?.data ?? []);
        setMeta(res?.data?.meta ?? null);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load("all", 1); }, []);

  const changeFilter = (f) => { setFilter(f); setPage(1); load(f, 1); };
  const changePage   = (p) => { setPage(p); load(filter, p); };

  const FILTERS = [["all","All"], ...Object.entries(TYPE_META).map(([k,v]) => [k, v.label])];

  return (
    <div className="space-y-4">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(([k, label]) => (
          <button key={k} onClick={() => changeFilter(k)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
              filter === k
                ? "bg-[#264787] text-white border-[#264787]"
                : "bg-white text-gray-500 border-gray-200 hover:border-[#264787] hover:text-[#264787]"
            }`}>
            {label}
          </button>
        ))}
        <button onClick={() => load(filter, page)} className="ml-auto p-1.5 text-gray-400 hover:text-[#264787] transition">
          <RefreshCw size={14} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-2 text-gray-400">
          <Loader2 size={20} className="animate-spin" /> Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-3 text-gray-400">
          <Activity size={36} className="opacity-30" />
          <p className="text-sm">No bookings yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => <ActivityCard key={`${item.type}-${item.id}`} item={item} />)}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.pages > 1 && (
        <div className="flex justify-center gap-2 pt-2">
          {Array.from({ length: meta.pages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => changePage(p)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition ${
                page === p ? "bg-[#264787] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileTab({ user, dispatch }) {
  const [form, setForm] = useState({
    first_name: user?.first_name ?? "",
    last_name:  user?.last_name  ?? "",
    email:      user?.email      ?? "",
    phone:      user?.phone      ?? "",
    password:   "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const inp = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3B85C1]/40 text-sm text-gray-800 transition";

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form };
    if (!payload.password) delete payload.password;
    await dispatch(handleUpdateMe(payload));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-md">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">First Name</label>
          <input value={form.first_name} onChange={e => set("first_name", e.target.value)} className={inp} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Last Name</label>
          <input value={form.last_name} onChange={e => set("last_name", e.target.value)} className={inp} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
        <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className={inp} />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label>
        <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} className={inp} />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">New Password <span className="normal-case font-normal">(leave blank to keep)</span></label>
        <input type="password" value={form.password} onChange={e => set("password", e.target.value)}
          placeholder="••••••••" className={inp} />
      </div>
      <button type="submit" disabled={loading}
        className="flex items-center gap-2 bg-gradient-to-r from-[#264787] to-[#3b85c1] text-white font-bold px-6 py-3 rounded-xl hover:brightness-110 transition disabled:opacity-60">
        {loading && <Loader2 size={14} className="animate-spin" />}
        {saved ? "✓ Saved!" : loading ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}

function ServicesTab() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const SERVICE_ROUTES = {
    tour:    "/tours",
    umrah:   "/our-services/umrah",
    offer:   "/our-offers",
    visa:    "/our-services/visa",
    payment: "/our-services/online-payment",
    car:     "/our-services/car-reservation",
  };

  useEffect(() => {
    _get(apiRoutes.user_popular_services)
      .then(r => setServices(r?.data?.data ?? []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-16 gap-2 text-gray-400">
      <Loader2 size={20} className="animate-spin" /> Loading…
    </div>
  );

  if (!services.length) return (
    <div className="flex flex-col items-center py-16 gap-3 text-gray-400">
      <Star size={36} className="opacity-30" />
      <p className="text-sm">Browse services to see your top picks here</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((s, i) => {
        const meta  = TYPE_META[s.service_type] ?? TYPE_META.tour;
        const route = SERVICE_ROUTES[s.service_type] ?? "/";
        return (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => router.push(route)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer p-5 flex items-center gap-4 transition-all"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.color}`}>
              {meta.icon}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-800 text-sm">{meta.label}</p>
              <p className="text-xs text-gray-400">{s.visit_count} visit{s.visit_count !== 1 ? "s" : ""}</p>
            </div>
            <div className="ml-auto">
              <div className={`w-2 h-2 rounded-full ${meta.dot}`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Main profile page ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const router   = useRouter();
  const dispatch = useDispatch();
  const { user, token } = useSelector((s) => s.auth ?? {});
  const [tab, setTab] = useState("activity");

  useEffect(() => {
    if (!token) router.replace("/sign-in");
  }, [token]);

  if (!token || !user) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={28} className="animate-spin text-[#264787]" />
    </div>
  );

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const initials = [user.first_name?.[0], user.last_name?.[0]].filter(Boolean).join("").toUpperCase() || "U";

  const TABS = [
    { id: "activity", label: "My Activity", icon: <Activity size={15} /> },
    { id: "services", label: "Top Services", icon: <Star size={15} /> },
    { id: "profile",  label: "Profile",      icon: <User size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#264787] to-[#3b85c1] pt-10 pb-24 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-black shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white text-2xl font-black truncate">{fullName}</h1>
            <p className="text-white/70 text-sm">{user.email || user.phone}</p>
          </div>
          <button onClick={() => { dispatch(logout()); router.push("/"); }}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold transition">
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>

      {/* Card that overlaps the gradient */}
      <div className="max-w-4xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Tab bar */}
          <div className="flex border-b border-gray-100">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 flex-1 justify-center py-4 text-sm font-bold transition-all border-b-2 ${
                  tab === t.id
                    ? "border-[#264787] text-[#264787]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}>
                {tab === "activity" && <ActivityTab userId={user.id} />}
                {tab === "services" && <ServicesTab />}
                {tab === "profile"  && <ProfileTab user={user} dispatch={dispatch} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="h-16" />
    </div>
  );
}
