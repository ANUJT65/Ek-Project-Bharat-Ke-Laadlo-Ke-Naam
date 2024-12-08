import React from 'react'
import { useNavigate } from 'react-router-dom'

const TeacherResourcesCard = ({title, date, duration, progress, score}) => {
    const navigate = useNavigate();

    return (
      <div className='bg-[#F4F4F8] mt-2 flex justify-between p-5 rounded-md border border-gray-200 border-2'>
  
              <div className='flex flex-col'>
                  <div className='font-bold'>{title}</div>
                  <div className='text-[#615F5F] '>{date}</div>
              </div>
  
              <div className='flex flex-col'>
                  <div className='font-semibold'>Subject</div>
                  <div className='text-[#615F5F]'>{duration}</div>
              </div>
  
              <button className=''>
                  <div className='font-semibold' onClick={()=>navigate(`/teacher/engagement-analytics/${title}`)}>View Engagement Analytics</div>
              </button>
  
              <button className='font-bold my-1 px-2 rounded-md bg-[#ACD5F2]'>View Resource</button>
          </div>
    )
  }
  
export default TeacherResourcesCard
