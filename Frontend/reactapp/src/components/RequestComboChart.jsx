import React from "react";
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";
import { Chart } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

const RequestComboChart = () => {
  // Data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Months
    datasets: [
      {
        type: "bar",
        label: "New Requests",
        data: [50, 60, 55, 70, 65, 75, 80],
        backgroundColor: "#36A2EB", // Blue for bars
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Accepted Requests",
        data: [40, 50, 45, 60, 55, 65, 70],
        backgroundColor: "#4BC0C0", // Green for bars
        borderColor: "#4BC0C0",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Rejected Requests",
        data: [10, 15, 12, 8, 10, 12, 14],
        backgroundColor: "#FF6384", // Red for bars
        borderColor: "#FF6384",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Withdrawn Requests",
        data: [5, 7, 6, 4, 5, 6, 8],
        backgroundColor: "#FFCD56", // Yellow for bars
        borderColor: "#FFCD56",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Total Requests Trend",
        data: [105, 132, 118, 142, 135, 158, 172], // Example total values
        borderColor: "#000000", // Black for the line
        backgroundColor: "rgba(0,0,0,0.1)",
        fill: false,
        tension: 0.3,
        borderWidth: 2,
        pointBackgroundColor: "#000000",
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true, // Stacks the bars
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Requests",
        },
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h3>Resource Requests Over Time</h3>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default RequestComboChart;
