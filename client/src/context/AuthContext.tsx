import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AvatarConfig {
  piece: string;
  color: string;
  accessories: {
    eyebrows?: string;
    hair?: string;
    nose?: string;
    mouth?: string;
    ears?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, additionalData?: any) => Promise<void>;
  logout: () => void;
  updateProgress: (level: string, progress: number) => void;
  updateAvatar: (avatar: AvatarConfig) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: 1,
  email: 'demo@chesschampions.com',
  username: 'ChessExplorer',
  skillLevel: 'beginner',
  completedLessons: ['basic-moves', 'piece-values'],
  totalPoints: 150,
  subscriptionTier: 'free',
  isVolunteer: false,
  avatar: {
    piece: 'pawn',
    color: '#1e3a8a',
    accessories: {}
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Don't auto-login if user is on auth pages (registration, login)
    const currentPath = window.location.pathname;
    if (currentPath === '/login' || currentPath === '/register' || currentPath === '/volunteer') {
      return null;
    }
    
    // Initialize from localStorage if available for other pages
    const savedUser = localStorage.getItem('chessUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('chessUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, username: string, password: string, additionalData?: any) => {
    try {
      if (!email || !username || !password) {
        throw new Error('Email, username, and password are required');
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          username, 
          password,
          isVolunteer: additionalData?.isVolunteer || false,
          avatar: additionalData?.avatar || {
            piece: 'pawn',
            color: '#1e3a8a',
            accessories: {}
          }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('chessUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chessUser');
  };

  const updateProgress = (level: string, progress: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        skillLevel: level,
        totalPoints: user.totalPoints + progress
      };
      setUser(updatedUser);
      localStorage.setItem('chessUser', JSON.stringify(updatedUser));
    }
  };

  const updateAvatar = async (avatar: AvatarConfig) => {
    if (!user) return;
    
    try {
      // For demo purposes, update locally
      // In production, this would make a real API call
      const updatedUser = {
        ...user,
        avatar
      };
      setUser(updatedUser);
      localStorage.setItem('chessUser', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Avatar update error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProgress,
      updateAvatar
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}