import React from 'react';
import { Plane, Calendar, Clock, Luggage, MapPin, ChevronsLeft, User } from 'lucide-react';
import { Input, InputNumber, Select } from 'antd';
import TextArea from "antd/es/input/TextArea";
import ExtraServiceCard from './components/ExtraServiceCard';

export default function page() {
  return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
   <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8
">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl !font-[filson-bold] text-[var(--main-dark-color)]">
    Your{" "}
    <span className="relative inline-block text-[var(--main-light-color)]">
      Travelplan
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 10"
        className="absolute left-1/2 mt-3 -translate-x-1/2 -rotate-6 bottom-[-8px] w-14 h-3 text-[var(--main-light-color)]"
      >
        <path
          d="M0,5 Q50,-4 100,5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  </h1>
            <button className="p-2 hover:bg-gray-100 rounded">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
          
          
        </div>

        {/* Flight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flight 1: Stockholm to Athens */}
          <div className=" rounded-lg shadow-sm overflow-hidden bg-white  border-t-4 border-t-[var(--main-light-color)]">
            <h2 className="flex items-center text-2xl gap-2 w-full sm:w-2/3 md:w-1/2 text-white bg-[var(--main-light-color)] p-2 font-bold" style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'}}>
            Your Travelplan
            </h2>
            <div className=" p-4 mx-3">
             <div className='border-t-4 border-t-[var(--main-light-color)] border-b-2 pb-2 border-b-gray-200'>
               <div className="flex items-center gap-2 w-1/3 text-white bg-[var(--main-light-color)] p-2 font-semibold" style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'}}>
                <Plane className="w-5 h-5" />
                <span>Departure</span>
              </div>
             <div className='py-3'>
               <p className="text-sm text-[var(--main-dark-color)] mt-1">Fri, 23 Aug, 2024</p>
             <div className='flex justify-between items-center'>
               <p className="text-lg font-bold text-[var(--main-dark-color)] mt-1">Stockholm</p>
               <Plane className='text-[var(--main-dark-color)]'/>
               <p className="text-lg font-bold text-[var(--main-dark-color)] mt-1"> Dubai</p>
             </div>

             </div>
             </div>
            </div>

            
            <div className="px-6 mx-3 mb-3 py-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className='space-y-1'>
                  <p className="text-lg text-[var(--main-dark-color)] mb-2">Departure</p>
                  <p className="text-xl font-bold text-[var(--main-dark-color)]">12:40 <span className='text-sm'>Stockholm</span></p>
                  <p className="text-sm text-[var(--main-dark-color)]"> Arlanda Airport,</p>
                  <p className="text-sm text-[var(--main-dark-color)]">Stockholm Sweden</p>
                  <p className="text-sm text-[var(--main-dark-color)] mt-1">Departure Terminal: 5</p>
                 
                </div>
                
                <div>
                  <p className="text-lg text-[var(--main-dark-color)] mb-2">Arrival</p>
                  <p className="text-xl font-bold text-[var(--main-dark-color)]">17:15 <span className='text-sm'>Eleftherios</span></p>
                  <p className="text-sm text-[var(--main-dark-color)]"> Venizelos</p>
                  <p className="text-sm text-[var(--main-dark-color)]">International Airport,</p>
                  <p className="text-sm text-[var(--main-dark-color)]">Athens</p>
                </div>
              </div>
              
             
              
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--main-dark-color)]">Flight no.</span>
                    <Plane className="w-4 h-4 text-[var(--main-light-color)]" />
                  </div>
                  <span className="font-semibold text-gray-800">A3-7611</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--main-dark-color)]" />
                    <span className="text-sm text-[var(--main-dark-color)]">Journey time</span>
                  </div>
                  <span className="font-semibold text-[var(--main-dark-color)]">03h 35m</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Luggage className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-[var(--main-dark-color)]">Check in baggage incl.</span>
                  </div>
                </div>
                
                <div className="bg-[var(--main-light-color)]/10 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--main-dark-color)]">No baggage</span>
                    <span className="font-semibold text-gray-800">Economy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flight 2: Athens to Dubai */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[var(--main-orange-color)]/10 p-4 border-b-2 border-[var(--main-orange-color)]/80">
              <div className="flex items-center gap-2 text-[var(--main-orange-color)] font-semibold">
                <MapPin className="w-5 h-5" />
                <span>Layover at Athens</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Connection time - 15:05</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className='space-y-1'>
                  <p className="text-lg text-[var(--main-dark-color)] mb-2">Departure</p>
                  <p className="text-xl font-bold text-[var(--main-dark-color)]">08:20 <span className='text-sm'>Eleftherios</span></p>
                  <p className="text-sm text-[var(--main-dark-color)]"> Venizelos</p>
                  <p className="text-sm text-[var(--main-dark-color)]">International Airport,</p>
                  <p className="text-sm text-[var(--main-dark-color)]">Athens</p>
                </div>
                
                <div className='space-y-1'>
                  <p className="text-lg text-[var(--main-dark-color)] mb-2">Arrival</p>
                  <p className="text-xl font-bold text-[var(--main-dark-color)]">13:50 <span className='text-sm'>Dubai Airport</span></p>
                  <p className="text-sm text-[var(--main-dark-color)]">Dubai</p>
                  <p className="text-xs text-[var(--main-dark-color)] mt-1">Arrival Terminal: 1</p>
                </div>
              </div>
              
            
              
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Flight no.</span>
                    <Plane className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="font-semibold text-gray-800">A3-9581</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--main-dark-color)]" />
                    <span className="text-sm text-gray-600">Journey time</span>
                  </div>
                  <span className="font-semibold text-[var(--main-dark-color)]">04h 30m</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Luggage className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Check in baggage incl.</span>
                  </div>
                </div>
                
                <div className="bg-[var(--main-light-color)]/10 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">No baggage</span>
                    <span className="font-semibold text-gray-800">Economy</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6 mt-15">
              <button className="w-full bg-red-600 cursor-pointer text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                <span className="text-lg"><ChevronsLeft/></span>
                CHANGE FLIGHT
              </button>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-5'>
  <div className="rounded-lg shadow-sm overflow-hidden bg-white border-t-4 border-t-[var(--main-light-color)]">
    <h2 className="flex items-center text-xl gap-2 w-full sm:w-2/3 md:w-3/4 text-white bg-[var(--main-light-color)] p-2 font-bold" style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'}}>
      <span><User/></span> 1 adult
    </h2>
    
    <div className='bg-[var(--main-orange-color)]/10 border !border-[var(--main-orange-color)] p-4 mx-3 my-5 rounded'>
      <h3 className='!text-[var(--orange-color-opc)] font-semibold mb-2'>Passenger detail</h3>
      <div className='flex items-start gap-2 mb-1'>
        <span className='rounded-full w-2 h-2 bg-[var(--orange-color-opc)] mt-1.5 flex-shrink-0'></span>
        <p className='text-[var(--orange-color-opc)] text-sm'>Please enter the passenger detail below</p>
      </div>
      <div className='flex items-start gap-2'>
        <span className='rounded-full w-2 h-2 bg-[var(--orange-color-opc)] mt-1.5 flex-shrink-0'></span>
        <p className='text-[var(--orange-color-opc)] text-sm'>Fill in the first and passport names exactly as in the passport used on the trip</p>
      </div>
    </div>

    <div className='px-6 pb-6'>
      {/* Gender Selection */}
      <div className='flex items-center gap-6 mb-4'>
        <label className='!flex items-center !gap-2 cursor-pointer'>
          <input type="radio" name="gender" value="mr" className='w-4 h-4 !text-[var(--main-light-color)] cursor-pointer' />
          <span className='text-[var(--main-dark-color)]'>Mr.</span>
        </label>
        <label className='!flex items-center !gap-2 cursor-pointer'>
          <input type="radio" name="gender" value="ms" className='w-4 h-4 !text-[var(--main-light-color)] cursor-pointer' />
          <span className='text-[var(--main-dark-color)]'>Ms.</span>
        </label>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* First Name */}
        <div className='mb-4'>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>First name *</label>
          <div className='relative'>
            <Input
              style={{ width: "100%" }}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]'
              placeholder=''
            />
            
          </div>
        </div>

        {/* Last Name */}
        <div className='mb-4'>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Last name *</label>
          <Input
            style={{ width: "100%" }}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]'
            placeholder=''
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div className='grid grid-cols-3 gap-3 mb-6'>
        <div>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Date</label>
         <InputNumber
  style={{ width: "100%" }}
  min={1}
  max={31}
  placeholder="Day"
  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]"
/>

        </div>

        <div>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Month</label>
         <InputNumber
  style={{ width: "100%" }}
  min={1}
  max={12}
  placeholder="Month"
  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]"
/>

        </div>

        <div>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Year</label>
          <InputNumber

  min={1900}
  max={new Date().getFullYear()}
  placeholder="Year"
  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]"
  style={{ width: "100%" }}
/>

        </div>
      </div>

      {/* Passport Section */}
      <h3 className='!text-[var(--main-light-color)] !text-sm !font-semibold mb-4'>(OPTIONAL) PASSPORT AND FREQUENT FLYER DETAILS</h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='mb-4'>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Passport Number</label>
          <InputNumber 
            style={{ width: "100%" }}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
            placeholder=''
          />
        </div>

        <div className='mb-4'>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Person Number</label>
          <InputNumber 
            style={{ width: "100%" }}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
            placeholder=''
          />
        </div>
      </div>

      {/* Passport Expiry Date */}
      <div className='grid grid-cols-3 gap-3 mb-4'>
        <div>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Date</label>
         <InputNumber

  min={1}
  max={31}
  placeholder="Day"
  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]"
  style={{ width: "100%" }}
/>

        </div>

        <div>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Month</label>
         <InputNumber

  min={1}
  max={12}
  placeholder="Month"
  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]"
  style={{ width: "100%" }}
/>

        </div>

        <div>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Year</label>
          <InputNumber

  min={1900}
  max={new Date().getFullYear()}
  placeholder="Year"
  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]"
  style={{ width: "100%" }}
/>

        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Passport Issuing Country</label>
          <Select
  placeholder="Select Country"
  className="w-full"
  options={[
    { value: "SE", label: "Sweden" },
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "EG", label: "Egypt" },
  ]}
/>

        </div>

        <div>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Nationality</label>
         <Select
  placeholder="Select Nationality"
  className="w-full"
  options={[
    { value: "SE", label: "Swedish" },
    { value: "US", label: "American" },
    { value: "GB", label: "British" },
    { value: "EG", label: "Egyptian" },
  ]}
/>

        </div>
      </div>

      <div className='mb-4'>
        <label className='!flex !items-center !gap-2 cursor-pointer'>
          <input type="checkbox" className='w-4 h-4 !text-[var(--main-light-color)] cursor-pointer rounded' />
          <span className='text-[var(--main-dark-color)]'>I am Swedish National</span>
        </label>
      </div>

      <a href="#" className='text-[var(--main-light-color)] text-sm flex items-center gap-1'>
        <span>⊕</span> Onboard Services
      </a>
    </div>
  </div>

  <div className="rounded-lg shadow-sm overflow-hidden bg-white border-t-4 border-t-[var(--main-light-color)]">
    <h2 className="flex items-center text-xl gap-2 w-full sm:w-2/3 md:w-3/4 text-white bg-[var(--main-light-color)] p-2 font-bold" style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'}}>
       Luggage Insurance
    </h2>
    
    <div className='px-6 py-6'>
      {/* Luggage Insurance Section */}
      <div className='mb-6'>
        <div className='mb-4'>
          <img src="https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&h=150&fit=crop" alt="Luggage" className='w-full aspect-[16/9] rounded' />
        </div>
        
        <p className='!text-gray-600 text-sm mb-4'>
          You can insure your baggage for only 125 DKK per person. Compensation would be paid up to 5,000 DKK. To be included and covered by the insurance, you must be a permanent resident within the EU / EEA. You should be aware that insurance does not cover persons who reside in Croatia. <span className='text-[var(--main-orange-color)] cursor-pointer'>Read More</span>
        </p>
        
        <div className='mb-3'>
          <InputNumber 
            style={{ width: "100%" }}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
            placeholder='NO'
          />
        </div>
        
        <div className='flex justify-between items-center text-[var(--main-light-color)]'>
          <span className='text-sm'>Adult 125 kr / Person</span>
          <span className='text-xl font-bold'>0,00 kr</span>
        </div>
      </div>

      {/* Travel Insurance COMPLETE Section */}
      <div className='border-t border-gray-200 pt-6'>
        <h2 className="flex items-center text-lg gap-2 !text-[var(--main-dark-color)] mb-4 font-bold">
          Travel Insurance COMPLETE
        </h2>
        
        <div className='mb-4'>
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=150&fit=crop" alt="Travel Insurance" className='w-full aspect-[16/9] rounded' />
        </div>
        
        <p className='text-gray-600 text-sm mb-4'>
          If you do not take out supplementary insurance, we are not able to help you on the journey. To be covered by insurance, please be stadigvarande bosatt in Denmark. <span className='text-[var(--main-orange-color)] cursor-pointer'>Read More</span>
        </p>
        
        <div className='mb-3'>
         <InputNumber 
            style={{ width: "100%" }}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
            placeholder='NO'
          />
        </div>
        
        <div className='flex justify-between items-center text-[var(--main-light-color)]'>
          <span className='text-sm'>Adult 539 kr / Person</span>
          <span className='text-xl font-bold'>0,00 kr</span>
        </div>
      </div>
    </div>
  </div>
</div>
   <div className='grid grid-cols-1 gap-6 mb-5'>
    <div className="rounded-lg shadow-sm overflow-hidden bg-white border-t-4 border-t-[var(--main-light-color)]">
    <h2 className="flex items-center text-2xl gap-2 w-full sm:w-2/3 md:w-1/2 text-white bg-[var(--main-light-color)] p-2 font-bold" style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'}}>
     Contact Details
    </h2>
    <div className='px-6 pb-6 my-5'>
      

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* First Name */}
        <div className='mb-4'>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>First name *</label>
          <div className='relative'>
            <Input
              style={{ width: "100%" }}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]'
              placeholder=''
            />
            
          </div>
        </div>

        {/* Last Name */}
        <div className='mb-4'>
          <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Last name *</label>
          <Input
            style={{ width: "100%" }}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[var(--main-light-color)]'
            placeholder=''
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
         <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Company</label>
            <Input
              style={{ width: "100%" }}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4A90E2]'
              placeholder=''
            />
          </div>
          <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Street *</label>
            <Input
              style={{ width: "100%" }}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4A90E2]'
              placeholder=''
            />
          </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          

          {/* Sweden Dropdown */}
          <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Sweden</label>
            <Select
              defaultValue="SE"
              className="w-full"
              allowClear
              options={[
                { value: "SE", label: "Sweden" },
                { value: "DK", label: "Denmark" },
                { value: "NO", label: "Norway" },
                { value: "FI", label: "Finland" },
              ]}
            />
          </div>

          {/* Postal Code */}
          <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Postal code *</label>
            <Input
              style={{ width: "100%" }}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4A90E2]'
              placeholder=''
            />
          </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Town *</label>
            <Input
              style={{ width: "100%" }}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4A90E2]'
              placeholder=''
            />
          </div>

          {/* Denmark (+45) Dropdown 1 */}
          <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Denmark (+45)</label>
            <Select
              defaultValue="+45"
              className="w-full"
              options={[
                { value: "+45", label: "Denmark (+45)" },
                { value: "+46", label: "Sweden (+46)" },
                { value: "+47", label: "Norway (+47)" },
                { value: "+358", label: "Finland (+358)" },
              ]}
            />
          </div>

      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
      {/* Denmark (+45) Dropdown 2 */}
          <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Denmark (+45)</label>
            <Select
              defaultValue="+45"
              className="w-full"
              options={[
                { value: "+45", label: "Denmark (+45)" },
                { value: "+46", label: "Sweden (+46)" },
                { value: "+47", label: "Norway (+47)" },
                { value: "+358", label: "Finland (+358)" },
              ]}
            />
          </div>

          {/* Phone */}
          <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Phone *</label>
            <Input
              style={{ width: "100%" }}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4A90E2]'
              placeholder=''
            />
          </div>
      </div>
     
     <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {/* Email */}
          <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Email *</label>
            <Input
              type="email"
              style={{ width: "100%" }}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4A90E2]'
              placeholder=''
            />
          </div>

          {/* Confirm Email */}
          <div className='mb-4'>
            <label className='block text-[var(--main-dark-color)] text-sm mb-1'>Confirm Email *</label>
            <Input
              type="email"
              style={{ width: "100%" }}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4A90E2]'
              placeholder=''
            />
          </div>
     </div>

    </div>
  </div>
   </div>
   
    <div className="rounded-lg shadow-sm overflow-hidden bg-white my-5 border-t-4 border-t-[var(--main-light-color)]">
  <h2
    className="flex items-center text-xl gap-2 w-full sm:w-2/3 md:w-1/2 text-white bg-[var(--main-light-color)] p-2 font-bold"
    style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)' }}
  >
    Extra Services
  </h2>


  <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ExtraServiceCard
        title="Customer Service"
        image="/images/Airport Services.svg"
        description="If you do not buys our service, we have unfortunately not able to help you with requests for space booking, rebooking, special baggage, special meals, bonus cards, etc."
        priceText="198 kr / Total price all passengers"
        totalPrice="198,00 kr"
        showMessage
      />

      <ExtraServiceCard
        title="Mobile Itinerary"
        image="/images/Airport Services.svg"
        description="Get your itinerary via SMS on mobile. See all the important information about your journey. Check-in via mobile phone."
        priceText="23 kr / Total price all passengers"
        totalPrice="0,00 kr"
      />
    </div>
  </div>
  <div className='p-6'>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ExtraServiceCard
  title="Booking Reference via SMS"
  image="/images/Airport Services.svg"
  description="Get your booking reference sent to your phone via SMS."
  priceText="15 kr / Booking Reference via SMS"
  totalPrice="0,00 kr"
/>
 <ExtraServiceCard
  title="Travel documents by mail"
  image="/images/Airport Services.svg"
  description="We send home their travel documents ."
  priceText="99 kr / Total price all passengers"
  totalPrice="0,00 kr"
/>

   </div>
  </div>
  <div className='p-6'>
   <div className='grid grid-cols-1 '>
   <ExtraServiceCard
  title="Cancellation"
  image="/images/Airport Services.svg"
  description="If you do not buy our cancellation, we can not refund in case of illness or accident."
  priceText="285 kr / Total price all passengers"
  totalPrice="0,00 kr"
  infoBox="The last 7 days have 2,600 customers who have chosen to protect themselves against unforeseen events"
/>

   </div>
  </div>
</div>

<div className="bg-white rounded-lg shadow-sm border-t-4 border-t-[var(--main-light-color)] overflow-hidden">
  {/* Header */}
  <div
    className="bg-[var(--main-light-color)] text-white font-bold px-4 py-2
               w-full sm:w-2/3 md:w-1/2"
    style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)" }}
  >
    Product Price Detail
  </div>

  {/* ================= DESKTOP TABLE ================= */}
  <div className="hidden md:block p-6 text-sm">
    <div className="grid grid-cols-5 font-semibold text-[var(--main-dark-color)] border-b border-gray-200 pb-2">
      <span>Passenger Type</span>
      <span>Price</span>
      <span>Taxes</span>
      <span>Quantity</span>
      <span className="text-right">Total</span>
    </div>

    <div className="grid grid-cols-5 py-3 border-b border-gray-200 text-[var(--main-dark-color)] ">
      <span>Adult</span>
      <span>6.514,00</span>
      <span>1.024,00</span>
      <span>1</span>
      <span className="text-right font-semibold">
        7.538,00 <span className="text-xs">kr</span>
      </span>
    </div>

    <div className="grid grid-cols-5 py-3 border-b border-gray-200 text-[var(--main-dark-color)]">
      <span className="col-span-4">Customer Service</span>
      <span className="text-right font-semibold">
        198,00 <span className="text-xs">kr</span>
      </span>
    </div>

    <div className="flex justify-between font-bold text-gray-800 pt-4">
      <span>Total price incl. tax:</span>
      <span>
        7.736,00 <span className="text-xs">kr</span>
      </span>
    </div>
  </div>

  {/* ================= MOBILE CARDS ================= */}
  <div className="md:hidden p-4 space-y-6 text-sm">
    {/* Passenger Card */}
    <div className="!border !border-gray-200 rounded-lg p-4 space-y-3 shadow-sm">
      <div className="flex justify-between">
        <span className="text-[var(--main-light-color)]">Passenger</span>
        <span className="font-medium text-[var(--main-dark-color)]">Adult</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[var(--main-light-color)]">Price</span>
        <span className='text-[var(--main-dark-color)]'>6.514,00</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[var(--main-light-color)]">Taxes</span>
        <span className='text-[var(--main-dark-color)]'>1.024,00</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[var(--main-light-color)]">Quantity</span>
        <span className='text-[var(--main-dark-color)]'> 1</span>
      </div>

      <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
        <span>Total</span>
        <span>7.538,00 kr</span>
      </div>
    </div>

    {/* Customer Service */}
    <div className="!border !border-[var(--main-light-color)]/50 !text-[var(--main-light-color)] !bg-[var(--main-light-color)]/10 rounded-lg p-4 flex justify-between font-semibold shadow-sm">
      <span>Customer Service</span>
      <span>198,00 kr</span>
    </div>

    {/* Grand Total */}
    <div className="bg-[var(--main-light-color)]/10 text-[var(--main-light-color)] rounded-lg p-4 flex justify-between font-bold">
      <span>Total incl. tax</span>
      <span>7.736,00 kr</span>
    </div>
  </div>

  {/* ================= CHECKBOXES ================= */}
  <div className="px-4 pb-4 space-y-3 text-sm text-gray-600">
    <label className="!flex items-start !gap-2">
      <input type="checkbox" className="mt-1" />
      <span>
        I agreed and understand{" "}
        <span className="text-[var(--main-light-color)] underline cursor-pointer">
          the terms and conditions
        </span>
      </span>
    </label>

    <label className="!flex items-start !gap-2">
      <input type="checkbox" className="mt-1" />
      <span>
        I agreed and understand{" "}
        <span className="text-[var(--main-light-color)] underline cursor-pointer">
          Samtycke
        </span>
      </span>
    </label>

    <label className="!flex items-start !gap-2">
      <input type="radio" name="news" className="mt-1" />
      <span>
        Yes, I would like to be kept updated with news from Uno Travel Sweden AB
      </span>
    </label>
  </div>

  {/* ================= BUTTON ================= */}
  <div className="p-4">
    <button className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-3  rounded">
      Proceed To Payment
    </button>
  </div>
</div>




      </div>
    </div>
</div>

  );
}