"use client";
import { CalendarDays, MapPin, User } from 'lucide-react';
import React, { useState } from 'react'
import {motion} from 'framer-motion';

const pricing_tabs = [
  {
    id:1,
    label:"Economy",
    value:"economy"
  },
  {
    id:2,
    label:"Business Class",
    value:"business_class"
  },
  {
    id:3,
    label:"First Class",
    value:"first_class"
  }
]

export default function FareFlightPricing() {
  const [activeTab , setActiveTab] = useState(2);
  return (
    <div 
    data-aos="fade-up"
    className='p-5 py-8 rounded-3xl  bg-white shadow-2xl border border-gray-100 '>
      <div className='tabs bg-gray-200 w-fit mx-auto flex gap-4 items-center rounded-full p-2 px-3'>
          {pricing_tabs?.map(item => 
            <button 
            onClick={() => setActiveTab(item?.id)}
            className={`text-gray-500  text-[11px]! md:text-[14px]! lg:text-base! md:w-[100px] lg:min-w-[200px]! ${activeTab == item?.id?"rounded-full! p-1 md:p-2 lg:p-3 bg-(--main-dark-color) text-white transition-all duration-150" : "bg-transparent"}`}>{item?.label}</button>
          )}
      </div>

      {<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-4'>
          <div className='flex gap-3 items-center'>
            <div className='bg-gray-400/10 w-12 h-16 flex justify-center items-center rounded-2xl'>
              <MapPin class='text-black'/>
            </div>
            <div className='flex flex-col'>
              <h2 className="font-bold text-base! md:text-lg! lg:text-2xl! pb-0 mb-0">Location</h2>
              <p className='text-gray-400 font-medium pb-0 mb-0'>Where are you going?</p>
            </div>
          </div>

            <div className='flex gap-3 items-center'>
            <div className='bg-gray-400/10 w-12 h-16 flex justify-center items-center rounded-2xl'>
              <User class='text-black'/>
            </div>
            <div className='flex flex-col'>
              <h2 className="font-bold text-base! md:text-lg! lg:text-2xl! pb-0 mb-0">Traveles</h2>
              <p className='text-gray-400 font-medium pb-0 mb-0'>Add Guest</p>
            </div>
          </div>


            <div className='flex gap-3 items-center'>
            <div className='bg-gray-400/10 w-12 h-16 flex justify-center items-center rounded-2xl'>
              <CalendarDays class='text-black'/>
            </div>
            <div className='flex flex-col'>
              <h2 className="font-bold text-base! md:text-lg! lg:text-2xl! pb-0 mb-0">Check In</h2>
              <p className='text-gray-400 font-medium pb-0 mb-0'>Add Date</p>
            </div>
          </div>

            <div className='flex gap-3 items-center'>
            <div className='bg-gray-400/10 w-12 h-16 flex justify-center items-center rounded-2xl'>
              <CalendarDays class='text-black'/>
            </div>
            <div className='flex flex-col'>
              <h2 className="font-bold text-base! md:text-lg! lg:text-2xl! pb-0 mb-0">Check Out</h2>
              <p className='text-gray-400 font-medium pb-0 mb-0'>Add Date</p>
            </div>
          </div>
        </div>}
    </div>
  )
}
