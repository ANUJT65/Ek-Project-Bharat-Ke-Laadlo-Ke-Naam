import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = () => {
  // Sample data for the pie chart
  const data = {
    labels: ['Active Students', 'Inactive Students', 'At-Risk Students'],
    datasets: [
      {
        label: 'Student Engagement',
        data: [65, 25, 10], // Replace these with actual values
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        hoverBackgroundColor: ['#66bb6a', '#e57373', '#ffb74d'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className='flex flex-col rounded-md '>
        <div className='mb-4 font-bold'>Student breakdown by engagement</div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;
