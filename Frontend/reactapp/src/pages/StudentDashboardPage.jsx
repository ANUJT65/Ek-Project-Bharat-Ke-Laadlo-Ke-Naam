import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import Navbar from '../components/Navbar';
import StudentDashboardHero from '../components/StudentDashboardHero';
import StudentDashboardAttendance from '../components/StudentDashboardAttendance';
import StudentCalendarPreview from '../components/StudentCalendarPreview';
import StudentResources from '../components/StudentResources';
import StudentVocationalLearning from '../components/StudentVocationalLearning';

const StudentDashboardPage = () => {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex flex-col w-full">
        <Navbar title="Student Dashboard" />
        <StudentDashboardHero />
        
        <div className="mt-10 grid grid-cols-5 gap-4 flex-grow">
          <div className='col-span-3 flex flex-col'>
          <StudentDashboardAttendance />
          <StudentResources />
          <StudentVocationalLearning />
          </div>

          <div className='col-span-2'>
          <StudentCalendarPreview />
          </div> 

        </div>
        
      </div>
    </div>
  );
};

export default StudentDashboardPage;
