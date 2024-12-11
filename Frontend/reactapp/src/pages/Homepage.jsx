import React from 'react';
import logo1 from '../assets/images/logo1.jpg';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
  return (
    <div className='text-white h-screen bg-gradient-to-r from-[#CE4760] via-[#2F4550] to-[#CE4760] flex flex-col'>
      {/* Navbar */}
      <div className='flex justify-between p-5 font-inter'>
        <div className='text-2xl font-bold'>Gram Shiksha</div>
        <div className='flex justify-center'>
          <button className='text-blue-300 mx-2 p-2 border-blue-300 hover:border-b' onClick={()=>navigate('/auth/login')}>
            Continue as a Student
          </button>
          <button className='text-blue-300 mx-2 p-2 border-blue-300 hover:border-b' onClick={()=>navigate('/auth/login')}>
            Continue as a Teacher
          </button>
          <button className='text-blue-300 mx-2 p-2 border-blue-300 hover:border-b' onClick={()=>navigate('/government/dashboard')}>
            Continue as a Government Official
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className='flex flex-col items-center justify-center flex-grow text-center'>
        <div className='mt-5 px-4 py-2 bg-blue-900 rounded-full'>
          @Cyber Wardens for PSID: 1664
        </div>
        <h1 className='mt-10 font-inter mx-5 text-6xl font-bold'>
          Providing education to the remotest places
        </h1>
        <div className='mt-10 flex justify-center'>
          <img
            src={logo1}
            alt='Logo'
            className='w-1/2 max-w-xs sm:max-w-md lg:max-w-lg rounded-full'
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
