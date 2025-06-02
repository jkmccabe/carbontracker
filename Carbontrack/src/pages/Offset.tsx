import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { OffsetCard } from '../components/offset/OffsetCard';
import { OffsetForm } from '../components/offset/OffsetForm';
import { Card } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { useOffsetStore } from '../store/offsetStore';
import { useProductStore } from '../store/productStore';
import { Leaf, Globe, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const OffsetPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  
  const { isAuthenticated, user } = useAuthStore();
  const { projects, loadProjects, selectedProject, selectProject, offsetCarbon } = useOffsetStore();
  const { scanHistory } = useProductStore();
  
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    loadProjects();
    
    // If product ID is provided, automatically show the offset form
    if (productId && scanHistory.some(p => p.id === productId) && projects.length > 0) {
      selectProject(projects[0].id);
      setShowForm(true);
    }
  }, [loadProjects, productId, scanHistory, projects]);
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }
  
  // Product to offset if specified in URL
  const productToOffset = productId 
    ? scanHistory.find(p => p.id === productId) 
    : null;
  
  const handleProjectSelect = (projectId: string) => {
    selectProject(projectId);
    setShowForm(true);
  };
  
  const handleOffset = async (amount: number, usePoints: boolean) => {
    const result = await offsetCarbon(amount, usePoints);
    if (result) {
      // Reset form on success
      return true;
    }
    return false;
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">Carbon Offset Marketplace</h1>
            <p className="text-gray-600">
              Support verified climate projects to offset your carbon footprint
            </p>
          </div>
          <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Leaf className="h-5 w-5 text-primary-600 mr-1" />
              <span className="text-sm font-medium text-gray-700">{user.carbonSaved} kg saved</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-accent-600 mr-1" />
              <span className="text-sm font-medium text-gray-700">{user.points} points</span>
            </div>
          </div>
        </div>
        
        {/* Info card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-secondary-500 to-secondary-700 text-white p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <Globe className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Why Offset Your Carbon?</h2>
                <p className="text-secondary-100">
                  Carbon offsetting funds projects that reduce greenhouse gas emissions. 
                  By offsetting, you're directly contributing to climate solutions like 
                  renewable energy, forest conservation, and community projects.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Product to offset info (if any) */}
        {productToOffset && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Card className="bg-gray-50 p-4">
              <div className="flex items-center">
                <img
                  src={productToOffset.imageUrl}
                  alt={productToOffset.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{productToOffset.name}</h3>
                  <p className="text-sm text-gray-600">
                    Carbon footprint: {productToOffset.carbonFootprint} kg CO₂e
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`md:col-span-${showForm ? '2' : '3'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={showForm ? 'md:col-span-3 lg:col-span-1' : ''}
                >
                  <OffsetCard
                    project={project}
                    isSelected={selectedProject?.id === project.id}
                    onClick={() => handleProjectSelect(project.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          {showForm && selectedProject && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-1"
            >
              <Card>
                <OffsetForm
                  project={selectedProject}
                  userPoints={user.points}
                  onOffset={handleOffset}
                  onCancel={handleCancelForm}
                />
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};