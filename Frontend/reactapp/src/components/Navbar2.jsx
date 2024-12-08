import React from 'react'
import coverImage from '../assets/images/logo1.jpg';
import { useAuth } from '../contexts/userContext';


const Navbar2 = ({type}) => {
  const {user} = useAuth();
  return (
    <div className='font-inter mt-4 flex border-b-2 border-gray-300 justify-between w-full p-3 px-4'>
        
    <div className='mt-2 font-bold text-xl'>
      {type} Portal
    </div>

    <div className="user-avatar flex items-center gap-2">
    <div className="bg-red-200 text-3xl px-3 py-1 w-12 h-12 rounded-full flex items-center justify-center">
    J
  </div>
    
    {user ? <span className="text-sm font-medium">{user.email}</span> : <span className="text-md font-medium">User 1</span>}
    
  </div>
    </div>
  )
}

export default Navbar2