import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { ScanPage } from './pages/Scan';
import { OffsetPage } from './pages/Offset';
import { RewardsPage } from './pages/Rewards';
import { ProfilePage } from './pages/Profile';
import { NotificationsPage } from './pages/Notifications';

function App() {
  // Set page title
  useEffect(() => {
    document.title = 'CarbonTrack - Track & Offset Your Carbon Footprint';
  }, []);
  
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/offset" element={<OffsetPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </div>
  );
}

export default App;