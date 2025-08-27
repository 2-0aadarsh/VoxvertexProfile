import SectionHeader from "../../common/SectionHeader" 
import VideoCard from "./VideoCard"

const FeaturedVideos = () => {
  const videos = [
    {
      title: "The Future of AI in Healthcare",
      duration: "45 min",
      views: "2,547",
    },
    {
      title: "The Future of AI in Healthcare",
      duration: "45 min",
      views: "2,547",
    },
    {
      title: "The Future of AI in Healthcare",
      duration: "45 min",
      views: "2,547",
    },
  ];


  return (
    <section className="w-full py-4 shadow-md rounded-lg ">
      <div className="w-[90%] mx-auto ">
        <SectionHeader id="featuredVideos" title="Featured Videos" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-6 my-12">
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedVideos