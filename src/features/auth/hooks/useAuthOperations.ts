
import { useState } from 'react';
import { User, UserRole } from '@/types';
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
      
      const trimmedEmail = email.trim();
      
      // First try to authenticate as a user
      const allUsers = await userService.getUsers();
      console.log("Retrieved users:", allUsers.length);
      
      const foundUser = allUsers.find(
        u => u.email.toLowerCase() === trimmedEmail.toLowerCase() && u.password === password
      );

      if (foundUser) {
        console.log("User found:", foundUser.email);
        const { password: _, ...userWithoutPassword } = foundUser;
        
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        
        if (foundUser.companyId) {
          localStorage.setItem('currentCompanyId', foundUser.companyId);
        }
        
        return true;
      }
      
      // Try to authenticate as company
      const allCompanies = await userService.getCompanies();
      console.log("Checking company login with:", trimmedEmail);
      
      const foundCompany = allCompanies.find(
        c => c.email?.toLowerCase() === trimmedEmail.toLowerCase() && c.password === password
      );
      
      if (foundCompany) {
        console.log("Company found:", foundCompany);
        
        const companyAdminUser = {
          id: `company-${foundCompany.id}`,
          name: `Admin (${foundCompany.name})`,
          email: foundCompany.email,
          role: 'admin' as UserRole,
          companyId: foundCompany.id
        };
        
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
