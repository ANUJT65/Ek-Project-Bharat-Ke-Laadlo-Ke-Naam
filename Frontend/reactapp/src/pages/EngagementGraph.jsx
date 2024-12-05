import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EngagementGraph = () => {
  // Data for the chart
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // X-axis labels
    datasets: [
      {
        label: 'Engagement Score',
        data: [85, 90, 75, 95, 88], // Y-axis data points
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area fill color
        tension: 0.4, // Curved line
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: '#fff',
        pointRadius: 5,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Engagement Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Engagement Score',
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Engagement Graph</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default EngagementGraph;
