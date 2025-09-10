"use client";
import ProfileSettingsModal from "@/components/pages/auth/ProfileSettingsModal/ProfileSettingsModal";
import {
  ChevronDown, ClockFading, DollarSign, FileCog, Info, LogOut,
  MessageCircleDashed, ShieldUser, User, UserRoundPlus, Menu, X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const links = [
  { id: 1, name: "Home", route: "/" },
  { id: 2, name: "Low Fare Flight", route: "/fare-flight" },
  { id: 3, name: "Our Offers", route: "/our-offers" },
  {
    id: 4, name: "Our Services", route: "/our-services",
    children: [
      { id: 1, name: "Search Flights", img: "/images/Search Flights-2.svg", route: "/" },
      { id: 2, name: "Hotel Booking", img: "/images/Hotels Booking-2.svg", route: "/" },
      { id: 3, name: "Get a Helicopter", img: "/images/Get A Helicopter-2.svg", route: "/" },
      { id: 4, name: "Rent a Car", img: "/images/Rent A Car-2.svg", route: "/" },
      { id: 5, name: "International Tours", img: "/images/International Tours-2.svg", route: "/our-offers" },
      { id: 6, name: "Get A Ride", img: "/images/Get A Ride-2.svg", route: "/" },
      { id: 7, name: "Airport Services", img: "/images/Airport Services.svg", route: "/" },
      { id: 8, name: "Visa Services", img: "/images/Visa Services-2.svg", route: "/" },
      { id: 9, name: "Umrah", img: "/images/Umrah-2.svg", route: "/our-services/umrah" },
      { id: 10, name: "Online Payment", img: "/images/Online Payment-2.svg", route: "/" },
    ],
  },
  { id: 5, name: "About Us", route: "/about-us" },
  { id: 6, name: "Contact Us", route: "/contact-us" },
];

const languages = [
  { code: "en", name: "English", flag: "/images/flag-1.webp" },
  { code: "sv", name: "Swedish", flag: "/images/Flag_of_Sweden.svg" },
  { code: "ar", name: "Arabic", flag: "/images/Flag_of_Lebanon.svg.png" },
];

const profile_drop_down = [
  { id: 1, name: "My Activities", route: "/", icon: <ClockFading size={18} className="text-[#3B85C1]" /> },
  { id: 2, name: "Currency", route: "/", icon: <DollarSign size={18} className="text-[#3B85C1]" />, suffix: "EUR ▾" },
  { id: 3, name: "Profile Setting", route: "/profile-settings", icon: <UserRoundPlus size={18} className="text-[#3B85C1]" /> }, // opens modal
  { id: 4, name: "Support", route: "/", icon: <MessageCircleDashed size={18} className="text-[#3B85C1]" /> },
  { id: 5, name: "About Us", route: "/about-us", icon: <Info size={18} className="text-[#3B85C1]" /> },
  { id: 6, name: "Terms & Conditions", route: "/terms-condition", icon: <FileCog size={18} className="text-[#3B85C1]" /> },
  { id: 7, name: "Privacy Policy", route: "/privacy", icon: <ShieldUser size={18} className="text-[#3B85C1]" /> },
  { id: 8, name: "Sign Out", route: "/logout", danger: true, icon: <LogOut size={18} className="text-[#3B85C1]" /> },
];

export default function Header() {
  const pathname = usePathname();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openProfileSetting, setProfileSetting] = useState(false);

  const langMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const currentLang = languages.find((lang) => lang.code === selectedLang) || languages[0];

  // Helper: close all menus
  const closeAllMenus = () => {
    setOpenDropdownId(null);
    setIsProfileOpen(false);
    setLangMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) setLangMenuOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenDropdownId(null);
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) setIsMobileMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setIsMobileMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full">
      <div className="flex container mx-auto py-4 lg:py-[29px] justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/Group 47503.webp"
            width={333}
            height={55}
            alt="Main Logo"
            className="h-6 sm:h-7 md:h-9 lg:h-[55px] w-auto"
          />
        </div>

        <div className="flex items-center justify-between gap-4 xl:gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-between gap-4 xl:gap-6">
            {links.map((item) =>
              item.children && item.children.length > 0 ? (
                <div key={item.id} className="relative" ref={dropdownRef}>
                  <div
                    className="flex gap-[6px] justify-center items-center cursor-pointer"
                    onClick={() => setOpenDropdownId((prev) => (prev === item.id ? null : item.id))}
                  >
                    <p
                      className={`${pathname === item.route ? "text-[var(--main-light-color)]" : "text-[var(--main-dark-color)]"} !text-sm xl:!text-base my-auto whitespace-nowrap capitalize`}
                    >
                      {item.name}
                    </p>
                    <ChevronDown size={15} color="#264787" />
                  </div>

                  {openDropdownId === item.id && (
                    <div className="absolute top-10 left-0 mt-2 bg-white border border-[#3B85C1] rounded-[7px] p-6 w-[280px] shadow-md z-50">
                      <div className="grid grid-cols-1 gap-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.route}
                            className="flex gap-[13px] items-center hover:bg-[#F5F5F5] p-2 rounded-[5px] transition"
                            onClick={closeAllMenus} // close on click
                          >
                            <img src={child.img} className="w-6 h-5 object-cover" alt={child.name} />
                            <span className="text-black text-base">{child.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.id}
                  href={item.route}
                  className={`${pathname === item.route ? "!text-[var(--main-light-color)]" : "!text-[var(--main-dark-color)]"} text-sm xl:text-base capitalize whitespace-nowrap`}
                  onClick={closeAllMenus} // close on click
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <Image
                src={currentLang.flag}
                width={33} height={22} alt="Selected language flag"
                className="object-cover cursor-pointer w-6 h-4 sm:w-8 sm:h-5 lg:w-[33px] lg:h-[22px]"
                onClick={() => setLangMenuOpen((prev) => !prev)}
              />
              {langMenuOpen && (
                <div className="bg-white p-[25px_36px] w-[198px] absolute z-40 right-0 top-8 lg:top-10 h-auto border border-[#3B85C1] rounded-[7px] flex flex-col gap-3">
                  {languages.map((lang) => {
                    const isCurrent = selectedLang === lang.code;
                    return isCurrent ? (
                      <p key={lang.code} className="flex w-full mb-0 pb-0 justify-between items-center">
                        <span className="text-[#3B85C1] font-bold text-lg">{lang.name}</span>
                        <span className="text-[14px] text-[#16294F]">(Current)</span>
                      </p>
                    ) : (
                      <button
                        key={lang.code}
                        className="flex justify-between items-center cursor-pointer w-full"
                        onClick={() => { setSelectedLang(lang.code); closeAllMenus(); }} // close after selection
                      >
                        <span className="text-[#16294F] text-lg">{lang.name}</span>
                        <Image src={lang.flag} width={34} height={22} alt={`${lang.name} flag`} className="object-cover" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <div
                className="w-8 h-8 lg:w-[36px] lg:h-[36px] bg-[#ECECEC] rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <User size={16} className="lg:w-5 lg:h-5" color="#264787" />
              </div>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-3 w-[260px] bg-white border border-[#3B85C1] shadow-md rounded-[7px] p-4 z-50">
                  <ul className="flex m-0 p-0 flex-col gap-[27px]">
                    {profile_drop_down.map((item) => {
                      const isProfileSettings = item.id === 3;
                      if (isProfileSettings) {
                        return (
                          <li key={item.id}>
                            <button
                              className="flex items-center gap-[17px] w-full hover:text-[#3B85C1]"
                              onClick={() => { closeAllMenus(); setProfileSetting(true); }} // close menus, open modal
                            >
                              {item.icon}
                              <span className="text-sm xl:text-base text-black">{item.name}</span>
                            </button>
                          </li>
                        );
                      }
                      return (
                        <li
                          key={item.id}
                          className={`${item.danger ? "text-red-500 hover:text-red-700" : "hover:text-[#3B85C1]"}`}
                        >
                          <Link
                            href={item.route}
                            className="flex items-center gap-[17px] w-full"
                            onClick={closeAllMenus} // close on click
                          >
                            {item.icon}
                            <span className="text-sm xl:text-base flex-1 text-black">{item.name}</span>
                            {item.suffix && <span className="text-sm xl:text-base font-bold text-black">{item.suffix}</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <button
              className="lg:hidden p-2 text-[#264787]"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden" ref={mobileMenuRef}>
          <div className="bg-white backdrop-blur-2xl border-top border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {links.map((item) =>
                  item.children && item.children.length > 0 ? (
                    <div key={item.id}>
                      <button
                        className="flex gap-2 justify-between items-center cursor-pointer w-full"
                        onClick={() => setOpenDropdownId((prev) => (prev === item.id ? null : item.id))}
                      >
                        <p
                          className={`!p-0 !m-0 ${pathname === item.route ? "text-[var(--main-light-color)]" : "text-[var(--main-dark-color)]"} text-base capitalize`}
                        >
                          {item.name}
                        </p>
                        <ChevronDown
                          size={15}
                          color="#264787"
                          className={`transition-transform ${openDropdownId === item.id ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openDropdownId === item.id && (
                        <div className="pl-4 bg-gray-50 rounded-md p-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              href={child.route}
                              className="flex gap-3 items-center p-2 rounded-md hover:bg-white transition"
                              onClick={closeAllMenus} // close on click
                            >
                              <img src={child.img} className="w-5 h-4 object-cover" alt={child.name} />
                              <span className="text-black text-sm">{child.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.id}
                      href={item.route}
                      className={`${pathname === item.route ? "!text-[var(--main-light-color)]" : "!text-[var(--main-dark-color)]"} text-base capitalize py-2 block`}
                      onClick={closeAllMenus} // close on click
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      )}

      <ProfileSettingsModal open={openProfileSetting} setOpen={setProfileSetting} />
    </header>
  );
}
