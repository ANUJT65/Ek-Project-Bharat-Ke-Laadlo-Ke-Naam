import React from 'react'
import StudentTestCard from './StudentTestCard'
import StudentSubjectLectureCard from './StudentSubjectLectureCard'

const StudentSubjectLectures = () => {
  return (
    <div className='flex flex-col px-5 my-5 w-full'>
        <div className='text-xl  font-bold'>Lectures</div>
        <StudentSubjectLectureCard />
        <StudentSubjectLectureCard />
        <StudentSubjectLectureCard />
        <StudentSubjectLectureCard />

    </div>
  )
}

export default StudentSubjectLectures