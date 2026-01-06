"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import Image from "next/image";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import TourCard from "../../ToursDetails/TourCard/TourCard";

const availableTours = [
  {
    id: 1,
    image: "/images/download(5).jfif",
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ...",
    price: "200 $",
    actionText: "View Tour",
    liked: false,
  },
  {
    id: 2,
    image: "/images/download (3).jfif",
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ...",
    price: "200 $",
    actionText: "View Tour",
    liked: false,
  },
  {
    id: 3,
    image: "/images/default-image.jpg",
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ...",
    price: "200 $",
    actionText: "View Tour",
    liked: false,
  },
];

export default function OurOfferModal({ open, setOpen, data }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
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
            className="relative text-white !my-auto  max-w-[650px] w-full px-6 py-10 rounded-xl"
          >
            <CustomHeading
              first_title_class="!text-white"
              second_title_class="!text-[#3B85C1]"
              first_title="Available"
              second_title="Tours"
            />

            <div className="flex flex-col gap-[35px] mt-[35px]">
              {availableTours.map((item) => (
                <TourCard key={item?.id} item={item} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
