import React, { useState } from 'react';
import CommonLoginForm from '../components/CommonLoginForm';
import loginImage from '../assets/images/cover.jpg'; 
import GoogleTranslate from '../components/GoogleTranslate';

const CommonLoginPage = () => {
  const [type, setType] = useState('student');

  return (
    <div className='grid grid-cols-2 w-full'>
      
      <div className='col-span-1 w-full from-[#CE4760] via-[#2F4550] to-[#CE4760] h-screen flex flex-col p-10 items-center justify-center'>
        <div className='text-xl mb-5'>Welcome back to Gram Shiksha!</div>
        <div className='flex justify-center mb-3'>
          <button
            className={`mx-5 p-2 px-7 ${
              type === 'teacher' ? 'bg-[#2F4550] text-black border border-gray-600' : 'bg-white text-black'
            }`}
            onClick={() => setType('teacher')}
          >
            Teacher
          </button>
          <button
            className={`mx-5 p-2 px-7 ${
              type === 'student' ? 'bg-[#CE4760] text-black border border-gray-600' : 'bg-white text-black'
            }`}
            onClick={() => setType('student')}
          >
            Student
          </button>
        </div>

        {type === 'student' ? (
          <CommonLoginForm type='Student' url='https://backendfianlsih.azurewebsites.net/login/login' />
        ) : (
          <CommonLoginForm type='Teacher' url='https://backendfianlsih.azurewebsites.net/login/login' />
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

export default CommonLoginPage;