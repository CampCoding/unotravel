"use client";
import CustomHeading from "@/components/shared/CustomHeading/CustomHeading";
import React, { useRef, useState } from "react";
import "swiper/css";

const videos = [
  { id: 1, video: "/videos/videos reel (1).mp4" },
  { id: 2, video: "/videos/videos reel (2).mp4" },
  { id: 3, video: "/videos/videos reel (3).mp4" },
  { id: 4, video: "/videos/videos reel (4).mp4" },
  { id: 5, video: "/videos/videos reel (5).mp4" },
  { id: 6, video: "/videos/videos reel (6).mp4" },
];

export default function HomeReels() {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  const handleVideoClick = (e, index) => {
    const video = e.currentTarget;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setPlayingIndex(index);

      const container = containerRef.current;
      const videoElement = container.children[index];
      const containerRect = container.getBoundingClientRect();
      const videoRect = videoElement.getBoundingClientRect();
      const offsetLeft = videoRect.left - containerRect.left;

      container.scrollTo({
        left: container.scrollLeft + offsetLeft - 30, // adjust spacing
        behavior: "smooth",
      });
    } else {
      video.pause();
      setIsPlaying(false);
      setPlayingIndex(null);
    }
  };

  return (
    <div data-aos="zoom-in-up" className="mt-[98px]">
      <div className="container">
        <CustomHeading first_title="FEATURED" second_title="REELS" />
      </div>

      <div className="overflow-hidden w-full mt-[61px] bg-white">
        <div
          ref={containerRef}
          className={`flex gap-[30px] 2xl:gap-[57px] whitespace-nowrap  scroll-smooth ${
            isPlaying ? "" : "animate-marquee"
          }`}
        >
          {[...videos, ...videos].map((video, index) => (
            <video
              key={index}
              src={video.video}
              muted
              loop
              playsInline
              preload="metadata"
              onClick={(e) => handleVideoClick(e, index)}
              className={`${
                index < videos.length
                  ? "w-[300px] h-[590px] 2xl:w-[351px] 2xl:h-[623px] rounded-xl even:!mt-12"
                  : "w-[300px] h-[500px] rounded-lg"
              } object-cover cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
