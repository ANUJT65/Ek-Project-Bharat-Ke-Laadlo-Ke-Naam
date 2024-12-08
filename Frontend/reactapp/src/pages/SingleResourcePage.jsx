import React from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import Navbar2 from '../components/Navbar2';
import { useParams } from 'react-router-dom';
import VideoMCQs from '../components/VideoMCQs';
import VideoNotes from '../components/VideoNotes';
import VideoMindmap from './VideoMindmap';
import VideoTranscript from './VideoTranscript';

const SingleResourcePage = () => {
    const { id } = useParams(); 

    return (
        <div className="font-inter flex">
            <TeacherSidebar />
            <div className="flex flex-col w-full">
                <Navbar2 type="Teacher" />

                <div className="p-4 bg-gray-200">
                    <div className="text-xl">Resource id: {id}</div>
                    <div className="text-md text-gray-800">Video url:</div>

                    <div className='mt-5 text-2xl font-bold'>MCQs</div>
                    <div className='h-64 grid grid-cols-3'>
                        {/*Is component ko change kar */}
                        <VideoMCQs type='Easy'/>
                        <VideoMCQs type='Medium'/>
                        <VideoMCQs type='Hard'/>
                    </div>

                    <div className='mt-5 text-2xl font-bold'>Resources</div>
                    <div className='h-64 grid grid-cols-3'>
                        <VideoNotes />
                        <VideoMindmap />
                        <VideoTranscript />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleResourcePage;
