import CustomHeading from '@/components/shared/CustomHeading/CustomHeading'
import React from 'react'
import UmraPackage from './UmraPackage/UmraPackage';


const umrahPackages = [
  {
    id:1,
    title: "Umrah Backages Name Sample",
    subtitle: "Tour Details Seeks Place On Tourist Map ....",
    price: "200",
    currency: "$",
    image: "/images/download (20).jfif",
    buttonLabel: "View Tour",
  },
  {
    id:2,
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ....",
    price: "200",
    currency: "$",
    image: "/images/download (19).jfif",
    buttonLabel: "View Tour",
  },
  {
    id:3,
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ....",
    price: "200",
    currency: "$",
    image: "/images/download (18).jfif",
    buttonLabel: "View Tour",
  },
  {
    id:4,
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ....",
    price: "200",
    currency: "$",
    image: "/images/download (17).jfif",
    buttonLabel: "View Tour",
  },
  {
    id:5,
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ....",
    price: "200",
    currency: "$",
    image: "/images/download (16).jfif",
    buttonLabel: "View Tour",
  },
  {
    id:6,
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ....",
    price: "200",
    currency: "$",
    image: "/images/download (15).jfif",
    buttonLabel: "View Tour",
  },
  { 

    id:7,
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ....",
    price: "200",
    currency: "$",
    image: "/images/download (15).jfif",
    buttonLabel: "View Tour",
  },
  {
    id:8,
    title: "Tour Details Seeks Place On The Tourist Map",
    subtitle: "Tour Details Seeks Place On Tourist Map ....",
    price: "200",
    currency: "$",
    image: "/images/download (14).jfif",
    buttonLabel: "View Tour",
  },
];

export default function UmraPackages() {
  return (
    <div className='container mt-10'>
        <div data-aos="fade-up">
            <CustomHeading first_title={"Umrah"} second_title={"Packages"}/>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 mt-10 gap-[10px]'>
          {umrahPackages?.map(item => 
            <UmraPackage key={item?.id} data={item}/>
          )}
        </div>  
    </div>
  )
}
