import React from 'react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'
import StudentTable from '../components/StudentTable'
import EngagementGraph from './EngagementGraph'

const TeacherEngagementAnalytics = () => {
  return (
    <div className=''>

        <div className='flex flex-col w-5/6'>
        <EngagementGraph />
        <StudentTable />
        
        </div>
        
    </div>
  )
}

export default TeacherEngagementAnalytics