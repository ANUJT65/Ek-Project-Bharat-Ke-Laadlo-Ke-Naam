import React from 'react';
import { Bar } from 'react-chartjs-2'; // Importing Chart.js for bar charts
import PieChartComponent from './PieChartComponent';
import RadarChartComponent from './RadarChartComponent';

const TeacherEngagementAnalyticsHero = () => {
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
      <div className='text-xl font-bold my-1'>Engagement Analytics</div>
      <div className='text-sm text-gray-600 mb-2'>See how your students are performing</div>
      
      <div className='grid grid-cols-3'>
        
        <div className='mx-2 flex flex-col justify-center h-32 col-span-1 bg-white rounded-md  p-5'>
            <div className='text-md'>Overall Class Engagement</div>
            <div className='text-4xl font-bold text-green-600 mt-2'>Good</div>
        </div>

        <div className='bg-[#131B1F] text-white mx-2 flex flex-col justify-center h-32 col-span-1 bg-white rounded-md  p-5'>
            <div className='text-md'>Total Student footfall</div>
            <div className='text-4xl font-bold mt-2'>300</div>
        </div>
        
        <div className='mx-2 flex flex-col justify-center h-32 col-span-1 bg-white rounded-md  p-5'>
            <div className='text-md'>Attention</div>
            <div className='text-4xl font-bold mt-2'>200 hr</div>
        </div>

        <div className='rounded-md col-span-1 flex flex-col p-5 bg-white mx-2 my-4'>
          <div className='font-bold mb-2'>Recent Activity</div>

          <div className='my-2 flex justify-between'>
            <div className='flex flex-col'>
              <div>Physics Test</div>
              <div>December 7, 2024</div>
            </div>
            <div>Completed</div>
          </div>

          <div className='my-2 flex justify-between'>
            <div className='flex flex-col'>
              <div>Physics Test</div>
              <div>December 7, 2024</div>
            </div>
            <div>Completed</div>
          </div>

          <div className='my-2 flex justify-between'>
            <div className='flex flex-col'>
              <div>Physics Test</div>
              <div>December 7, 2024</div>
            </div>
            <div>Completed</div>
          </div>

          <div className='my-2 flex justify-between'>
            <div className='flex flex-col'>
              <div>Physics Test</div>
              <div>December 7, 2024</div>
            </div>
            <div>Completed</div>
          </div>

          <div className='my-2 flex justify-between'>
            <div className='flex flex-col'>
              <div>Physics Test</div>
              <div>December 7, 2024</div>
            </div>
            <div>Completed</div>
          </div>

          <div className='my-2 flex justify-between'>
            <div className='flex flex-col'>
              <div>Physics Test</div>
              <div>December 7, 2024</div>
            </div>
            <div>Completed</div>
          </div>

          <div className='my-2 flex justify-between'>
            <div className='flex flex-col'>
              <div>Physics Test</div>
              <div>December 7, 2024</div>
            </div>
            <div>Completed</div>
          </div>       

        </div>

        <div className='col-span-1 h-84 p-5 bg-white mx-2 my-4 rounded-md'><PieChartComponent /></div>
        <div className='col-span-1 h-84 p-5 bg-white mx-2 my-4 rounded-md'><RadarChartComponent /></div>


      </div>
    </div>
  );
};

export default TeacherEngagementAnalyticsHero;
