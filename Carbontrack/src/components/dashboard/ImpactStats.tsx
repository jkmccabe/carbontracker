import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
} from 'chart.js';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { User } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ImpactStatsProps {
  user: User;
}

export const ImpactStats: React.FC<ImpactStatsProps> = ({ user }) => {
  // Mock data for the chart
  const carbonData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Carbon Saved (kg)',
        data: [12, 19, 3, 5, 25, user.carbonSaved],
        backgroundColor: 'rgba(16, 178, 94, 0.6)',
        borderColor: 'rgba(5, 149, 76, 1)',
        borderWidth: 1
      }
    ]
  };
  
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: false
      }
    }
  };
  
  // Convert carbon to equivalent metrics
  const treesEquivalent = (user.carbonSaved * 0.039).toFixed(1); // ~1 tree absorbs ~25.6 kg of CO2 per year
  const milesNotDriven = (user.carbonSaved * 2.5).toFixed(0); // ~0.4 kg CO2 per mile
  
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Your Climate Impact</h3>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div className="bg-primary-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Carbon Saved</p>
            <p className="text-xl font-bold text-primary-700">{user.carbonSaved} kg</p>
          </div>
          <div className="bg-secondary-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Trees Equivalent</p>
            <p className="text-xl font-bold text-secondary-700">{treesEquivalent}</p>
          </div>
          <div className="bg-accent-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Miles Not Driven</p>
            <p className="text-xl font-bold text-accent-700">{milesNotDriven}</p>
          </div>
        </div>
        
        <div className="h-52">
          <Bar data={carbonData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};