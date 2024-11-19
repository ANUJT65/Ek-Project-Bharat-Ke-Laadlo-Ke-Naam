import React from 'react'
import StudentSubjectCard from './StudentSubjectCard'

const StudentDashboardHero = () => {
  return (
    <div className='flex justify-start'>
        <div className='px-5 pt-3 flex flex-col w-1/2'>
            <div className='text-6xl font-semibold'>Hello Student! <br></br> Let's Start learning</div>
            <div className='text-xl mt-3'>Take a look at your classes, schedule, assignments, tests and attendance: all at one place!</div>
        </div>
        <div className='flex justify-start'>
            <StudentSubjectCard subjectName='Maths' teacherName='Teacher1'/>
            <StudentSubjectCard subjectName='Science' teacherName='Teacher2'/>
            <StudentSubjectCard subjectName='History' teacherName='Teacher3'/>
        </div>
    </div>
  )
}

export default StudentDashboardHero