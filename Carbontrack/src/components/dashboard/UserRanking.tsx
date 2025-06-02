import React from 'react';
import { TrendingUp, Award, Users } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { User } from '../../types';

interface UserRankingProps {
  user: User;
}

export const UserRanking: React.FC<UserRankingProps> = ({ user }) => {
  // Mock leaderboard data
  const topUsers = [
    { id: 'user5', name: 'Emma Wilson', points: 3750, rank: 1 },
    { id: 'user2', name: 'John Smith', points: 3420, rank: 2 },
    { id: 'user3', name: 'Sarah Lee', points: 3100, rank: 3 },
    { id: 'user4', name: 'Mike Chen', points: 2800, rank: 4 }
  ];
  
  // Add current user if not in top 4
  const leaderboard = [...topUsers];
  if (!topUsers.some(u => u.id === user.id)) {
    leaderboard.push({
      id: user.id,
      name: user.name,
      points: user.points,
      rank: user.rank
    });
    
    // Sort by rank
    leaderboard.sort((a, b) => a.rank - b.rank);
  }
  
  return (
    <Card className="h-full">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Climate Leaders</h3>
          <div className="flex items-center space-x-1 text-primary-600">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">Your Rank: #{user.rank}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="divide-y divide-gray-100">
          {leaderboard.map((person, index) => (
            <li key={person.id} className={`py-3 flex items-center ${person.id === user.id ? 'bg-primary-50 -mx-6 px-6' : ''}`}>
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                index < 3 
                  ? 'bg-accent-100 text-accent-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {index === 0 ? (
                  <Award size={16} className="text-yellow-500" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {person.name} {person.id === user.id && <span className="text-primary-600">(You)</span>}
                </p>
              </div>
              
              <div className="text-sm font-semibold text-gray-700">
                {person.points.toLocaleString()} pts
              </div>
            </li>
          ))}
        </ul>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Users size={16} className="mr-1" />
            <span>2,432 active users</span>
          </div>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            View Full Leaderboard
          </button>
        </div>
      </CardContent>
    </Card>
  );
};