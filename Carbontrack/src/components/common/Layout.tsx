import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  QrCode, 
  Gift, 
  User, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  Leaf,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { Badge } from '../ui/Badge';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuthStore();
  const { unreadCount, loadNotifications } = useNotificationStore();
  
  React.useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/scan', label: 'Scan Product', icon: <QrCode size={20} /> },
    { path: '/offset', label: 'Offset Carbon', icon: <Leaf size={20} /> },
    { path: '/rewards', label: 'Rewards', icon: <Gift size={20} /> },
    { path: '/stats', label: 'My Impact', icon: <BarChart3 size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
  ];
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  if (!user) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col fixed inset-y-0 z-50">
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">CarbonTrack</span>
          </div>
          
          {/* Nav Items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="px-2 space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                    {item.path === '/notifications' && unreadCount > 0 && (
                      <Badge variant="primary" size="sm" className="ml-auto">
                        {unreadCount}
                      </Badge>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User Section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.points} points</p>
              </div>
              <button 
                onClick={logout}
                className="ml-auto p-1 text-gray-500 hover:text-gray-700"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Leaf className="h-7 w-7 text-primary-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">CarbonTrack</span>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-white pt-16">
          <nav className="h-full overflow-y-auto">
            <ul className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 text-base font-medium rounded-md ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                    onClick={closeMobileMenu}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                    {item.path === '/notifications' && unreadCount > 0 && (
                      <Badge variant="primary" size="sm" className="ml-auto">
                        {unreadCount}
                      </Badge>
                    )}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                >
                  <LogOut size={20} />
                  <span className="ml-3">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
};