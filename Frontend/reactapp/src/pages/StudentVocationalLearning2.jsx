import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';

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

    // Play feedback using text-to-speech
    const playFeedback = () => {
        if (!feedback) return;
        const utterance = new SpeechSynthesisUtterance(feedback);
        utterance.lang = 'en-US'; // Adjust language as needed
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div>
            <Navbar2 />

            <div className="p-6 bg-[##4caf50] min-h-screen flex text-white">
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white">Loading...</div>
                    </div>
                )}

                <div className="flex-shrink-0 w-2/3 ">
                    {videoUrl && (
                        <div className="bg-[#2F4550] p-4  shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-center text-white">
                                Your Test Question
                            </h2>
                            <video className="shadow-md w-full" src={videoUrl} controls />
                        </div>
                    )}
                </div>

                <div className="w-1/3 bg-white p-5 flex flex-col space-y-4">


                    {videoUrl && (
                        <>
                            <button
                                className={`px-6 py-3 rounded-lg font-medium ${recognizing ? 'bg-gray-500 opacity-75 cursor-not-allowed' : 'bg-[#CE4760] hover:bg-[#A53C4E]'
                                    }`}
                                onClick={startRecognition}
                                disabled={recognizing}
                            >
                                {recognizing ? 'Listening...' : 'Start Voice Input'}
                            </button>

                            <button
                                className={`px-6 py-3 rounded-lg font-medium ${!recognizing ? 'bg-gray-500 opacity-75 cursor-not-allowed' : 'bg-[#CE4760] hover:bg-[#A53C4E]'
                                    }`}
                                onClick={stopRecognition}
                                disabled={!recognizing}
                            >
                                Stop Voice Input
                            </button>

                            {answer && (
                                <div className="bg-[#CE4760] p-4 rounded-lg">
                                    <h3 className="font-medium mb-2 text-white">Your Recorded Answer:</h3>
                                    <p className="text-white">{answer}</p>
                                    <button
                                        className="mt-4 px-4 py-2 bg-[#2F4550] text-white rounded hover:bg-[#243038]"
                                        onClick={handleAnswerSubmit}
                                    >
                                        Submit Answer
                                    </button>
                                </div>
                            )}

                            {feedback && (
                                <div className="bg-[#CE4760] p-4 rounded-lg">
                                    <h3 className="font-medium mb-2 text-white">Feedback:</h3>
                                    <p className="text-white">{feedback}</p>
                                    <button
                                        className="mt-4 px-4 py-2 bg-[#2F4550] text-white rounded hover:bg-[#243038]"
                                        onClick={playFeedback}
                                    >
                                        Play Feedback
                                    </button>
                                </div>
                            )}

                            {isNextQuestionReady && (
                                <button
                                    className="px-6 py-3 bg-[#CE4760] text-white rounded-lg hover:bg-[#A53C4E]"
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

        </div>
    );

};

export default StudentVocationalLearning2;
