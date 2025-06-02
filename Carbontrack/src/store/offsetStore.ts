import { create } from 'zustand';
import { OffsetProject } from '../types';
import { useAuthStore } from './authStore';

interface OffsetState {
  projects: OffsetProject[];
  selectedProject: OffsetProject | null;
  isLoading: boolean;
  loadProjects: () => Promise<void>;
  selectProject: (projectId: string) => void;
  offsetCarbon: (amount: number, usePoints: boolean) => Promise<boolean>;
}

// Mock offset projects
const mockProjects: OffsetProject[] = [
  {
    id: 'proj1',
    name: 'Amazon Rainforest Preservation',
    description: 'Protecting native forests in the Amazon basin to sequester carbon and preserve biodiversity.',
    location: 'Brazil',
    impact: 'Preserves 500 hectares of rainforest, protecting 300+ species',
    pricePerTon: 15,
    imageUrl: 'https://images.pexels.com/photos/935781/pexels-photo-935781.jpeg'
  },
  {
    id: 'proj2',
    name: 'Solar Energy Development',
    description: 'Installing solar panels in rural communities to replace diesel generators.',
    location: 'Kenya',
    impact: 'Provides clean energy to 5,000+ homes, reducing emissions by 8,000 tons/year',
    pricePerTon: 12,
    imageUrl: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg'
  },
  {
    id: 'proj3',
    name: 'Wind Farm Construction',
    description: 'Building wind turbines to generate renewable electricity in high-wind coastal areas.',
    location: 'Scotland',
    impact: 'Generates 50MW of clean energy, offsetting 100,000 tons of CO2 annually',
    pricePerTon: 18,
    imageUrl: 'https://images.pexels.com/photos/1098335/pexels-photo-1098335.jpeg'
  }
];

export const useOffsetStore = create<OffsetState>((set, get) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,
  
  loadProjects: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({
      projects: mockProjects,
      isLoading: false
    });
  },
  
  selectProject: (projectId: string) => {
    const project = get().projects.find(p => p.id === projectId);
    set({ selectedProject: project || null });
  },
  
  offsetCarbon: async (amount: number, usePoints: boolean) => {
    const { selectedProject } = get();
    if (!selectedProject) return false;
    
    // Get user from auth store
    const user = useAuthStore.getState().user;
    if (!user) return false;
    
    // Convert points to carbon tons (100 points = 1 ton)
    const pointsRequired = usePoints ? amount * 100 : 0;
    
    // Check if user has enough points
    if (usePoints && user.points < pointsRequired) {
      return false;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user state (in real app, this would be an API call)
    if (usePoints) {
      useAuthStore.setState({
        user: {
          ...user,
          carbonSaved: user.carbonSaved + amount,
          points: user.points - pointsRequired
        }
      });
    } else {
      // Using $CARB token (not implemented in demo)
      useAuthStore.setState({
        user: {
          ...user,
          carbonSaved: user.carbonSaved + amount
        }
      });
    }
    
    return true;
  }
}));