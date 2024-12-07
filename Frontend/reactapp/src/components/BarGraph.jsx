import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';  // Import the auto version to load all charts

const BarGraph = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'April', 'May', 'June'], // X-axis labels
    datasets: [
      {
        label: 'Sales', // Label for the dataset
        data: [65, 59, 80, 81, 56, 47, 98, 76], // Data for each bar
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='h-64 w-full'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
