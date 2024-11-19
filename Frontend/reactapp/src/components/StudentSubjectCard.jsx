import React from 'react';

const StudentSubjectCard = ({ subjectName, teacherName, link }) => {
  return (
    <div className="border border-gray-200 rounded-md mx-2 flex flex-col justify-between shadow-md overflow-hidden">
      <img
        src="https://via.placeholder.com/150"
        alt="Subject Thumbnail"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-lg font-semibold mb-1">{subjectName}</div>
        <div className="text-sm text-gray-500 mb-4">{teacherName}</div>
        <a
          href={link || "#"}
          className="mt-auto p-2 text-center bg-[#2F4550] text-white rounded hover:bg-blue-600 transition duration-200"
        >
          See Class
        </a>
      </div>
    </div>
  );
};

export default StudentSubjectCard;
