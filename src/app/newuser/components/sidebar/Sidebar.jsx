import { CiSettings, CiUser } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { CalendarDays } from "lucide-react";
import { VscCreditCard } from "react-icons/vsc";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";


const Sidebar = () => {
  const navigationItems = [
    {
      icon: <CiUser />,
      label: "Profile",
      href: "/",
      active: true,
    },
    {
      icon: <MdOutlineDashboard />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <LuMessageCircleMore />,
      label: "Messages",
      href: "/messages",
    },
    {
      icon: <IoCalendarOutline />,
      label: "Bookings",
      href: "/bookings",
    },
    {
      icon: <CalendarDays />,
      label: "Events",
      href: "/events",
    },
    {
      icon: <VscCreditCard />,
      label: "Payments",
      href: "/payments",
    },
    {
      icon: <FaMoneyBillTrendUp />,
      label: "Dispute",
      href: "/dispute",
    },
  ];

  const bottomItems = [
    {
      icon: <BiSupport />,
      label: "Support",
      href: "/support",
    },
    {
      icon: <CiSettings />,
      label: "Settings",
      href: "/settings",
    },
  ];

  const userDetails = { name: "John Doe", email: "John@gmail.com" };

  return (
    <div className="flex flex-col justify-between items-between  w-[20%]  shadow-md">
      <div className="flex flex-col gap-6 p-10">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer px-7 flex items-center justify-start text-[19.64px] font-semibold gap-5 w-[199px] h-[48px] rounded-[10px] ${
              item.active && `text-[#FF6B35] bg-[#FFE2D7] `
            }`}
          >
            {item.icon}
            <a href="/">{item.label}</a>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col gap-6 px-10">
          {bottomItems.map((item, index) => (
            <div
              key={index}
              className={` cursor-pointer px-7 flex items-center justify-start text-[19.64px] font-semibold gap-5 w-[199px] h-[48px] rounded-[10px] `}
            >
              {item.icon}
              <a href="/">{item.label}</a>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-[#000000]/19 p-5 flex items-center justify-between ">
          <div className=" profileImg w-[46px] h-[46px] overflow-hidden cursor-pointer flex items-center justify-center">
            <img
              src="./profile.png"
              alt="profile"
              className="w-full h-hull object-contain object-center"
            />
          </div>

          <div className=" profileDetails flex flex-col items-start justify-center ">
            <h2 className="text-lg font-bold leading-[150.7%] tracking-[8%] cursor-pointer ">
              {userDetails.name}
            </h2>
            <p className="text-[13px] text-[#6B7280] leading-[150.7%] tracking-[8%]">
              {userDetails.email}
            </p>
          </div>

          <div className="logout">
            <MdLogout className="text-[#DC2626] text-[33px] cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
