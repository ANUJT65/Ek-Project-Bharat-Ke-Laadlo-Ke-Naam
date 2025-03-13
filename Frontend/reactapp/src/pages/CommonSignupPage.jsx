import React, { useState } from 'react';
import CommonSignupForm from '../components/CommonSignupForm';
import loginImage from '../assets/images/cover.jpg'; // Adjust the filename and extension as needed

const CommonSignupPage = () => {
  const [type, setType] = useState('student');

  return (
    <div className='grid grid-cols-2 w-full'>
      <div className='col-span-1 w-full bg-yellow-300 h-screen flex flex-col p-10 items-center justify-center'>
        <div className='text-xl mb-5'>Welcome back to Gram Shiksha!</div>
        <div className='flex justify-center mb-3'>
          <button
            className={`mx-5 p-2 px-7 ${
              type === 'teacher' ? 'bg-[#A4A8D1] text-black border border-gray-600' : 'bg-white text-black'
            }`}
            onClick={() => setType('teacher')}
          >
            Teacher
          </button>
          <button
            className={`mx-5 p-2 px-7 ${
              type === 'student' ? 'bg-[#A4A8D1] text-black border border-gray-600' : 'bg-white text-black'
            }`}
            onClick={() => setType('student')}
          >
            Student
          </button>
        </div>

        {type === 'student' ? (
          <CommonSignupForm type='Student' url='https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/register' />
        ) : (
          <CommonSignupForm type='Teacher' url='https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/register' />
        )}
      </div>

      <div className='col-span-1 h-screen'>
        <img
          src={loginImage}
          alt='Welcome Illustration'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default CommonSignupPage;