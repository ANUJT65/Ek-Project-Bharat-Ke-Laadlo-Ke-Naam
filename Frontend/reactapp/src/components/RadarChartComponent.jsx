import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChartComponent = () => {
  // Data for radar chart
  const data = {
    labels: ['Math', 'Science', 'English', 'History', 'Art'], // Subjects
    datasets: [
      {
        label: 'Attendance (%)',
        data: [85, 90, 80, 75, 88], // Replace with actual attendance data
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        borderColor: 'rgba(66, 165, 245, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(66, 165, 245, 1)',
      },
      {
        label: 'Quiz Scores (%)',
        data: [78, 92, 85, 70, 80], // Replace with actual quiz score data
        backgroundColor: 'rgba(102, 187, 106, 0.2)',
        borderColor: 'rgba(102, 187, 106, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(102, 187, 106, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 10 // Smaller font size for compact view
          }
        },
      },
      title: {
        display: true,
        text: 'Engagement Across Subjects',
        color: 'white',
        font: {
          size: 12
        }
      }
    },
    scales: {
      r: {
        ticks: { 
          beginAtZero: true, 
          color: 'white',
          font: {
            size: 9 // Smaller tick label size
          }
        },
        angleLines: { 
          color: 'white' // Changed from gray to white
        },
        grid: {
          color: 'white' // Grid lines now white
        },
        pointLabels: { 
          color: 'white',
          font: {
            size: 10 // Smaller point label size
          }
        },
      },
    },
  };

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='relative h-40 md:h-48 lg:h-56'>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default RadarChartComponent;