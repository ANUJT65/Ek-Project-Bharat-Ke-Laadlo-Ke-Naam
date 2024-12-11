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
import Navbar2 from '../components/Navbar2';
import TeacherUdiseAnalytics from '../components/TeacherUdiseAnalytics';


const TeacherDashboard = () => {
  const { option, setOption } = useTeacherdb();
  const { user, login, logout } = useAuth();
  console.log('User context data:', user);

  return (
      <div className='flex'>
        <TeacherSidebar />

        <div className='flex flex-col w-full'>
          <Navbar2 type='Teacher' />

          {option === 'dashboard' ? <TeacherDashboardHero2 /> : <></>}
          {option === 'analytics' ? <TeacherEngagementAnalyticsHero/>:<></>}
          {option === 'resources' ? <TeacherResourcesHero /> : <></>}
          {option === 'students' ? <TeacherStudentAnalytics /> : <></>}
          {option === 'infrastructure' ? <TeacherUdiseAnalytics /> : <></>}
        </div>
      </div>
  );
};

export default TeacherDashboard;