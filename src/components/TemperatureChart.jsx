import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function TemperatureChart({ chartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#f3f4f6'
        }
      },
      title: {
        display: true,
        text: 'Temperature History',
        color: '#f3f4f6'
      }
    },
    scales: {
      y: {
        grid: {
          color: '#374151'
        },
        ticks: {
          color: '#f3f4f6'
        }
      },
      x: {
        grid: {
          color: '#374151'
        },
        ticks: {
          color: '#f3f4f6'
        }
      }
    }
  };

  return <Line options={options} data={chartData} />;
}