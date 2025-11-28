import { useState } from 'react';
import { Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'wouter';
import AvatarDisplay from './AvatarDisplay';

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { id: '/', label: 'Home', mobileLabel: 'Home', path: '/' },
    { id: '/roadmap', label: 'My Map', mobileLabel: 'Map', path: '/roadmap' },
    { id: '/chess', label: '♔ Play Chess', mobileLabel: '♔ Play', path: '/chess', authRequired: true },
    { id: '/analysis', label: '📊 Analysis', mobileLabel: '📊 Analysis', path: '/analysis', authRequired: true },
    { id: '/events', label: 'Events', mobileLabel: 'Events', path: '/events' },
    { id: '/mission', label: 'Our Mission', mobileLabel: 'Mission', path: '/mission' },
    { id: '/donate', label: 'Donate', mobileLabel: 'Donate', path: '/donate' },
  ];

  const handleLogout = () => {
    logout();
    setIsAccountDropdownOpen(false);
    setLocation('/');
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-16">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link href="/">
              <div className="font-bold cursor-pointer flex items-center gap-1 sm:gap-3 flex-shrink-0">
                <img 
                  src="/chess-champions-logo.png" 
                  alt="Chess Champions Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-yellow-400"
                />
                <span className="text-sm sm:text-base md:text-xl text-white hidden xs:inline whitespace-nowrap truncate">Chess Champions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block flex-1 mx-4">
            <div className="flex items-center justify-center space-x-2">
              {navItems.filter(item => !item.authRequired || isAuthenticated).map((item) => (
                <Link key={item.id} href={item.path}>
                  <div
                    className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      location === item.path
                        ? 'bg-yellow-400 text-blue-900'
                        : 'text-white hover:bg-blue-800'
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Account Section - Desktop */}
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-800 transition-colors"
                  >
                    {user?.avatar ? (
                      <AvatarDisplay avatar={user.avatar} size="small" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline truncate max-w-[100px]">{user?.username}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isAccountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link href="/profile">
                        <div
                          onClick={() => setIsAccountDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer transition-colors"
                        >
                          <Settings className="w-4 h-4 flex-shrink-0" />
                          Profile Settings
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4 flex-shrink-0" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-1 sm:gap-2">
                  <Link href="/login">
                    <div className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-blue-800 rounded-md transition-colors cursor-pointer">
                      Login
                    </div>
                  </Link>
                  <Link href="/register">
                    <div className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-yellow-400 text-blue-900 rounded-md hover:bg-yellow-300 transition-colors cursor-pointer">
                      Sign Up
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-blue-800 p-2 rounded-md transition-colors ml-auto"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-blue-800 border-t border-blue-700 animate-slideInDown">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.filter(item => !item.authRequired || isAuthenticated).map((item) => (
              <Link key={item.id} href={item.path}>
                <div
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-sm sm:text-base font-medium w-full text-left transition-colors cursor-pointer ${
                    location === item.path
                      ? 'bg-yellow-400 text-blue-900'
                      : 'text-white hover:bg-blue-700'
                  }`}
                >
                  {item.mobileLabel}
                </div>
              </Link>
            ))}
            
            {/* Divider */}
            <div className="border-t border-blue-700 my-2"></div>
            
            {isAuthenticated ? (
              <>
                <Link href="/profile">
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 rounded-md text-sm sm:text-base font-medium text-white hover:bg-blue-700 w-full text-left cursor-pointer transition-colors"
                  >
                    <Settings className="w-4 h-4 flex-shrink-0" />
                    Profile
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-3 rounded-md text-sm sm:text-base font-medium text-white hover:bg-blue-700 w-full text-left transition-colors"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-3 rounded-md text-sm sm:text-base font-medium text-white hover:bg-blue-700 w-full text-left cursor-pointer transition-colors"
                  >
                    Login
                  </div>
                </Link>
                <Link href="/register">
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-3 rounded-md text-sm sm:text-base font-medium bg-yellow-400 text-blue-900 hover:bg-yellow-300 w-full text-left cursor-pointer transition-colors"
                  >
                    Sign Up
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}