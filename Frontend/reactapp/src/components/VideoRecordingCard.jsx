import React from 'react'

const VideoRecordingCard = ({subjectName, date, videoName, notesLink, illustrationsLink, }) => {
    return (
        <div className='bg-[#2F4550] text-white mt-2 flex justify-between p-5 rounded-md border border-gray-200 border-2'>
                <div className='flex flex-col'>
                    
                    <div className='font-bold text-xl'>Proper Fractions</div>
                    <div className='text-xl'>Maths</div>
                </div>
    
                <div className='flex flex-col'>
                    <div className='font-semibold'>Date</div>
                    <div className=''>27 Sep 2024</div>
                </div>
    
                <button className='flex flex-col'>
                    <div className='font-semibold'>Notes</div>
                </button>

                <button className='flex flex-col'>
                    <div className='font-semibold'>Illustrations</div>
                </button>
    
                
            </div>
      )
}

export default VideoRecordingCard