import React, { useState } from 'react'
import coverImage from '../assets/images/logo1.jpg';
import kv_logo from '../assets/images/kv_logo.png';
import { MdSpaceDashboard, MdMenu, MdClose } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { useStudentDB } from '../contexts/StudentDBContext';
import { useNavigate } from 'react-router-dom';
import { GrResources } from "react-icons/gr";


const StudentSidebar = () => {
    const { option, setOption } = useStudentDB();
    const navigate = useNavigate();
    
    // State to control mobile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Define button configurations to ensure consistent layout
    const menuButtons = [
        {
            key: 'dashboard',
            icon: <MdSpaceDashboard />,
            label: 'Dashboard'
        }
    ];

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Sidebar content that can be reused for both mobile and desktop
    const SidebarContent = () => (
        <>
            {/* Branding */}
            <div className="branding flex items-center gap-2 p-3 my-2 font-inter text-[#131B1F]">
                <img
                    src={coverImage}
                    alt="Gram Shiksha Logo"
                    className="w-12 h-12 object-cover rounded-md"
                />
                <div className="text-2xl font-bold text-white">Gram-Shiksha</div>
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
            <div className='flex flex-col flex-grow'>
                <div className='mt-5 font-semibold mx-3 text-white'>MAIN MENU</div>

                {menuButtons.map((button) => (
                    <button
                        key={button.key}
                        className={`
                            flex items-center mx-3 my-1 py-2 px-2 text-left rounded 
                            ${option === button.key
                                ? 'bg-[#CE4760] border font-bold text-white border-[#CE4760]'
                                : 'text-white'}
                        `}
                        onClick={() => {
                            setOption(button.key);
                            setIsMobileMenuOpen(false); // Close mobile menu on selection
                        }}
                    >
                        <div className='mr-2 text-white'>{button.icon}</div>
                        <div>{button.label}</div>
                    </button>
                ))}
                <button 
                    className='flex justify-start text-left p-2 m-3 rounded-md bg-[#CE4760] border font-bold text-white border-[#CE4760]' 
                    onClick={() => {
                        navigate('/student/recommendation');
                        setIsMobileMenuOpen(false); // Close mobile menu on navigation
                    }}
                >
                    <div className='ml-1 mt-1 mr-2'><FaSchool /></div>
                    School Search
                </button>

                <button 
                    className={`text-white flex mx-3  my-1 py-1 px-2 text-left rounded ${
                        option === 'ar' ? 'bg-[#CE4760] border font-bold text-white border-[#CE4760]' : ''
                    }`}
                    onClick={() => {
                        setOption('ar');
                        navigate('/student/lecture/ar')
                    }}
                >
                    <div className='mr-2 text-white'><GrResources /></div>
                    <div>AR Resource</div>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Menu Toggle Button */}
            <button 
                className='lg:hidden fixed top-4 left-4 z-50 bg-[#2F4550] p-2 rounded-md text-white'
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>

            {/* Desktop Sidebar - hidden on mobile */}
            <div className='hidden lg:flex flex-col w-1/5 min-h-screen border-r border-gray-300 bg-[#2F4550]'>
                <SidebarContent />
            </div>

            {/* Mobile Sidebar - full-screen overlay */}
            {isMobileMenuOpen && (
                <div className='fixed inset-0 z-40 lg:hidden'>
                    {/* Overlay */}
                    <div 
                        className='absolute inset-0 bg-black opacity-50' 
                        onClick={toggleMobileMenu}
                    ></div>

                    {/* Mobile Menu */}
                    <div className='absolute top-0 left-0 w-4/5 max-w-xs h-full bg-[#2F4550] shadow-lg overflow-y-auto'>
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    )
}

export default StudentSidebar