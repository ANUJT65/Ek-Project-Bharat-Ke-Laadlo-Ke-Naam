import React from 'react'

const StudentTestCard = ({title, date, duration, progress, score}) => {
  return (
    <div className='bg-[#F4F4F8] mt-2 flex justify-between p-5 rounded-md border border-gray-200 border-2'>

            <div className='flex flex-col'>
                <div className='font-bold'>{title}</div>
                <div className='text-[#615F5F] '>{date}</div>
            </div>

            <div className='flex flex-col'>
                <div className='font-semibold'>Duration</div>
                <div className='text-[#615F5F]'>{duration}</div>
            </div>

            <div className='flex flex-col'>
                <div className='font-semibold'>Progress</div>
                <div className='text-[#615F5F]'>{progress}</div>
            </div>

            <div className='font-bold'>{score}</div>
        </div>
  )
}

export default StudentTestCard