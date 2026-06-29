"use client";
import React, { useState } from "react";
import { Heart, Trash2, Eye, Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useUmrahFavorites } from "@/hooks/useUmrahFavorites";
import UmraPackageModal from "@/components/pages/OurServices/Umra/UmraPackages/UmraPackageModal/UmraPackageModal";
import MainBanner from "@/components/shared/MainBanner/MainBanner";

export default function UmrahFavoritesPage() {
  const { favorites, remove } = useUmrahFavorites();
  const [modalData, setModalData] = useState(null);

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <MainBanner title="My Favourites" subtitle="Umrah packages you saved for later." />

      <div className="container mx-auto px-4 py-10 max-w-5xl">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#264787]/10 flex items-center justify-center">
              <Heart size={18} className="text-[#264787]" fill="#264787" />
            </div>
            <div>
              <h2 className="font-black text-gray-900 text-lg">Saved Packages</h2>
              <p className="text-xs text-gray-400">{favorites.length} package{favorites.length !== 1 ? "s" : ""} saved</p>
            </div>
          </div>
          <Link href="/our-services/umrah"
            className="flex items-center gap-2 text-sm font-semibold text-[#264787] hover:text-[#3b85c1] transition">
            <ArrowLeft size={15} /> Browse All Packages
          </Link>
        </div>

        {/* Empty state */}
        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-[#264787]/8 flex items-center justify-center mb-5">
              <Heart size={32} className="text-[#264787]/30" />
            </div>
            <h3 className="text-xl font-black text-gray-700 mb-2">No favourites yet</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">
              Browse our Umrah packages and tap the ♥ icon to save packages here for easy access.
            </p>
            <Link href="/our-services/umrah"
              className="px-7 py-3 bg-[#264787] text-white font-black rounded-2xl hover:bg-[#1e3a6e] transition shadow-lg shadow-[#264787]/20">
              Browse Packages
            </Link>
          </div>
        )}

        {/* Cards grid */}
        {favorites.length > 0 && (
          <div className="flex flex-col gap-4">
            {favorites.map(pkg => {
              const price = Number(pkg?.price ?? 0);
              return (
                <div key={pkg.id}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow duration-300 border border-gray-100">

                  {/* Image */}
                  <div className="relative w-full sm:w-[180px] flex-shrink-0 h-[200px] sm:h-auto">
                    {pkg.image ? (
                      <img src={pkg.image} alt={pkg.title}
                        className="w-full h-full object-cover"
                        onError={e => { e.currentTarget.src = "/images/logo hover.svg"; }} />
                    ) : (
                      <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-[#264787]/15 to-[#3B85C1]/25 flex items-center justify-center">
                        <span className="text-4xl">🕋</span>
                      </div>
                    )}
                    {/* Remove from favorites */}
                    <button onClick={() => remove(pkg.id)}
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow hover:scale-110 transition group">
                      <Heart size={15} color="#FF5B5B" fill="#FF5B5B" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1 p-5 gap-3">
                    <div>
                      <h2 className="text-[#264787] font-black text-base sm:text-lg leading-snug mb-1">{pkg.title}</h2>
                      {pkg.subtitle && (
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{pkg.subtitle}</p>
                      )}
                    </div>

                    {(pkg.duration || pkg.travel_dates) && (
                      <div className="flex flex-wrap gap-2">
                        {pkg.duration && (
                          <span className="flex items-center gap-1 text-xs font-medium text-[#3B85C1] bg-[#3B85C1]/10 px-2.5 py-1 rounded-full">
                            <Clock size={11} /> {pkg.duration}
                          </span>
                        )}
                        {pkg.travel_dates && (
                          <span className="flex items-center gap-1 text-xs font-medium text-[#264787] bg-[#264787]/10 px-2.5 py-1 rounded-full">
                            <Calendar size={11} /> {pkg.travel_dates}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-400 block leading-none mb-0.5">Starting from</span>
                        <span className="text-[#3B85C1] font-black text-xl sm:text-2xl">
                          ${price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => remove(pkg.id)}
                          className="flex items-center gap-1.5 border border-red-200 text-red-400 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-semibold transition">
                          <Trash2 size={14} /> Remove
                        </button>
                        <button onClick={() => setModalData(pkg)}
                          className="flex items-center gap-2 bg-[#264787] hover:bg-[#3B85C1] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition">
                          <Eye size={15} /> View Tour
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalData && (
        <UmraPackageModal open={!!modalData} setOpen={() => setModalData(null)} data={modalData} />
      )}
    </div>
  );
}
