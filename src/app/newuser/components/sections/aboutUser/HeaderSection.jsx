"use client";

import { RiEditBoxFill } from "react-icons/ri";
import { MdOutlineCameraAlt } from "react-icons/md";
import { motion } from "framer-motion";

const HeaderSection = ({ name, role, description, domains, profilePic }) => {
  const visibleDomains = domains.slice(0, 3);
  const remainingCount = domains.length - visibleDomains.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-[193px] flex items-start justify-between bg-[#FF6B35] p-5 rounded-t-lg"
    >
      {/* Profile Picture */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-[128px] h-[138px] bg-white rounded-lg p-[5px] relative"
      >
        <img
          src={profilePic}
          className="w-full h-full object-cover object-center rounded-lg"
          alt="Profile"
        />
        <motion.div
          whileHover={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute -bottom-3 -right-1 w-[50px] h-[50px] p-3 bg-[#FF6B35] flex items-center justify-center rounded-full shadow-md cursor-pointer"
        >
          <MdOutlineCameraAlt className="text-white text-2xl" />
        </motion.div>
      </motion.div>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col w-full h-[138px] mx-4 text-white justify-between"
      >
        <div>
          <h1 className="font-semibold text-black text-[25px]">{name}</h1>
          <p className="text-[16px] opacity-90 font-medium">{role}</p>
        </div>

        <p className="text-[13px] leading-relaxed mt-1">{description}</p>

        {/* Domains */}
        <motion.div
          className="flex gap-2 mt-3 flex-wrap"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {visibleDomains.map((domain, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 },
              }}
              className="bg-white/30 text-white px-3 py-1 rounded-xl text-sm font-medium shadow border border-white/60"
            >
              {domain}
            </motion.span>
          ))}
          {remainingCount > 0 && (
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 },
              }}
              className="bg-white/30 text-white px-3 py-1 rounded-md text-sm font-medium shadow border border-white/60"
            >
              +{remainingCount}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Edit Button */}
      <motion.button
        whileHover={{
          color: "#FF6B35",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          color: { duration: 0.3, ease: "easeInOut" },
          boxShadow: { duration: 0.3, ease: "easeInOut" },
        }}
        className="w-[140px] h-[35px] bg-white text-black rounded-md 
             shadow font-medium text-sm transition 
             flex items-center justify-center gap-1 px-2 cursor-pointer"
      >
        <RiEditBoxFill />
        Edit Profile
      </motion.button>
    </motion.div>
  );
};

export default HeaderSection;
