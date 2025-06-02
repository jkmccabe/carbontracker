import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  loadNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'streak',
    title: 'Keep Your Streak Going!',
    message: 'You\'re on a 7-day streak. Log in tomorrow to keep it going!',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: 'notif2',
    type: 'challenge',
    title: 'New Weekly Challenge',
    message: 'Scan 5 products this week to earn 250 bonus points',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 'notif3',
    type: 'system',
    title: 'New Offset Project Available',
    message: 'Check out our new mangrove restoration project in Indonesia',
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  
  loadNotifications: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const unreadCount = mockNotifications.filter(n => !n.read).length;
    
    set({
      notifications: mockNotifications,
      unreadCount,
      isLoading: false
    });
  },
  
  markAsRead: (notificationId: string) => {
    const { notifications } = get();
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    
    const unreadCount = updatedNotifications.filter(n => !n.read).length;
    
    set({
      notifications: updatedNotifications,
      unreadCount
    });
  },
  
  markAllAsRead: () => {
    const { notifications } = get();
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    
    set({
      notifications: updatedNotifications,
      unreadCount: 0
    });
  }
}));