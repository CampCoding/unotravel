"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function Modal({ open, setOpen , className, children }) {
  return (
    <AnimatePresence>
     {open && 
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-50 bg-[#16294F]/50 backdrop-blur-md flex items-center justify-center overflow-x-hidden overflow-y-auto py-10"
      >
 <motion.div
            key="modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative text-white pt-100  max-w-[650px] w-full px-6 py-10 rounded-xl ${className}`}
          >

            {children}
          </motion.div>
        
      </motion.div>}
    </AnimatePresence>
  );
}
