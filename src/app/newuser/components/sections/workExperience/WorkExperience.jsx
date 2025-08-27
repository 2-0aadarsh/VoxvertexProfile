import { MdWork } from "react-icons/md";
import SectionHeader from "../../common/SectionHeader"
import WorkExperienceItem from "./WorkExperienceItem"

const WorkExperience = () => {
  const workExperience = [
    {
      title: "Senior Product Manager",
      company: "VoxVertex",
      period: "2020 - Present",
      employmentType: "Full-time",
      description:
        "Led cross-functional teams in developing and launching successful products that increased user engagement by 40%. Managed product roadmap and strategic planning.",
      skills: ["Product Strategy", "Team Leadership", "Data Analysis", "Agile"],
    },
    {
      title: "Product Manager",
      company: "Tech Solutions Inc.",
      period: "2018 - 2020",
      employmentType: "Full-time",
      description:
        "Managed product lifecycle and implemented agile methodologies. Collaborated with engineering and design teams to deliver high-quality products.",
      skills: ["Product Strategy", "Team Leadership", "Data Analysis", "Agile"],
    },
  ];
  const icon = <MdWork />;
  
  return (
    <section className="w-full py-4 shadow-md rounded-lg ">
      <div className="w-[90%] mx-auto ">
        <SectionHeader
          id="workExperience"
          icon={icon}
          title="Work Experience"
          subTitle="Professional journey and achievements"
        />

        <div className="space-y-6 my-12">
          {workExperience.map((job, index) => (
            <WorkExperienceItem key={index} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkExperience