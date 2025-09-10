"use client";
import Image from 'next/image';
import React from 'react'

const data = [
    
    {
        id:1,
        image: "/images/Group 55212.svg",
        title:"Easy & Fast Booking",
        desc:"Search, compare and book your tickets at the lowest fares."
    },
    {
        id:2,
        image: "/images/Group 55216.svg",
        title:"Trustly online bank payments",
        desc:"With Trustly's direct bank payment online, payments go directly from account to account - without a card, app download or registration requirement."
    },
    {
        id:3,
        image: "/images/Group 55214.svg",
        title:"Multi Payment Option",
        desc:"Choose how you want to pay for your bookings."
    },
]

export default function AboutStatistics() {
  return (
    <div className="container mt-[100px]">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[100px]'>
            {data?.map(item => 
                <div
                data-aos ="fade-up"
                data-aos-delay={item?.id * 100}
                key={item?.id}
                className='flex flex-col gap-[25px]'>
                <Image className='mx-auto' src={item?.image} width={101} height={101} alt={item?.title}/>
                <div className='flex flex-col'>
                    <p className='text-lg text-center 2xl:text-[24px] !font-bold text-[#16294F]'>{item?.title}</p>
                    <p className='!text-base text-center 2xl:text-[20px] !font-normal text-[#16294F]'>{item?.desc}</p>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}
