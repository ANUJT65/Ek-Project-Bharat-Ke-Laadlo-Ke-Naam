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
import { useAuth } from '../contexts/userContext';

const TeacherDashboard = () => {
  const { option, setOption } = useTeacherdb();
  const { user, login, logout } = useAuth();

  return (
      <div className='flex'>
        <TeacherSidebar />

        <div className='flex flex-col w-full'>
          <Navbar title={user} />

          {option === 'dashboard' ? <TeacherDashboardHero2 /> : <></>}
          {option === 'resources' ? <TeacherResourcesHero /> : <></>}
          {option === 'analytics' ? <TeacherEngagementAnalyticsHero /> : <></>}
          {option === 'students' ? <TeacherStudentAnalytics /> : <></>}

          
        </div>
      </div>
  );
};

export default TeacherDashboard;
