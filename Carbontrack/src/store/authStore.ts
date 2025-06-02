import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock user data for demo purposes
const mockUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  carbonSaved: 142.5,
  streakDays: 7,
  points: 2350,
  rank: 24,
  badges: [
    {
      id: 'badge1',
      name: 'Early Adopter',
      description: 'Joined in the first month of launch',
      imageUrl: '/badges/early-adopter.png',
      earnedDate: '2025-02-15'
    },
    {
      id: 'badge2',
      name: 'Streak Master',
      description: 'Maintained a 7-day streak',
      imageUrl: '/badges/streak-master.png',
      earnedDate: '2025-03-01'
    }
  ]
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, any login is successful
    set({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });
  },
  
  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, any signup is successful
    const newUser = {
      ...mockUser,
      name,
      email,
      // New users start with no carbon saved and no streak
      carbonSaved: 0,
      streakDays: 0,
      points: 100, // Welcome points
      badges: [
        {
          id: 'badge1',
          name: 'Early Adopter',
          description: 'Joined in the first month of launch',
          imageUrl: '/badges/early-adopter.png',
          earnedDate: new Date().toISOString().split('T')[0]
        }
      ]
    };
    
    set({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    });
  },
  
  logout: () => {
    set({
      user: null,
      isAuthenticated: false
    });
  }
}));