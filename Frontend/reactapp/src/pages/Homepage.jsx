import React from 'react';
import logo1 from '../assets/images/logo1.jpg';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-white h-screen bg-gradient-to-r from-[#CE4760] via-[#2F4550] to-[#CE4760] flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center p-5 font-inter">
        <div className="text-xl sm:text-2xl font-bold">Gram Shiksha</div>
        <div className="flex justify-center">
          <button
            className="text-blue-300 text-sm sm:text-base mx-1 sm:mx-2 p-1 sm:p-2 border-blue-300 hover:border-b"
            onClick={() => navigate('/auth/login')}
          >
            Login
          </button>
          <button
            className="text-blue-300 text-sm sm:text-base mx-1 sm:mx-2 p-1 sm:p-2 border-blue-300 hover:border-b"
            onClick={() => navigate('/auth/signup')}
          >
            Signup
          </button>
          <button
            className="text-blue-300 text-sm sm:text-base mx-1 sm:mx-2 p-1 sm:p-2 border-blue-300 hover:border-b text-center"
            onClick={() => navigate('/government/dashboard')}
          >
            Continue as a Government Official
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <div className="mt-5 px-3 py-1 bg-blue-900 rounded-full text-xs sm:text-sm lg:text-base">
          @Cyber Wardens for PSID: 1664
        </div>
        <h1 className="mt-10 font-inter mx-2 text-3xl sm:text-4xl lg:text-6xl font-bold">
          Providing education to the remotest places
        </h1>
        <div className="mt-10 flex justify-center">
          <img
            src={logo1}
            alt="Logo"
            className="w-1/2 max-w-xs sm:max-w-md lg:max-w-lg rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
