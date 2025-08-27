import { RiEditBoxFill } from "react-icons/ri";
import { MdOutlineCameraAlt } from "react-icons/md";

const HeaderSection = ({ name, role, description, domains, profilePic }) => {
  const visibleDomains = domains.slice(0, 3);
  const remainingCount = domains.length - visibleDomains.length;

  return (
    <div className="w-full h-[193px] flex items-start justify-between bg-[#FF6B35] p-5 rounded-t-lg">
      {/* Profile Picture */}
      <div className="w-[128px] h-[138px] bg-white rounded-lg p-[5px] relative">
        <img
          src={profilePic}
          className="w-full h-full object-cover object-center rounded-lg"
          alt="Profile"
        />
        <div className="absolute -bottom-3 -right-1 w-[50px] h-[50px] p-3 bg-[#FF6B35] flex items-center justify-center rounded-full shadow-md cursor-pointer">
          <MdOutlineCameraAlt className="text-white text-2xl" />
        </div>
      </div>

      {/* User Info */}
      <div className="flex flex-col w-full h-[138px] mx-4 text-white justify-between">
        <div>
          <h1 className="font-semibold text-black text-[25px]">{name}</h1>
          <p className="text-[16px] opacity-90 font-medium">{role}</p>
        </div>

        <p className="text-[13px] leading-relaxed mt-1">{description}</p>

        {/* Domains */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {visibleDomains.map((domain, index) => (
            <span
              key={index}
              className="bg-white/30 text-white px-3 py-1 rounded-xl text-sm font-medium shadow border border-white/60"
            >
              {domain}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="bg-white/30 text-white px-3 py-1 rounded-md text-sm font-medium shadow border border-white/60">
              +{remainingCount}
            </span>
          )}
        </div>
      </div>

      {/* Edit Button */}
      <button className="w-[140px] h-[35px] bg-white text-black rounded-md shadow font-medium text-sm hover:opacity-90 transition flex items-center justify-center gap-1 px-2 cursor-pointer">
        <RiEditBoxFill />
        Edit Profile
      </button>
    </div>
  );
};

export default HeaderSection;
