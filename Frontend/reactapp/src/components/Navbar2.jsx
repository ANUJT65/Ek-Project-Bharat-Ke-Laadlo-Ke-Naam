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
    <div className="font-inter mt-1 flex border-b border-gray-200 justify-between items-center w-full px-2 py-1 bg-white shadow-md">
      <div className="text-xl font-semibold text-gray-800">{type} Portal</div>

      <div className="user-avatar flex items-center gap-4 relative">
        <div className="bg-[#CE4760] text-white text-lg px-3 py-2 w-12 h-12 rounded-full flex items-center justify-center font-bold">
          {avatarLetter}
        </div>
        {user ? (
          <span className="text-sm font-medium text-gray-700">{user.name}</span>
        ) : (
          <span className="text-md font-medium text-gray-500">Not logged in</span>
        )}

        {/* Burger menu button */}
        <button
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>

        {/* Dropdown menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10"
          >
            <ul className="py-2">
              <li
                onClick={() => navigate('/user/profile')}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              >
                Profile
              </li>

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );



};

export default Navbar2;
