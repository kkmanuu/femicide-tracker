import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
        label: 'Femicide Cases',
        data: Object.values(countyCounts),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Femicide Cases by County in Kenya',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default FemicideChart;