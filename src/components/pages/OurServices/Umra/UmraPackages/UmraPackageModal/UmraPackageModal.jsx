"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUmrah } from "@/context/UmrahContext";
export default function UmraPackageModal({ open, setOpen, data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const { setSelectedPackage } = useUmrah(); 
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  
  const handleRegister = () => {
    const packageData = {
      name: "Umrah Packages Name Sample",
      image: "/images/download (19).jfif",
      duration: "Ten days",
      date: "From 24/10/2024 to 03/11/2024",
      costs: [
        "In a quadruple room: 20,900 kr per person",
        "In a triple room: 22,500 kr per person",
        "In a double room: 23,900 kr per person",
      ],
      totalPrice: 250,
    };

    setSelectedPackage(packageData);
    router.push("/umrah-register");
  };
  useEffect(() => {
    open
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }, [open]);

  if (!open) {
    return null;
  }
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
            className="relative !w-[1000px] mx-2 md:mx-5 !my-auto gap-10 mt-60 !bg-[#F5F6FA] !rounded-xl flex flex-wrap md:!flex-nowrap justify-center  items-center  text-white px-6 py-10"
          >
            <img
              src="/images/download (19).jfif"
              className=" object-cover w-full lg:w-[400px]  h-[400px] !rounded-xl"
            />
            <div className="flex flex-col">
              <div className="flex   flex-wrap lg:!flex-nowrap gap-2 lg:!gap-20 items-center">
                <h2 className="!text-[#264787] !font-bold !text-lg sm:!text-2xl">
                  Umrah Packages Name Sample
                </h2>
                <button
                  onClick={toggleFavorite}
                  className={`w-[50px] h-[50px] !rounded-full flex justify-center items-center
                 bg-[#e4e6ec]
               transition`}
                >
                  <Heart
                    color={!isFavorite ? "white" : "#FF5B5B"}
                    fill={!isFavorite ? "#fff" : "#FF5B5B"}
                  />
                </button>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="flex items-center mt-5 justify-between"
              >
                <div className="flex  !items-center gap-[10px]">
                  <img src="/images/Adult's.svg" className="" />
                  <p className=" my-auto  font-[filson-bold-italic] text-[#264787] !text-base 2xl:!text-[20px]">
                    Adult's
                  </p>
                </div>

                <div className="flex min-w-[70px] md:min-w-[96px] h-[30px] justify-around items-center text-white bg-[#3B85C1] rounded-[30px]">
                  <button className="text-md md:!text-lg 2xl:!text-2xl">+</button>
                  <p className="font-bold text-md md:!text-lg 2xl:!text-2xl m-0 p-0">2</p>
                  <button className="text-md md:!text-lg 2xl:!text-2xl">-</button>
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay={100}
                className="!max-h-[300px] mt-6 flex flex-col gap-4 overflow-y-auto"
              >
                <div className="flex flex-col">
                  <h2 className="!font-bold text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    Trip Specifications:
                  </h2>
                  <p className="!font-normal text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    - Duration: Ten days{" "}
                  </p>
                  <p className="!font-normal text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    - From 24/10/2024 to 03/11/2024
                  </p>
                </div>

                <div className="flex flex-col">
                  <h2 className="!font-bold text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    Trip Costs:
                  </h2>
                  <p className="!font-normal text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    - In a quadruple room: 20,900 kr per person
                  </p>
                  <p className="!font-normal text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    - In a triple room: 22,500 kr per person
                  </p>
                  <p className="!font-normal text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    - In a double room: 23,900 kr per person.
                  </p>
                </div>

                <div className="flex items-center">🛫🛫🕋🏝🏨</div>
                <div className="flex flex-col">
                  <h2 className="!font-bold text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    24/10:
                  </h2>
                  <p className="!font-normal text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    Gather at the airport and travel to Jeddah Airport, then to
                    Mecca 🕋. Proceed to the hotel to check into the rooms at
                    (Imaar Grand Mecca Hotel with 🍽 open buffet breakfast).
                  </p>
                  <p className="!font-normal text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    [Video Link](https://youtu.be/JmUkKnsnPU4){" "}
                  </p>
                </div>

                <div className="flex flex-col">
                  <h2 className="!font-bold text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    25/10:
                  </h2>
                  <p className="!font-normal text-black  m-0 p-0 !text-[14px] 2xl:!text-base">
                    Gather at the hotel reception at 00:00 to head to the Sacred
                    Mosque 🕋🕋 for performing the rituals of Umrah
                  </p>
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay={200}
                className="w-full rounded-xl bg-[#3B85C1]  my-4 p-[27px] text-white flex !justify-between !items-center"
              >
                <p className="text-white !my-auto !text-sm 2xl:!text-[17px]">
                  Total Price (Including Tax)
                </p>
                <p className="!text-xl  !my-auto 2xl:!text-10">
                  <span className="font-bold !text-xl 2xl:!text-10">250</span>$
                </p>
              </div>

              <button
               onClick={handleRegister}
                data-aos="fade-up"
                data-aos-delay={300}
                className="bg-[#264787] !font-[filson-bold] !rounded-[37px] flex justify-center items-center h-[60px] text-white text-xl 2xl:!text-[28px]"
              >
                Register Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
