'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'HR' | 'PROJECT_MANAGER' | 'TEAM_LEADER' | 'TEAM_MEMBER';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthorized: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const roleHierarchy: Record<UserRole, UserRole[]> = {
  'HR': ['PROJECT_MANAGER', 'TEAM_LEADER', 'TEAM_MEMBER'],
  'PROJECT_MANAGER': ['TEAM_LEADER', 'TEAM_MEMBER'],
  'TEAM_LEADER': ['TEAM_MEMBER'],
  'TEAM_MEMBER': []
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // Implement session check logic here
        // For now, we'll use localStorage as a temporary solution
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Implement actual login logic here
      // This is a temporary mock implementation
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'HR' // This should come from your backend
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthorized = (requiredRole: UserRole): boolean => {
    if (!user) return false;

    if (user.role === requiredRole) return true;

    // Check if the user's role can access the required role based on hierarchy
    return roleHierarchy[user.role].includes(requiredRole);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
}