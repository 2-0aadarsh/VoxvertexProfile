"use client";

import { useState } from "react";
import ProfileButton from "../common/ProfileButton";
import SearchBar from "../common/SearchBar";
import { LuBell } from "react-icons/lu";

const ProfileHeader = () => {
  const [notifications, setNotifications] = useState(3);
  return (
    <header className="w-full h-20 bg-[#FFFFFF] flex items-center justify-end px-6 text-[#000000] shadow-lg">
      <div className="flex items-center gap-8">
        <SearchBar />
        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <LuBell className="w-6 h-6 font-[800]" />

          {/* Show badge if notifications exist */}
          {notifications > 0 && (
            <span className="absolute -top-3 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-[#FF6B35] text-white text-xs font-bold leading-[150.7%] tracking-[8%]">
              {notifications}
            </span>
          )}
        </div>
        <ProfileButton />
      </div>
    </header>
  );
};

export default ProfileHeader;
