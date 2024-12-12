import React, { useState } from 'react';
import { MdMenu, MdClose } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { GrResources } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useTeacherdb } from '../contexts/teacherdbContext';
import coverImage from '../assets/images/logo1.jpg';
import kv_logo from '../assets/images/kv_logo.png';

const TeacherSidebar = ({ onOptionSelect }) => {
    const navigate = useNavigate();
    const { option, setOption } = useTeacherdb();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Handle option selection
    const handleOptionSelect = (selectedOption) => {
        setOption(selectedOption);
        // Close mobile menu if onOptionSelect prop is provided
        onOptionSelect && onOptionSelect();
        // Close mobile menu
        setIsMobileMenuOpen(false);
    };

    // Sidebar content component to avoid duplication
    const SidebarContent = () => (
        <div className='flex flex-col h-full'>
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
            <div className='flex flex-col font-inter flex-grow'>
                <div className='text-white mt-5 font-semibold mx-3'>MAIN MENU</div>

                <button 
                    className={`flex mx-3  my-1 py-1 px-2 text-left rounded ${
                        option === 'analytics' ? 'bg-[#CE4760] border font-bold text-white border-[#CE4760]' : ''
                    }`}
                    onClick={() => {
                        setOption('analytics');
                         navigate('/teacher/dashboard')
                    }}
                >
                    <div className='mr-2 text-white'><SiGoogleanalytics /></div>
                    <div>Dashboard</div>
                </button>

                <button 
                    className={`flex mx-3  my-1 py-1 px-2 text-left rounded ${
                        option === 'resources' ? 'bg-[#CE4760] border font-bold text-white border-[#CE4760]' : ''
                    }`}
                    onClick={() => {
                        setOption('resources');
                        
                    }}
                >
                    <div className='mr-2 text-white'><GrResources /></div>
                    <div>Resources</div>
                </button>
            </div>
        </div>
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

            {/* Desktop Sidebar - hidden on mobile screens */}
            <div className='hidden lg:flex flex-col w-1/5 border-r border-gray-300 h-screen bg-[#2F4550]'>
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
    );
};

export default TeacherSidebar;