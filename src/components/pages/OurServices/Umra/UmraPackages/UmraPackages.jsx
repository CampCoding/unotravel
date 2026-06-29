"use client";
import CustomHeading from '@/components/shared/CustomHeading/CustomHeading'
import React from 'react'
import Link from 'next/link';
import { Heart } from 'lucide-react';
import UmraPackage from './UmraPackage/UmraPackage';
import { useUmrahFavorites } from '@/hooks/useUmrahFavorites';

const FALLBACK_PACKAGES = [
  { id: 1, price: "1490", image_url: "/images/download (20).jfif", title: "Economy Umrah Package",    subtitle: "Comfortable stay near the Haram. Perfect for first-time pilgrims." },
  { id: 2, price: "1890", image_url: "/images/download (19).jfif", title: "Standard Umrah Package",   subtitle: "14-day balanced Umrah package with guided Ziyarat tours." },
  { id: 3, price: "2200", image_url: "/images/download (18).jfif", title: "Premium Umrah Package",    subtitle: "21-day luxury experience with 5-star hotels and VIP services." },
  { id: 4, price: "2600", image_url: "/images/download (17).jfif", title: "VIP Umrah Experience",     subtitle: "Exclusive services for a truly spiritual and comfortable journey." },
];

const getT = (pkg, langId) =>
  pkg?.translations?.find(t => t.language_id === Number(langId)) ||
  pkg?.translations?.[0] || {};

export default function UmraPackages({ packages, langId }) {
  const { favorites } = useUmrahFavorites();
  const hasReal = packages?.length > 0;

  const items = hasReal
    ? packages.map(pkg => {
        const t = getT(pkg, langId);
        let costs = [];
        try { costs = JSON.parse(t.costs_list || "[]"); } catch { costs = []; }
        return {
          id:       pkg.id,
          price:    pkg.price,
          image:    pkg.image_url,
          title:    t.title       || "",
          subtitle: t.description || "",
          costs,
          duration:     pkg.duration,
          travel_dates: pkg.travel_dates,
          package_title: t.title || "",
        };
      })
    : FALLBACK_PACKAGES;

  return (
    <div className='container mt-10'>
      <div data-aos="fade-up" className="flex items-center justify-between flex-wrap gap-3">
        <CustomHeading first_title={"Umrah"} second_title={"Packages"} />
        {favorites.length > 0 && (
          <Link href="/our-services/umrah/favorites"
            className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 text-red-500 rounded-xl text-sm font-bold hover:bg-red-100 transition">
            <Heart size={15} fill="#ef4444" color="#ef4444" />
            My Favourites
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">
              {favorites.length}
            </span>
          </Link>
        )}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 mt-10 gap-[10px]'>
        {items.map(item => (
          <UmraPackage key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
