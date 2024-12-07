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
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      r: {
        ticks: { beginAtZero: true },
        angleLines: { color: '#ccc' }, // Styling radial lines
      },
    },
  };

  return (
    <div className='col-span-1 h-84'>
      <h3 className='font-bold mb-2'>Engagement Across Subjects</h3>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChartComponent;
