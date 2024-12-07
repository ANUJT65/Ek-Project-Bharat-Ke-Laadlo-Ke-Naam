import React from 'react';
import BarGraph from './BarGraph';  // Ensure BarGraph component is imported

const TeacherDashboardHero2 = () => {
  return (
    <div className='bg-gray-200 flex flex-col p-5 px-7 font-inter h-screen'>
      <div className='text-xl font-bold my-1'>Dashboard</div>
      <div className='text-sm text-gray-600 mb-2'>View all your resources in one place.</div>

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

      </div>
    </div>
  );
};

export default TeacherDashboardHero2;
