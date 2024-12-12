import React from 'react';
import StudentTable from '../components/StudentTable';
import EngagementGraph from './EngagementGraph';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import Navbar2 from '../components/Navbar2';
import { FaArrowLeft } from 'react-icons/fa';


const TeacherEngagementAnalytics = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <TeacherSidebar/>

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar2 />

        <div className="w-1/6 text-white rounded-md flex justify-start items-center mt-5 mx-5 p-2 bg-[#2F4550]">
      <button className="flex items-center gap-2" onClick={()=> navigate('/teacher/dashboard/resources')}>
        <FaArrowLeft />
        All resources
      </button>
    </div>
        
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
