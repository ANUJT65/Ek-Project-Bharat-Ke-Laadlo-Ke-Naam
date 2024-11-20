import React from 'react'
import MessageCloud from './MessageCloud'

const StudentClassChatMessages = () => {
  return (
    <div className='flex flex-col justify-end h-full my-3 '>
        <MessageCloud message='hello' sender='AT' />
    </div>
  )
}

export default StudentClassChatMessages