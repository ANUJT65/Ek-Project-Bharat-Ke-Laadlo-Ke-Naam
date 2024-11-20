import React from 'react'

const MeetAttendeeCard = ({name}) => {
  return (
    <div className='bg-[#CE4760] w-full h-24 flex justify-center mx-1 rounded-md'>
        <div className='flex flex-col justify-center'>
            <div className='bg-[#2F4550] px-3 py-2 text-center mx-10 rounded-full text-white font-bold'>AT</div>
            <div className='text-white mt-1 text-center'>Anuj Tadkase</div>
        </div>
    </div>
  )
}

export default MeetAttendeeCard