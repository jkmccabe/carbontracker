import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { QrCode, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '../components/common/Layout';
import { QRScanner } from '../components/scan/QRScanner';
import { ProductCard } from '../components/scan/ProductCard';
import { useAuthStore } from '../store/authStore';
import { useProductStore } from '../store/productStore';

export const ScanPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { scannedProduct, scanProduct, scanHistory, clearScannedProduct } = useProductStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  const handleScanResult = (qrCode: string) => {
    scanProduct(qrCode);
  };
  
  const handleOffset = () => {
    // Redirect to offset page with the product ID
    if (scannedProduct) {
      window.location.href = `/offset?product=${scannedProduct.id}`;
    }
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-secondary-100 p-3 rounded-full">
              <QrCode size={28} className="text-secondary-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Scan Product QR Code</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Scan a product's QR code to instantly view its carbon footprint and environmental impact.
          </p>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {scannedProduct ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
                  <button 
                    onClick={clearScannedProduct}
                    className="text-sm font-medium text-secondary-600 hover:text-secondary-700"
                  >
                    Scan another
                  </button>
                </div>
                <ProductCard 
                  product={scannedProduct}
                  onOffset={handleOffset}
                />
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                <Leaf className="h-12 w-12 text-gray-300 mx-auto" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No Product Scanned</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Scan a product QR code to see detailed carbon footprint information.
                </p>
                
                {scanHistory.length > 0 && (
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-medium text-gray-700">Recently Scanned</h4>
                    <ul className="mt-2 divide-y divide-gray-100">
                      {scanHistory.slice(0, 3).map(product => (
                        <li key={product.id} className="py-2 flex justify-between items-center">
                          <span className="text-sm text-gray-600">{product.name}</span>
                          <span className="text-sm font-medium text-gray-900">{product.carbonFootprint} kg</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Scan QR Code</h2>
              <QRScanner onResult={handleScanResult} />
              <p className="mt-4 text-sm text-gray-500 text-center">
                For demo purposes, any QR code will return a random product. Try scanning any QR code!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};