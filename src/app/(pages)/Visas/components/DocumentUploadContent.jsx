import React, { useState } from 'react'
import { FileText, Camera, Building2, Plane , ArrowLeft ,ArrowRight} from 'lucide-react';
export default function DocumentUpload({setActiveTab}) {
     const [documents , setDocument] = useState([
    {
      id: 'passport',
      icon: FileText,
      title: 'Passport',
      description: 'Upload clear scan of passport pages'
    },
    {
      id: 'photograph',
      icon: Camera,
      title: 'Photograph',
      description: 'Recent passport-sized photo'
    },
    {
      id: 'bankStatement',
      icon: Building2,
      title: 'Bank Statement',
      description: 'Last 3 months statements'
    },
    {
      id: 'travelItinerary',
      icon: Plane,
      title: 'Travel Itinerary',
      description: 'Flight booking details'
    }
  ]);

  //Add function 
  const addDocument = (newDoc) =>{
    setDocument((prevDoc)=>[...prevDoc , newDoc])
  }

  //Delete Function 
  const deleteDocument = (id)=>{
    setDocument((prevDoc) => prevDoc.filter(doc => doc.id !== id ))
  }
  return (
    <div className='p-4 pt-0 w-[100%]'>
       <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto ">
        <div className="p-4 border-2 border-gray-200 bg-white !rounded-lg">
               <div className=''>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-green-100 !rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-[var(--font-filson-bold)] text-[var(--main-dark-color)]">Document Upload</h2>
          </div>
        

          <div className='grid grid-cols-2 gap-4'>
            {documents.map((doc) => {
            const Icon = doc.icon;
            
            return (
              <div
                key={doc.id}
                className="bg-white rounded-xl p-8 border-2 border-dashed border-gray-300"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gray-100 !rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-[var(--main-light-color)]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-[var(--font-filson-bold)] text-[var(--main-dark-color)] mb-2">
                    {doc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--main-dark-color)] mb-6">
                    {doc.description}
                  </p>

                  {/* Upload Button */}
                  <button className="bg-[var(--main-dark-color)] text-white hover:scale-105 hover:shadow transition-all font-medium py-2.5 px-6 !rounded-lg cursor-pointer">
                    Upload File
                  </button>
                </div>
              </div>
            );
          })}
          </div>
          <div className='flex my-4 justify-between items-center'>
          <button onClick={()=>setActiveTab('Application Form')} className='flex gap-2 text-sm items-center cursor-pointer bg-gray-200/80 hover:bg-gray-300/70  hover:scale-105 transition-all px-4 !rounded-lg py-2 text-gray-500'> <ArrowLeft/> Back to application</button>
           <button onClick={()=>setActiveTab('Approved')} className='flex gap-2 text-sm items-center cursor-pointer text-blue-50 px-4 !rounded-lg py-2 bg-[var(--main-light-color)] hover:bg-[var(--main-dark-color)] hover:scale-105 transition-all'> <ArrowRight/> Continue to Approved </button>
          </div>
        </div>
        </div>
        
      </div>
    </div>
    </div>
  )
}
