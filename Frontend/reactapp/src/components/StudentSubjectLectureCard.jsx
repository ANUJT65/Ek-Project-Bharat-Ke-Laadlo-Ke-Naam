import React from 'react'

const StudentSubjectLectureCard = ({name, date, url}) => {
  return (
    <div className='bg-[#F4F4F8] mt-2 flex justify-between p-5 rounded-md border border-gray-200 border-2'>
            <div className='flex flex-col'>
                
                <div className='font-bold text-xl'>Proper Fractions</div>
            </div>

            <div className='flex flex-col'>
                <div className='font-semibold'>Date</div>
                <div className='text-[#615F5F]'>27 Sep 2024</div>
            </div>

            <div className='flex flex-col'>
                <div className='font-semibold'>Watch Recording</div>
            </div>

            
        </div>
  )
}

export default StudentSubjectLectureCard