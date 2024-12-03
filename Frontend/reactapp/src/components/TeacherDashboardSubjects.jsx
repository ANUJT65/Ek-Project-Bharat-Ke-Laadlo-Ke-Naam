import React from 'react'
import StudentSubjectCard from './StudentSubjectCard'

const TeacherDashboardSubjects = () => {
  return (
    <div className='flex justify-start mx-5'>
        <StudentSubjectCard />
        <StudentSubjectCard />
        <StudentSubjectCard />
        <StudentSubjectCard />
    </div>
  )
}

export default TeacherDashboardSubjects