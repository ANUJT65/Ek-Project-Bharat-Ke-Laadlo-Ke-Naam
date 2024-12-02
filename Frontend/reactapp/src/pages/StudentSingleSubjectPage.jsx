import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import StudentSubjectLectures from '../components/StudentSubjectLectures'
import StudentCalendarPreview from '../components/StudentCalendarPreview'

const StudentSingleSubjectPage = () => {
    const subjectName = useParams();
  return (
    <div className='flex'>
        <DashboardSidebar />
        <div className='flex flex-col w-full px-5'>

            {/*Title and user avatar*/ }
            <Navbar title='Student Dashboard'/>

            {/*Subject name on photo */}
            <img
                src="https://via.placeholder.com/400"
                alt="Sample"
                
                className=' h-48'
            />
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
  )
}

export default StudentSingleSubjectPage