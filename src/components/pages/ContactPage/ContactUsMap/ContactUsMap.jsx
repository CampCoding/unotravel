import CustomHeading from '@/components/shared/CustomHeading/CustomHeading'
import React from 'react'

export default function ContactUsMap() {
  return (
    <div className='container mt-20'>
        <CustomHeading first_title={"Visit"} second_title={"Us"}/>
        <iframe
        data-aos="fade-up"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1713.4790645784678!2d30.970042940261838!3d30.80380848040875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1753540375154!5m2!1sen!2seg" 
        className='w-full mt-4 rounded-xl' height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}
