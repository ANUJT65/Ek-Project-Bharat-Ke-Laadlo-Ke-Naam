import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Navbar from '../components/Navbar'
import StudentCalendarPreview from '../components/StudentCalendarPreview'
import StudentSubjectLectureCard from '../components/StudentSubjectLectureCard'
import VideoRecordingCard from '../components/VideoRecordingCard'

const TeacherSingleSubjectPage = () => {
  return (
    <div className='flex justify-around'>
        <DashboardSidebar />
        
        <div className='w-full flex flex-col'>
            <Navbar title='Subject Resources'/>

            <div className='flex justify-start'>
            <div className='mx-5 my-2 w-1/2 h-64 grid grid-cols-2 grid-rows-3'>
            <div className="mx-2 my-2 row-span-1 col-span-1 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
                <div className="text-4xl font-bold text-indigo-600">7</div>
                <div className="text-2xl mx-2 text-gray-700">Videos</div>
            </div>
            <div className="mx-2 my-2 row-span-1 col-span-1 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
                <div className="text-4xl font-bold text-indigo-600">30</div>
                <div className="text-2xl mx-2 text-gray-700">Students</div>
            </div>
            <div className="mx-2 my-2 row-span-1 col-span-1 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
                <div className="text-4xl font-bold text-indigo-600">2</div>
                <div className="text-2xl mx-2 text-gray-700">Tests</div>
            </div>
            <div className="mx-2 my-2 row-span-1 col-span-1 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
                <div className="text-4xl font-bold text-indigo-600">7</div>
                <div className="text-2xl mx-2 text-gray-700">Suraj daal kuch</div>
            </div>
            <div className="mx-2 my-2 row-span-1 col-span-2 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
                <div className="text-2xl mx-2 text-gray-700">Check Class analytics</div>
            </div>
            </div>

           
            </div>

            <div className='flex flex-col mt-10 mx-10'>
                <div className='text-2xl'>Videos</div>
                <VideoRecordingCard />
                <VideoRecordingCard />
                <VideoRecordingCard />
                <VideoRecordingCard />
                <VideoRecordingCard />
            </div>

            
        </div>
    </div>
  )
}

export default TeacherSingleSubjectPage