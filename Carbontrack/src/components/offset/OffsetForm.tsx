import React, { useState } from 'react';
import { Check, X, CreditCard, Coins } from 'lucide-react';
import { Button } from '../ui/Button';
import { OffsetProject } from '../../types';

interface OffsetFormProps {
  project: OffsetProject;
  userPoints: number;
  onOffset: (amount: number, usePoints: boolean) => Promise<boolean>;
  onCancel: () => void;
}

export const OffsetForm: React.FC<OffsetFormProps> = ({
  project,
  userPoints,
  onOffset,
  onCancel
}) => {
  const [amount, setAmount] = useState(1); // Carbon tons to offset
  const [usePoints, setUsePoints] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Calculate costs
  const pointsCost = amount * 100; // 100 points per ton
  const dollarCost = amount * project.pricePerTon;
  const hasEnoughPoints = userPoints >= pointsCost;
  
  // Predefined offset amounts
  const offsetOptions = [0.5, 1, 2, 5];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await onOffset(amount, usePoints);
      if (result) {
        setSuccess(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (success) {
    return (
      <div className="py-6 px-4 text-center animate-fade-in">
        <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-success-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Offset Complete!</h3>
        <p className="text-gray-600 mb-4">
          You've successfully offset {amount} ton{amount !== 1 ? 's' : ''} of CO₂, supporting the {project.name} project.
        </p>
        <Button variant="primary" onClick={onCancel}>
          Continue
        </Button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="p-4 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Offset Carbon</h3>
        <button 
          type="button" 
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount to Offset (tons CO₂)
        </label>
        <div className="flex gap-2 mb-2">
          {offsetOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setAmount(option)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md border ${
                amount === option
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setUsePoints(true)}
            className={`p-3 flex flex-col items-center justify-center border rounded-md ${
              usePoints 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Coins size={24} className={usePoints ? 'text-primary-600' : 'text-gray-400'} />
            <span className={`mt-1 font-medium ${usePoints ? 'text-primary-700' : 'text-gray-700'}`}>
              Points
            </span>
            <span className={`text-xs ${
              usePoints ? 'text-primary-600' : 'text-gray-500'
            } ${!hasEnoughPoints && usePoints ? 'text-error-600' : ''}`}>
              {pointsCost} points {!hasEnoughPoints && usePoints && '(insufficient)'}
            </span>
          </button>
          
          <button
            type="button"
            onClick={() => setUsePoints(false)}
            className={`p-3 flex flex-col items-center justify-center border rounded-md ${
              !usePoints 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <CreditCard size={24} className={!usePoints ? 'text-primary-600' : 'text-gray-400'} />
            <span className={`mt-1 font-medium ${!usePoints ? 'text-primary-700' : 'text-gray-700'}`}>
              $CARB
            </span>
            <span className={`text-xs ${!usePoints ? 'text-primary-600' : 'text-gray-500'}`}>
              ${dollarCost.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 -mx-4 px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-700">Project</span>
          <span className="text-sm font-medium text-gray-900">{project.name}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-700">Carbon Offset</span>
          <span className="text-sm font-medium text-gray-900">{amount} ton{amount !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center justify-between font-medium">
          <span className="text-gray-900">Total Cost</span>
          <span className="text-primary-700">
            {usePoints 
              ? `${pointsCost} points`
              : `$${dollarCost.toFixed(2)}`
            }
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end gap-3">
        <Button 
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || (usePoints && !hasEnoughPoints)}
          isLoading={isSubmitting}
        >
          Confirm Offset
        </Button>
      </div>
    </form>
  );
};