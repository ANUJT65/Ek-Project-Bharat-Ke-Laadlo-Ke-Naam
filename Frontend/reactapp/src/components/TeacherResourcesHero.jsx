import React from 'react'
import StudentTestCard from './StudentTestCard'
import TeacherResourcesCard from './TeacherResourcesCard'

const TeacherResourcesHero = () => {
  return (
    <div className='bg-gray-200 flex flex-col p-5 px-7 font-inter max-h-[calc(100vh-64px)] overflow-auto'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='text-xl font-bold my-1'>Videos</div>
          <div className='text-sm text-gray-600 mb-2'>View all your resources at a single place.</div>
        </div>

        <button className='bg-[#F64328] text-white my-3 px-2 rounded-md'>+ Upload a new video</button>
      </div>
      
      <TeacherResourcesCard title='States of Matter' date='24 September, 2024' duration='Science'  score='97/100'/>
      <TeacherResourcesCard title='States of Matter' date='24 September, 2024' duration='Science'  score='97/100'/>
      <TeacherResourcesCard title='States of Matter' date='24 September, 2024' duration='Science'  score='97/100'/>
      <TeacherResourcesCard title='States of Matter' date='24 September, 2024' duration='Science'  score='97/100'/>
      <TeacherResourcesCard title='States of Matter' date='24 September, 2024' duration='Science'  score='97/100'/>
      <TeacherResourcesCard title='States of Matter' date='24 September, 2024' duration='Science'  score='97/100'/>
      <TeacherResourcesCard title='States of Matter' date='24 September, 2024' duration='Science'  score='97/100'/>
      <TeacherResourcesCard title='States of Matter' date='24 September, 2024' duration='Science'  score='97/100'/>
    </div>
  )
}

export default TeacherResourcesHero