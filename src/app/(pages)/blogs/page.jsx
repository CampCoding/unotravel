"use client";

import React from 'react'
import { blog_data } from '../../../utils/data'
import HomeProjectCard from '../../../components/pages/HomePage/HomeProjects/HomeProjectCard/HomeProjectCard'
import BlogBanner from '../../../components/pages/BlogPage/BlogBanner/BlogBanner';
import CustomHeading from '../../../components/shared/CustomHeading/CustomHeading';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();

  return (
    <div className=''>
      <BlogBanner />
      <div
       data-aos="zoom-in-up"
      className="mt-[28px] container">
        <motion.div
        className='mx-auto w-fit mb-8'
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5,delay:0.5 , ease: "easeInOut" }}
        >
          <CustomHeading
            first_title={"OUR"} second_title={"BLOGS"} />
        </motion.div>

        {blog_data?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[38px]">
              {blog_data?.map((item) => (
                <HomeProjectCard 
                  onclick={() => router.push(`/blogs/${item?.article_id}`)}
                  key={item.article_id}
                  item={item}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500 text-lg">
            No projects found for this category.
          </div>
        )}
      </div>
    </div>
  )
}
