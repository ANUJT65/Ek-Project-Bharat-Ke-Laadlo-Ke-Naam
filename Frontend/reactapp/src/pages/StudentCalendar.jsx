import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Navbar from '../components/Navbar'
import StudentDashboardCalendar from '../components/StudentDashboardCalendar'

const StudentCalendar = () => {
  return (
    <div className='flex'>
        <DashboardSidebar />

        <div className='flex flex-col w-full'>
        <Navbar title='Your calendar' />

        <div className='text-2xl px-5 font-bold'>August 2024</div>
        <div className='px-5'>Aug 5, 2024 - Aug 11 2024</div>
        
        <div className='h-screen'>
        <StudentDashboardCalendar />
        </div>
        </div>
    </div>
  )
}

export default StudentCalendar