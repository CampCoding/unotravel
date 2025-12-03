"use client";

import React from 'react'
import { CheckCircle} from 'lucide-react'
import { motion } from "framer-motion";
export default function Page() {
  return (
    <div className='p-5 container mx-auto py-4 lg:py-[29px]'>

     <motion.div 
 initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
 className="flex flex-col items-center p-8 justify-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl mb-8 border border-indigo-100">
      <div className="bg-indigo-100 p-4 rounded-full mb-4">
        <CheckCircle className="text-indigo-600" size={32} />
      </div>
      <h2 className='text-2xl font-[filson-bold] !text-[var(--main-light-color)] mb-2'> Your Application Has Been Submitted</h2>
      <p className='text-gray-600 font-[filson-regular] text-center max-w-md'>
         We’ve received your application and it’s currently under review.  
        Our team will contact you soon after verifying your information.  
        Thank you for choosing our Umrah services 🤍
      </p>
      <div className="">
        {/* <div className="w-12 h-12 border-4 border-[var(--main-light-color)] border-t-transparent rounded-full animate-spin mx-auto"></div> */}
        <p className="mt-4 text-gray-500 text-sm">Reviewing your information...</p>
      </div>
    </motion.div>
    </div>
  )
}
