"use client";
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "umrah_selected_package";

const UmrahContext = createContext();

export function UmrahProvider({ children }) {
  const [selectedPackage, setSelectedPackageState] = useState(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSelectedPackageState(JSON.parse(saved));
    } catch {}
  }, []);

  const setSelectedPackage = (pkg) => {
    setSelectedPackageState(pkg);
    try {
      if (pkg) localStorage.setItem(STORAGE_KEY, JSON.stringify(pkg));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <UmrahContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </UmrahContext.Provider>
  );
}

export function useUmrah() {
  return useContext(UmrahContext);
}
