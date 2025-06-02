import { create } from 'zustand';
import { Reward } from '../types';
import { useAuthStore } from './authStore';

interface RewardsState {
  rewards: Reward[];
  isLoading: boolean;
  loadRewards: () => Promise<void>;
  redeemReward: (rewardId: string) => Promise<boolean>;
}

// Mock rewards
const mockRewards: Reward[] = [
  {
    id: 'reward1',
    name: 'Bamboo Toothbrush Set',
    description: 'Set of 4 biodegradable bamboo toothbrushes',
    pointsCost: 500,
    imageUrl: 'https://images.pexels.com/photos/3737599/pexels-photo-3737599.jpeg',
    available: true
  },
  {
    id: 'reward2',
    name: 'Reusable Coffee Cup',
    description: 'Thermal insulated cup made from recycled materials',
    pointsCost: 750,
    imageUrl: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg',
    available: true
  },
  {
    id: 'reward3',
    name: '$10 Donation to Reforestation',
    description: 'Plant 10 trees in areas affected by deforestation',
    pointsCost: 1000,
    imageUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg',
    available: true
  },
  {
    id: 'reward4',
    name: 'Organic Cotton Tote Bag',
    description: 'Durable shopping bag made from organic cotton',
    pointsCost: 600,
    imageUrl: 'https://images.pexels.com/photos/5502227/pexels-photo-5502227.jpeg',
    available: true
  },
  {
    id: 'reward5',
    name: 'Premium Member Status',
    description: 'Upgrade to premium for 1 month: exclusive offers and double points',
    pointsCost: 2000,
    imageUrl: 'https://images.pexels.com/photos/5312071/pexels-photo-5312071.jpeg',
    available: true
  }
];

export const useRewardsStore = create<RewardsState>((set, get) => ({
  rewards: [],
  isLoading: false,
  
  loadRewards: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({
      rewards: mockRewards,
      isLoading: false
    });
  },
  
  redeemReward: async (rewardId: string) => {
    // Get user from auth store
    const user = useAuthStore.getState().user;
    if (!user) return false;
    
    // Find reward
    const reward = get().rewards.find(r => r.id === rewardId);
    if (!reward || !reward.available) return false;
    
    // Check if user has enough points
    if (user.points < reward.pointsCost) {
      return false;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user points (in real app, this would be an API call)
    useAuthStore.setState({
      user: {
        ...user,
        points: user.points - reward.pointsCost
      }
    });
    
    return true;
  }
}));