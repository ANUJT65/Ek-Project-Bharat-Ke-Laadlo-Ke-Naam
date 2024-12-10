import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const RequestChart = () => {
  // Data for the chart
  const data = {
    labels: ["New", "Accepted", "Rejected", "Withdrawn"],
    datasets: [
      {
        label: "Resource Requests",
        data: [30, 50, 10, 10], // Adjust numbers as per your data
        backgroundColor: [
          "#36A2EB", // New - Blue
          "#4BC0C0", // Accepted - Green
          "#FF6384", // Rejected - Red
          "#FFCD56", // Withdrawn - Yellow
        ],
        hoverBackgroundColor: [
          "#36A2EB",
          "#4BC0C0",
          "#FF6384",
          "#FFCD56",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <div className="font-bold mb-2">Resource Request Breakdown</div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default RequestChart;
