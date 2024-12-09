import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EngagementGraph = () => {
  const { video } = useParams();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backendfianlsih.azurewebsites.net/qa/get_all_test_details');
        processData(response.data);
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };
    fetchData();
  }, [video]);

  const processData = (rawData) => {
    const colors = [
      { border: 'rgba(75, 192, 192, 1)', background: 'rgba(75, 192, 192, 0.2)' },
      { border: 'rgba(255, 99, 132, 1)', background: 'rgba(255, 99, 132, 0.2)' },
      { border: 'rgba(54, 162, 235, 1)', background: 'rgba(54, 162, 235, 0.2)' }
    ];

    const datasets = rawData.students.map((student, index) => {
      const videoData = student.test_detail_score[video]?.questions || {};
      let score = 0;
      const dataPoints = [{x: 0, y: 0}];
      
      const questionKeys = Object.keys(videoData).sort((a, b) => parseInt(a) - parseInt(b));
      
      questionKeys.forEach((qNum) => {
        const isCorrect = videoData[qNum] === "1";
        score = Math.max(0, Math.min(100, score + (isCorrect ? 10 : -10)));
        const timePoint = Math.ceil((parseInt(qNum) / 3)) * 2;
        dataPoints.push({ x: timePoint, y: score });
      });

      return {
        label: student.student_name,
        data: dataPoints,
        borderColor: colors[index % colors.length].border,
        backgroundColor: colors[index % colors.length].background,
        tension: 0.4,
        pointRadius: 5,
        pointBorderColor: colors[index % colors.length].border,
        pointBackgroundColor: '#fff',
      };
    });

    const maxTime = Math.max(...datasets.flatMap(d => d.data.map(point => point.x)));
    const timeLabels = Array.from({ length: maxTime + 1 }, (_, i) => `${i} min`);

    setChartData({
      labels: timeLabels,
      datasets: datasets
    });
  };

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
          text: 'Time (minutes)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Engagement Score',
        },
        min: 0,
        max: 100,
      },
    },
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Engagement Graph</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default EngagementGraph;