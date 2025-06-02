import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { QrCode, Gift, Leaf, AlertTriangle } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { ImpactStats } from '../components/dashboard/ImpactStats';
import { StreakCard } from '../components/dashboard/StreakCard';
import { UserRanking } from '../components/dashboard/UserRanking';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [challengeAccepted, setChallengeAccepted] = useState(false);
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }
  
  // Dashboard action cards
  const actionCards = [
    {
      title: 'Scan Product',
      description: 'Scan a product\'s QR code to view its carbon footprint',
      icon: <QrCode size={24} />,
      color: 'bg-secondary-600',
      link: '/scan'
    },
    {
      title: 'Offset Carbon',
      description: 'Invest in climate projects to offset your carbon footprint',
      icon: <Leaf size={24} />,
      color: 'bg-primary-600',
      link: '/offset'
    },
    {
      title: 'Redeem Rewards',
      description: 'Use your points to claim eco-friendly rewards',
      icon: <Gift size={24} />,
      color: 'bg-accent-600',
      link: '/rewards'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
            <p className="text-gray-600">Your climate journey continues</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Share Progress
            </Button>
            <Button size="sm">
              Scan Now
            </Button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-primary-100">
                    <Leaf className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total Carbon Saved</p>
                    <p className="text-2xl font-bold text-gray-900">{user.carbonSaved} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-secondary-100">
                    <QrCode className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Products Scanned</p>
                    <p className="text-2xl font-bold text-gray-900">17</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-accent-100">
                    <Gift className="h-6 w-6 text-accent-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Available Points</p>
                    <p className="text-2xl font-bold text-gray-900">{user.points}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-purple-100">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Badges Earned</p>
                    <p className="text-2xl font-bold text-gray-900">{user.badges.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Weekly Challenge Card */}
        {!challengeAccepted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-accent-500 to-accent-700 text-white">
              <CardContent className="py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="p-3 rounded-full bg-white bg-opacity-20">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">Weekly Challenge</h3>
                      <p className="mt-1">Offset 5kg of carbon this week to earn 500 bonus points</p>
                    </div>
                  </div>
                  <Button 
                    className="bg-white text-accent-700 hover:bg-gray-100"
                    onClick={() => setChallengeAccepted(true)}
                  >
                    Accept Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {actionCards.map((card, index) => (
            <motion.div 
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className={`p-4 rounded-full ${card.color} text-white inline-flex mb-4`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <Button 
                    variant="outline" 
                    fullWidth
                  >
                    {card.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Two-column layout for stats and streak */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Impact Stats (2 columns) */}
          <div className="md:col-span-2">
            <ImpactStats user={user} />
          </div>
          
          {/* Streak Card */}
          <div>
            <StreakCard currentStreak={user.streakDays} bestStreak={14} />
          </div>
          
          {/* User Ranking */}
          <div className="md:col-span-3">
            <UserRanking user={user} />
          </div>
        </div>
      </div>
    </Layout>
  );
};