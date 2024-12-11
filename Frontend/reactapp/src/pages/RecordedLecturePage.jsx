import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import StudentClassChat from '../components/StudentClassChat';
import RecordedLectureAttachments from '../components/RecordedLectureAttachments';

const RecordedLecturePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true); // State to toggle chat visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleButtonClick = (action) => {
    alert(`Selected: ${action}`);
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

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col'>
      <Navbar2 />
      <div className={`grid ${isChatVisible ? 'grid-cols-12' : 'grid-cols-9'} h-screen`}>
        <div className={`${isChatVisible ? 'col-span-9' : 'col-span-12'} m-10`}>
          <div className='flex justify-between'>
            <div className='text-xl font-bold'>Video ID: {id}</div>
            <div className="relative inline-block">
              <button
                className="bg-[#CE4760] text-white px-4 py-2 rounded-md"
                onClick={toggleDropdown}
              >
                Options
              </button>
              {isOpen && (
                <div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48">
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
            <StudentClassChat messages={messages} />
          </div>
        )}
      </div>
      <div className='notes-and-stuff p-5'>
        <RecordedLectureAttachments notes={videoDetails.notes} mindMap={videoDetails.mind_map} sendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default RecordedLecturePage;
