import React from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { Award, Edit, MapPin, Calendar, Mail, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfilePage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }
  
  const MotionCard = motion(Card);
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600">Manage your profile and review your impact badges</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Information */}
          <MotionCard 
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CardContent className="p-0">
              <div className="bg-primary-600 h-28 relative">
                <div className="absolute -bottom-12 left-6">
                  <div className="h-24 w-24 rounded-full bg-white p-1">
                    <div className="h-full w-full rounded-full bg-primary-100 flex items-center justify-center text-primary-800 text-3xl font-bold">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                </div>
                <button className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
                  <Edit size={16} />
                </button>
              </div>
              
              <div className="pt-16 px-6 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500 flex items-center mt-1">
                      <MapPin size={14} className="mr-1" />
                      San Francisco, CA
                    </p>
                  </div>
                  <Badge variant="primary">
                    Rank #{user.rank}
                  </Badge>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>Joined April 2025</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Leaf size={16} className="mr-2" />
                    <span>{user.carbonSaved} kg carbon saved</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button variant="outline" fullWidth>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </MotionCard>
          
          {/* Badges */}
          <div className="md:col-span-2">
            <MotionCard 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Your Badges</h2>
                <Badge variant="secondary">
                  {user.badges.length} Earned
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {user.badges.map((badge) => (
                    <motion.div 
                      key={badge.id}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gray-50 rounded-lg p-4 text-center"
                    >
                      <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-accent-100 flex items-center justify-center mb-3">
                          <Award className="h-8 w-8 text-accent-600" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                      <p className="text-xs text-primary-600 mt-2">Earned {badge.earnedDate}</p>
                    </motion.div>
                  ))}
                  
                  {/* Locked badges */}
                  {[1, 2, 3].map((_, i) => (
                    <motion.div 
                      key={`locked-${i}`}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gray-50 rounded-lg p-4 text-center opacity-60"
                    >
                      <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900">Locked Badge</h3>
                      <p className="text-xs text-gray-500 mt-1">Keep using CarbonTrack to unlock</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </MotionCard>
            
            {/* Impact History */}
            <MotionCard 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Impact History</h2>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-gray-100">
                  {[...Array(5)].map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    
                    return (
                      <li key={i} className="py-3 flex items-start">
                        <div className="p-2 rounded-full bg-primary-100 text-primary-600">
                          <Leaf size={16} />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {i === 0 ? 'Offset Carbon' : i === 1 ? 'Scanned Product' : i === 2 ? 'Completed Challenge' : i === 3 ? 'Daily Streak' : 'Earned Badge'}
                            </p>
                            <span className="text-sm text-gray-500">
                              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {i === 0 
                              ? 'Offset 2kg of carbon through Amazon Rainforest Preservation' 
                              : i === 1 
                                ? 'Scanned Eco-friendly Water Bottle (2.3kg CO₂)' 
                                : i === 2 
                                  ? 'Completed weekly challenge: Scan 5 products' 
                                  : i === 3 
                                    ? 'Maintained a 7-day streak' 
                                    : 'Earned Streak Master badge'
                            }
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View Full History
                  </Button>
                </div>
              </CardContent>
            </MotionCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};