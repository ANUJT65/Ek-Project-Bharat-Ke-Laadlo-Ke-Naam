import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar2 = ({ type }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Extract the first letter of the user's email, if available
  const avatarLetter = user?.email?.charAt(0).toUpperCase() || 'NA';

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const menuRef = React.useRef();

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
          <span className='text-md font-medium'>Not logged in</span>
        )}

        {/* Burger menu button */}
        <button
          className='ml-4 p-2 bg-gray-200 rounded-md'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div ref={menuRef} className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md'>
          <ul className='py-2'>
            <button onClick={()=> {navigate('/user/profile')}} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Profile</button>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Settings</li>
            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar2;
