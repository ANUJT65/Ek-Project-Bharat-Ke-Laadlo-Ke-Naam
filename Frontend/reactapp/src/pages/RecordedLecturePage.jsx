import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import StudentClassChat from '../components/StudentClassChat';
import RecordedLectureAttachments from '../components/RecordedLectureAttachments';

const RecordedLecturePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true); // State to toggle chat visibility
  const [showPopup, setShowPopup] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleButtonClick = (action) => {
    switch (action) {
      case 'Take the Quiz':
        alert('Selected: Take the Quiz');
        break;
      case 'View Notes':
        window.open(JSON.parse(videoDetails.notes).pdf_url, '_blank');
        break;
      case 'View Mindmaps':
        setShowPopup(true);
        break;
      case 'Vocational Learning Module':
        navigate(`/student/vocational-learning/${id}`);
        break;
      default:
        alert(`Selected: ${action}`);
    }
    setIsOpen(false);
  };

  const { id } = useParams(); // Get the video_id from the URL
  const [videoDetails, setVideoDetails] = useState(null);
  const [currentIllustrationIndex, setCurrentIllustrationIndex] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`https://backendfianlsih.azurewebsites.net/dy_db/get_video_details/${id}`);
        setVideoDetails(response.data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    const fetchTranscription = async () => {
      try {
        const response = await axios.get(`https://backendfianlsih.azurewebsites.net/dy_db/transcript/${id}`);
        const transcriptionText = response.data.transcript;
        await axios.post('https://backendfianlsih.azurewebsites.net/chat_bot/set_transcription', {
          transcription_text: transcriptionText,
        });
      } catch (error) {
        console.error('Error fetching or setting transcription:', error);
      }
    };

    fetchVideoDetails();
    fetchTranscription();
  }, [id]);

  useEffect(() => {
    if (videoDetails && videoDetails.image_links) {
      const interval = setInterval(() => {
        setCurrentIllustrationIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % Object.keys(videoDetails.image_links).length;
          handleSendMessage(`Illustration: ${Object.keys(videoDetails.image_links)[newIndex]}`, Object.values(videoDetails.image_links)[newIndex]);
          return newIndex;
        });
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [videoDetails]);

  const handleSendMessage = (text, imageUrl) => {
    const message = { sender: 'system', text, imageUrl };
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col overflow-hidden'>
      <Navbar2 />
      <div className={`grid ${isChatVisible ? 'grid-cols-12' : 'grid-cols-9'} h-screen`}>
        <div className={`${isChatVisible ? 'col-span-9' : 'col-span-12'} m-10`}>
          <div className='flex justify-between'>
            <div className='text-xl font-bold'>Video ID: {id}</div>
            <div className="relative inline-block">
              <button
                className="bg-[#CE4760] text-white px-4 py-2 rounded-md mb-2"
                onClick={toggleDropdown}
                style={{marginRight:"500px"}}
              >
                Options
              </button>
              {isOpen && (
                <div
                  className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48 z-50"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleButtonClick('Take the Quiz')}
                  >
                    Take the Quiz
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleButtonClick('View Notes')}
                  >
                    View Notes
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleButtonClick('View Mindmaps')}
                  >
                    View Mindmaps
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleButtonClick('Vocational Learning Module')}
                  >
                    Vocational Learning Module
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsChatVisible(!isChatVisible)} // Toggle chat visibility
                  >
                    Toggle Chat
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col'>
            <video controls className="w-full h-full object-cover shadow-lg rounded-lg">
              <source src={videoDetails.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        {isChatVisible && (
          <div className='h-screen col-span-3 flex flex-col'>
            <StudentClassChat messages={messages} setMessages={setMessages} />
          </div>
        )}
      </div>


      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg w-2/3 max-h-96 overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              onClick={closePopup}
            >
              X
            </button>
            {videoDetails.mind_map.urls.map((url, index) => (
              <div key={index} className="mb-4">
                <img
                  src={url}
                  alt={`Mind Map ${index + 1}`}
                  className="w-full h-auto rounded-md shadow-md"
                />
                <div className="text-center mt-2 font-medium">
                  Mind Map {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordedLecturePage;