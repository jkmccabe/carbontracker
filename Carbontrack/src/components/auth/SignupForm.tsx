import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Leaf } from 'lucide-react';

interface SignupFormProps {
  onSwitch: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  
  const { signup, isLoading } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {
      name: name ? '' : 'Name is required',
      email: email ? '' : 'Email is required',
      password: password ? '' : 'Password is required',
      confirmPassword: confirmPassword === password ? '' : 'Passwords do not match'
    };
    
    setErrors(newErrors);
    
    if (newErrors.name || newErrors.email || newErrors.password || newErrors.confirmPassword) {
      return;
    }
    
    try {
      await signup(name, email, password);
    } catch (error) {
      console.error('Signup failed', error);
    }
  };
  
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg animate-fade-in">
      <div className="text-center">
        <div className="flex justify-center">
          <Leaf className="h-12 w-12 text-primary-600" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Join CarbonTrack</h1>
        <p className="mt-2 text-gray-600">Create an account to start your climate journey</p>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            label="Full Name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />
          
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            label="Email address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />
          
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />
          
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="accept-terms"
            name="accept-terms"
            type="checkbox"
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            required
          />
          <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
            I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
          </label>
        </div>
        
        <Button type="submit" fullWidth isLoading={isLoading}>
          Create Account
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              className="font-medium text-primary-600 hover:text-primary-500"
              onClick={onSwitch}
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};