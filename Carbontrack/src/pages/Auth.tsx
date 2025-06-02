import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { useAuthStore } from '../store/authStore';
import { Leaf } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - branding and information */}
      <div className="md:w-1/2 bg-primary-600 p-8 flex flex-col justify-center text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Leaf className="h-10 w-10" />
            <span className="ml-2 text-2xl font-bold">CarbonTrack</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">Track, offset, and earn rewards for your climate action</h1>
          
          <ul className="space-y-4">
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-white bg-opacity-20 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-lg">Measure your carbon footprint</span>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-white bg-opacity-20 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-lg">Support verified carbon offset projects</span>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-white bg-opacity-20 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-lg">Earn points and badges for climate action</span>
            </li>
          </ul>
          
          <p className="mt-8 text-white text-opacity-80">
            Join thousands of users making a positive impact on our planet.
          </p>
        </div>
      </div>
      
      {/* Right side - auth forms */}
      <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
        {showLogin ? (
          <LoginForm onSwitch={() => setShowLogin(false)} />
        ) : (
          <SignupForm onSwitch={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
};