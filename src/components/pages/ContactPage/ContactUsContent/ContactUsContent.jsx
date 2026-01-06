import CustomHeading from '@/components/shared/CustomHeading/CustomHeading'
import Image from 'next/image'
import React from 'react'

export default function ContactUsContent() {
  return (
    <div className='container mt-[100px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-[90px]'>
            <div data-aos="fade-up-right">
                <Image src="/images/NoPath - Copy (41).webp" alt="contact-image" width={641} height={644}/>
            </div>
            <div
            data-aos="fade-up-left"
            className='flex flex-col gap-3'>
                <CustomHeading first_title={"Contact"} second_title={"Us"}/>
                <p className='text-[#000000] leading-relaxed !text-base 2xl:text-lg'>At Uno Travel, we specialize in crafting unforgettable travel experiences tailored to your desires. With deep industry expertise and a passion for exploration, we deliver seamless journeys that combine comfort, adventure, and personalized service. Get in touch and let’s plan your next great escape together.</p>
            </div>
        </div>
    </div>
  )
}
