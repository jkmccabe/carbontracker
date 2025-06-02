import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { RewardCard } from '../components/rewards/RewardCard';
import { useAuthStore } from '../store/authStore';
import { useRewardsStore } from '../store/rewardsStore';
import { Reward } from '../types';
import { Gift, TrendingUp, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { motion } from 'framer-motion';

export const RewardsPage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { rewards, loadRewards, redeemReward, isLoading } = useRewardsStore();
  const [redeemedReward, setRedeemedReward] = useState<Reward | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    loadRewards();
  }, [loadRewards]);
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }
  
  const handleRedeemReward = async (reward: Reward) => {
    const success = await redeemReward(reward.id);
    if (success) {
      setRedeemedReward(reward);
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">Rewards Marketplace</h1>
            <p className="text-gray-600">
              Redeem your earned points for eco-friendly products and experiences
            </p>
          </div>
          <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm">
            <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
            <span className="font-medium text-gray-900">{user.points} points available</span>
          </div>
        </div>
        
        {/* Success message */}
        {showSuccess && redeemedReward && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 bg-success-50 border border-success-200 rounded-lg p-4 flex items-center"
          >
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-success-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-success-800">
                You've successfully redeemed {redeemedReward.name} for {redeemedReward.pointsCost} points!
              </p>
            </div>
            <button 
              className="ml-auto text-success-500 hover:text-success-600"
              onClick={() => setShowSuccess(false)}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        )}
        
        {/* Information card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="flex flex-col md:flex-row items-center p-6">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600 mb-4 md:mb-0 md:mr-6">
                <Gift className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">How to Earn Points</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium text-gray-900">Scan Products</p>
                    <p className="text-sm text-gray-600">10 points per scan</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium text-gray-900">Daily Check-in</p>
                    <p className="text-sm text-gray-600">25 points per day</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium text-gray-900">Weekly Challenges</p>
                    <p className="text-sm text-gray-600">100-500 bonus points</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Rewards</h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {isLoading ? (
            // Loading placeholders
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-lg overflow-hidden">
                <div className="bg-gray-200 h-40 w-full"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              </div>
            ))
          ) : (
            rewards.map((reward) => (
              <motion.div key={reward.id} variants={item}>
                <RewardCard
                  reward={reward}
                  userPoints={user.points}
                  onRedeem={() => handleRedeemReward(reward)}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </Layout>
  );
};