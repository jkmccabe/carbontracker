import React from 'react';
import { Leaf, Info, PackageCheck } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onOffset: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOffset }) => {
  // Calculate carbon impact category
  const getCarbonCategory = (footprint: number) => {
    if (footprint < 1) return { label: 'Low Impact', variant: 'success' as const };
    if (footprint < 5) return { label: 'Medium Impact', variant: 'warning' as const };
    return { label: 'High Impact', variant: 'error' as const };
  };
  
  const category = getCarbonCategory(product.carbonFootprint);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.manufacturer}</p>
            </div>
            <Badge variant={category.variant}>
              {category.label}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Leaf className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm text-gray-700">Carbon Footprint</span>
              </div>
              <span className="text-base font-semibold">{product.carbonFootprint} kg CO<sub>2</sub>e</span>
            </div>
            
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <PackageCheck className="h-5 w-5 text-secondary-600 mr-2" />
                <span className="text-sm text-gray-700">Category</span>
              </div>
              <span className="text-base font-medium">{product.category}</span>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-gray-600">
            This product has a carbon footprint of {product.carbonFootprint} kg CO₂e. 
            You can offset this impact through our carbon offset projects.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center bg-gray-50">
          <button className="flex items-center text-sm text-secondary-600 font-medium">
            <Info className="h-4 w-4 mr-1" />
            More Details
          </button>
          
          <Button onClick={onOffset}>
            Offset This Product
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};