"use client";

import { useState } from "react";
import SectionHeader from "../../common/SectionHeader";
import EducationItem from "./EducationItems";
import AddEducation from "./AddEducation";

const Education = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-[1154px] bg-[#ffffff] py-4 shadow-md rounded-[13.01px] ">
        <div className="w-[90%] mx-auto ">
          <SectionHeader 
            id="education" 
            title="Education" 
            onAddClick={handleOpenModal}
          />

          <div className="space-y-6">
            {education.map((edu, index) => (
              <EducationItem key={index} {...edu} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddEducation isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Education;