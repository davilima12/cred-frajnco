// src/components/RankingChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

interface RankingChartProps {
  data: { name: string; production: number }[];
}

const RankingChart: React.FC<RankingChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Produção (R$)',
        data: data.map(item => item.production),

      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ranking de Produção dos Comerciais',
      },
    },
  };

  return (
    <div className='' style={{  height: '500px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RankingChart;
