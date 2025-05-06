import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FemicideChart = ({ data }) => {
  // Process data to count cases by county 
  const countyCounts = data.reduce((acc, caseItem) => {
    acc[caseItem.county] = (acc[caseItem.county] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(countyCounts),
    datasets: [
      {
        label: "Femicide Cases",
        data: Object.values(countyCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: "rgba(0, 0, 0, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Femicide Cases by County in Kenya",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "#444",
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#ddd",
        bodyFont: {
          size: 14,
        },
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#444",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#444",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "900px",
        height: "500px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default FemicideChart;
