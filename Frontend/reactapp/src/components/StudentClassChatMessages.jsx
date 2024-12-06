import React from 'react';
import MessageCloud from './MessageCloud';

const StudentClassChatMessages = ({ messages }) => {
  return (
    <div className='flex flex-col justify-end h-full my-3 overflow-y-auto'>
      {messages.map((message, index) => (
        <MessageCloud key={index} message={message.text} sender={message.sender} />
      ))}
    </div>
  );
};

export default StudentClassChatMessages;