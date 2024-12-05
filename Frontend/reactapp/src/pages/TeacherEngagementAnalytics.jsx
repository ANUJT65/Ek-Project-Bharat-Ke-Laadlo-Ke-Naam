import React from 'react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'
import StudentTable from '../components/StudentTable'
import EngagementGraph from './EngagementGraph'

const TeacherEngagementAnalytics = () => {
  return (
    <div className='flex'>
        <DashboardSidebar />

        <div className='flex flex-col w-full'>
        <Navbar title='Engagement Analytics'/>
        <EngagementGraph />
        <StudentTable />
        
        </div>
        
    </div>
  )
}

export default TeacherEngagementAnalytics