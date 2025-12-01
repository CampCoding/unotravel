// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Car, Diamond, DollarSign, Flag, Star } from 'lucide-react';
// import { carData } from '../../../../utils/data';
// import CarReservationCard from '../CarReservationCard/CarReservationCard';

// // --- Animation variants (Added exit for filtering) ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       delayChildren: 0.2,
//       staggerChildren: 0.12,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 30, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.7,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
//   // New exit variant for AnimatePresence
//   exit: {
//     y: -30, // Move up slightly
//     opacity: 0, // Fade out
//     transition: {
//       duration: 0.3,
//     }
//   }
// };

// const imageVariants = {
//   hidden: { scale: 1.3, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 1,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };




// const FilterBar = ({ activeFilter, setActiveFilter }) => {
//   const filters = [
//     { name: 'All', icon: Car, color: 'text-gray-900' },
//     { name: 'Economy', icon: DollarSign, color: 'text-green-500' },
//     { name: 'Sedan', icon: Flag, color: 'text-red-500' },
//     { name: 'Premium', icon: Diamond, color: 'text-indigo-500' },
//     { name: 'Popular', icon: Star, color: 'text-amber-500' },
//   ];

//   // Animation for the individual button when selected/deselected
//   const buttonMotion = {
//     whileHover: { scale: 1.05, y: -2 },
//     whileTap: { scale: 0.95 },
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.3 }}
//       className="flex flex-wrap gap-4 mb-10 p-2 bg-gray-100 rounded-3xl shadow-inner max-w-fit"
//     >
//       {filters.map((filter) => {
//         const isActive = activeFilter === filter.name;

//         return (
//           <motion.button
//             key={filter.name}
//             {...buttonMotion}
//             onClick={() => setActiveFilter(filter.name)}
//             // Enhanced Styling: Use a distinct background and smooth transition for the active state
//             className={`
//                             px-5 py-2.5 rounded-2xl! font-semibold transition-all duration-300
//                             flex items-center gap-2 text-base whitespace-nowrap
//                             ${isActive
//                 ? 'bg-white text-[#264787] shadow-lg ring-4 ring-[#3b85c1]/20' // Active state is bright white with a shadow/ring
//                 : 'bg-transparent text-gray-600 hover:bg-white/50 hover:text-[#264787]/90' // Inactive state is transparent, subtle hover
//               }
//                         `}
//           >
//             {/* Icon component is rendered dynamically */}
//             <filter.icon
//               className={`w-5 h-5 transition-colors duration-300 ${isActive ? filter.color : 'text-gray-500'
//                 }`}
//             />
//             {filter.name}
//           </motion.button>
//         );
//       })}
//     </motion.div>
//   );
// };



// // --- Main Component ---
// export default function CarReservationData() {
//   const [activeFilter, setActiveFilter] = useState('All');

//   const filteredCars = carData.filter(car => {
//     if (activeFilter === 'All') return true;
//     if (activeFilter === 'Popular') return car.popular;
//     return car.category.toLowerCase() === activeFilter.toLowerCase();
//   });

//   return (
//     <div
//       id="cars"
//       className="min-h-screen">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {/* Hero Section (Remains the same) */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="mb-16"
//         >
//           <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-none">
//             Find Your Perfect
//             <span className="block bg-gradient-to-r from-[#264787] via-[#3b85c1] to-[#264787] bg-clip-text text-transparent mt-2">
//               Ride Today
//             </span>
//           </h1>
//           <p className="text-2xl text-gray-600 max-w-3xl leading-relaxed">
//             Choose from our premium fleet of well-maintained vehicles for your perfect journey. Quality, comfort, and reliability guaranteed.
//           </p>
//         </motion.div>

//         {/* Filter Bar */}
//         <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

//         {/* Results Count */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-gray-600 font-semibold mb-6 text-lg"
//         >
//           Showing <span className="text-[#264787] font-black">{filteredCars.length}</span> {filteredCars.length === 1 ? 'vehicle' : 'vehicles'}
//         </motion.p>

//         <motion.div
//           // Replaced containerVariants with a simple stagger approach for initial load + filter transition
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//           className="space-y-10"
//         >
//           <AnimatePresence mode="popLayout">
//             {filteredCars.map((car) => (
//               <CarReservationCard car={car} key={car?.id} imageVariants={imageVariants} itemVariants={itemVariants}/>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//       </div>

//       {/* Decorative Background Elements */}
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
//         <div className="absolute top-20 right-10 w-96 h-96 bg-[#3b85c1]/5 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#264787]/5 rounded-full blur-3xl" />
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Diamond, DollarSign, Flag, Star } from "lucide-react";
import { carData } from "../../../../utils/data";
import CarReservationCard from "../CarReservationCard/CarReservationCard";

// --- Animation variants (Added exit for filtering) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    y: -30,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const imageVariants = {
  hidden: { scale: 1.3, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Filter bar
const FilterBar = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { name: "All", icon: Car, color: "text-gray-900" },
    { name: "Economy", icon: DollarSign, color: "text-green-500" },
    { name: "Sedan", icon: Flag, color: "text-red-500" },
    { name: "Premium", icon: Diamond, color: "text-indigo-500" },
    { name: "Popular", icon: Star, color: "text-amber-500" },
  ];

  const buttonMotion = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="
        inline-flex items-center flex-nowrap
        gap-3 sm:gap-4
        p-2 bg-gray-100 rounded-3xl shadow-inner
      "
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.name;

        return (
          <motion.button
            key={filter.name}
            {...buttonMotion}
            onClick={() => setActiveFilter(filter.name)}
            className={`
              px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl! font-semibold
              transition-all duration-300
              flex items-center gap-2
              text-xs sm:text-sm md:text-base whitespace-nowrap
              ${
                isActive
                  ? "bg-white text-[#264787] shadow-lg ring-4 ring-[#3b85c1]/20"
                  : "bg-transparent text-gray-600 hover:bg-white/50 hover:text-[#264787]/90"
              }
            `}
          >
            <filter.icon
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                isActive ? filter.color : "text-gray-500"
              }`}
            />
            {filter.name}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

// --- Main Component ---
export default function CarReservationData() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCars = carData.filter((car) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Popular") return car.popular;
    return car.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section
      id="cars"
      className="relative py-12 sm:py-16 lg:py-24 bg-transparent"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 sm:top-20 right-0 sm:right-10 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#3b85c1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 left-0 sm:left-10 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#264787]/5 rounded-full blur-3xl" />
      </div>

      <div className=" md:max-w-7xl mx-auto  sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight">
            <span className="block">Find Your Perfect</span>
            <span className="block bg-gradient-to-r from-[#264787] via-[#3b85c1] to-[#264787] bg-clip-text text-transparent mt-2">
              Ride Today
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl md:max-w-3xl leading-relaxed">
            Choose from our premium fleet of well-maintained vehicles for your
            perfect journey. Quality, comfort, and reliability are always
            guaranteed.
          </p>
        </motion.div>

        {/* Filter Bar (wrapped for horizontal scroll on mobile) */}
        <div className="w-full overflow-x-auto pb-3 mb-6 sm:mb-8">
          <FilterBar
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs sm:text-sm md:text-lg text-gray-600 font-semibold mb-4 sm:mb-6"
        >
          Showing{" "}
          <span className="text-[#264787] font-black">
            {filteredCars.length}
          </span>{" "}
          {filteredCars.length === 1 ? "vehicle" : "vehicles"}
        </motion.p>

        {/* Cars List */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 sm:space-y-8 lg:space-y-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <CarReservationCard
                key={car?.id}
                car={car}
                imageVariants={imageVariants}
                itemVariants={itemVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
