import { create } from 'zustand';
import { Product } from '../types';

interface ProductState {
  scannedProduct: Product | null;
  scanHistory: Product[];
  scanProduct: (qrCode: string) => Promise<void>;
  clearScannedProduct: () => void;
}

// Mock products for demo
const mockProducts: Record<string, Product> = {
  'PROD123': {
    id: 'PROD123',
    name: 'Eco-friendly Water Bottle',
    manufacturer: 'GreenLife',
    category: 'Household',
    carbonFootprint: 2.3, // kg CO2e
    imageUrl: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg'
  },
  'PROD456': {
    id: 'PROD456',
    name: 'Organic Cotton T-shirt',
    manufacturer: 'EarthWear',
    category: 'Apparel',
    carbonFootprint: 5.1, // kg CO2e
    imageUrl: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg'
  },
  'PROD789': {
    id: 'PROD789',
    name: 'Plant-based Protein Bar',
    manufacturer: 'NutriEco',
    category: 'Food',
    carbonFootprint: 0.7, // kg CO2e
    imageUrl: 'https://images.pexels.com/photos/8504803/pexels-photo-8504803.jpeg'
  }
};

export const useProductStore = create<ProductState>((set, get) => ({
  scannedProduct: null,
  scanHistory: [],
  
  scanProduct: async (qrCode: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, map QR codes to mock products
    let product: Product | null = null;
    
    if (qrCode in mockProducts) {
      product = mockProducts[qrCode];
    } else {
      // Fallback to a random product for demo
      const productKeys = Object.keys(mockProducts);
      const randomKey = productKeys[Math.floor(Math.random() * productKeys.length)];
      product = mockProducts[randomKey];
    }
    
    if (product) {
      set(state => ({
        scannedProduct: product,
        scanHistory: [product, ...state.scanHistory].slice(0, 10) // Keep last 10 items
      }));
    }
  },
  
  clearScannedProduct: () => {
    set({ scannedProduct: null });
  }
}));