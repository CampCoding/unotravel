"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetBlogsData } from "../../../lib/features/layoutSlice";
import HomeProjectCard from "../../../components/pages/HomePage/HomeProjects/HomeProjectCard/HomeProjectCard";
import BlogBanner from "../../../components/pages/BlogPage/BlogBanner/BlogBanner";
import CustomHeading from "../../../components/shared/CustomHeading/CustomHeading";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { blogs_data, blogs_loading, selectedLanguage } = useSelector((state) => state?.layout);

  useEffect(() => {
    dispatch(handleGetBlogsData());
  }, []);

  const pageData = blogs_data?.data?.data;
  const articles = pageData?.articles ?? [];

  const getTranslation = (item) =>
    item?.translations?.find((t) => t.language_id === Number(selectedLanguage)) ||
    item?.translations?.[0] || {};

  const normalizedArticles = articles.map((item) => {
    const t = getTranslation(item);
    return {
      ...item,
      title: t.title || item.title || "",
      short_text: t.short_text || item.short_text || "",
    };
  });

  return (
    <div className="">
      <BlogBanner banners={pageData?.heroBanners} />
      <div data-aos="zoom-in-up" className="mt-[28px] container">
        <motion.div
          className="mx-auto w-fit mb-8"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        >
          <CustomHeading first_title={"OUR"} second_title={"BLOGS"} />
        </motion.div>

        {blogs_loading ? (
          <div className="text-center py-12 text-gray-400 text-lg">Loading...</div>
        ) : normalizedArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[38px]">
            {normalizedArticles.map((item) => (
              <HomeProjectCard
                onclick={() => router.push(`/blogs/${item?.article_id}`)}
                key={item.article_id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 text-lg">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  );
}
