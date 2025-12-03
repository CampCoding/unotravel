"use client"
import React, { useState } from 'react'
import VisasSidebar from './VisasSidebar'
import { User, Contact, Plane ,ArrowLeft } from 'lucide-react'
import InstructionsContent from './components/InstructionsContent'
import DocumentUploadContent from './components/DocumentUploadContent'
import PaymentContent from './components/PaymentContent'
import ReviewSubmitContent from './components/ReviewSubmitContent'
import ApprovedContent from './components/ApprovedContent'
import { useNavigate } from 'react-router-dom'


const ApplicationFormContent = ({setActiveTab}) => (
  
  <div className="p-4 border-2 border-gray-200 bg-white w-[100%] !rounded-lg">
    <div className="grid grid-cols-1 gap-4 mb-4">
      <div className="flex flex-col items-start p-4 justify-start h-24 rounded-sm bg-gray-50 ">
        <h2 className='text-gray-900 font-[var(--font-filson-bold)] text-lg'>Visa Application Form</h2>
        <p className='text-gray-400 font-[var(--font-filson-regular)] text-sm'>Please fill out all required information</p>
      </div>
    </div>

    <div className='bg-gray-50'>
      <div className='p-4 flex items-center '>
        <span><User size={20} className='text-[var(--main-light-color)] fill-current' /></span>
        <h2 className='font-[var(--font-filson-bold)]'>Personal Information</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-9">
        <div>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">First Name *</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your First Name"
            className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
        <div>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Last Name</label>
          <br/>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Date of Birth *</label>
          <br/>
          <input
            type="date"
            name="date"
            className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Nationality</label>
          <br/>
          <input
            type="text"
            name="nationality"
            placeholder="Select Nationality"
            className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Passport Number</label>
          <br/>
          <input
            type="number"
            name="passNumber"
            placeholder="Enter Passport Number"
            className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Passport Expiry Date</label>
          <br/>
          <input
            type="date"
            name="expireDate"
            className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
      </div>
    </div>

    <div className='bg-gray-50 my-4'>
      <div className='p-4 flex items-center gap-1'>
        <span><Contact size={20} className='text-[var(--main-light-color)]' /></span>
        <h2 className='font-[var(--font-filson-bold)]'>Contact Information</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-9">
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Email Address *</label>
          <br/>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Phone Number</label>
          <input
            type="number"
            name="number"
            placeholder="Enter Phone Number"
            className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
        <div className='w-[100%]'>
          <label className=" text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Current Address *</label>
          <br/>
          <textarea
            name="currentAddress"
            placeholder="Enter Your Current Address"
            className="flex-1 w-[100%] bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
      </div>
    </div>

    <div className='bg-gray-50'>
      <div className='p-4 flex items-center gap-1'>
        <span><Plane size={20} className='text-[var(--main-light-color)]' /></span>
        <h2 className='font-[var(--font-filson-bold)]'>Travel Information</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-9">
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Destination Country *</label>
          <select name="" id="" className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base">
            <option value="">Select destination</option>
          </select>
        </div>
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Visa Type</label>
          <select name="" id="" className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base">
            <option value="">Select Visa Type</option>
          </select>
        </div>
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Travel date</label>
          <input type='date' className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base" />
        </div>
        <div className='w-[100%]'>
          <label className="block text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Duration</label>
          <select name="" id="" className="w-full bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base">
            <option value="">Select duration</option>
          </select>
        </div>
        <div className='w-[100%]'>
          <label className=" text-[var(--main-dark-color)] font-[var(--font-filson-regular-italic)] mb-3">Purpose of visit *</label>
          <br/>
          <textarea
            name="currentAddress"
            placeholder="Please describe the purpose of your visit"
            className="flex-1 w-[100%] bg-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:text-[var(--main-light-color)] transition placeholder-gray-400 text-base"
          />
        </div>
      </div>
    </div>

   
     <div className='flex my-4 justify-between items-center'>
              <button onClick={()=>setActiveTab('Instructions')} className='flex gap-2 text-sm items-center cursor-pointer bg-gray-200/80 hover:bg-gray-300/70  hover:scale-105 transition-all px-4 !rounded-lg py-2 text-gray-500'> <ArrowLeft/> Back to Instructions</button>
                <button onClick={()=>setActiveTab('Document Upload')} className='bg-[var(--main-light-color)] hover:bg-[var(--main-dark-color)] hover:scale-105 transition-all px-4 py-2 text-white !rounded-lg font-[var(--font-filson-regular)] cursor-pointer'>Save & Continue</button>
              </div>
  </div>
);


export default function Visas() {
  const [activeTab, setActiveTab] = useState('Instructions');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'Instructions':
        return <InstructionsContent setActiveTab={setActiveTab}/>;
      case 'Application Form':
        return <ApplicationFormContent setActiveTab={setActiveTab} />;
      case 'Document Upload':
        return <DocumentUploadContent setActiveTab={setActiveTab} />;
      case 'Review & Submit':
        return <ReviewSubmitContent setActiveTab={setActiveTab}/>;
      case 'Approved':
        return <ApprovedContent setActiveTab={setActiveTab}/>;
      default:
        return <ApplicationFormContent />;
    }
  };

  return (
    <div className='min-h-screen flex justify-start items-start pt-10 pb-10 px-10 container mx-auto bg-gray-100'>
      <VisasSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="p-4 pt-0 !w-[100%] sm:!w-[calc(100%-20rem)]">
        {renderContent()}
      </div>
    </div>
  )
}
