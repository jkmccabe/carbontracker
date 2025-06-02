import React from 'react';
import { MapPin, Leaf } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { OffsetProject } from '../../types';
import { motion } from 'framer-motion';

interface OffsetCardProps {
  project: OffsetProject;
  isSelected: boolean;
  onClick: () => void;
}

export const OffsetCard: React.FC<OffsetCardProps> = ({
  project,
  isSelected,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`cursor-pointer transition-colors duration-200 ${
          isSelected 
            ? 'ring-2 ring-primary-500 ring-offset-2' 
            : 'hover:bg-gray-50'
        }`}
        onClick={onClick}
      >
        <div className="h-36 overflow-hidden">
          <img 
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <CardContent className="pt-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-base font-medium text-gray-900">{project.name}</h3>
            <div className="flex items-center text-primary-600 text-sm font-medium">
              <Leaf size={16} className="mr-1" />
              ${project.pricePerTon}/ton
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={16} className="mr-1" />
            {project.location}
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
          
          <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
            <p>{project.impact}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};