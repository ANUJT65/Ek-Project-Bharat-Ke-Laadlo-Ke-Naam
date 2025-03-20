import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUser, FaRobot, FaImage, FaPaperPlane } from 'react-icons/fa';

const StudentClassChat = ({ messages: externalMessages, setMessages: setExternalMessages }) => {
  const { id } = useParams();
  const [messages, setInternalMessages] = useState([]);
  const [input, setInput] = useState('');
  const [imageLinks, setImageLinks] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatContainerRef = useRef(null);
  const messageEndRef = useRef(null);

  // Use either external or internal messages state
  const actualMessages = externalMessages || messages;
  const setActualMessages = setExternalMessages || setInternalMessages;

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [actualMessages]);

  // Fetch image links on component mount
  useEffect(() => {
    const fetchImageLinks = async () => {
      try {
        const response = await axios.get(`https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/dy_db/get_video_details/${id}`);
        if (response.data && response.data.image_links) {
          setImageLinks(Object.entries(response.data.image_links));
        }
      } catch (error) {
        console.error('Error fetching image links:', error);
      }
    };

    fetchImageLinks();
  }, [id]);

  // Send periodic image messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageLinks.length > 0) {
        const newIndex = (currentImageIndex + 1) % imageLinks.length;
        const [imageTitle, imageUrl] = imageLinks[newIndex];
        const imageMessage = { 
          sender: 'system', 
          text: `Illustration: ${imageTitle}`, 
          imageUrl
        };
        setActualMessages(prev => [...prev, imageMessage]);
        setCurrentImageIndex(newIndex);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [imageLinks, currentImageIndex, setActualMessages]);

  // Handle send message
  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setActualMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/chat_bot/chat', { 
        query: input 
      });
      
      const botMessage = { sender: 'bot', text: response.data.response };
      setActualMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        sender: 'bot', 
        text: 'Sorry, I had trouble processing your request. Please try again.' 
      };
      setActualMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render individual message
  const renderMessage = (message, index) => {
    const isUser = message.sender === 'user';
    const isBot = message.sender === 'bot';
    const isSystem = message.sender === 'system';

    return (
      <div 
        key={index} 
        className={`mb-3 ${isUser ? 'ml-auto' : 'mr-auto'} ${isUser ? 'text-right' : 'text-left'} max-w-[85%]`}
      >
        <div className={`flex items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-[#CE4760]' : isBot ? 'bg-[#4A6FA5]' : 'bg-[#6B8E23]'
          }`}>
            {isUser ? <FaUser /> : isBot ? <FaRobot /> : <FaImage />}
          </div>
          
          <div className={`mx-2 p-3 rounded-md ${
            isUser 
              ? 'bg-[#CE4760] text-white' 
              : isBot 
                ? 'bg-[#4A6FA5] text-white' 
                : 'bg-[#35617F] text-white'
          }`}>
            <p className="text-sm">{message.text}</p>
            
            {message.imageUrl && (
              <div className="mt-2">
                <img 
                  src={message.imageUrl} 
                  alt="Illustration" 
                  className="max-w-full rounded-md border border-white/20"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#2F4550] rounded-md overflow-hidden">
      {/* Messages container */}
      <div 
        ref={chatContainerRef}
        className="flex-grow p-3 overflow-y-auto"
        style={{
          height: 'calc(100% - 60px)',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {actualMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/70 text-center p-4">
            <p>No messages yet. Ask a question about the video content!</p>
          </div>
        ) : (
          actualMessages.map((message, index) => renderMessage(message, index))
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-white/70 p-3 bg-[#35617F]/50 rounded-md max-w-[85%]">
            <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-0"></div>
            <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-300"></div>
          </div>
        )}
        
        <div ref={messageEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-3 border-t border-gray-700 bg-[#243942]" style={{ minHeight: '60px' }}>
        <div className="flex rounded-md overflow-hidden border border-gray-600 focus-within:border-[#CE4760] transition-colors">
          <input
            className="bg-[#2F4550] text-white w-full p-2 outline-none"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button 
            className={`bg-[#CE4760] text-white px-4 flex items-center justify-center hover:bg-[#b03a50] transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSend}
            disabled={isLoading}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentClassChat;