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
  const [mcqsEasy, setMcqsEasy] = useState([]);
  const [mcqsMedium, setMcqsMedium] = useState([]);
  const [mcqsHard, setMcqsHard] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('easy');
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null); // To track the answer status

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dy_db/get_video_details/${id}`);
        setVideoDetails(response.data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    const fetchMcqsEasy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dy_db/get_mcqs_easy/${id}`);
        setMcqsEasy(response.data.mcqs_easy);
      } catch (error) {
        console.error('Error fetching easy MCQs:', error);
      }
    };

    const fetchMcqsMedium = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dy_db/get_mcqs_medium/${id}`);
        setMcqsMedium(response.data.mcqs_medium);
      } catch (error) {
        console.error('Error fetching medium MCQs:', error);
      }
    };

    const fetchMcqsHard = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dy_db/get_mcqs_hard/${id}`);
        setMcqsHard(response.data.mcqs_hard);
      } catch (error) {
        console.error('Error fetching hard MCQs:', error);
      }
    };

    const fetchTranscription = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dy_db/transcript/${id}`);
        const transcriptionText = response.data.transcript;
        await axios.post('http://localhost:5000/chat_bot/set_transcription', {
          transcription_text: transcriptionText,
        });
      } catch (error) {
        console.error('Error fetching or setting transcription:', error);
      }
    };

    fetchVideoDetails();
    fetchMcqsEasy();
    fetchMcqsMedium();
    fetchMcqsHard();
    fetchTranscription();
  }, [id]);

  useEffect(() => {
    if (mcqsEasy.length > 0) {
      setCurrentQuestion(mcqsEasy[0]);
    }
  }, [mcqsEasy]);

  useEffect(() => {
    const interval = setInterval(() => {
      showNextQuestion();
    }, 30000); // Show a question every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentQuestion, currentLevel, mcqsEasy, mcqsMedium, mcqsHard]);

  const showNextQuestion = () => {
    let nextQuestion;
    if (currentLevel === 'easy') {
      const nextIndex = mcqsEasy.indexOf(currentQuestion) + 1;
      if (nextIndex < mcqsEasy.length) {
        nextQuestion = mcqsEasy[nextIndex];
      } else {
        setCurrentLevel('medium');
        nextQuestion = mcqsMedium[0];
      }
    } else if (currentLevel === 'medium') {
      const nextIndex = mcqsMedium.indexOf(currentQuestion) + 1;
      if (nextIndex < mcqsMedium.length) {
        nextQuestion = mcqsMedium[nextIndex];
      } else {
        setCurrentLevel('hard');
        nextQuestion = mcqsHard[0];
      }
    } else if (currentLevel === 'hard') {
      const nextIndex = mcqsHard.indexOf(currentQuestion) + 1;
      if (nextIndex < mcqsHard.length) {
        nextQuestion = mcqsHard[nextIndex];
      } else {
        nextQuestion = null; // No more questions
      }
    }

    setCurrentQuestion(nextQuestion);
    setAnswerStatus(null); // Reset the answer status for the next question
  };

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }

    if (isCorrect) {
      if (currentLevel === 'easy') {
        setCurrentLevel('medium');
      } else if (currentLevel === 'medium') {
        setCurrentLevel('hard');
      }
    } else {
      if (currentLevel === 'hard') {
        setCurrentLevel('medium');
      } else if (currentLevel === 'medium') {
        setCurrentLevel('easy');
      }
    }

    setTimeout(showNextQuestion, 3000); // Show the next question after 3 seconds
  };

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
          <div className={`p-3 bg-white border border-gray-300 rounded-md mb-4 ${answerStatus === 'correct' ? 'bg-green-200' : answerStatus === 'incorrect' ? 'bg-red-200' : ''}`}>
            <div className='text-lg font-bold'>Current Difficulty: {currentLevel}</div>
            {answerStatus === 'incorrect' && (
              <div className='text-sm text-red-600'>Correct Answer: {currentQuestion.answer}</div>
            )}
          </div>
          {currentQuestion && (
            <StudentClassPoll
              question={currentQuestion.question}
              options={currentQuestion.options}
              onAnswer={handleAnswer}
            />
          )}
          <StudentClassChat sendMessage={handleSendMessage} />
        </div>
      </div>
      <div className='notes and stuff p-5'>
        <RecordedLectureAttachments notes={videoDetails.notes} illustrations={videoDetails.image_links} mindMap={videoDetails.mind_map} sendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default RecordedLecturePage;