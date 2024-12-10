import React from 'react'
import coverImage from '../assets/images/logo1.jpg';
import kv_logo from '../assets/images/kv_logo.png';
import goi_emblem from '../assets/images/goi_emblem.jpeg'
import { useNavigate } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { SiGoogleanalytics } from "react-icons/si";
import { PiStudentDuotone } from "react-icons/pi";
import { useTeacherdb } from '../contexts/teacherdbContext';
import { SiMaterialdesignicons } from "react-icons/si";
import { useGovernment } from '../contexts/GovernmentDBContext';

const GovernmentSidebar = () => {
    const navigate = useNavigate();
    const { option, setOptions } = useGovernment();

    const activeButtonStyles = 'mx-3 flex border bg-[#ACD5F2] font-bold text-[#0094FF] border-[#0094FF] my-1 py-1 px-2 text-left rounded';
    const inactiveButtonStyles = 'flex mx-3  border-[#507385] my-1 py-1 px-2 text-left rounded';

    return (
    <div className='h-screen flex flex-col w-1/5  border-r border-gray-300'>

        {/*Name */}
        <div className="branding flex items-center gap-2 p-3 my-2 font-inter text-[#131B1F]">
            <img 
                src={coverImage}
                alt="Gram Shiksha Logo" 
                className="w-12 h-12 object-cover rounded-md" 
            />
            <div className="text-2xl font-bold">Gram-Shiksha</div>
        </div>

        <hr className='border-b border-gray-200'></hr>

        {/*School Information */}
        <div className=' my-2 mx-3 p-2 flex rounded-md bg-gray-300 shadow'>
        <img 
                src={kv_logo}
                alt="Gram Shiksha Logo" 
                className="w-10 h-10 object-cover mr-2 rounded-md" 
            />
            <div className='flex flex-col'>
            <div className='font-bold'>Department of Secondary Education and Literacy</div>
            <div className='text-sm'>New Delhi, 123456</div>
            </div>
        </div>

        {/*buttons*/}
        <div className='flex flex-col'>
            <div className='text-gray-500 mt-5 font-semibold mx-3'>MAIN MENU</div>

            <button className={option === 'dashboard' ? activeButtonStyles : inactiveButtonStyles} onClick={()=>setOptions('dashboard')}>
                <div className='mt-1 mr-1'><MdSpaceDashboard /></div>
                <div>Dashboard</div>
            </button>

            <button className={option === 'resources' ? activeButtonStyles : inactiveButtonStyles} onClick={()=>setOptions('resources')}>
                <div className='mt-1 mr-2'><GrResources/></div>
                <div>Resources</div>
            </button>

            <button className={option === 'analytics' ? activeButtonStyles : inactiveButtonStyles} onClick={()=>setOptions('analytics')}><div className='mt-1 mr-2'><SiGoogleanalytics/></div>
            <div>Engagement Analytics</div>
            </button>

        </div>
    </div>
  )
}

export default GovernmentSidebar