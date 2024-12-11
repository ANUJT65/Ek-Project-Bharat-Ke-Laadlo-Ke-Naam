import React from 'react';
import { useParams } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';
import Navbar2 from '../components/Navbar2';
import StudentSubjectLectures from '../components/StudentSubjectLectures';
import StudentCalendarPreview from '../components/StudentCalendarPreview';
import cover_math from '../assets/images/science-animated.avif';

const StudentSingleSubjectPage = () => {
  const subjectName = useParams();

  return (
    <div className='flex'>
      <StudentSidebar />
      <div className='flex flex-col w-full px-5'>
        {/* Title and user avatar */}
        <Navbar2 type='Student' />

        {/* Subject name on photo */}
        <div className='relative w-full h-48 overflow-hidden'>
          <img
            src={cover_math}
            alt="Sample"
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
            <h1 className='text-white text-3xl font-bold'>{subjectName.name}</h1>
          </div>
        </div>

        <div className='text-2xl mt-5 font-bold'>{subjectName.name}</div>

        <div className='flex justify-between'>
          {/* Student Lectures for the subject */}
          <StudentSubjectLectures />

          <div className='w-1/2'>
            <StudentCalendarPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSingleSubjectPage;
