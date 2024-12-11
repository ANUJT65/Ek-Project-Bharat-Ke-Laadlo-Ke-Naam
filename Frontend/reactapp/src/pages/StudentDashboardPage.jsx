import React, { useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import Navbar from '../components/Navbar';
import StudentDashboardHero from '../components/StudentDashboardHero';
import StudentDashboardAttendance from '../components/StudentDashboardAttendance';
import StudentCalendarPreview from '../components/StudentCalendarPreview';
import StudentResources from '../components/StudentResources';
import StudentVocationalLearning from '../components/StudentVocationalLearning';
import StudentSidebar from '../components/StudentSidebar';
import { useAuth } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import { useStudentDB } from '../contexts/StudentDBContext';
import SchoolComparator from '../components/SchoolComparator';
import GoogleTranslate from '../components/GoogleTranslate';
const StudentDashboardPage = () => {
  const { user, login, logout } = useAuth();
  const { option, setOption } = useStudentDB();
  const navigate = useNavigate();
  useEffect(() => {
    console.log('User context data:', user);
  }, [user]);

  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex flex-col w-full">
        <Navbar2  type='Student' /> 
        <GoogleTranslate />
        {option === 'dashboard' ? <StudentDashboardHero /> : <></>}
        {option === 'compare' ? <SchoolComparator /> : <></>}
        
      </div>
    </div>
  );
};

export default StudentDashboardPage;
