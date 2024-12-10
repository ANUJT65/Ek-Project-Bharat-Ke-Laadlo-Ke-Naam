import React from 'react';
import GovernmentSidebar from '../components/GovernmentSidebar';
import Navbar2 from '../components/Navbar2';
import { GovernmentProvider, useGovernment } from '../contexts/GovernmentDBContext';
import GovernmentDashboardHero from '../components/GovernmentDashboardHero';
import GovernmentResources from '../components/GovernmentResources';


const GovernmentDashboard = () => {
  const { option, setOptions } = useGovernment();

  console.log('GovernmentDashboard is rendering');
  return (
    <div className='flex'>
      <GovernmentSidebar/>

      <div className='flex flex-col w-4/5'>
        <Navbar2 type='Government'/>


        {option === 'dashboard' ? <GovernmentDashboardHero /> : <></>}
        {option === 'resources' ? <GovernmentResources /> : <></>}
      </div>

    </div>
    
  );
};

export default GovernmentDashboard;
