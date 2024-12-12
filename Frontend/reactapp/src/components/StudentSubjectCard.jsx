import React from 'react';
import { useNavigate } from 'react-router-dom';


const StudentSubjectCard = ({ subjectName, teacherName, link }) => {
  const navigate = useNavigate();
  return (
    <div className="font-inter col-span-1 border border-gray-200 rounded-md mx-2 flex flex-col justify-between shadow-md overflow-hidden">
      <img
        src={link}
        alt="Subject Thumbnail"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-lg font-semibold mb-1">{subjectName}</div>
        <div className="text-sm text-gray-500 mb-4">{teacherName}</div>
        <button
          onClick={()=> navigate(`/student/subject/${subjectName}`)}
          className="mt-auto p-2 text-center bg-[#2F4550] text-white rounded hover:bg-[#CE4760] transition duration-200"
        >
          See Class
        </button>
      </div>
    </div>
  );
};

export default StudentSubjectCard;
