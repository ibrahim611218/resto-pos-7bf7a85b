
import { useState, useEffect } from 'react';
import { AuthState } from '../types/authState';
import { User } from '@/types';
import { companyService } from '@/services';

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
      localStorage.removeItem('isCompanyLogin');
    }
  };

  const setProcessing = (isProcessing: boolean) => {
    setState(prev => ({ ...prev, isProcessing }));
  };

  const initializeAuth = async () => {
    try {
      console.log("تحميل بيانات المستخدم من التخزين المحلي");
      const storedUser = localStorage.getItem('user');
      const isCompanyLogin = localStorage.getItem('isCompanyLogin') === 'true';
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("تم تحميل المستخدم:", parsedUser.email || parsedUser.username);
          
          // التحقق مما إذا كان هذا حساب شركة
          if (isCompanyLogin && parsedUser.companyId) {
            console.log("تحميل بيانات الشركة:", parsedUser.companyId);
            const companyData = await companyService.getCompanyById(parsedUser.companyId);
            
            if (!companyData) {
              console.error("لم يتم العثور على بيانات الشركة");
              localStorage.removeItem('user');
              localStorage.removeItem('currentCompanyId');
              localStorage.removeItem('isCompanyLogin');
              setState(prev => ({ ...prev, isInitialized: true }));
              return;
            }
            
            // تحديث بيانات المستخدم بمعلومات الشركة المحدثة
            parsedUser.name = `مدير (${companyData.name})`;
          }
          
          setState(prev => ({
            ...prev,
            user: parsedUser,
            isAuthenticated: true
          }));
          
          if (parsedUser.companyId) {
            console.log("تم تعيين معرف الشركة:", parsedUser.companyId);
            localStorage.setItem('currentCompanyId', parsedUser.companyId);
          }
        } catch (parseError) {
          console.error("خطأ في تحليل بيانات المستخدم:", parseError);
          localStorage.removeItem('user');
          localStorage.removeItem('isCompanyLogin');
        }
      } else {
        console.log("لا توجد بيانات مستخدم مخزنة");
      }
    } catch (error) {
      console.error("خطأ في تحميل بيانات المستخدم من localStorage:", error);
      localStorage.removeItem('user');
      localStorage.removeItem('isCompanyLogin');
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
