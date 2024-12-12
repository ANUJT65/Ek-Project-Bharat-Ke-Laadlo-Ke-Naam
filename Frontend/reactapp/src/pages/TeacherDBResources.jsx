import React from 'react'
import { useTeacherdb } from '../contexts/teacherdbContext';
import { useAuth } from '../contexts/userContext';
import TeacherSidebar from '../components/TeacherSidebar';
import Navbar2 from '../components/Navbar2';
import TeacherResourcesHero from '../components/TeacherResourcesHero';

const TeacherDBResources = () => {
    const { option, setOption } = useTeacherdb();
    const { user, login, logout } = useAuth();
    console.log('User context data:', user);
  
    return (
        <div className='flex'>
          <TeacherSidebar />
  
          <div className='flex flex-col w-full'>
            <Navbar2 type='Teacher' />
  
            <TeacherResourcesHero />
  
            
           
          </div>
        </div>
    );
}

export default TeacherDBResources