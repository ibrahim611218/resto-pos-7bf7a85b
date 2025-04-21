
import { useState } from 'react';
import { User } from '@/types';
import { UserRole } from '@/features/users/types';
import { userService } from '@/services';

export const useAuthOperations = (
  setUser: (user: User | null) => void,
  setProcessing: (isProcessing: boolean) => void
) => {
  const login = async (email: string, password: string): Promise<boolean> => {
    if (setProcessing) setProcessing(true);
    
    try {
      console.log("Login starting for:", email);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const trimmedEmail = email.trim().toLowerCase();
      
      // أولاً نحاول المصادقة كمستخدم
      const allUsers = await userService.getUsers();
      console.log("Retrieved users:", allUsers.length);
      
      const foundUser = allUsers.find(
        u => u.email.toLowerCase() === trimmedEmail && u.password === password
      );

      if (foundUser) {
        console.log("User found:", foundUser.email);
        const { password: _, ...userWithoutPassword } = foundUser;
        
        // تخزين معلومات المستخدم في localStorage
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        
        if (foundUser.companyId) {
          localStorage.setItem('currentCompanyId', foundUser.companyId);
        }
        
        return true;
      }
      
      // محاولة المصادقة كشركة
      const allCompanies = await userService.getCompanies();
      console.log("Checking company login with:", trimmedEmail);
      
      const foundCompany = allCompanies.find(
        c => (c.email && c.email.toLowerCase() === trimmedEmail) && c.password === password
      );
      
      if (foundCompany) {
        console.log("Company found:", foundCompany);
        
        const companyAdminUser: User = {
          id: `company-${foundCompany.id}`,
          username: `company-${foundCompany.id}`,  // Added username
          name: `Admin (${foundCompany.name})`,
          email: foundCompany.email || '',
          role: 'admin' as UserRole,
          companyId: foundCompany.id
        };
        
        // تخزين معلومات الشركة في localStorage
        localStorage.setItem('user', JSON.stringify(companyAdminUser));
        localStorage.setItem('currentCompanyId', foundCompany.id);
        setUser(companyAdminUser);
        return true;
      }
      
      console.log("No matching user or company found");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setTimeout(() => {
        if (setProcessing) setProcessing(false);
      }, 300);
    }
  };

  const logout = async () => {
    if (setProcessing) setProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      localStorage.removeItem('user');
      localStorage.removeItem('currentCompanyId');
      setUser(null);
    } finally {
      setTimeout(() => {
        if (setProcessing) setProcessing(false);
      }, 300);
    }
  };

  return {
    login,
    logout
  };
};
