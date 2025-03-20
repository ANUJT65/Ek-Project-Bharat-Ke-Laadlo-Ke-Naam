import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentClassChat = ({ initialMessages, parentSetMessages }) => {
  const { id } = useParams();
  const [messages, setMessages] = useState(initialMessages || []);
  const [input, setInput] = useState('');
  const [imageLinks, setImageLinks] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Update parent component's messages state if provided
  useEffect(() => {
    if (parentSetMessages && typeof parentSetMessages === 'function') {
      parentSetMessages(messages);
    }
  }, [messages, parentSetMessages]);

  // Fetch image links when component mounts
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Image rotation interval
  useEffect(() => {
    let interval;
    
    if (imageLinks.length > 0) {
      interval = setInterval(() => {
        const newIndex = (currentImageIndex + 1) % imageLinks.length;
        const [imageTitle, imageUrl] = imageLinks[newIndex];
        const imageMessage = { 
          id: Date.now(), 
          sender: 'system', 
          text: 'Here is an image:', 
          imageUrl, 
          imageTitle 
        };
        setMessages(prevMessages => [...prevMessages, imageMessage]);
        setCurrentImageIndex(newIndex);
      }, 60000); // Send image every 60 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [imageLinks, currentImageIndex]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === '' || loading) return;

    const userMessage = { 
      id: Date.now(), 
      sender: 'user', 
      text: input 
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/chat_bot/chat', 
        { query: currentInput }
      );
      
      if (response.data && response.data.response) {
        const botMessage = { 
          id: Date.now() + 1, 
          sender: 'bot', 
          text: response.data.response 
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message to user
      const errorMessage = { 
        id: Date.now() + 1, 
        sender: 'system', 
        text: 'Failed to send message. Please try again.' 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Individual message component
  const ChatMessage = ({ message }) => {
    const { sender, text, imageUrl, imageTitle } = message;
    
    const getMessageStyles = () => {
      switch(sender) {
        case 'user':
          return 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg ml-auto border-t border-blue-400/30';
        case 'bot':
          return 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg mr-auto border-t border-green-400/30';
        case 'system':
          return 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-lg mx-auto text-center border-t border-gray-500/30';
        default:
          return 'bg-gray-600 text-white';
      }
    };
    
    const getSenderIcon = () => {
      switch(sender) {
        case 'user':
          return (
            <div className="absolute -left-1 -top-1 w-4 h-4 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center shadow-sm">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
              </svg>
            </div>
          );
        case 'bot':
          return (
            <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-green-600 border border-green-400 flex items-center justify-center shadow-sm">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
          );
        case 'system':
          return (
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-4 h-4 rounded-full bg-gray-600 border border-gray-400 flex items-center justify-center shadow-sm">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
            </div>
          );
        default:
          return null;
      }
    };
    
    // Show image message with larger image
    if (imageUrl) {
      return (
        <div className="relative px-1 py-0.5">
          <div className={`relative rounded-lg p-2.5 mb-2 mx-auto max-w-[85%] text-sm ${getMessageStyles()}`}>
            {getSenderIcon()}
            <div className="font-medium mb-1">
              {text}
            </div>
            <div className="rounded bg-black/10 p-1.5 overflow-hidden">
              <p className="text-xs italic mb-1 text-gray-100 opacity-80">{imageTitle}</p>
              <img 
                src={imageUrl} 
                alt={imageTitle || "Image"} 
                className="max-w-full rounded border border-white/20 shadow-inner hover:opacity-95 transition-opacity" 
                style={{ maxHeight: '120px', objectFit: 'contain' }}
              />
            </div>
            <div className="absolute bottom-0.5 right-2 text-[9px] opacity-60 font-mono">
              {message.id ? new Date(message.id).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
            </div>
          </div>
        </div>
      );
    }
    
    // Regular text message
    return (
      <div className="relative px-1 py-0.5">
        <div className={`relative rounded-lg p-2.5 my-1 max-w-[75%] text-sm ${getMessageStyles()}`}>
          {getSenderIcon()}
          <div className="font-medium">
            {text}
          </div>
          <div className="absolute bottom-0.5 right-2 text-[9px] opacity-60 font-mono">
            {message.id ? new Date(message.id).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full rounded-b-md overflow-hidden bg-[#1a2830]/90">
      {/* Messages container - with enhanced scrollbar and background */}
      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-2 space-y-0.5 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent" 
        style={{ 
          maxHeight: "220px",
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 transparent',
          backgroundImage: 'linear-gradient(to bottom, rgba(47, 69, 80, 0.3), rgba(47, 69, 80, 0.6))',
          backgroundAttachment: 'local'
        }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-300 py-6 text-sm flex flex-col items-center">
            <div className="bg-gray-700/40 rounded-full p-3 mb-3 shadow-inner">
              <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="bg-gray-800/30 rounded-lg px-3 py-1.5 shadow-inner">
              Send a message to start chatting
            </div>
          </div>
        ) : (
          messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area - with enhanced styling and effects */}
      <div className="p-2 border-t border-gray-700/80 bg-[#29414e]">
        <div className="flex items-center">
          <input
            className="flex-grow bg-[#1a2830] hover:bg-[#1a2830]/90 text-white p-2.5 text-sm border border-gray-600/50 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
            placeholder="Type your message here..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button 
            className={`px-3.5 py-2.5 rounded-r-md text-sm font-medium transition-all ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-[#CE4760] hover:bg-[#CE4760]/90 hover:shadow-md active:scale-95'
            }`}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center w-6">
                <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : (
              <span className="flex items-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentClassChat;