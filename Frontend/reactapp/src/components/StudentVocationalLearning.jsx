import React from 'react'
import StudentTestCard from './StudentTestCard'

const StudentVocationalLearning = () => {
  return (
    <div className='flex flex-col px-5 my-5'>
        <div className='text-xl  font-bold'>Tests and Vocational Learning</div>
        <StudentTestCard title='History Class Test' date='24 September, 2024' duration='03h 00min' progress='90%' score='97/100'/>
        <StudentTestCard title='History Class Test' date='24 September, 2024' duration='03h 00min' progress='90%' score='97/100'/>
        <StudentTestCard title='History Class Test' date='24 September, 2024' duration='03h 00min' progress='90%' score='97/100'/>
        <StudentTestCard title='History Class Test' date='24 September, 2024' duration='03h 00min' progress='90%' score='97/100'/>
    </div>
  )
}

export default StudentVocationalLearning