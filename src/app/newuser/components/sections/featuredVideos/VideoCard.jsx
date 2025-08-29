import { useState } from "react";
import { FaPlay, FaRegEye } from "react-icons/fa";

const VideoCard = ({ title, duration, views, thumbnail, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-[352px] h-[437px] bg-white rounded-2xl overflow-hidden shadow-lg flex-shrink-0 flex flex-col">
      {/* Thumbnail / Video container */}
      <div className="relative h-[369px] bg-gray-100 flex items-center justify-center">
        {!isPlaying ? (
          <>
            {/* Thumbnail */}
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
            )}

            {/* Play button */}
            <button
              onClick={() => setIsPlaying(true)}
              className="relative z-10 cursor-pointer w-12 h-12 rounded-full border-2 border-[#FF6B35] flex items-center justify-center bg-white/80 hover:scale-105 transition"
            >
              <FaPlay className="text-[#FF6B35] text-lg ml-1" />
            </button>

            {/* Duration */}
            <div className="absolute top-4 right-4 bg-[#FF6B35] text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>
          </>
        ) : (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Info */}
      <div className="bg-[#FF6B35] text-white p-4 flex-1 flex flex-col justify-center">
        <h3 className="font-medium text-base mb-2 line-clamp-2 leading-[150%] tracking-[8%]">
          {title}
        </h3>
        <div className="flex items-center text-sm opacity-90">
          <FaRegEye className="mr-1.5" />
          <span>{views} views</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
