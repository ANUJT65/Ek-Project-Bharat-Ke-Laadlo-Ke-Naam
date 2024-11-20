import React from 'react'
import MeetAttendeeCard from './MeetAttendeeCard'

const StudentClassAttendees = () => {
  return (
    <div className='row-span-3 h-full p-2 flex justify-around'>
        <MeetAttendeeCard />
        <MeetAttendeeCard />
        <MeetAttendeeCard />
        <MeetAttendeeCard />
        
    </div>
  )
}

export default StudentClassAttendees