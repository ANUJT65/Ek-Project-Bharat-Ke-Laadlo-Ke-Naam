import React, { useState } from 'react';
import coverImage from '../assets/images/logo1.jpg';
import CommonLoginForm from '../components/CommonLoginForm';

const CommonLoginPage2 = () => {
  const [type, setType] = useState('student');

  return (
    <div
      className="bg-gradient-to-r from-[#CE4760] via-[#2F4550] to-[#CE4760] font-inter h-screen w-screen flex items-center justify-center"
    >
      <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-lg p-6 sm:p-8 shadow-lg">
        {/* Branding */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <img
            src={coverImage}
            alt="Gram Shiksha Logo"
            className="w-12 h-12 object-cover rounded-md"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Login</h2>

        {/* User Type Selection */}
        <div className="flex justify-center mb-5">
          <button
            className={`px-6 py-2 mx-2 rounded-full ${
              type === 'teacher' ? 'bg-[#2F4550] text-white' : 'bg-white text-black border border-gray-300'
            }`}
            onClick={() => setType('teacher')}
          >
            Teacher
          </button>
          <button
            className={`px-6 py-2 mx-2 rounded-full ${
              type === 'student' ? 'bg-[#CE4760] text-white' : 'bg-white text-black border border-gray-300'
            }`}
            onClick={() => setType('student')}
          >
            Student
          </button>
        </div>

        {/* Login Form */}
        {type === 'student' ? (
          <CommonLoginForm type="Student" url="hhttps://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/login/login" />
        ) : (
          <CommonLoginForm type="Teacher" url="https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/login/login" />
        )}
      </div>
    </div>
  );
};

export default CommonLoginPage2;
