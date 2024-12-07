import React from 'react';
import { Bar } from 'react-chartjs-2'; // Importing Chart.js for bar charts

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
      
      {/* Grid Layout using Tailwind CSS */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
        <div className='bg-white p-4 rounded shadow-md'>
          <Bar data={data} options={options} />
        </div>
        {/* Add more visualizations or metrics here */}
      </div>
    </div>
  );
};

export default TeacherEngagementAnalyticsHero;
