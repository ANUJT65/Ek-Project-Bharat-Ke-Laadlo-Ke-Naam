import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentVocationalLearning2 = () => {
  const { videoId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [answer, setAnswer] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState(null);
  const [isNextQuestionReady, setIsNextQuestionReady] = useState(false);

  useEffect(() => {
    const fetchInitialVideo = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('Fetching initial video...');
        const response = await axios.post('http://localhost:5000/get-next-question', { videoId, currentIndex }, { responseType: 'blob' });
        const videoUrl = URL.createObjectURL(response.data);
        setVideoUrl(videoUrl);
        setCurrentIndex(currentIndex + 1);
        console.log('Initial video fetched successfully');
      } catch (error) {
        console.error('Failed to fetch the initial video:', error);
        setError('Failed to fetch the initial video.');
      }
      setLoading(false);
    };

    fetchInitialVideo();
  }, [videoId, currentIndex]);

  const handleAnswerSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Submitting answer...');
      const response = await axios.post('http://localhost:5000/submit-answer', { answer });
      setFeedback(response.data.feedback);
      setIsNextQuestionReady(true);
      console.log('Answer submitted successfully');
    } catch (error) {
      console.error('Failed to submit the answer:', error);
      setError('Failed to submit the answer.');
    }
    setLoading(false);
  };

  const loadNextQuestion = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Loading next question...');
      const nextVideoResponse = await axios.post('http://localhost:5000/get-next-question', { videoId, currentIndex }, { responseType: 'blob' });
      const videoUrl = URL.createObjectURL(nextVideoResponse.data);
      setVideoUrl(videoUrl);
      setCurrentIndex(currentIndex + 1);
      setAnswer('');
      setFeedback('');
      setIsNextQuestionReady(false);
      console.log('Next question loaded successfully');
    } catch (error) {
      console.error('Failed to fetch the next video:', error);
      setError('Failed to fetch the next video.');
    }
    setLoading(false);
  };

  const startRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setRecognizing(true);
      console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setAnswer(transcript);
      console.log('Speech recognition result:', transcript);
    };

    recognition.onerror = (event) => {
      setRecognizing(false);
      setError('Speech recognition error: ' + event.error);
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setRecognizing(false);
      console.log('Speech recognition ended');
    };

    recognition.start();
    setRecognitionInstance(recognition);
  };

  const stopRecognition = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setRecognizing(false);
      console.log('Speech recognition stopped');
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen flex">
      <div className="flex-shrink-0 w-3/4 pr-8">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {videoUrl && (
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Your Test Question</h2>
            <video className="rounded-lg shadow-md w-full" src={videoUrl} controls />
          </div>
        )}
      </div>
      <div className="w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col space-y-4">
        {videoUrl && (
          <>
            <button
              className={`px-6 py-3 rounded-lg font-medium ${recognizing ? 'bg-gray-600 opacity-75 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
              onClick={startRecognition}
              disabled={recognizing}
            >
              {recognizing ? 'Listening...' : 'Start Voice Input'}
            </button>
            <button
              className="px-6 py-3 bg-red-600 rounded-lg font-medium text-white hover:bg-red-500"
              onClick={stopRecognition}
              disabled={!recognizing}
            >
              Stop Voice Input
            </button>
            {answer && (
              <div>
                <p>Your recorded answer: {answer}</p>
                <button onClick={handleAnswerSubmit}>Submit Answer</button>
              </div>
            )}
            {feedback && <p>{feedback}</p>}
            {isNextQuestionReady && (
              <button onClick={loadNextQuestion}>Next Question</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentVocationalLearning2;