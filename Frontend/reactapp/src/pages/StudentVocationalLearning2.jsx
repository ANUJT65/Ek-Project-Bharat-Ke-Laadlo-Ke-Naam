import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    const [transcript, setTranscript] = useState(null);

    // Fetch transcript
    useEffect(() => {
        const fetchTranscript = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://backendfianlsih.azurewebsites.net/dy_db/transcript/${videoId}`);
                setTranscript(response.data.transcript);
                fetchInitialVideo(response.data.transcript);
            } catch (err) {
                setError('Failed to fetch transcript: ' + err.message);
            }
            setLoading(false);
        };

        fetchTranscript();
    }, []);

    const fetchInitialVideo = async (transcriptData) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/get-next-question', 
                { transcript: transcriptData, currentIndex }, 
                { responseType: 'blob' }
            );
            const videoUrl = URL.createObjectURL(response.data);
            setVideoUrl(videoUrl);
            setCurrentIndex(currentIndex + 1);
        } catch (error) {
            setError('Failed to fetch the initial video.');
        }
        setLoading(false);
    };

    const handleAnswerSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/submit-answer', { answer });
            setFeedback(response.data.feedback);
            setIsNextQuestionReady(true);
        } catch (error) {
            setError('Failed to submit the answer.');
        }
        setLoading(false);
    };

    const loadNextQuestion = async () => {
        setLoading(true);
        setError('');
        try {
            const nextVideoResponse = await axios.post('http://localhost:5000/get-next-question', 
                { transcript, currentIndex }, 
                { responseType: 'blob' }
            );
            const videoUrl = URL.createObjectURL(nextVideoResponse.data);
            setVideoUrl(videoUrl);
            setCurrentIndex(currentIndex + 1);
            setAnswer('');
            setFeedback('');
            setIsNextQuestionReady(false);
        } catch (error) {
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
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            setAnswer(transcript);
        };

        recognition.onerror = (event) => {
            setRecognizing(false);
            setError('Speech recognition error: ' + event.error);
        };

        recognition.onend = () => {
            setRecognizing(false);
        };

        recognition.start();
        setRecognitionInstance(recognition);
    };

    const stopRecognition = () => {
        if (recognitionInstance) {
            recognitionInstance.stop();
            setRecognizing(false);
        }
    };

    return (
        <div className="p-8 bg-white min-h-screen flex">
            {loading && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>}
            
            <div className="flex-shrink-0 w-3/4 pr-8">
                {videoUrl && (
                    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                            Your Test Question
                        </h2>
                        <video className="rounded-lg shadow-md w-full" src={videoUrl} controls />
                    </div>
                )}
            </div>

            <div className="w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col space-y-4">
                {error && <div className="text-red-500 p-2 bg-red-100 rounded">{error}</div>}
                
                {videoUrl && (
                    <>
                        <button
                            className={`px-6 py-3 rounded-lg font-medium ${
                                recognizing ? 'bg-gray-600 opacity-75 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                            } text-white`}
                            onClick={startRecognition}
                            disabled={recognizing}
                        >
                            {recognizing ? 'Listening...' : 'Start Voice Input'}
                        </button>

                        <button
                            className={`px-6 py-3 rounded-lg font-medium ${
                                !recognizing ? 'bg-gray-600 opacity-75 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'
                            } text-white`}
                            onClick={stopRecognition}
                            disabled={!recognizing}
                        >
                            Stop Voice Input
                        </button>

                        {answer && (
                            <div className="bg-white p-4 rounded-lg">
                                <h3 className="font-medium mb-2">Your recorded answer:</h3>
                                <p className="text-gray-700">{answer}</p>
                                <button 
                                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                                    onClick={handleAnswerSubmit}
                                >
                                    Submit Answer
                                </button>
                            </div>
                        )}

                        {feedback && (
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <h3 className="font-medium mb-2">Feedback:</h3>
                                <p className="text-gray-700">{feedback}</p>
                            </div>
                        )}

                        {isNextQuestionReady && (
                            <button 
                                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
                                onClick={loadNextQuestion}
                            >
                                Next Question
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default StudentVocationalLearning2;