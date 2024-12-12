import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentClassChatMessages from './StudentClassChatMessages';
import { useParams } from 'react-router-dom';

const StudentClassChat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [imageLinks, setImageLinks] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImageLinks = async () => {
      try {
        const response = await axios.get(`https://backendfianlsih.azurewebsites.net/dy_db/get_video_details/${id}`);
        setImageLinks(Object.entries(response.data.image_links));
      } catch (error) {
        console.error('Error fetching image links:', error);
      }
    };

    fetchImageLinks();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageLinks.length > 0) {
        const newIndex = (currentImageIndex + 1) % imageLinks.length;
        const [imageTitle, imageUrl] = imageLinks[newIndex];
        const imageMessage = { sender: 'system', text: 'Here is an image:', imageUrl, imageTitle };
        setMessages((prevMessages) => [...prevMessages, imageMessage]);
        setCurrentImageIndex(newIndex);
      }
    }, 30000); // Send image every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [imageLinks, currentImageIndex]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('https://backendfianlsih.azurewebsites.net/chat_bot/chat', { query: input });
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
    <div className='m-2 rounded-md text-white bg-[#2F4550] h-full p-3 flex flex-col justify-between '>
      <div className='font-bold text-xl'>Chat</div>
      <div className="flex-grow overflow-y-auto h-64 p-2 border rounded-md bg-[#2F4550]/90">
        <StudentClassChatMessages messages={messages} />
      </div>
      <div className='flex'>
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