import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import StudentClassChat from '../components/StudentClassChat';
import RecordedLectureAttachments from '../components/RecordedLectureAttachments';
import { IoMdArrowRoundBack } from "react-icons/io";


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




    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <Navbar2 />

      <div className='container mx-auto px-4 py-6'>
        <button className='bg-[#2F4550] rounded-md p-2 text-white m-2' onClick={()=> navigate(-1)}><IoMdArrowRoundBack />All recorded lectures</button>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 flex justify-between items-center mb-4'>
            <div className="relative">
              <button
                className="bg-[#CE4760] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#B03A50] transition-colors duration-300"
                onClick={toggleDropdown}
              >
                Options
              </button>

              {isOpen && (
                <div
                  className="absolute right--1 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl w-56 z-50 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {[
                    'Take the Quiz',
                    'View Notes',
                    'View Mindmaps',
                    'Vocational Learning Module',
                    'Toggle Chat'
                  ].map((action) => (
                    <button
                      key={action}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200 text-gray-700"
                      onClick={() =>
                        action === 'Toggle Chat'
                          ? setIsChatVisible(!isChatVisible)
                          : handleButtonClick(action)
                      }
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>


          </div>
        </div>

        <div className={`grid ${isChatVisible ? 'grid-cols-12' : 'grid-cols-1'} gap-4`}>
          <div className={`${isChatVisible ? 'col-span-9' : 'col-span-12'}`}>
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <video
                controls
                className="w-full h-full object-cover"
              >
                <source src={videoDetails.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {isChatVisible && (
            <div className='col-span-3'>
              <div className='bg-white rounded-xl shadow-lg h-full'>
                <StudentClassChat messages={messages} setMessages={setMessages} />
              </div>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6">
            <button
              className="sticky top-0 right-0 absolute right-0 text-red-500 hover:text-red-700 text-4xl font-bold"
              onClick={closePopup}
            >
              &times;
            </button>

            <div className="grid md:grid-cols-1 gap-6">
              {videoDetails.mind_map.urls.map((url, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={url}
                    alt={`Mind Map ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="text-center py-3 text-gray-700 font-semibold">
                    Mind Map {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default RecordedLecturePage;
