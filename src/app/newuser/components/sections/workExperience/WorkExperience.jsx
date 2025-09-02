"use client";

import { useState } from "react";
import { MdWork } from "react-icons/md";
import SectionHeader from "../../common/SectionHeader";
import WorkExperienceItem from "./WorkExperienceItem";
import AddWorkExperience from "./AddWorkExperience";

const WorkExperience = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveWorkExperience = (workData) => {
    // Handle saving the work experience data here
    console.log("Saving work experience:", workData);
    // You can add the new work experience to your state or send it to an API
    setIsAddModalOpen(false);
  };

  return (
    <>
      <section className="w-[1154px] bg-[#ffffff] py-4 shadow-md rounded-[13.01px]">
        <div className="w-[90%] mx-auto">
          <SectionHeader
            id="workExperience"
            icon={icon}
            title="Work Experience"
            subTitle="Professional journey and achievements"
            onAddClick={handleAddClick}
          />

          <div className="space-y-6 my-12">
            {workExperience.map((job, index) => (
              <WorkExperienceItem key={index} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* Add Work Experience Modal */}
      <AddWorkExperience
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveWorkExperience}
      />
    </>
  );
};

export default WorkExperience;