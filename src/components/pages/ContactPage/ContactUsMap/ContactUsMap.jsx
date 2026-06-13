import CustomHeading from '@/components/shared/CustomHeading/CustomHeading'
import React from 'react'

export default function ContactUsMap() {
  return (
    <div className='container mt-20'>
        <CustomHeading first_title={"Visit"} second_title={"Us"}/>
       <div className="grid grid-cols-2 items-stretch! gap-7">
         <iframe
        data-aos="fade-up"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1713.4790645784678!2d30.970042940261838!3d30.80380848040875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1753540375154!5m2!1sen!2seg" 
        className='w-full mt-4 rounded-xl' height="100%"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

        <div className="flex flex-col gap-1">
          <h6 className="text-[#264787]! font-bold! text-2xl!">Contact <span className="text-(--main-light-color)">Us</span></h6>

          <div>
            <p className="text-(--main-dark-color) mb-0! pb-0! font-medium">Main Branch</p>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Uno Travel Sweden LLC, Arlanda Airport,<br />
                Sky City, Stockholm, Sweden
              </p>
          </div>

           <div>
            <p className="text-(--main-dark-color) mb-0! pb-0! font-medium">Call Center : </p>
            <div className="flex flex-col gap-0! mt-3">
              <div className="flex p-0! m-0! justify-between items-center!">
                <div className="flex! p-0! m-0!  gap-1 items-center!">
                  <img src="https://www.worldometers.info/images/flags/original/de.webp" className="w-4 h-4"/>
                  <p className=" flex justify-center! text-sm! text-[#264787]! m-0! p-0! items-center!">Germany :</p>
                </div>
                <a href="tel:+4961048099956" className="hover:text-[#3b85c1] text-sm!  transition-colors">+49 6104 8099956</a>
              </div>

              <div className="flex justify-between items-center">
              <div className="flex!  gap-1 items-center!">
                  <img src="https://www.worldometers.info/images/flags/original/gb.webp" className="w-4 h-4"/>
                  <p className=" flex justify-center! text-sm! text-[#264787]! m-0! p-0! items-center!">United Kingdom: :</p>
                </div>
                <a href="tel:+4961048099956" className="hover:text-[#3b85c1] text-sm!  transition-colors">+44 844 986 1343</a>
              </div>

             
             <div className="flex justify-between items-center">
              <div className="flex!  gap-1 items-center!">
                  <img src="https://www.worldometers.info/images/flags/original/nl.webp" className="w-4 h-4"/>
                  <p className=" flex justify-center! text-sm! text-[#264787]! m-0! p-0! items-center!">Netherlands :</p>
                </div>
                <a href="tel:+4961048099956" className="hover:text-[#3b85c1]  text-sm!  transition-colors">+31 50 569 0044</a>
              </div>
              
              <div className="flex justify-between items-center">
              <div className="flex!  gap-1 items-center!">
                  <img src="https://www.worldometers.info/images/flags/original/se.webp" className="w-4 h-4"/>
                  <p className=" flex justify-center! text-sm! text-[#264787]! m-0! p-0! items-center!">Sweden :</p>
                </div>
                <a href="tel:+4961048099956" className="hover:text-[#3b85c1] text-sm!  transition-colors">+46 70 009 7767</a>
              </div>
              
              <div className="flex justify-between items-center">
              <div className="flex!  gap-1 items-center!">
                  <img src="https://www.worldometers.info/images/flags/original/sy.webp" className="w-4 h-4"/>
                  <p className=" flex justify-center! text-sm! text-[#264787]! m-0! p-0! items-center!">Syria :</p>
                </div>
                <a href="tel:+4961048099956" className="hover:text-[#3b85c1] text-sm! transition-colors">+963 11 271 5881</a>
              </div>
            </div>
            </div>

          {/* Direct Line Telephones */}
          <div className="space-y-2 text-sm pt-4">
            <div className="flex gap-2">
              <span className="font-bold text-[#264787] min-w-[100px]">Telephone:</span>
              <a href="tel:+46850780055" className="text-gray-600 hover:text-[#3b85c1] font-normal! transition-colors">(+46) 850780055</a>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#264787] min-w-[100px]">Mobile Phone:</span>
              <a href="tel:+46700097767" className="text-gray-600 hover:text-[#3b85c1] font-normal! transition-colors">(+46) 0700097767</a>
            </div>
          </div>

          {/* Direct Line Telephones */}
          <div className="space-y-2 text-sm   pt-4">
            <div className="flex gap-2">
              <span className="font-bold text-[#264787] min-w-[100px]">E-Post:</span>
              <a href="mailto:info@unotravelsweden.com" className="text-gray-600 hover:text-[#3b85c1] font-normal! transition-colors">info@unotravelsweden.com</a>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#264787] min-w-[100px]">Licenses:</span>
              <a href="tel:+559288-2707" className="text-gray-600 hover:text-[#3b85c1] font-normal! transition-colors">559288-2707</a>
            </div>
          </div>

          <div className="flex mt-4 gap-2">
              <span className="font-bold text-sm! text-[#264787] min-w-[100px]">Post Address:</span>
              <p  className="text-gray-600 hover:text-[#3b85c1] font-normal! transition-colors">
                PELARGANGEN 1 BOX 182 POST 19046 ARLANDA
              </p>
            </div>
        </div>
       </div>
    </div>
  )
}
