"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoData {
  videoFile: File | null;
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
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customThumbnailUrl, setCustomThumbnailUrl] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle the case where onClose might be undefined
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleBrowseFile = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    // Basic validation
    if (!videoFile || !videoTitle || !description || !customThumbnailUrl) {
      alert("Please fill in all required fields");
      return;
    }

    // Pass the data back to parent
    if (onSave) {
      onSave({
        videoFile,
        title: videoTitle,
        description,
        customThumbnailUrl
      });
    }

    // Reset form
    setVideoFile(null);
    setVideoTitle("");
    setDescription("");
    setCustomThumbnailUrl("");
  };

  const handleCancel = () => {
    setVideoFile(null);
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

          {/* Modal */}
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
                  
                  {/* Upload Video Option Button */}
                  <div className="mb-6">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 px-16 py-3 rounded-md text-white bg-orange-500 text-[11px] font-medium hover:bg-orange-600 transition-colors min-w-[150px]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Video
                    </button>
                  </div>
                </div>

                {/* Upload Video */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500 z-10">
                    Upload Video *
                  </label>
                  <div className="w-full rounded-md border border-gray-300 px-4 py-8 text-center bg-white">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      {/* Upload Icon */}
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      
                      {videoFile ? (
                        <div className="text-center">
                          <p className="text-[11px] text-gray-700 font-medium">{videoFile.name}</p>
                          <p className="text-[10px] text-gray-500">
                            {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-[11px] text-gray-600 font-medium">Tap to upload Video</p>
                          <p className="text-[10px] text-gray-400">
                            Supported formats: MP4, AVI, MOV
                          </p>
                          <p className="text-[10px] text-gray-400">
                            (Max 100MB/5Mpx)
                          </p>
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onClick={handleBrowseFile}
                        className="px-5 py-1 rounded-md text-[10px] text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                      >
                        Browse File
                      </button>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp4,.avi,.mov"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
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