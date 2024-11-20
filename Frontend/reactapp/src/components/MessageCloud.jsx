import React from 'react'

const MessageCloud = ({message, sender, self}) => {
    const messageStyles = self ? 'w-full flex justify-end m-1 ' : 'w-full flex justify-start m-1 ';
  return (
    <div className={`${messageStyles}`}>
        <div className='bg-black p-1 rounded-full font-bold text-white mx-1'>{sender}</div>
        <div className='bg-gray-200 p-1 px-2 rounded-md'>{message}</div>
    </div>
  )
}

export default MessageCloud