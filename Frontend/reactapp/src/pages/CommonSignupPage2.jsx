import React, { useState } from 'react'
import coverImage from '../assets/images/logo1.jpg';
import CommonLoginForm from '../components/CommonLoginForm';
import CommonSignupForm from '../components/CommonSignupForm';

const CommonSignupPage2 = () => {
    const [type, setType] = useState('student');
    return (
        <div
          className="bg-gradient-to-r from-[#CE4760] via-[#2F4550] to-[#CE4760] font-inter h-screen w-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
          
        >
          <div className="w-1/3 items-center bg-white rounded-lg p-8 ">
            {/*Name */}
            <div className=" branding flex justify-center items-center gap-2 p-3 my-2 font-inter text-[#131B1F]">
                <img 
                    src={coverImage}
                    alt="Gram Shiksha Logo" 
                    className="w-12 h-12 object-cover rounded-md" 
                />
                
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
            
            <div className='flex justify-center mb-3'>
              <button
                className={`ml-5 border border-gray-200 p-2 px-7 rounded-r rounded-full ${
                  type === 'teacher' ? 'bg-[#2F4550] text-white border border-gray-600' : 'bg-white text-black'
                }`}
                onClick={() => setType('teacher')}
              >
                Teacher
              </button>
              <button
                className={`mr-5 border border-gray-200 p-2 px-7 rounded-l rounded-full ${
                  type === 'student' ? 'bg-[#CE4760] text-white border border-gray-600' : 'bg-white text-black'
                }`}
                onClick={() => setType('student')}
              >
                Student
              </button>
            </div>
    
            {type === 'student' ? (
              <CommonSignupForm type='Student' url='https://backendfianlsih.azurewebsites.net/register' />
            ) : (
                <CommonSignupForm type='Teacher' url='https://backendfianlsih.azurewebsites.net/register' />
            )}
            
          </div>
        </div>
      );
}

export default CommonSignupPage2