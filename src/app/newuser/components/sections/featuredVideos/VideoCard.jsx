import { FaPlay, FaRegEye } from "react-icons/fa";

const VideoCard = ({ title, duration, views }) => {
  return (
    <div className="w-full bg-orange-500 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative bg-white h-64">
        {/* Video thumbnail would go here */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-[#FF6B35] rounded-full flex items-center justify-center">
            <FaPlay className="w-5 h-5 text-[#FF6B35] ml-1"/>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-[#FF6B35] text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium text-base mb-2">{title}</h3>
        <div className="flex items-center text-orange-200 text-xs">
          <span className="mr-2">
            <FaRegEye />
          </span>
          <span>{views} views</span>
        </div>
      </div>
    </div>
  );
};
export default VideoCard;
