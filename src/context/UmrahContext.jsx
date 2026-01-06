"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetLayoutData } from "../lib/features/layoutSlice";
import { Hourglass } from "react-loader-spinner";

const UmrahContext = createContext();

export function UmrahProvider({ children }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const dispatch = useDispatch();

  return (
    <UmrahContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </UmrahContext.Provider>
  );
}

export function useUmrah() {
  return useContext(UmrahContext);
}
