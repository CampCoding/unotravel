"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Loader2, RefreshCw, ChevronRight, MapPin, Star,
  FileText, CreditCard, Car, ChevronDown, Phone, Mail, User,
  Calendar, Hash, ExternalLink,
} from "lucide-react";
import { _get } from "@/lib/shared/api";
import { apiRoutes } from "@/lib/shared/routes";
import MainBanner from "../../../components/shared/MainBanner/MainBanner";

const TYPE_META = {
  tour:    { label: "Tour",    color: "bg-blue-100 text-blue-700",     dot: "bg-blue-500",     icon: <MapPin size={13}/> },
  umrah:   { label: "Umrah",   color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", icon: <Star size={13}/> },
  offer:   { label: "Offer",   color: "bg-amber-100 text-amber-700",   dot: "bg-amber-500",    icon: <Star size={13}/> },
  visa:    { label: "Visa",    color: "bg-purple-100 text-purple-700", dot: "bg-purple-500",   icon: <FileText size={13}/> },
  payment: { label: "Payment", color: "bg-pink-100 text-pink-700",     dot: "bg-pink-500",     icon: <CreditCard size={13}/> },
  car:     { label: "Car",     color: "bg-orange-100 text-orange-700", dot: "bg-orange-500",   icon: <Car size={13}/> },
};

const STATUS_STYLE = {
  pending:       "text-amber-600 bg-amber-50 border-amber-200",
  confirmed:     "text-emerald-600 bg-emerald-50 border-emerald-200",
  completed:     "text-blue-600 bg-blue-50 border-blue-200",
  cancelled:     "text-red-600 bg-red-50 border-red-200",
  "in progress": "text-violet-600 bg-violet-50 border-violet-200",
};

const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-US", { day:"numeric", month:"short", year:"numeric" }) : null;
const fmtDateTime = (d) => d ? new Date(d).toLocaleString("en-US", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }) : null;

const FILTERS = [
  ["all","All Bookings"],
  ...Object.entries(TYPE_META).map(([k,v]) => [k, v.label]),
];

function DetailRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2 text-xs">
      <Icon size={12} className="text-gray-400 shrink-0 mt-0.5" />
      <span className="text-gray-500 shrink-0">{label}:</span>
      <span className="text-gray-800 font-semibold break-all">{value}</span>
    </div>
  );
}

function ActivityCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const meta   = TYPE_META[item.type] ?? TYPE_META.tour;
  const status = (item.status ?? "pending").toLowerCase();

  const extraFields = [
    item.full_name && { icon: User,     label: "Name",       value: item.full_name },
    item.phone     && { icon: Phone,    label: "Phone",      value: item.phone },
    item.email     && { icon: Mail,     label: "Email",      value: item.email },
    item.date      && { icon: Calendar, label: "Date",       value: fmtDate(item.date) },
    item.end_date  && { icon: Calendar, label: "Return",     value: fmtDate(item.end_date) },
    item.total_days && { icon: Calendar, label: "Days",      value: `${item.total_days} day${item.total_days !== 1 ? "s" : ""}` },
    item.meeting_option && { icon: MapPin, label: "Meeting", value: item.meeting_option },
    item.pickup_location && { icon: MapPin, label: "Pickup", value: item.pickup_location },
    item.dropoff_location && { icon: MapPin, label: "Drop-off", value: item.dropoff_location },
    item.gender    && { icon: User,     label: "Gender",     value: item.gender },
    item.age       && { icon: User,     label: "Age",        value: `${item.age}` },
    item.car_category && { icon: Car,  label: "Category",   value: item.car_category },
    item.currency  && item.total_price > 0 && { icon: Hash, label: "Currency",  value: item.currency },
    item.passport_expiry && { icon: Calendar, label: "Passport Exp.", value: fmtDate(item.passport_expiry) },
    item.notes     && { icon: FileText, label: "Notes",      value: item.notes },
    item.link      && { icon: ExternalLink, label: "Link",   value: item.link },
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      {/* Header row */}
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.color}`}>
            {meta.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">{item.title || `Booking #${item.id}`}</p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.color}`}>{meta.label}</span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${STATUS_STYLE[status] ?? STATUS_STYLE.pending}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              {item.date && <span className="text-[10px] text-gray-400">{fmtDate(item.date)}</span>}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {item.total_price > 0 && (
            <span className="text-sm font-black text-[#264787]">
              {Number(item.total_price).toLocaleString()} {item.currency ?? "USD"}
            </span>
          )}
          {item.travelers > 0 && (
            <span className="text-[10px] text-gray-400">👥 {item.travelers}</span>
          )}
        </div>
      </div>

      {/* Expandable details */}
      <div className="px-4 pb-3 flex items-center justify-between gap-2 border-t border-gray-50 pt-2">
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/track/${item.type}/${item.id}`)}
            className="flex items-center gap-1 text-[10px] font-bold text-[#264787] hover:text-[#3b85c1] transition"
          >
            <ExternalLink size={11} /> Track
          </button>
        </div>
        {extraFields.length > 0 && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition font-semibold"
          >
            {expanded ? "Less" : "Details"}
            <ChevronDown size={12} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-gray-50">
              <DetailRow icon={Hash}     label="Ref #"    value={`#${String(item.id).padStart(6,"0")}`} />
              {extraFields.map((f, i) => (
                <DetailRow key={i} icon={f.icon} label={f.label} value={f.value} />
              ))}
              <DetailRow icon={Calendar} label="Booked"   value={fmtDateTime(item.created_at)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MyActivitiesPage() {
  const router = useRouter();
  const { token } = useSelector((s) => s.auth ?? {});
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState("all");
  const [page,    setPage]    = useState(1);
  const [meta,    setMeta]    = useState(null);

  const load = (f = filter, p = page) => {
    if (!token) { setLoading(false); return; }
    setLoading(true);
    const params = new URLSearchParams({ limit: "12", page: String(p) });
    if (f !== "all") params.set("type", f);
    _get(`${apiRoutes.user_my_activity}?${params}`)
      .then(res => { setItems(res?.data?.data ?? []); setMeta(res?.data?.meta ?? null); })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load("all", 1); }, [token]);

  const changeFilter = (f) => { setFilter(f); setPage(1); load(f, 1); };
  const changePage   = (p) => { setPage(p); load(filter, p); };

  if (!token) return (
    <div className="min-h-screen">
      <MainBanner title="My Activity" subtitle="Track all your bookings in one place." />
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <Activity size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 mb-6">Sign in to view your booking history.</p>
        <button onClick={() => router.push("/sign-in")}
          className="px-8 py-3 bg-[#264787] text-white font-bold rounded-xl hover:bg-[#3b85c1] transition">
          Sign In
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MainBanner title="My Activity" subtitle="Track all your bookings in one place." />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(([k, label]) => (
            <motion.button key={k} whileTap={{ scale: 0.95 }}
              onClick={() => changeFilter(k)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                filter === k
                  ? "bg-[#264787] text-white border-[#264787]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#264787] hover:text-[#264787]"
              }`}>
              {label}
            </motion.button>
          ))}
          <button onClick={() => load(filter, page)}
            className="ml-auto p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-[#264787] transition">
            <RefreshCw size={13} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 gap-2 text-gray-400">
            <Loader2 size={22} className="animate-spin" /> Loading bookings…
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center py-20 gap-3 text-gray-400">
            <Activity size={44} className="opacity-20" />
            <p className="text-sm">No bookings found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <ActivityCard key={`${item.type}-${item.id}`} item={item} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && meta.pages > 1 && (
          <div className="flex justify-center gap-2 pt-6">
            {Array.from({ length: meta.pages }, (_, i) => i+1).map(p => (
              <button key={p} onClick={() => changePage(p)}
                className={`w-9 h-9 rounded-full text-sm font-bold transition ${
                  page === p ? "bg-[#264787] text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-[#264787]"
                }`}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
