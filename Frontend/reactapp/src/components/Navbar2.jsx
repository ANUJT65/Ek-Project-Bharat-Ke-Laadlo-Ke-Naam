import React from 'react';
import { useAuth } from '../contexts/userContext';

const Navbar2 = ({ type }) => {
  const { user } = useAuth();

  // Extract the first letter of the user's email, if available
  const avatarLetter = user?.email?.charAt(0).toUpperCase() || 'NA';

  return (
    <div className='font-inter mt-4 flex border-b-2 border-gray-300 justify-between w-full p-3 px-4'>
      <div className='mt-2 font-bold text-xl'>{type} Portal</div>

      <div className='user-avatar flex items-center gap-2'>
        <div className='bg-red-200 text-xl px-3 py-1 w-12 h-12 rounded-full flex items-center justify-center'>
          {avatarLetter}
        </div>
        {user ? (
          <span className='text-sm font-medium'>{user.email}</span>
        ) : (
          <span className='text-md font-medium'>Not logged in (use only for test)</span>
        )}
      </div>
    </div>
  );
};

export default Navbar2;
