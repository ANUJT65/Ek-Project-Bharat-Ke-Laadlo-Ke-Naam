import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import Navbar from '../components/Navbar';
import TeacherDashboardHero from '../components/TeacherDashboardHero';
import TeacherDashboardSubjects from '../components/TeacherDashboardSubjects';
import StudentResources from '../components/StudentResources';
import StudentCalendarPreview from '../components/StudentCalendarPreview';
import { TeacherdbProvider, useTeacherdb } from "../contexts/teacherdbContext";   
import TeacherSidebar from '../components/TeacherSidebar';
import TeacherDashboardHero2 from '../components/TeacherDashboardHero2';
import TeacherResourcesHero from '../components/TeacherResourcesHero';
import TeacherEngagementAnalytics from './TeacherEngagementAnalytics';
import TeacherStudentAnalytics from '../components/TeacherStudentAnalytics';
import TeacherEngagementAnalyticsHero from '../components/TeacherEngagementAnalyticsHero';

const TeacherDashboard = () => {
  const { option, setOption } = useTeacherdb();

  return (
      <div className='flex'>
        <TeacherSidebar />

        <div className='flex flex-col w-full'>
          <Navbar title='Teacher dashboard' />

          {option === 'dashboard' ? <TeacherDashboardHero2 /> : <></>}
          {option === 'resources' ? <TeacherResourcesHero /> : <></>}
          {option === 'analytics' ? <TeacherEngagementAnalytics /> : <></>}
          {option === 'students' ? <TeacherEngagementAnalytics /> : <></>}

          
        </div>
      </div>
  );
};

export default TeacherDashboard;
