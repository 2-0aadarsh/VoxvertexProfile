"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoData {
  videoUrl: string;
  title: string;
  description: string;
  customThumbnailUrl: string;
}

interface AddFeaturedVideoProps {
  isOpen: boolean;
  onClose?: () => void;
  onSave?: (videoData: VideoData) => void;
}

export default function AddFeaturedVideo({ isOpen, onClose, onSave }: AddFeaturedVideoProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customThumbnailUrl, setCustomThumbnailUrl] = useState("");

  // Handle the case where onClose might be undefined
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = () => {
    // Basic validation
    if (!videoUrl || !videoTitle || !description || !customThumbnailUrl) {
      alert("Please fill in all required fields");
      return;
    }

    // Pass the data back to parent
    if (onSave) {
      onSave({
        videoUrl,
        title: videoTitle,
        description,
        customThumbnailUrl
      });
    }

    // Reset form
    setVideoUrl("");
    setVideoTitle("");
    setDescription("");
    setCustomThumbnailUrl("");
  };

  const handleCancel = () => {
    setVideoUrl("");
    setVideoTitle("");
    setDescription("");
    setCustomThumbnailUrl("");
    if (onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <> 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent z-40"
            onClick={handleClose}
          />

          {/* Mdal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[95vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-orange-500">Add Featured Video</h2>
                  <p className="text-gray-500 text-[11px] mt-1">
                    Add a video to showcase your speaking or presentation skills.
                  </p>
                  <p className="text-[11px] text-gray-400 mt-2">* Indicates required</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <div className="mt-4 space-y-6">
                {/* How would you like to add your video */}
                <div>
                  <h3 className="text-[11px] font-medium text-orange-500 mb-4">
                    How would you like to add your video?
                  </h3>
                </div>

                {/* Video URL */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500 z-10">
                    Video URL *
                  </label>
                  <input
                    type="text"
                    placeholder="https://"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none"
                    required
                  />
                  <p className="text-[10px] text-orange-400 mt-1">
                    Supported platforms: YouTube, Vimeo
                  </p>
                </div>

                {/* Video Title */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500 z-10">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Video Title"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none"
                    required
                  />
                </div>

                {/* Description */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500 z-10">
                    Description *
                  </label>
                  <textarea
                    placeholder="Describe what this video is about, what topics you cover, or any key takeaway..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none min-h-[80px] resize-none"
                    required
                  ></textarea>
                </div>

                {/* Custom Thumbnail URL */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500 z-10">
                    Custom Thumbnail URL *
                  </label>
                  <input
                    type="text"
                    placeholder="https://"
                    value={customThumbnailUrl}
                    onChange={(e) => setCustomThumbnailUrl(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none"
                    required
                  />
                  <p className="text-[10px] text-orange-400 mt-1">
                    Provide a custom thumbnail image URL for your video
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-md border border-orange-500 text-[11px] text-orange-500 bg-white hover:bg-orange-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-md text-[11px] text-white bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all duration-200"
                    style={{
                      backgroundImage: "url('/orange_button.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}