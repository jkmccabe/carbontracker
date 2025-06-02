export interface User {
  id: string;
  name: string;
  email: string;
  carbonSaved: number;
  streakDays: number;
  points: number;
  rank: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedDate?: string;
}

export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  carbonFootprint: number;
  imageUrl: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
  available: boolean;
}

export interface OffsetProject {
  id: string;
  name: string;
  description: string;
  location: string;
  impact: string;
  pricePerTon: number;
  imageUrl: string;
}

export interface Notification {
  id: string;
  type: 'challenge' | 'streak' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}