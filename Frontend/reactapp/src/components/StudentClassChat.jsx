import React from 'react'
import StudentClassChatMessages from './StudentClassChatMessages'

const StudentClassChat = () => {
  return (
    <div className='h-full p-3 flex flex-col justify-between'>
      <div className='font-bold text-xl'>Chat</div>
      <StudentClassChatMessages />
      <div className='flex flex-grow'>
      <input className='bg-[#2F4550] text-white w-full p-2 border border-black rounded-l-md ' placeholder='send a message'></input>
      <button className='bg-[#CE4760] text-white px-2 rounded-r-md'>Send</button>
      </div>
      
    </div>
  )
}

export default StudentClassChat