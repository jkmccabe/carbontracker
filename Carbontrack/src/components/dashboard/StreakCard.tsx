import React from 'react';
import { Flame, Calendar, Trophy } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface StreakCardProps {
  currentStreak: number;
  bestStreak: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  currentStreak,
  bestStreak = 14 // Example best streak
}) => {
  // Generate the last 7 days for the streak calendar
  const getDayLabel = (dayOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    return date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
  };
  
  const days = Array.from({ length: 7 }, (_, i) => ({
    label: getDayLabel(6 - i),
    isActive: i >= 7 - currentStreak
  }));
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Your Activity Streak</h3>
        <div className="flex items-center space-x-1 text-accent-600">
          <Flame size={18} className="text-accent-500" />
          <span className="text-sm font-medium">{currentStreak} day{currentStreak !== 1 ? 's' : ''}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-1 ${
                day.isActive
                  ? 'bg-accent-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                <span className="text-sm font-medium">{day.label}</span>
              </div>
              <div className={`h-1 w-1 rounded-full ${
                day.isActive ? 'bg-accent-500' : 'bg-gray-200'
              }`}></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-700 mb-1">
              <Flame size={16} className="mr-1" />
              <span className="text-sm">Current Streak</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{currentStreak} days</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-700 mb-1">
              <Trophy size={16} className="mr-1" />
              <span className="text-sm">Best Streak</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{bestStreak} days</p>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600 flex items-center">
            <Calendar size={14} className="mr-1" />
            Next check-in: Today
          </p>
        </div>
      </CardContent>
    </Card>
  );
};