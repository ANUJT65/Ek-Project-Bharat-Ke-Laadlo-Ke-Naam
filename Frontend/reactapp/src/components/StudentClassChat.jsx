import React, { useState } from 'react';
import axios from 'axios';
import StudentClassChatMessages from './StudentClassChatMessages';

const StudentClassChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/chat_bot/chat', { query: input });
      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='h-full p-3 flex flex-col justify-between'>
      <div className='font-bold text-xl'>Chat</div>
      <StudentClassChatMessages messages={messages} />
      <div className='flex flex-grow'>
        <input
          className='bg-[#2F4550] text-white w-full p-2 border border-black rounded-l-md'
          placeholder='send a message'
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className='bg-[#CE4760] text-white px-2 rounded-r-md' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default StudentClassChat;