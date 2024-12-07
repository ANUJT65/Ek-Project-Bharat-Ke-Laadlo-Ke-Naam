import React from 'react'
import SchoolMap from './SchoolMap'

const TeacherStudentAnalytics = () => {
  return (
    <div className='bg-gray-200 flex flex-col p-5 px-7 font-inter max-h-[calc(100vh-64px)] overflow-auto'>
      <div className='text-xl font-bold my-1'>Infrastructure Analytics</div>
      <div className='text-sm text-gray-600 mb-2'>Monitor and allocate funds and resources</div>

      <div className='grid grid-cols-3'>
        <div className='col-span-2'>
        <SchoolMap />
        </div>
      </div>
      
    </div>
  )
}

export default TeacherStudentAnalytics