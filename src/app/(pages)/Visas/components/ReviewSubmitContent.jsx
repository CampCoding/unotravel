import React from 'react'
import { CheckCircle, FileText, Info } from 'lucide-react'

const ReviewSubmitContent = () => (
  <div className="p-6 border-2 border-gray-200 bg-white w-[100%] rounded-2xl shadow-lg">
    <div className="flex flex-col items-center p-8 justify-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl mb-8 border border-indigo-100">
      <div className="bg-indigo-100 p-4 rounded-full mb-4">
        <CheckCircle className="text-indigo-600" size={32} />
      </div>
      <h2 className='text-2xl font-[var(--font-filson-bold)] text-[var(--main-dark-color)] mb-2'>Review & Submit</h2>
      <p className='text-gray-600 font-[var(--font-filson-regular)] text-center max-w-md'>Please review your application before submitting for processing</p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200 shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-green-500 p-3 rounded-xl">
            <CheckCircle className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-[var(--font-filson-bold)] text-[var(--main-dark-color)]">Application Status</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-green-200">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-800 font-medium">Personal Information Complete</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-green-200">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-800 font-medium">Documents Uploaded</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-green-200">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-800 font-medium">Payment Processed</span>
          </div>
        </div>
        <div className="mt-6 p-4 bg-green-500 text-white rounded-xl text-center">
          <p className="font-semibold">✅ Ready for Submission</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[var(--main-light-color)] p-3 rounded-xl">
            <FileText className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-[var(--font-filson-bold)] text-[var(--main-dark-color)]">Application Details</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-blue-200">
            <span className="text-gray-700 font-medium">Application ID:</span>
            <span className="font-bold text-[var(--main-dark-color)]">VISA-2024-001234</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-blue-200">
            <span className="text-gray-700 font-medium">Submitted Date:</span>
            <span className="font-semibold text-gray-800">January 15, 2024</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-blue-200">
            <span className="text-gray-700 font-medium">Processing Time:</span>
            <span className="font-semibold text-gray-800">3-15 business days</span>
          </div>
          <div className="flex justify-between items-center py-4 bg-[var(--main-light-color)] text-white rounded-xl px-4">
            <span className="font-bold">Status:</span>
            <span className="font-bold">Ready for Review</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-yellow-500 p-3 rounded-xl">
          <Info className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-[var(--font-filson-bold)] text-yellow-900">Important Notice</h3>
      </div>
      <p className="text-gray-700 mb-6 text-lg">By submitting this application, you confirm that:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">All information provided is accurate and complete</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">You understand the visa requirements and conditions</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">You agree to the terms and conditions</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">You understand the processing timeline</span>
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-center gap-6 mt-8">
      <button className='bg-gray-500 hover:bg-gray-600 px-8 py-4 text-white text-lg font-[var(--font-filson-bold)] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
        Edit Application
      </button>
      <button className='bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-12 py-4 text-white text-lg font-[var(--font-filson-bold)] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
        Submit Application
      </button>
    </div>
  </div>
)

export default ReviewSubmitContent
