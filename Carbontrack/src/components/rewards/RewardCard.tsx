import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Reward } from '../../types';
import { motion } from 'framer-motion';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: () => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  userPoints,
  onRedeem
}) => {
  const canRedeem = userPoints >= reward.pointsCost && reward.available;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col">
        <div className="h-40 overflow-hidden">
          <img
            src={reward.imageUrl}
            alt={reward.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <CardContent className="flex-grow py-4">
          <h3 className="text-lg font-medium text-gray-900">{reward.name}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{reward.description}</p>
          <div className="mt-2 flex items-center text-primary-700">
            <span className="text-lg font-bold">{reward.pointsCost}</span>
            <span className="text-sm ml-1">points</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4">
          <Button
            onClick={onRedeem}
            disabled={!canRedeem}
            fullWidth
            variant={canRedeem ? 'primary' : 'outline'}
          >
            {canRedeem ? 'Redeem Reward' : `Need ${reward.pointsCost - userPoints} more points`}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};