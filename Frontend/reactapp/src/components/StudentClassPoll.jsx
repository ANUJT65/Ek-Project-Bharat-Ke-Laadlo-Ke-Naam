import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/userContext';
import { useParams } from 'react-router-dom';
import { FaCheck, FaTimes, FaBug } from 'react-icons/fa';

const StudentClassPoll = () => {
  const {id} = useParams();
  const { user } = useAuth();
  const [mcqsEasy, setMcqsEasy] = useState([]);
  const [mcqsMedium, setMcqsMedium] = useState([]);
  const [mcqsHard, setMcqsHard] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('easy');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState(0);
  const [isDelay, setIsDelay] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [countdown, setCountdown] = useState(30);
  const [questionSerial, setQuestionSerial] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  
  const optionsStyle = 'text-[#CE4760] bg-white hover:bg-[#CE4760] hover:text-white border border-[#CE4760] p-1 px-2 rounded-md my-1 text-left w-full';

  useEffect(() => {
    const initializeQuiz = async () => {
      const email = user.email;
      const storedEmail = localStorage.getItem('userEmail');

      if (storedEmail !== email) {
        localStorage.setItem('userEmail', email);
      }

      try {
        await axios.post('https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/qa/initialize_test', {
          email: email,
          video_id: id,
        });
      } catch (error) {
        console.error('Error initializing quiz:', error);
      }
    };

    initializeQuiz();
  }, [user, id]);

  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const responseEasy = await axios.get(`https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/dy_db/get_mcqs_easy/${id}`);
        setMcqsEasy(responseEasy.data.mcqs_easy);

        const responseMedium = await axios.get(`https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/dy_db/get_mcqs_medium/${id}`);
        setMcqsMedium(responseMedium.data.mcqs_medium);

        const responseHard = await axios.get(`https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/dy_db/get_mcqs_hard/${id}`);
        setMcqsHard(responseHard.data.mcqs_hard);

        if (responseEasy.data.mcqs_easy.length > 0) {
          setCurrentQuestion(responseEasy.data.mcqs_easy[0]);
        }
      } catch (error) {
        console.error('Error fetching MCQs:', error);
      }
    };

    fetchMcqs();
  }, [id]);

  useEffect(() => {
    if (questionsAnswered > 0 && questionsAnswered % 3 === 0) {
      setIsDelay(true);
      setCountdown(30);
      setDebugInfo(null);

      const sendTestResults = async () => {
        const email = localStorage.getItem('userEmail');
        try {
          await axios.post('https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/qa/add_test_result', {
            email: email,
            video_id: id,
            correct_questions: correctQuestions,
            wrong_questions: wrongQuestions,
          });
        } catch (error) {
          console.error('Error sending test results:', error);
        }
      };

      sendTestResults();

      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            setIsDelay(false);
            showNextQuestion();
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [questionsAnswered]);

  const showNextQuestion = () => {
    setSelectedOption(null);
    setDebugInfo(null);
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
        nextQuestion = null;
      }
    }

    setCurrentQuestion(nextQuestion);
    setAnswerStatus(null);
  };

  // Function to determine if an option is correct based on its index
  const getCorrectOptionIndex = () => {
    if (!currentQuestion || !currentQuestion.answer) return -1;
    
    // If the answer is a letter (A, B, C, D), convert to index (0, 1, 2, 3)
    const answer = currentQuestion.answer.trim();
    if (answer === 'A' || answer === 'a') return 0;
    if (answer === 'B' || answer === 'b') return 1;
    if (answer === 'C' || answer === 'c') return 2;
    if (answer === 'D' || answer === 'd') return 3;
    
    // If not a letter, try to match the option text directly
    return currentQuestion.options.findIndex(opt => 
      String(opt).trim() === String(answer).trim()
    );
  };

  const handleAnswer = async (selectedOption, selectedIndex) => {
    if (!isDelay && answerStatus === null) {
      setSelectedOption(selectedOption);
      
      const correctIndex = getCorrectOptionIndex();
      const isCorrect = selectedIndex === correctIndex;
      
      // Enhanced debug logs
      console.log('Selected option:', selectedOption);
      console.log('Selected index:', selectedIndex);
      console.log('Answer in database:', currentQuestion.answer);
      console.log('Calculated correct index:', correctIndex);
      console.log('Is correct?', isCorrect);
      
      // Store debug info for display
      setDebugInfo({
        selected: selectedOption,
        selectedIndex,
        correct: currentQuestion.answer,
        correctIndex,
        calculatedCorrectOption: correctIndex >= 0 ? currentQuestion.options[correctIndex] : 'Unknown',
        isCorrect
      });

      try {
        await axios.post('https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/qa/update_question_result', {
          email: user.email,
          video_id: id,
          question_serial: questionSerial,
          is_correct: isCorrect
        });
      } catch (error) {
        console.error('Error updating question result:', error);
      }

      setQuestionSerial(questionSerial + 1);

      if (isCorrect) {
        setScore(score + 1);
        setCorrectQuestions(correctQuestions + 1);
        setAnswerStatus('correct');
      } else {
        setWrongQuestions(wrongQuestions + 1);
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

      // Add a short delay before moving to the next question to show feedback
      setTimeout(() => {
        setQuestionsAnswered(questionsAnswered + 1);
        showNextQuestion();
      }, 3000); 
    }
  };

  const getOptionStyle = (option, index) => {
    const correctIndex = getCorrectOptionIndex();
    
    if (answerStatus === null) {
      return optionsStyle;
    } else if (index === correctIndex) {
      return `${optionsStyle} bg-green-100 text-green-700 border-green-500`;
    } else if (option === selectedOption && index !== correctIndex) {
      return `${optionsStyle} bg-red-100 text-red-700 border-red-500`;
    } else {
      return optionsStyle;
    }
  };

  if (!currentQuestion) {
    return (
      <div className="bg-[#F4F4F8] h-full flex p-6 flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CE4760]"></div>
        <div className="mt-3 text-lg">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F4F8] h-full flex p-5 flex-col border-l-2 border-[#D9D9D9]">
      <div className='text-2xl font-bold mb-4'>Quiz Questions</div>
      {isDelay ? (
        <div className='p-6 bg-white rounded-lg shadow-md'>
          <div className='text-xl font-semibold mb-3'>Progress so far</div>
          <div className='mb-2'>
            <span className='font-medium text-green-600'>{correctQuestions}</span> correct answers
          </div>
          <div className='mb-2'>
            <span className='font-medium text-red-600'>{wrongQuestions}</span> incorrect answers
          </div>
          <div className='text-gray-600 mt-4'>
            Please wait for <span className='font-bold'>{countdown}</span> seconds before the next question
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#CE4760] transition-all duration-1000 ease-linear" 
              style={{ width: `${(countdown / 30) * 100}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className='p-5 bg-white rounded-lg shadow-md'>
          <div className='mb-2 text-sm text-gray-500'>Difficulty: 
            <span className={`ml-2 px-2 py-1 rounded text-xs ${
              currentLevel === 'easy' ? 'bg-green-100 text-green-700' : 
              currentLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
              'bg-red-100 text-red-700'
            }`}>
              {currentLevel.toUpperCase()}
            </span>
          </div>

          <div className='text-lg font-medium mb-4'>{`Q: ${currentQuestion.question}`}</div>
          
          <div className='space-y-2'>
            {currentQuestion.options.map((option, index) => (
              <button 
                key={index} 
                className={getOptionStyle(option, index)}
                onClick={() => handleAnswer(option, index)}
                disabled={answerStatus !== null}
              >
                <div className="flex items-center">
                  <span className="mr-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-700">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {answerStatus !== null && index === getCorrectOptionIndex() && (
                    <FaCheck className="ml-auto text-green-500" />
                  )}
                  {answerStatus !== null && option === selectedOption && index !== getCorrectOptionIndex() && (
                    <FaTimes className="ml-auto text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className='mt-4 pt-3 border-t border-gray-200'>
            {answerStatus === 'correct' && (
              <div className='flex items-center text-green-600'>
                <FaCheck className="mr-2" /> Correct answer!
              </div>
            )}
            {answerStatus === 'incorrect' && (
              <div className='text-red-600'>
                <div className='flex items-center'>
                  <FaTimes className="mr-2" /> Incorrect answer
                </div>
                <div className='text-sm mt-1'>
                  Correct answer: {getCorrectOptionIndex() >= 0 ? 
                    `${String.fromCharCode(65 + getCorrectOptionIndex())}: ${currentQuestion.options[getCorrectOptionIndex()]}` : 
                    currentQuestion.answer
                  }
                </div>
              </div>
            )}
            <div className='text-lg font-bold mt-2'>Score: {score}</div>

        

          </div>
        </div>
      )}
    </div>
  );
};

export default StudentClassPoll;