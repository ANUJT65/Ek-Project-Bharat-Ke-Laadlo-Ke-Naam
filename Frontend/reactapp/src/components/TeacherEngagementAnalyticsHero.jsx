import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import PieChartComponent from './PieChartComponent';
import RadarChartComponent from './RadarChartComponent';
import GoogleTranslate from './GoogleTranslate';

const TeacherEngagementAnalyticsHero = () => {
  const [studentResults, setStudentResults] = useState(null);

  useEffect(() => {
    const fetchStudentResults = async () => {
      try {
        const response = await axios.get('https://backendfianlsih.azurewebsites.net/qa/get_all_students_results');
        setStudentResults(response.data);
      } catch (error) {
        console.error('Error fetching student results:', error);
      }
    };

    fetchStudentResults();
  }, []);

  // Sample data for demonstration
  const data = {
    labels: ['Attendance', 'Quiz Attempts', 'Average Time Spent'],
    datasets: [
      {
        label: 'Engagement Metrics',
        data: [80, 45, 120],
        backgroundColor: '#4caf50',
        borderColor: '#4caf50',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='bg-gray-200 flex flex-col p-4 md:p-5 lg:p-7 font-inter min-h-screen overflow-hidden'>
      <a
        className="mt-4 py-2 px-3 mb-4 font-bold bg-[#CE4760] text-white rounded-md inline-block hover:bg-[#2F4550] hover:text-white self-start"
        href="https://sync-space-nine.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join Now
      </a>

      <GoogleTranslate />
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Overview Cards */}
        <div className='flex flex-col justify-center h-32 bg-[#CE4760] rounded-md p-5 text-white'>
          <div className='text-sm md:text-md'>Overall Class Engagement</div>
          <div className='text-2xl md:text-4xl font-bold mt-2'>Good</div>
        </div>

        <div className='bg-[#2F4550] text-white flex flex-col justify-center h-32 rounded-md p-5'>
          <div className='text-sm md:text-md'>Total Student Footfall</div>
          <div className='text-2xl md:text-4xl font-bold mt-2'>300</div>
        </div>

        <div className='bg-[#CE4760] text-white flex flex-col justify-center h-32 rounded-md p-5'>
          <div className='text-sm md:text-md'>Attention</div>
          <div className='text-2xl md:text-4xl font-bold mt-2'>200 hr</div>
        </div>

        <div className='rounded-md flex flex-col p-5 bg-[#2F4550] text-white'>
          <div className='font-bold mb-2'>Recent Activity</div>

          {studentResults && studentResults.students.map((student, index) => (
            <div 
              key={index} 
              className='my-2 flex flex-col md:flex-row text-sm justify-between items-center space-y-2 md:space-y-0'
            >
              <div className='flex flex-col text-center md:text-left'>
                <div className='font-semibold'>{student.student_name}</div>
                <div className='text-sm opacity-75'>{student.student_id}</div>
              </div>
              <div className='flex space-x-4'>
                <div>Correct: {student.total_results.correct_questions}</div>
                <div>Wrong: {student.total_results.wrong_questions}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className='h-70 md:h-120 p-5 rounded-md bg-[#CE4760]'>
          <PieChartComponent />
        </div>
        
        <div className='h-70 md:h-120 p-5 rounded-md bg-[#2F4550]'>
          <RadarChartComponent />
        </div>
      </div>
    </div>
  );
};

export default TeacherEngagementAnalyticsHero;
