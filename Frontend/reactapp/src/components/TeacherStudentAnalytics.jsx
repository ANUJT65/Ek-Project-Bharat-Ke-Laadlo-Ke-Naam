import React from 'react'
import SchoolMap from './SchoolMap'
import TeacherUdiseAnalytics from './TeacherUdiseAnalytics'

const TeacherStudentAnalytics = () => {
  return (
    <div className='bg-gray-200 flex flex-col p-5 px-7 font-inter max-h-[calc(100vh-64px)] overflow-auto'>
      <div className='text-xl font-bold my-1'>Infrastructure Analytics</div>
      <div className='text-sm text-gray-600 mb-2'>Monitor and allocate funds and resources</div>

      <div className='grid grid-cols-3 grid-rows-4'>
        <div className='col-span-2  flex flex-col'>
        <div className='text-xl my-2 font-bold'>GIS-Enabled Infrastructure Data</div>
        <SchoolMap />
        </div>
        <div className='col-span-1 bg-white mx-2 border border-gray-300 rounded-md p-4 flex flex-col'>
          <div className='text-xl font-bold'>Infrastructure of your School</div>
        </div>
        <div className='col-span-2 bg-white mx-2 my-2 border border-gray-300 rounded-md p-4 flex flex-col'>
          <div className='flex justify-between'>
           <div className='text-xl font-bold'>Resource Requests</div>
           <button className='bg-black text-white p-2 rounded-md'>+ Request a new resource</button>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}

export default TeacherStudentAnalytics