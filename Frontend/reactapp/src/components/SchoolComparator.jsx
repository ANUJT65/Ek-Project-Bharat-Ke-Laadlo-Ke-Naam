import React from 'react'
import TeacherUdiseAnalytics from './TeacherUdiseAnalytics'

const SchoolComparator = () => {
  return (
    <div className='h-screen bg-gray-200 p-5 font-inter flex flex-col'>
        <div className='text-xl font-bold'>School Comparator</div>
        <div className=''>Compare schools with ease</div>

        <div className='grid grid-cols-2 mt-5'>
            <div className='bg-white p-5 rounded-md border border-gray-300'><TeacherUdiseAnalytics /></div>
            <div className='bg-white p-5 rounded-md border border-gray-300'><TeacherUdiseAnalytics /></div>
        </div>
    </div>
  )
}

export default SchoolComparator