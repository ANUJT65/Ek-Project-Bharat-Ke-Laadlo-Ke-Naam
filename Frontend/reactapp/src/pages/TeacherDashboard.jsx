import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Navbar from '../components/Navbar'
import TeacherDashboardHero from '../components/TeacherDashboardHero'
import TeacherDashboardSubjects from '../components/TeacherDashboardSubjects'
import StudentResources from '../components/StudentResources'
import StudentCalendarPreview from '../components/StudentCalendarPreview'

const TeacherDashboard = () => {
  return (
    <div className='flex'>
        <DashboardSidebar />

        <div className='flex flex-col w-full'>
            <Navbar title='Teacher dashboard' />

            <TeacherDashboardHero />
            <TeacherDashboardSubjects />

            <div className='flex justify-between my-5'>
              <StudentResources />
              <div className='w-1/2'>
              <StudentCalendarPreview />
              </div>
            </div>
        </div>
    </div>
  )
}

export default TeacherDashboard