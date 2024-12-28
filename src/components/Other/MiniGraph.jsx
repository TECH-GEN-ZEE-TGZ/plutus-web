import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

const MiniGraph = ({ data }) => {
  const determineColor = (data) => {
    const start = data[0];
    const end = data[data.length - 1];
    if (end > start) return "#32cd32"; // Increasing
    if (end < start) return "red"; // Decreasing
    return "orange"; // Volatile
  };

  const chartData = {
    labels: data.map((_, index) => index + 1), // Use indexes as labels for simplicity
    datasets: [
      {
        label: "Price Trend",
        data: data, // Replace with the coin's sparkline price data
        borderColor: determineColor(data), // Function to calculate trend and return color
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.4, // Makes the line slightly curved
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false }, // Hide X-axis
      y: { display: false }, // Hide Y-axis
    },
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: { enabled: false }, // Disable tooltips for simplicity
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MiniGraph;
