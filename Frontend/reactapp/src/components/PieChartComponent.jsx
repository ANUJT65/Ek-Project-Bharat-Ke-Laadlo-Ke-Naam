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
        borderWidth: 1
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: {
            size: 10 
          }
        },
      },
      title: {
        display: true,
        text: 'Student Engagement Breakdown',
        color: 'white',
        font: {
          size: 12
        }
      }
    },
  };

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='relative h-84 md:h-48 lg:h-84'>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChartComponent;