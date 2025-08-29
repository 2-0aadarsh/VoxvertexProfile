"use client";
import { motion } from "framer-motion";

const RecentPosts = ({ recentPosts }) => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-black font-medium text-lg">Recent Posts</h3>

        <motion.button
          whileHover={{ scale: 1.05, color: "#FF6B35" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-[#FF6B35] text-sm font-medium flex items-center cursor-pointer"
        >
          View All ({recentPosts.length}) 
        </motion.button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {recentPosts.map((post, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.001,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="bg-[rgba(255,107,53,0.1)] border border-[rgba(255,107,53,0.24)] rounded-2xl p-5 transition-all"
          >
            <p className="text-[rgba(0,0,0,0.6)] text-sm leading-relaxed mb-3">
              {post.content}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-[rgba(107,114,128,0.65)] font-medium">
                  {post.date}
                </span>
                <span className="text-xs text-[rgba(107,114,128,0.65)] font-medium">
                  {post.likes} likes
                </span>
                <span className="text-xs text-[rgba(107,114,128,0.65)] font-medium">
                  {post.comments} comments
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.2, rotate: 10, color: "#FF6B35" }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="text-[rgba(107,114,128,0.65)] text-2xl font-medium pb-1 px-1 rounded"
              >
                ...
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
