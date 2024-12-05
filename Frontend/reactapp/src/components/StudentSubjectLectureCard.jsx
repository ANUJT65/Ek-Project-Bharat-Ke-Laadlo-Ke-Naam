import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentSubjectLectureCard = ({ name, url }) => {
    const navigate=useNavigate();
  return (

    <button className='bg-[#F4F4F8] mt-2 flex justify-between p-5 rounded-md border border-gray-200 border-2' onClick={()=>navigate(`/student/lecture/recorded/${name}`)} >
      <div className='flex flex-col'>
        <div className='font-bold text-xl'>{name}</div>
      </div>

      <div className='flex flex-col'>
        <a href={url} target='_blank' rel='noopener noreferrer' className='font-semibold text-blue-500'>
          Watch Recording
        </a>
      </div>
    </button>
  );
};

export default StudentSubjectLectureCard;