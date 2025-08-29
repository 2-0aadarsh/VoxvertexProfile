import { BsGraphUpArrow } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

import HeaderSection from "./HeaderSection";
import InfoCard from "./InfoCard";
import ContactCard from "./ContactCard";

// Custom inline SVG as a React component
const EventIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 14 14"
    className={props.className}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
    >
      <path d="M9.5 3.5h4v4"></path>
      <path d="M13.5 3.5L7.85 9.15a.5.5 0 0 1-.7 0l-2.3-2.3a.5.5 0 0 0-.7 0L.5 10.5"></path>
    </g>
  </svg>
);

const AboutUser = () => {
  const userData = {
    name: "John Doe",
    role: "Event Manager",
    description:
      "Experienced product manager with a passion for creating innovative solutions. Skilled in team leadership, strategic planning, and agile methodologies that drive business growth.",
    profilePic:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
    domains: [
      "Artificial intelligence",
      "Web Development",
      "Cloud Computing",
      "Cybersecurity",
      "Blockchain",
    ],

    stats: [
      { icon: EventIcon, value: "12", label: "Events Organized" },
      { icon: CiStar, value: "450", label: "Connections" },
      { icon: EventIcon, value: "6+ Years", label: "Experience" },
    ],

    contacts: [
      { icon: FiPhone, label: "Contact Number", value: "+91-9836378237" },
      { icon: FiMail, label: "Email Address", value: "peter.p@xyilker.com" },
      { icon: FiMapPin, label: "Location", value: "Uttar Pradesh, India" },
    ],
  };

  return (
    <div className="w-full max-w-[1154px] h-auto bg-[#FFFDFB] shadow-md rounded-lg mx-auto">
      <HeaderSection
        name={userData.name}
        role={userData.role}
        description={userData.description}
        domains={userData.domains}
        profilePic={userData.profilePic}
      />

      {/* Info Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 lg:p-8">
        {userData.stats.map((stat, idx) => (
          <InfoCard key={idx} {...stat} />
        ))}
      </div>

      {/* Contact Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 lg:px-6 pb-6">
        {userData.contacts.map((contact, idx) => (
          <ContactCard key={idx} {...contact} />
        ))}
      </div>
    </div>
  );
};

export default AboutUser;
