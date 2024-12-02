import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Navbar from '../components/Navbar'
import TeacherDashboardHero from '../components/TeacherDashboardHero'

const TeacherDashboard = () => {
  return (
    <div className='flex'>
        <DashboardSidebar />

        <div className='flex flex-col w-full'>
            <Navbar title='Teacher dashboard' />

            <TeacherDashboardHero />
        </div>
    </div>
  )
}

export default TeacherDashboard