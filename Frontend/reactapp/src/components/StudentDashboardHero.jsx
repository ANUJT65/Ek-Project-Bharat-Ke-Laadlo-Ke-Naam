import React from 'react'
import StudentSubjectCard from './StudentSubjectCard'
import mathsImage from '../assets/images/maths.jpg'; // Import the specific image
import sciImage from '../assets/images/science.jpg'; // Import the specific image
import historyImage from '../assets/images/history.jpg'; // Import the specific image




const StudentDashboardHero = () => {
  return (
    <div className='flex justify-start'>
        <div className='px-5 pt-3 flex flex-col w-1/2'>
            <div className='text-6xl font-semibold'>Hello Student! <br></br> Let's Start learning</div>
            <div className='text-xl mt-3'>Take a look at your classes, schedule, assignments, tests and attendance: all at one place!</div>
        </div>
        <div className='grid grid-cols-3 justify-start'>
            <StudentSubjectCard subjectName='Maths' teacherName='Teacher1' link={mathsImage}/>
            <StudentSubjectCard subjectName='Science' teacherName='Teacher2' link={sciImage}/>
            <StudentSubjectCard subjectName='History' teacherName='Teacher3' link={historyImage}/>
        </div>
    </div>
  )
}

export default StudentDashboardHero