"use client";

import { useState } from "react";
import SectionHeader from "../../common/SectionHeader";
import VideoCard from "./VideoCard";
import { FaPlus } from "react-icons/fa6";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const FeaturedVideos = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "The Future of AI in Healthcare",
      duration: "45 min",
      views: "2,547",
      thumbnail: "/ai-healthcare-thumb.jpg",
      videoUrl: "/videos/ai-healthcare.mp4", // ✅ add actual video
    },
    {
      id: 2,
      title: "Machine Learning for Diagnostics",
      duration: "32 min",
      views: "1,892",
      thumbnail:
        "https://images.unsplash.com/photo-1756370473190-4c41ddbd5e59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
      videoUrl: "/videos/ml-diagnostics.mp4", // ✅ add actual video
    },
    {
      id: 3,
      title: "Telemedicine Revolution",
      duration: "28 min",
      views: "3,145",
      thumbnail:
        "https://images.unsplash.com/photo-1756227584303-f1400daaa69d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
      videoUrl: "/videos/telemedicine.mp4", // ✅ add actual video
    },
  ]);

  const addVideo = () => {
    // This would typically open a modal or form to add a new video
    console.log("Add new video functionality");
  };

  return (
    <section className="w-[1154px] bg-[#ffffff] py-4 shadow-md rounded-[13.01px]">
      {/* Header section */}
      <div className="w-[90%] mx-auto ">
        <SectionHeader id="featuredVideos" title="Featured Videos" />

        {/* Videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              duration={video.duration}
              views={video.views}
              thumbnail={video.thumbnail}
              videoUrl={video.videoUrl} // ✅ pass down to VideoCard
            />
          ))}
        </div>

        {/* Progress indicator - optional */}
        <div className="w-full h-5 flex items-center justify-center gap-2 mt-8 relative">
          {/* Left arrow */}
          <BiSolidLeftArrow className="text-[#FF6B35] text-xl cursor-pointer" />
          <div className="w-[1031px] h-2.5 bg-[rgba(255,107,53,0.06)] rounded-full">
            <div
              className="h-full bg-[#FF6B35] rounded-full transition-all duration-300"
              style={{ width: "28%" }} // Adjust dynamically if needed
            ></div>
          </div>
          {/* Right arrow */}
          <BiSolidRightArrow className="text-[#FF6B35] text-xl cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideos;
