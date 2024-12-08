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
const StudentDashboardPage = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log('User context data:', user);
  }, [user]);

  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex flex-col w-full">
        <Navbar2  type='Student' />
        <StudentDashboardHero />
        {/*<Link to="https://backendfianlsih.azurewebsites.net/student/lecture/recorded/Stateofmatter.mp4">NOOOOrrrrrrrrrrrrBB</Link>*/}
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
