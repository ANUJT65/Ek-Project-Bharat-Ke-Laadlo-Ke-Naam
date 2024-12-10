import React from 'react';
import GovernmentSidebar from '../components/GovernmentSidebar';
import Navbar2 from '../components/Navbar2';
import { GovernmentProvider } from '../contexts/GovernmentDBContext';


const GovernmentDashboard = () => {
  console.log('GovernmentDashboard is rendering');
  return (
  <GovernmentProvider>
    <GovernmentSidebar/>
    </GovernmentProvider>
  );
};

export default GovernmentDashboard;
