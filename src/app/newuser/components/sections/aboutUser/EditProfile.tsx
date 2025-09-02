"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EditProfileProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function EditProfile({ isOpen, onClose }: EditProfileProps) {
  const [expertiseList, setExpertiseList] = useState<string[]>([]);
  const [currentExpertise, setCurrentExpertise] = useState("");

  // Handle the case where onClose might be undefined
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const addExpertise = () => {
    if (currentExpertise.trim() && !expertiseList.includes(currentExpertise.trim())) {
      setExpertiseList([...expertiseList, currentExpertise.trim()]);
      setCurrentExpertise("");
    }
  };

  const removeExpertise = (expertise: string) => {
    setExpertiseList(expertiseList.filter(item => item !== expertise));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving profile...");
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
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
                  <h2 className="text-xl font-semibold text-orange-500">Edit Profile</h2>
                  <p className="text-gray-500 text-[11px] mt-1">
                    Update your personal and professional information.
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
              <div className="mt-4 space-y-4">
                {/* Full Name */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none"
                  />
                </div>

                {/* Bio */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500">
                    Bio *
                  </label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none min-h-[60px] resize-none"
                  ></textarea>
                </div>

                {/* Professional Title + Expertise */}
                <div className="flex gap-2 items-end">
                  <div className="relative flex-1">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500">
                      Professional Title *
                    </label>
                    <input
                      type="text"
                      placeholder="eg. Senior Software Engineer"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none"
                    />
                  </div>
                  <div className="relative flex-1">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500">
                      Area of Expertise *
                    </label>
                    <input
                      type="text"
                      placeholder="eg. Machine Learning"
                      value={currentExpertise}
                      onChange={(e) => setCurrentExpertise(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addExpertise}
                    className="h-[40px] w-[40px] flex items-center justify-center rounded-md bg-orange-500 text-white text-lg hover:bg-orange-600 transition-colors"
                    style={{
                      backgroundImage: "url('/orange_button.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Selected Areas of Expertise */}
                {expertiseList.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-medium text-orange-500 mb-2">
                      Selected Area of Expertise
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {expertiseList.map((expertise, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2"
                        >
                          <span className="text-[11px] text-orange-600">{expertise}</span>
                          <button
                            type="button"
                            onClick={() => removeExpertise(expertise)}
                            className="text-orange-400 hover:text-orange-600 text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-orange-500">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Location"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-[11px] focus:ring-1 focus:ring-orange-400 outline-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2 rounded-md border border-orange-500 text-[11px] text-orange-500 bg-white hover:bg-orange-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
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