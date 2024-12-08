import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StudentClassPoll from '../components/StudentClassPoll';
import StudentClassChat from '../components/StudentClassChat';
import RecordedLectureAttachments from '../components/RecordedLectureAttachments';

const RecordedLecturePage = () => {

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
      }, 30000); // Send illustration to chat every 30 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
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
      <Navbar title='Recorded Lecture' />
      <div className='grid grid-cols-12 h-screen'>
        <div className='col-span-9 bg-green-400'>
          <div className='text-xl font-bold'>Video ID: {id}</div>
          <div className='flex flex-col'>
            <video controls className='w-full h-full'>
              <source src={videoDetails.video_url} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className='col-span-3 flex flex-col'>
          <StudentClassPoll videoId={id} />
          <StudentClassChat messages={messages} />
        </div>
      </div>
      <div className='notes and stuff p-5'>
        <RecordedLectureAttachments notes={videoDetails.notes} mindMap={videoDetails.mind_map} sendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default RecordedLecturePage;