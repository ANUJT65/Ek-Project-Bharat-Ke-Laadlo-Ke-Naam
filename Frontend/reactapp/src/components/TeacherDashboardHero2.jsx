import React from 'react';
import BarGraph from './BarGraph';  // Ensure BarGraph component is imported
import StudentSubjectCard from './StudentSubjectCard';
import StudentCalendarPreview from './StudentCalendarPreview';

const TeacherDashboardHero2 = () => {
  return (
    <div className='bg-gray-200 flex flex-col p-5 px-7 font-inter max-h-[calc(100vh-64px)] overflow-auto'>
      <div className='text-xl font-bold my-1'>Dashboard</div>
      <div className='text-sm text-gray-600 mb-2'>View everything at a glance.</div>

      <div className='grid grid-cols-3 gap-3'>
        <div className='bg-[#F64328] h-32 rounded-md flex flex-col text-white p-5'>
          <div className='text-md'>Students Enrolled</div>
          <div className='text-5xl mt-2 font-bold'>125</div>
        </div>

        <div className='bg-[#D33922] rounded-md flex flex-col text-white p-5'>
          <div className='text-md'>Total Classes</div>
          <div className='text-5xl mt-2 font-bold'>7</div>
        </div>

        <div className='bg-[#A32F1D] rounded-md flex flex-col text-white p-5'>
          <div className='text-md'>Upcoming Quizzes</div>
          <div className='text-5xl mt-2 font-bold'>5</div>
        </div>

        <div className='col-span-2 bg-white border border-gray-400 rounded-md'>
          <BarGraph className='w-full h-64' /> 
        </div>

        <div className='h-64 flex flex-col col-span-1 bg-white rounded-md border border-gray-400 p-5'>
          <div className='font-bold'>Recently Added Resources</div>
        </div>

        <div className='flex flex-col col-span-2 p-3'>
          <div className='font-bold text-xl mb-3'>Your Classes</div>

          <div className='flex'>
          <StudentSubjectCard />
          <StudentSubjectCard />
          <StudentSubjectCard /> 
          </div> 
        </div>

        <div className='col-span-1 bg-white rounded-md border border-gray-400'>
          <StudentCalendarPreview />
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboardHero2;
