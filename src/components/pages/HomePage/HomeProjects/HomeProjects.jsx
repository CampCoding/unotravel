"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import HomeProjectCard from "./HomeProjectCard/HomeProjectCard";
import ShinyText from "@/components/shared/ShinyText/ShinyText";
import {useRouter} from 'next/navigation';

export default function HomeProjects({ data }) {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();

  // Use useMemo for better performance with category calculations
  const categoryTabs = useMemo(() => {
    if (!data?.data?.length) return [{ id: "all", value: "all", title: "All" }];
    
    const uniqueCategories = data.data.reduce((acc, item) => {
      if (item?.category_id && !acc.find(cat => cat.id === item.category_id)) {
        acc.push({
          id: item.category_id,
          value: item.category_id,
          title: item.category_name || `Category ${item.category_id}`
        });
      }
      return acc;
    }, []);
    
    return [
      { id: "all", value: "all", title: "All" },
      ...uniqueCategories
    ];
  }, [data]);

  // Use useMemo for filtered data
  const filteredData = useMemo(() => {
    if (!data?.data?.length) return [];
    
    if (activeTab === "all") {
      return data.data;
    }
    
    return data.data.filter(item => item.category_id === activeTab);
  }, [activeTab, data]);

  return (
    <div className="container mt-[123px]">
      {/* Section Name/Title */}
      {data?.sectionName && (
        <div dangerouslySetInnerHTML={{ __html: data.sectionName }}></div>
      )}

      {/* Tabs Navigation */}
      <div
        data-aos="zoom-in"
        className="flex mt-[47px] gap-4 md:gap-8 lg:gap-[114px] items-center overflow-x-auto pb-2"
      >
        {categoryTabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              text-lg font-medium text-(--main-dark-color) whitespace-nowrap
              border-b-[4px] pb-2
              transition-all duration-300
              ${
                activeTab === item.id
                  ? "border-b-[#3B85C1] text-[#3B85C1]"
                  : "border-b-transparent hover:border-b-gray-300"
              }
            `}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="mt-[28px]">
        {filteredData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[38px]">
              {filteredData.map((item) => (
                <HomeProjectCard 
                  key={item.article_id} 
                  item={item} 
                />
              ))}
            </div>

            {/* View All Button */}
            <button
             onClick={() => router.push('/blogs')}
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                animationDuration: "5s",
              }}
              className="text-[#16294F] bg-clip-text mx-auto text-lg flex justify-center items-center w-fit text-center !mt-[54px] hover:text-[#3B85C1] transition-colors"
            >
              View All
            </button>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500 text-lg">
            No projects found for this category.
          </div>
        )}
      </div>
    </div>
  );
}