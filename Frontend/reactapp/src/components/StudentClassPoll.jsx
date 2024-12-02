import React from 'react'

const StudentClassPoll = () => {
  const optionsStyle = 'text-[#CE4760] bg-white hover:bg-[#CE4760] hover:text-white  border border-[#CE4760] p-1 px-2 rounded-md my-1 text-left'
  return (
    <div className="bg-[#F4F4F8] h-full flex p-3 flex flex-col border-l-2 order-[#D9D9D9]">
        <div className='text-xl font-bold'>Poll</div>
        <div className=''>Q: Does Lightning McQueen have Life Insurance or Car Insurance?</div>
        <button className={`${optionsStyle}`}>A: Life Insurance</button>
        <button className={`${optionsStyle}`}>B: Car Insurance</button>
        <button className={`${optionsStyle}`}>C: Both</button>
        <button className={`${optionsStyle}`}>D: Neither</button>
    </div>
  )
}

export default StudentClassPoll