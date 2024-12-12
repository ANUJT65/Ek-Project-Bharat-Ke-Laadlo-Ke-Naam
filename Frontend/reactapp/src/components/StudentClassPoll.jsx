import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/userContext';
import { useParams } from 'react-router-dom';

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
  const [countdown, setCountdown] = useState(60);
  const [questionSerial, setQuestionSerial] = useState(1);
  
  const optionsStyle = 'text-[#CE4760] bg-white hover:bg-[#CE4760] hover:text-white border border-[#CE4760] p-1 px-2 rounded-md my-1 text-left';

  console.log(user);
  useEffect(() => {
    const initializeQuiz = async () => {
      const email = user.email;
      const storedEmail = localStorage.getItem('userEmail');

      if (storedEmail !== email) {
        localStorage.setItem('userEmail', email);
      }

      try {
        await axios.post('https://backendfianlsih.azurewebsites.net/qa/initialize_test', {
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
        console.log(`https://backendfianlsih.azurewebsites.net/dy_db/get_mcqs_easy/${id}`); 
        const responseEasy = await axios.get(`https://backendfianlsih.azurewebsites.net/dy_db/get_mcqs_easy/${id}`);
        setMcqsEasy(responseEasy.data.mcqs_easy);

        const responseMedium = await axios.get(`https://backendfianlsih.azurewebsites.net/dy_db/get_mcqs_medium/${id}`);
        setMcqsMedium(responseMedium.data.mcqs_medium);

        const responseHard = await axios.get(`https://backendfianlsih.azurewebsites.net/dy_db/get_mcqs_hard/${id}`);
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
      setCountdown(60);

      const sendTestResults = async () => {
        const email = localStorage.getItem('userEmail');
        try {
          await axios.post('https://backendfianlsih.azurewebsites.net/qa/add_test_result', {
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

  const handleAnswer = async (selectedOption) => {
    if (!isDelay) {
      const isCorrect = selectedOption === currentQuestion.answer;

      try {
        await axios.post('https://backendfianlsih.azurewebsites.net/qa/update_question_result', {
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

      setQuestionsAnswered(questionsAnswered + 1);
      showNextQuestion();
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
            <div className='text-lg font-bold'>Score: {score}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentClassPoll;