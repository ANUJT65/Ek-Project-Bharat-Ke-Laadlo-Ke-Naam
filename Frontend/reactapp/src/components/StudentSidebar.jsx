import React from 'react'
import coverImage from '../assets/images/logo1.jpg';
import kv_logo from '../assets/images/kv_logo.png';
import { MdSpaceDashboard } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { SiGoogleanalytics } from "react-icons/si";
import { useStudentDB } from '../contexts/StudentDBContext';
import { useNavigate } from 'react-router-dom';
import { FaSchool } from "react-icons/fa";


const StudentSidebar = () => {
    const { option, setOption } = useStudentDB();
    const navigate = useNavigate();

    // Define button configurations to ensure consistent layout
    const menuButtons = [
        {
            key: 'dashboard',
            icon: <MdSpaceDashboard />,
            label: 'Dashboard'
        }

    ];

    return (
        <div className='flex flex-col w-1/5 min-h-screen border-r border-gray-300 bg-[#2F4550] '>
            {/*Name */}
            <div className="branding flex items-center gap-2 p-3 my-2 font-inter text-[#131B1F]">
                <img
                    src={coverImage}
                    alt="Gram Shiksha Logo"
                    className="w-12 h-12 object-cover rounded-md"
                />
                <div className="text-2xl font-bold text-white">Gram-Shiksha</div>
            </div>

            <hr className='border-b border-gray-200'></hr>

            {/*School Information */}
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

            {/*buttons*/}
            <div className='flex flex-col flex-grow'>
                <div className='text-gray-500 mt-5 font-semibold mx-3 text-white'>MAIN MENU</div>

                {menuButtons.map((button) => (
                    <button
                        key={button.key}
                        className={`
                            flex items-center mx-3 my-1 py-2 px-2 text-left rounded 
                            ${option === button.key
                                ? 'bg-[#CE4760] border font-bold text-white border-[#CE4760]'
                                : 'text-white'}
                        `}
                        onClick={() => setOption(button.key)}
                    >
                        <div className='mr-2 text-white'>{button.icon}</div>
                        <div>{button.label}</div>
                    </button>
                ))}
                <button className='flex justify-start text-left p-2 m-3 rounded-md bg-[#CE4760] border font-bold text-white border-[#CE4760]' onClick={()=>navigate('/student/suraj')}>
                    <div className='ml-1 mt-1 mr-2'><FaSchool /></div>
                

                    School Search
                </button>
            </div>
        </div>
    )
}

export default StudentSidebar