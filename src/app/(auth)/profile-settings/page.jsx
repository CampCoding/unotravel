"use client";
import CustomHeading from '@/components/shared/CustomHeading/CustomHeading'
import Modal from '@/components/shared/Modal/Modal'
import React, { useState } from 'react'

export default function Page() {
  const [openModal , setOpenModal] = useState(false);

  return (
    <Modal open={openModal} setOpen={setOpenModal} className={"bg-[#F5F6FA]"}>
      <div className='container'>
       <CustomHeading first_title={"Profile"} second_title={"Setting"}/>
       
    </div>
    </Modal>
  )
}
