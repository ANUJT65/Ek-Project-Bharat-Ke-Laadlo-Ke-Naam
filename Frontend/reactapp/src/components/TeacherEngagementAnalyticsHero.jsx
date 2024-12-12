import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Importing Chart.js for bar charts
import PieChartComponent from './PieChartComponent';
import RadarChartComponent from './RadarChartComponent';

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
        data: [80, 45, 120], // Replace these values with actual data
        backgroundColor: '#4caf50',
        borderColor: '#4caf50',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='bg-gray-200 flex flex-col p-5 px-7 font-inter max-h-[calc(100vh-64px)] overflow-auto'>
      <div className='grid grid-cols-3'>

        <div className='mx-2 flex flex-col justify-center h-32 col-span-1 bg-[#CE4760] rounded-md p-5'>
          <div className='text-md text-white'>Overall Class Engagement</div>
          <div className='text-4xl font-bold text-white mt-2'>Good</div>
        </div>

        <div className='bg-[#2F4550] text-white mx-2 flex flex-col justify-center h-32 col-span-1 rounded-md  p-5'>
          <div className='text-md'>Total Student footfall</div>
          <div className='text-4xl font-bold mt-2'>300</div>
        </div>

        <div className='mx-2 flex flex-col justify-center h-32 col-span-1 bg-[#CE4760] rounded-md  p-5'>
          <div className='text-md text-white'>Attention</div>
          <div className='text-4xl font-bold mt-2 text-white'>200 hr</div>
        </div>

        <div className='rounded-md col-span-1 flex flex-col p-5 bg-[#2F4550] mx-2 my-4'>
          <div className='font-bold mb-2 text-white'>Recent Activity</div>

          {studentResults && studentResults.students.map((student, index) => (
            <div key={index} className='my-2 flex justify-between text-white'>
              <div className='flex flex-col'>
                <div>{student.student_name}</div>
                <div>{student.student_id}</div>
              </div>
              <div>Correct: {student.total_results.correct_questions}</div>
              <div>Wrong: {student.total_results.wrong_questions}</div>
            </div>
          ))}
        </div>

        <div className='col-span-1 h-84 p-5 mx-2 my-4 rounded-md bg-[#CE4760]'><PieChartComponent /></div>
        <div className='col-span-1 h-84 p-5 mx-2 my-4 rounded-md bg-[#2F4550]'><RadarChartComponent /></div>
      </div>

      <a
        className="mt-4 py-2 px-3 font-bold bg-[#2F4550] text-white rounded-md inline-block hover:bg-white hover:text-black"
        href="https://sync-space-nine.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join Now
      </a>
    </div>
  );
};

export default TeacherEngagementAnalyticsHero;