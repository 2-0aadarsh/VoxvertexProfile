"use client";

import { useState } from "react";
import SectionHeader from "../../common/SectionHeader";
import AwardItem from "./AwardItem";
import AddCertification from "./AddCertification";

const AwardsAndCertifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const awards = [
    {
      title: "Innovation Excellence Award",
      description: "For outstanding product innovation",
      period: "2018 - 2020",
    },
    {
      title: "Leadership Recognition",
      description: "Top 30 Under 30 in Tech",
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
      <section className="w-[1154px] bg-[#ffffff] py-4 shadow-md rounded-[13.01px]">
        <div className="w-[90%] mx-auto ">
          <SectionHeader
            id="awardsAndCertifications"
            title="Awards & Certifications"
            onAddClick={handleOpenModal}
          />

          <div className="space-y-2 my-12">
            {awards.map((award, index) => (
              <AwardItem key={index} {...award} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AddCertification isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default AwardsAndCertifications;