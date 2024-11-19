import React from 'react'
import StudentAttendanceCard from './StudentAttendanceCard'

const StudentDashboardAttendance = () => {
  return (
    <div className='flex flex-col px-5 min-h-0'>
        <div className='text-xl font-bold'>Attendance</div>
        <div className='grid grid-cols-3 '>
        <StudentAttendanceCard />
        <StudentAttendanceCard />
        <StudentAttendanceCard />
        </div>
        
    </div>
  )
}

export default StudentDashboardAttendance