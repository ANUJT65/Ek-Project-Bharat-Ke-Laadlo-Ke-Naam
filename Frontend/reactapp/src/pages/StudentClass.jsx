import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StudentClassPresentation from '../components/StudentClassPresentation';
import StudentClassAttendees from '../components/StudentClassAttendees';
import StudentClassPoll from '../components/StudentClassPoll';
import StudentClassChat from '../components/StudentClassChat';

const StudentClass = () => {
    const { id } = useParams(); 
    return (
        <div className='flex flex-col h-screen'>
            <Navbar title='Live Class'/>
            <hr></hr>

            <div className="grid grid-cols-7 h-full">
            <div className="grid grid-rows-10 col-span-5 flex flex-col  h-screen p-4 bg-[#F4F4F8]">
                <div className="row-span-7"><StudentClassPresentation /></div>
                <div className="row-span-3"><StudentClassAttendees /></div>
            </div>

            <div className="col-span-2 grid grid-rows-10 flex flex-col border h-full">
                <div className="row-span-4"><StudentClassPoll /></div>
                <div className="row-span-6"><StudentClassChat /></div>
            </div>

            </div>
        </div>
    );
};

export default StudentClass;
