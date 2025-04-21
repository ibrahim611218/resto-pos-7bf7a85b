
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
    
    // عند تعيين المستخدم، قم بتخزينه في localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.companyId) {
        localStorage.setItem('currentCompanyId', user.companyId);
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('currentCompanyId');
    }
  };

  const setProcessing = (isProcessing: boolean) => {
    setState(prev => ({ ...prev, isProcessing }));
  };

  const initializeAuth = () => {
    try {
      console.log("تحميل بيانات المستخدم من التخزين المحلي");
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("تم تحميل المستخدم:", parsedUser.email || parsedUser.username);
        
        setState(prev => ({
          ...prev,
          user: parsedUser,
          isAuthenticated: true
        }));
        
        if (parsedUser.companyId) {
          console.log("تم تعيين معرف الشركة:", parsedUser.companyId);
          localStorage.setItem('currentCompanyId', parsedUser.companyId);
        }
      }
    } catch (error) {
      console.error("خطأ في تحميل بيانات المستخدم من localStorage:", error);
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
