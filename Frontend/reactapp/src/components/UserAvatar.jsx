import React from 'react';
import { useAuth } from '../contexts/userContext';

const UserAvatar = () => {
  const { user } = useAuth();

  const avatarLetter = user?.email?.charAt(0).toUpperCase() || 'NA';

  return (
    <div className='bg-red-200 text-xl px-3 py-1 w-12 h-12 rounded-full flex items-center justify-center'>
      {avatarLetter}
    </div>
  );
};

export default UserAvatar;
