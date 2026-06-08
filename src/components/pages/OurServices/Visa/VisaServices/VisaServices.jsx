// import React from 'react'
// import CustomHeading from '../../../../shared/CustomHeading/CustomHeading'
// import CustomSelect from '../../../../shared/CustomSelect/CustomSelect'

// export default function VisaServices() {
//   return (
//     <div
//       data-aos="fade-up"
//       className='mt-20 container'
//     >
//       <CustomHeading first_title={"Visa"} second_title={"Services"} />

//       <div className="grid grid-cols-[3fr_4fr_4fr_2fr]  gap-[20px] mt-[43px]">
//         <div className="flex flex-col gap-2">
//           <p className='font-bold text-(--main-dark-color) text-[18px]'>Passenger Information</p>
//           <div className='flex gap-2 justify-between items-center'>
//             <div className="flex gap-2 items-center">
//               <input type="radio" name="gender" id="male" className="accent-(--main-light-color) w-5 h-5" />
//               <label className='text-(--main-dark-color) text-base'>Male</label>
//             </div>
//             <div className="flex gap-2 items-center">
//               <input type="radio" name="gender" id="female" className="accent-(--main-light-color) w-5 h-5" />
//               <label className='text-(--main-dark-color) text-base'>Female</label>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-2">
//           <label
//             htmlFor='full_name'
//             className="text-(--main-light-color) text-base text-left flex items-center"><span>Full Name</span> <span className='text-[#EB1C24] text-base ml-1'>*</span></label>
//           <input id="full_name" type="text" className="rounded-[6px] focus:outline-none focus:border-2  p-2 border border-(--main-light-color)" />

//         </div>

//         <div className="flex flex-col gap-2">
//           <label
//             htmlFor="surname"
//             className="text-(--main-light-color) text-base  text-left flex items-center"><span>Surname</span> <span className='text-[#EB1C24] text-base ml-1'>*</span></label>
//           <input id="surname" type="text" className="rounded-[6px] focus:outline-none focus:border-2  p-2 border border-(--main-light-color)" />

//         </div>

//         <div className="flex flex-col gap-2">
//           <label
//             htmlFor="age"
//             className="text-(--main-light-color) text-base text-left flex items-center"><span>Age</span> <span className='text-[#EB1C24] text-base ml-1'>*</span></label>
//           <input id="age" type="number" className="rounded-[6px] focus:outline-none focus:border-2  p-2 border border-(--main-light-color)" />
//         </div>
//       </div>

//       <div className="flex flex-col gap-3">
//         <p className='font-bold text-(--main-dark-color) text-[18px]'>Detail</p>
//         <div className="grid grid-cols-3 gap-5 mt-5">
//           <div className="flex flex-col gap-2">
//             <label
//               htmlFor="nationality"
//               className="text-(--main-light-color) text-base text-left flex items-center"><span>Nationality : </span> <span className='text-[#EB1C24] text-base ml-1'>*</span></label>
//             <CustomSelect options={[]} placeholder='Select Country' />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label
//               htmlFor="visa_type"
//               className="text-(--main-light-color) text-base text-left flex items-center"><span>Visa Type : </span> <span className='text-[#EB1C24] text-base ml-1'>*</span></label>
//             <CustomSelect options={[]} placeholder='Select Visa Type' />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label
//               htmlFor="passport_type"
//               className="text-(--main-light-color) text-base text-left flex items-center"><span>Passport Type : </span> <span className='text-[#EB1C24] text-base ml-1'>*</span></label>
//             <CustomSelect options={[]} placeholder='Select Passport Type' />
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }


"use client";

import React, { useState } from "react";
import CustomHeading from "../../../../shared/CustomHeading/CustomHeading";
import CustomSelect from "../../../../shared/CustomSelect/CustomSelect";
import CustomRadio from "../../../../shared/CustomRadio/CustomRadio";
import CustomCheckbox from "../../../../shared/CustomCheckbox/CustomCheckbox";
import { RadioGroup } from "../../../../ui/radio-group";

export default function VisaServices() {
  const [form, setForm] = useState({
    gender: "male",
    firstName: "",
    surname: "",
    age: "18",
    nationality: "",
    visaType: "",
    passportType: "",
    passportExpiry: "2025-11-12",
    passportIssuingCountry: "",
    residenceCountry: "",
    terms: false,
    gdpr: false
  });

  const countries = [
    { id: "eg", name: "Egypt" },
    { id: "sa", name: "Saudi Arabia" },
    { id: "ae", name: "United Arab Emirates" },
    { id: "uk", name: "United Kingdom" },
    { id: "us", name: "United States" }
  ];

  const visaTypes = [
    { id: "tourist", name: "Tourist Visa" },
    { id: "business", name: "Business Visa" },
    { id: "work", name: "Work Visa" },
    { id: "student", name: "Student Visa" }
  ];

  const passportTypes = [
    { id: "ordinary", name: "Ordinary Passport" },
    { id: "diplomatic", name: "Diplomatic Passport" },
    { id: "service", name: "Service Passport" }
  ];

  const ageOptions = Array.from({ length: 83 }, (_, index) => {
    const age = index + 18;
    return {
      id: age,
      name: `${age} Years`
    };
  });

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const inputClass =
    "h-[40px] w-full rounded-[4px] border border-(--main-light-color) bg-white px-4 text-[14px] font-normal text-(--main-dark-color) outline-none transition-all duration-200 focus:border-[#2C5596] focus:ring-1 focus:ring-[#2C5596]";

  const labelClass =
    "mb-[9px] flex items-center text-left text-base font-normal leading-none text-(--main-light-color)!";

  const requiredClass = "ml-[4px] text-[14px] font-bold text-[#FF4B5C]";

  const selectButtonClass =
    "h-[40px] w-full rounded-[4px] border border-(--main-light-color) bg-white px-4 text-[14px] font-normal text-(--main-dark-color) shadow-none hover:bg-white hover:border-[#2C5596] focus-visible:ring-1 focus-visible:ring-[#2C5596] [&_svg]:text-[#4589C8]";

  return (
    <section data-aos="fade-up" className="mt-20 w-full bg-white">
      <div className="container">
        <CustomHeading first_title="Visa" second_title="Services" />

        <form 
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto mt-[43px]">
          <div className="grid grid-cols-[350px_1fr_1fr_145px] items-end gap-x-[17px]">
            <div className="pb-1">
              <h3 className="mb-[25px] text-[20px]! font-bold! leading-none text-(--main-dark-color)!">
                Passenger Information
              </h3>

              <RadioGroup
                name="gender"
                value={form.gender}
                onValueChange={(value) => updateField("gender", value)}
                className="flex h-10 items-center gap-[46px]"
              >
                <CustomRadio label="Male" name="gender" value="male" />
                <CustomRadio label="Female" name="gender" value="female" />
              </RadioGroup>
            </div>

            <div>
              <label htmlFor="firstName" className={labelClass}>
                <span>First Name:</span>
                <span className={requiredClass}>*</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="surname" className={labelClass}>
                <span>Surname:</span>
                <span className={requiredClass}>*</span>
              </label>
              <input
                id="surname"
                type="text"
                value={form.surname}
                onChange={(e) => updateField("surname", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                <span>Age:</span>
                <span className={requiredClass}>*</span>
              </label>
              <input
                id="age"
                type="number"
                value={form.age}
                onChange={(e) => updateField("age", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-[31px]">
            <h3 className="mb-[25px] text-[20px]! font-bold! leading-none text-(--main-dark-color)!">
              Detail
            </h3>

            <div className="grid grid-cols-3 mt-4 gap-x-[23px] gap-y-[22px]">
              <div className="">
                <label className={labelClass}>
                  <span>Nationality:</span>
                  <span className={requiredClass}>*</span>
                </label>
                <CustomSelect
                  dir="ltr"
                  data={countries}
                  value={form.nationality}
                  onChange={(value) => updateField("nationality", value)}
                  placeholder="Select Country"
                  buttonClassName={selectButtonClass}
                  className="space-y-0 w-full!"
                  searchPlaceholder="Search country..."
                  emptyText="No countries found"
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span>Visa Type:</span>
                  <span className={requiredClass}>*</span>
                </label>
                <CustomSelect
                  dir="ltr"
                  data={visaTypes}
                  value={form.visaType}
                  onChange={(value) => updateField("visaType", value)}
                  placeholder="Select"
                  buttonClassName={selectButtonClass}
                  className="space-y-0"
                  searchPlaceholder="Search visa type..."
                  emptyText="No visa types found"
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span>Passport Type:</span>
                  <span className={requiredClass}>*</span>
                </label>
                <CustomSelect
                  dir="ltr"
                  data={passportTypes}
                  value={form.passportType}
                  onChange={(value) => updateField("passportType", value)}
                  placeholder="Select"
                  buttonClassName={selectButtonClass}
                  className="space-y-0"
                  searchPlaceholder="Search passport type..."
                  emptyText="No passport types found"
                />
              </div>

              <div>
                <label htmlFor="passportExpiry" className={labelClass}>
                  <span>Passport Expiry:</span>
                  <span className={requiredClass}>*</span>
                </label>
                <input
                  id="passportExpiry"
                  type="date"
                  value={form.passportExpiry}
                  onChange={(e) => updateField("passportExpiry", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span>Passport Issuing Country:</span>
                  <span className={requiredClass}>*</span>
                </label>
                <CustomSelect
                  dir="ltr"
                  data={countries}
                  value={form.passportIssuingCountry}
                  onChange={(value) => updateField("passportIssuingCountry", value)}
                  placeholder="Select Country"
                  buttonClassName={selectButtonClass}
                  className="space-y-0"
                  searchPlaceholder="Search country..."
                  emptyText="No countries found"
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span>Residence Country:</span>
                  <span className={requiredClass}>*</span>
                </label>
                <CustomSelect
                  dir="ltr"
                  data={countries}
                  value={form.residenceCountry}
                  onChange={(value) => updateField("residenceCountry", value)}
                  placeholder="Select Country"
                  buttonClassName={selectButtonClass}
                  className="space-y-0"
                  searchPlaceholder="Search country..."
                  emptyText="No countries found"
                />
              </div>
            </div>
          </div>

          <div className="mt-[41px] flex flex-col gap-[22px]">
            <div className="flex! gap-2!  items-center!">
              <input 
              checked={form.terms}
              onChange={(checked) => updateField("terms", checked)}
              type="checkbox" className="h-[20px] accent-(--main-dark-color)!" name="terms" id="terms" />
              <p className="text-(--main-dark-color)! my-auto! text-lg!">I agreed and I have read and understand the <span className="text-[#EB1C24]">terms and condition</span></p>
            </div>

            <div className="flex! gap-2!  items-center!">
              <input 
              checked={form.gdpr}
              onChange={(checked) => updateField("gdpr", checked)}
              type="checkbox" className="h-[20px] accent-(--main-dark-color)!" name="gdpr" id="gdpr" />
              <p className="text-(--main-dark-color)! my-auto! text-lg!">I agreed and I have read and understand the <span className="text-[#EB1C24]">GDPR Policy</span></p>
            </div>
          </div>

          <div className="mt-[66px] flex justify-center">
            <button
              type="submit"
              className="h-[54px] w-[530px] rounded-full! bg-(--main-dark-color) text-[24px]!  text-white shadow-none transition-all duration-300 hover:bg-[#244981]"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}