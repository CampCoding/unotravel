import React from 'react'
import { CheckCircle, Download, Search } from 'lucide-react'

const ApprovedContent = () => (
  <div className="p-6 border-2 border-gray-200 bg-white w-[100%] rounded-2xl shadow-lg">
    <div className="flex flex-col items-center p-12 text-center">
      {/* Success Icon */}
      <div className="bg-green-100 p-6 rounded-full mb-6">
        <CheckCircle className="text-green-600" size={48} />
      </div>

      {/* Main Heading */}
      <h2 className='text-3xl font-[var(--font-filson-bold)] text-[var(--main-dark-color)] mb-4'>Application Submitted Successfully!</h2>

      {/* Description */}
      <p className='text-gray-600 text-lg mb-8 max-w-2xl'>
        Your visa application has been submitted and is under review. You will receive updates via email.
      </p>

      {/* Application Reference Card */}
      {/* <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 w-full text-center flex flex-col items-center justify-center mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-[var(--main-light-color)] p-3 !rounded-lg">
            <div className="w-4 h-1 bg-white rounded"></div>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-600">Application Reference</p>
            <p className="text-2xl font-bold text-[var(--main-light-color)]">VSA-2024-001234</p>
            <p className="text-xs text-gray-500 mt-1">Use this reference number to track your application status</p>
          </div>
        </div>
      </div> */}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button className="bg-[var(--main-light-color)] hover:bg-[var(--main-dark-color)] text-white px-6 py-3 !rounded-lg font-[var(--font-filson-bold)] flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg">
          <Download size={20} />
          Download Receipt
        </button>

        <button className="bg-white border-2 border-[var(--main-light-color)] text-[var(--main-light-color)] hover:bg-[var(--main-light-color)] hover:bg-opacity-10 px-6 py-3 !rounded-lg font-[var(--font-filson-bold)] flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
          <Search size={20} />
          Track Application
        </button>
      </div>
    </div>
  </div>
)

export default ApprovedContent
