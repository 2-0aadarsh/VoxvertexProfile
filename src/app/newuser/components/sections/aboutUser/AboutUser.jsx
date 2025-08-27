import { BsGraphUpArrow } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

import HeaderSection from "./HeaderSection";
import InfoCard from "./InfoCard";
import ContactCard from "./ContactCard";

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
      { icon: BsGraphUpArrow, value: "12", label: "Events Organized" },
      { icon: CiStar, value: "450", label: "Connections" },
      { icon: CiStar, value: "6+ Years", label: "Experience" },
    ],
    contacts: [
      { icon: FiPhone, label: "Contact Number", value: "+91-9836378237" },
      { icon: FiMail, label: "Email Address", value: "peter.p@xyilker.com" },
      { icon: FiMapPin, label: "Location", value: "Uttar Pradesh, India" },
    ],
  };

  return (
    <div className="w-[1154px] h-[550px] bg-[#FFFDFB] shadow-md rounded-lg">
      <HeaderSection
        name={userData.name}
        role={userData.role}
        description={userData.description}
        domains={userData.domains}
        profilePic={userData.profilePic}
      />

      {/* Info Cards */}
      <div className="w-full grid grid-cols-3 gap-5 p-8">
        {userData.stats.map((stat, idx) => (
          <InfoCard key={idx} {...stat} />
        ))}
      </div>

      {/* Contact Cards */}
      <div className="w-full grid grid-cols-3 gap-5 px-6 pb-6">
        {userData.contacts.map((contact, idx) => (
          <ContactCard key={idx} {...contact} />
        ))}
      </div>
    </div>
  );
};

export default AboutUser;
