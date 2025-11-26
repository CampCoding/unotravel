"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import Image from "next/image";
import React, { useState } from "react";
import HomeProjectCard from "./HomeProjectCard/HomeProjectCard";
import ShinyText from "@/components/shared/ShinyText/ShinyText";

const tabs = [
  { id: 1, title: "All" },
  { id: 2, title: "Blogs" },
  { id: 3, title: "Events" },
];

const newsData = [
  {
    id: 1,
    type: "Blog",
    count: 443,
    title: "The All-In-One Bali Trip",
    description:
      "Introducing the : Pioneering the Future of Automotive Innovation. A Groundbreaking Marvel...",
    image: "/images/blogs (1).webp",
  },
  {
    id: 2,
    type: "Event",
    count: 27,
    title: "Hajj and Umrah Services",
    description:
      "Introducing the : Pioneering the Future of Automotive Innovation. A Groundbreaking Marvel...",
    image: "/images/blogs (2).webp",
  },
  {
    id: 3,
    type: "Blog",
    count: null,
    title: "Gym Cleaning",
    description:
      "Introducing the : Pioneering the Future of Automotive Innovation. A Groundbreaking Marvel...",
    image: "/images/blogs (3).webp",
  },
];

export default function HomeProjects() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="container mt-[123px]">
      <CustomHeading first_title={"Latest"} second_title={"News"} />

      <div
        data-aos="zoom-in"
        className="flex mt-[47px] gap-[114px] items-center"
      >
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              text-lg font-medium text-(--main-dark-color)
              border-b-[4px]
              transition-all duration-300
              ${
                activeTab === item.id
                  ? "border-b-[#3B85C1]"
                  : "border-b-transparent"
              }
            `}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="mt-[28px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[38px]">
          {newsData?.map((item) => (
            <HomeProjectCard key={item?.id} item={item} />
          ))}
        </div>

        <button
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            animationDuration: "5s",
          }}
          className="text-[#16294F] bg-clip-text  mx-auto text-lg flex justify-center items-center w-fit text-center !mt-[54px]"
        >
          View All
        </button>
      </div>
    </div>
  );
}
