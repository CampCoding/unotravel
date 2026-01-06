"use client"
import React from 'react'
import { Info, Check , ArrowRight } from 'lucide-react';
export default function Instractions({setActiveTab}) {
  return (
    <div className="p-4 pt-0 w-[100%]">
      <div className="p-4 border-2 border-gray-200 bg-white !rounded-lg">
        <div class="grid grid-cols-1 gap-4 mb-4">
          <div class="flex  p-4 justify-start gap-3 items-center h-24 rounded-sm  ">
            <span className='bg-[#c1daef] p-3 !rounded-lg'>< Info className='text-[var(--main-light-color)]' /></span>
            <h2 className='text-[var(--main-dark-color)] font-[var(--font-filson-bold)] text-lg'>Instructions & Requirements</h2>

          </div>
          <div>

            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-9">
              <div className='flex flex-col space-y-5'>
                <h3 className='text-lg text-[var(--main-dark-color)] font-[var(--font-filson-bold)]' >Required Documents</h3>
                <ul className='space-y-3'>
                  <div className='flex gap-2 items-center'>
                    <span><Check size={18} className='text-green-300' /></span>
                    <li className='text-[var(--main-dark-color)]'>Valid passport (6+ months validity)</li>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <span><Check size={18} className='text-green-300' /></span>
                    <li className='text-[var(--main-dark-color)]'>Recent passport-sized photographs</li>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <span><Check size={18} className='text-green-300' /></span>
                    <li className='text-[var(--main-dark-color)]'>Bank statements (3 months)</li>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <span><Check size={18} className='text-green-300' /></span>
                    <li className='text-[var(--main-dark-color)]'>Travel itinerary</li>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <span><Check size={18} className='text-green-300' /></span>
                    <li className='text-[var(--main-dark-color)]'>Hotel booking confirmation</li>
                  </div>
                </ul>
              </div>

              <div className='flex flex-col space-y-5'>
                <h3 className='text-[var(--main-dark-color)] font-[var(--font-filson-bold)] text-lg'>Important Notes</h3>
                <div className='flex flex-col space-y-3'>
                  <div className='px-5 py-3 w-full bg-amber-100/50 text-amber-950 border-l-4 border-amber-400 font-[var(--font-filson-regular)]'>
                    Processing time: 5-10 business days
                  </div>
                  <div className='px-5 py-3 w-full bg-blue-100/50 text-blue-950 border-l-4 border-blue-400 font-[var(--font-filson-regular)]'>
                    Ensure all documents are in English or translated
                  </div>
                  <div className='px-5 py-3 w-full bg-red-100/50 text-red-950 border-l-4 border-red-400 font-[var(--font-filson-regular)]'>
                    Incomplete applications will be rejected
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className='flex my-4 justify-end items-center'>
           <button onClick={()=>setActiveTab('Application Form')}  className='flex gap-2 text-sm items-center cursor-pointer text-blue-50 px-4 !rounded-lg py-2 bg-[var(--main-light-color)] hover:bg-[var(--main-dark-color)] hover:scale-105 transition-all'> <ArrowRight/> Continue to Application </button>
          </div>
           
         
        </div>
        
      </div>
    </div>
  )
}
