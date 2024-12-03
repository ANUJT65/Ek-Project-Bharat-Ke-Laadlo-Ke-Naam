import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Navbar from '../components/Navbar'
import VocationalStudentAnswer from '../components/VocationalStudentAnswer'
import VocationalAIReply from '../components/VocationalAIReply'

const StudentVocationalLearningPage = () => {
  const studentAnswer = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  return (
    <div className='flex'>
      <DashboardSidebar />

      <div className='w-full flex flex-col'>
        <Navbar title='Vocational Learning Module' />

        <div className='flex justify-between'>
          <img src='' className='w-1/2'></img>
          <div className='flex flex-col w-1/5 mr-5'>
            <button className='p-2 bg-[#2F4550] text-white rounded-md my-1'>Start Recording</button>
            <button className='p-2 bg-[#CE4760] text-white rounded-md my-1' >Stop Recording</button>
            <button className='p-2 bg-[#2F4550] text-white rounded-md my-1' >Submit Answer</button>
            <button className='p-2 bg-[#CE4760] text-white rounded-md my-1' >Re-Record Answer</button>
            <button className='p-2 bg-[#2F4550] text-white rounded-md my-1' >Next Question</button>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='text-xl m-5'>Language Model: English</div>
          <VocationalStudentAnswer studentAnswer={studentAnswer} />
          <VocationalAIReply aiResponse={studentAnswer} /> {/*filhaal ek hi response daala hai for student and ai, baadmein change karlena */}
        </div>
      </div>
    </div>
  )
}

export default StudentVocationalLearningPage