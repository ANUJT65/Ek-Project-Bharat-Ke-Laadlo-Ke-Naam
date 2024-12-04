import React from 'react'
import Navbar from '../components/Navbar'
import StudentClassPoll from '../components/StudentClassPoll'
import StudentClassChat from '../components/StudentClassChat'
import RecordedLectureAttachments from '../components/RecordedLectureAttachments'

const RecordedLecturePage = () => {
  return (
    <div className='flex flex-col'>
        <Navbar title='Recorded Lecture' />

        <div className='grid grid-cols-12 h-screen'>
            <div className='col-span-9 bg-green-400'></div>
            <div className='col-span-3 flex flex-col'>
                <StudentClassPoll />
                <StudentClassChat />
            </div>
        </div>

        <div className='notes and stuff p-5'><RecordedLectureAttachments /></div>
    </div>
  )
}

export default RecordedLecturePage