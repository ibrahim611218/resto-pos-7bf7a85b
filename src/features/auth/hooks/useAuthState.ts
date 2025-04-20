
import { useState, useEffect } from 'react';
import { AuthState } from '../types/authState';
import { User } from '@/types';

export const useAuthState = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    isProcessing: false
  });

  const setUser = (user: User | null) => {
    setState(prev => ({
      ...prev,
      user,
      isAuthenticated: !!user
    }));
  };

  const setProcessing = (isProcessing: boolean) => {
    setState(prev => ({ ...prev, isProcessing }));
  };

  const initializeAuth = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        if (parsedUser.companyId) {
          localStorage.setItem('currentCompanyId', parsedUser.companyId);
        }
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem('user');
    } finally {
      setState(prev => ({ ...prev, isInitialized: true }));
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return {
    ...state,
    setUser,
    setProcessing
  };
};
