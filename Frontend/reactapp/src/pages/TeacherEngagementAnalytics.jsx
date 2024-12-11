import React from 'react';
import StudentTable from '../components/StudentTable';
import EngagementGraph from './EngagementGraph';
import { useParams } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import Navbar2 from '../components/Navbar2';

const TeacherEngagementAnalytics = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <TeacherSidebar/>

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar2 />

        {/* Content Area */}
        <div className="p-4 bg-white">
          <EngagementGraph />
          <StudentTable />
        </div>
      </div>
    </div>
  );
};

export default TeacherEngagementAnalytics;
