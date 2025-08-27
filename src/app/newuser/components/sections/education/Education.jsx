import SectionHeader from "../../common/SectionHeader";
import EducationItem from "./EducationItems";

const Education = () => {
  const education = [
    {
      degree: "Master of Business Administration",
      institution: "Stanford University",
      period: "2018 - 2020",
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      period: "2014 - 2018",
    },
  ];


  return (
    <div className="w-full py-4 shadow-md rounded-lg ">
      <div className="w-[90%] mx-auto ">
        <SectionHeader id="education" title="Education" />

        <div className="space-y-6">
          {education.map((edu, index) => (
            <EducationItem key={index} {...edu} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Education