import React from 'react';
import coverImage from '../assets/images/logo1.jpg';
import kv_logo from '../assets/images/kv_logo.png';
import { useNavigate } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { SiGoogleanalytics } from "react-icons/si";
import { PiStudentDuotone } from "react-icons/pi";
import { useTeacherdb } from '../contexts/teacherdbContext';
import { SiMaterialdesignicons } from "react-icons/si";


const TeacherSidebar = () => {
    const navigate = useNavigate();
    const { option, setOption } = useTeacherdb();

    return (
        <div className='flex flex-col w-1/5 border-r border-gray-300 h-screen bg-[#2F4550]'>

            {/* Branding */}
            <div className="branding flex items-center gap-2 p-3 my-2 font-inter text-white">
                <img 
                    src={coverImage}
                    alt="Gram Shiksha Logo" 
                    className="w-12 h-12 object-cover rounded-md" 
                />
                <div className="text-2xl font-bold">Gram-Shiksha</div>
            </div>

            <hr className='border-b border-gray-200'></hr>

            {/* School Information */}
            <div className='my-2 mx-3 p-2 flex rounded-md bg-gray-300 shadow'>
                <img 
                    src={kv_logo}
                    alt="Gram Shiksha Logo" 
                    className="w-10 h-10 object-cover mr-2 rounded-md" 
                />
                <div className='flex flex-col'>
                    <div className='font-bold'>Kendriya Vidyalaya</div>
                    <div className='text-sm'>New Delhi, 123456</div>
                </div>
            </div>

            {/* Buttons */}
            <div className='flex flex-col font-inter'>
                <div className='text-white mt-5 font-semibold mx-3'>MAIN MENU</div>

                <button 
                    className={`flex mx-3  my-1 py-1 px-2 text-left rounded ${
                        option === 'dashboard' ? 'bg-[#CE4760] font-bold border text-white border-[#CE4760]' : ''
                    }`}
                    onClick={() => {
                        setOption('dashboard');
                        // Update this path if needed
                    }}
                >
                    <div className='mt-1 text-white'><MdSpaceDashboard /></div>
                    <div className='mx-1 text-white'>Dashboard</div>
                </button>

                <button 
                    className={`flex mx-3  my-1 py-1 px-2 text-left rounded ${
                        option === 'resources' ? 'bg-[#CE4760] border font-bold text-white border-[#CE4760]' : ''
                    }`}
                    onClick={() => {
                        setOption('resources');
                        
                    }}
                >
                    <div className='mt-1 text-white'><GrResources /></div>
                    <div className='mx-1 text-white'>Resources</div>
                </button>

                <button 
                    className={`flex mx-3  my-1 py-1 px-2 text-left rounded ${
                        option === 'analytics' ? 'bg-[#CE4760] border font-bold text-white border-[#CE4760]' : ''
                    }`}
                    onClick={() => {
                        setOption('analytics');
                         // Update this path if needed
                    }}
                >
                    <div className='mt-1 text-white'><SiGoogleanalytics /></div>
                    <div className='mx-1 text-white'>Engagement Analytics</div>
                </button>

                <button 
                    className={`flex mx-3  my-1 py-1 px-2 text-left rounded ${
                        option === 'students' ? 'bg-[#CE4760] border font-bold text-white border-[#CE4760]' : ''
                    }`}
                    onClick={() => {
                        setOption('students');
                    }}
                >
                    <div className='mt-1 text-white'><PiStudentDuotone /></div>
                    <div className='mx-1 text-white'>Student Analytics</div>
                </button>

                
            </div>
        </div>
    );
};

export default TeacherSidebar;
