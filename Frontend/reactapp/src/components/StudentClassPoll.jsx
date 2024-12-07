import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentClassPoll = ({ videoId }) => {
  const [mcqsEasy, setMcqsEasy] = useState([]);
  const [mcqsMedium, setMcqsMedium] = useState([]);
  const [mcqsHard, setMcqsHard] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('easy');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isDelay, setIsDelay] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null); // To track the answer status
  const [countdown, setCountdown] = useState(60); // Countdown timer state
  const optionsStyle = 'text-[#CE4760] bg-white hover:bg-[#CE4760] hover:text-white border border-[#CE4760] p-1 px-2 rounded-md my-1 text-left';

  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const responseEasy = await axios.get(`http://localhost:5000/dy_db/get_mcqs_easy/${videoId}`);
        setMcqsEasy(responseEasy.data.mcqs_easy);

        const responseMedium = await axios.get(`http://localhost:5000/dy_db/get_mcqs_medium/${videoId}`);
        setMcqsMedium(responseMedium.data.mcqs_medium);

        const responseHard = await axios.get(`http://localhost:5000/dy_db/get_mcqs_hard/${videoId}`);
        setMcqsHard(responseHard.data.mcqs_hard);

        if (responseEasy.data.mcqs_easy.length > 0) {
          setCurrentQuestion(responseEasy.data.mcqs_easy[0]);
        }
      } catch (error) {
        console.error('Error fetching MCQs:', error);
      }
    };

    fetchMcqs();
  }, [videoId]);

  useEffect(() => {
    if (questionsAnswered > 0 && questionsAnswered % 3 === 0) {
      setIsDelay(true);
      setCountdown(60); // Reset countdown timer to 60 seconds

      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            setIsDelay(false);
            showNextQuestion(); // Show the next question after the delay
          }
          return prevCountdown - 1;
        });
      }, 1000); // Update countdown every second

      return () => clearInterval(timer);
    }
  }, [questionsAnswered]);

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
    if (!isDelay) {
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

      setQuestionsAnswered(questionsAnswered + 1);
      showNextQuestion(); // Show the next question immediately
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#F4F4F8] h-full flex p-3 flex-col border-l-2 border-[#D9D9D9]">
      <div className='text-xl font-bold'>Poll</div>
      {isDelay ? (
        <div className='text-red-500'>
          Please wait for {countdown} seconds before the next question...
          <div className="countdown-container">
            <div className="countdown-bar" style={{ animationDuration: '60s' }}></div>
          </div>
        </div>
      ) : (
        <>
          <div className=''>{`Q: ${currentQuestion.question}`}</div>
          {currentQuestion.options.map((option, index) => (
            <button key={index} className={`${optionsStyle}`} onClick={() => handleAnswer(option)}>
              {`${String.fromCharCode(65 + index)}: ${option}`}
            </button>
          ))}
          <div className='mt-4'>
            <div className='text-lg font-bold'>Current Difficulty: {currentLevel}</div>
            {answerStatus === 'incorrect' && (
              <div className='text-sm text-red-600'>Correct Answer: {currentQuestion.answer}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentClassPoll;