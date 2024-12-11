import React, { useState } from 'react';
import coverImage from '../assets/images/logo1.jpg';
import CommonSignupForm from '../components/CommonSignupForm';

const CommonSignupPage2 = () => {
  const [type, setType] = useState('student');
  return (
    <div className="bg-gradient-to-r from-[#CE4760] via-[#2F4550] to-[#CE4760] font-inter h-screen w-screen bg-cover bg-center flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Branding */}
        {/* <div className="flex flex-col items-center gap-2 mb-4">
          <img
            src={coverImage}
            alt="Gram Shiksha Logo"
            className="w-16 h-16 object-cover rounded-md"
          />
        </div> */}
        <h2 className="text-2xl font-bold mb-6 text-center text-[#131B1F]">Signup</h2>
        
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            className={`ml-2 border-2 rounded-l-full px-6 py-2 ${
              type === 'teacher'
                ? 'bg-[#2F4550] text-white border-[#2F4550]'
                : 'bg-white text-black border-gray-300'
            }`}
            onClick={() => setType('teacher')}
          >
            Teacher
          </button>
          <button
            className={`mr-2 border-2 rounded-r-full px-6 py-2 ${
              type === 'student'
                ? 'bg-[#CE4760] text-white border-[#CE4760]'
                : 'bg-white text-black border-gray-300'
            }`}
            onClick={() => setType('student')}
          >
            Student
          </button>
        </div>
        
        {/* Form Section */}
        {type === 'student' ? (
          <CommonSignupForm type="Student" url="https://backendfianlsih.azurewebsites.net/register" />
        ) : (
          <CommonSignupForm type="Teacher" url="https://backendfianlsih.azurewebsites.net/register" />
        )}
      </div>
    </div>
  );
};

export default CommonSignupPage2;
