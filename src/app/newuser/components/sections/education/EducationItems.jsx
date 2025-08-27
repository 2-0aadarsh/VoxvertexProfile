const EducationItem = ({ degree, institution, period }) => {
  return (
    <div className="flex justify-between items-center my-12 pb-4 border-b-2 border-[#FF6B35]/9 ">
      <div>
        <h3 className="text-lg font-medium text-black">{degree}</h3>
        <p className="text-[#FF6B35] text-sm mt-1">{institution}</p>
      </div>
      <p className="text-[#FF6B35]  text-sm">{period}</p>
    </div>
  );
};
export default EducationItem