"use client";
import { useState } from "react";
import GeneratePost from "./GeneratePost";
import PostHeader from "./PostHeader";
import RecentPosts from "./RecentPosts";

const Post = () => {
  const [recentPosts, setRecentPosts] = useState([
    {
      content:
        "Excited to share that our team successfully launched a new product feature that improves user experience by 40%! The journey involved extensive user research, iterative design, and close collaboration with our engineering team.",
      date: "1/15/2024",
      likes: 24,
      comments: 8,
    },
    {
      content:
        "Just completed an amazing workshop on 'Leading Remote Teams' at Stanford. Key takeaway: Communication clarity and trust-building are the foundations of successful remote leadership.",
      date: "1/15/2024",
      likes: 24,
      comments: 8,
    },
  ]);

  const handleNewPost = (newPost) => {
    setRecentPosts((prev) => [newPost, ...prev]); 
  };

  return (
    <section className="w-[1154px] bg-[#ffffff] pb-4 shadow-md rounded-lg">
      <PostHeader />
      <GeneratePost onPost={handleNewPost} />
      <RecentPosts recentPosts={recentPosts} />
    </section>
  );
};

export default Post;
