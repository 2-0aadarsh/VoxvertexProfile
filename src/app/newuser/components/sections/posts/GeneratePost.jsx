"use client";
import { useState } from "react";
import { FiImage, FiFileText } from "react-icons/fi";
import { LiaTelegramPlane } from "react-icons/lia";
import { motion } from "framer-motion";

const ActionButton = ({ icon: Icon, label }) => (
  <button
    type="button"
    className="flex items-center space-x-2 bg-white border border-gray-300 rounded-2xl px-7 py-2 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors"
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </button>
);

const PrimaryButton = ({ label, disabled }) => (
  <motion.button
    type="submit"
    disabled={disabled}
    whileHover={
      !disabled
        ? { scale: 1.05, boxShadow: "0px 4px 10px rgba(0,0,0,0.15)" }
        : {}
    }
    whileTap={!disabled ? { scale: 0.95 } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`flex items-center justify-between gap-2 bg-gradient-to-r from-[#FF6B35]/90 to-[#FF6B35] 
      border border-[#FF6B35] text-white px-6 py-2 rounded-2xl font-semibold text-sm shadow-sm
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <LiaTelegramPlane className="text-xl stroke-[1]" />
    {label}
  </motion.button>
);

const GeneratePost = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Post cannot be empty.");
      return;
    }
    setError("");
    onPost({
      content,
      date: new Date().toLocaleDateString(),
      likes: 0,
      comments: 0,
    });
    setContent(""); // reset textarea
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border-b border-gray-200 space-y-4"
    >
      {/* Input Area */}
      <div className="bg-[rgba(255,107,53,0.05)] border border-[#FF6B35] rounded-2xl p-5">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What’s on your mind? Share insights, achievements, or professional updates..."
          className="w-full bg-transparent outline-none resize-none text-[#FF6B35] placeholder-[#FF6B35]/70 text-base h-[170px]"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Action Row */}
      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-3">
          <ActionButton icon={FiImage} label="Photo" />
          <ActionButton icon={FiFileText} label="File" />
        </div>

        <PrimaryButton className="" label="Post" disabled={!content.trim()} />
      </div>
    </form>
  );
};

export default GeneratePost;
