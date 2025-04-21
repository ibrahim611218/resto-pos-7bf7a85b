
import { useState } from 'react';
import { User } from '@/types';
import { UserRole } from '@/features/users/types';
import { userService, companyService } from '@/services';

export const useAuthOperations = (
  setUser: (user: User | null) => void,
  setProcessing: (isProcessing: boolean) => void
) => {
  const login = async (email: string, password: string): Promise<boolean> => {
    if (setProcessing) setProcessing(true);
    
    try {
      console.log("بدء تسجيل الدخول لـ:", email);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const trimmedEmail = email.trim().toLowerCase();
      
      // أولاً نحاول المصادقة كمستخدم
      const allUsers = await userService.getUsers();
      console.log("تم استرجاع المستخدمين:", allUsers.length);
      
      // البحث عن المستخدم إما بالبريد الإلكتروني أو اسم المستخدم
      const foundUser = allUsers.find(
        u => (u.email && u.email.toLowerCase() === trimmedEmail || 
              u.username && u.username.toLowerCase() === trimmedEmail) && 
              u.password === password
      );

      if (foundUser) {
        console.log("تم العثور على المستخدم:", foundUser.email || foundUser.username);
        const { password: _, ...userWithoutPassword } = foundUser;
        
        setUser(userWithoutPassword);
        
        if (foundUser.companyId) {
          console.log("تم تعيين معرف الشركة:", foundUser.companyId);
          localStorage.setItem('currentCompanyId', foundUser.companyId);
        }
        
        return true;
      }
      
      // محاولة المصادقة كشركة
      const allCompanies = await companyService.getCompanies();
      console.log("التحقق من تسجيل دخول الشركة باستخدام:", trimmedEmail);
      
      const foundCompany = allCompanies.find(
        c => (c.email && c.email.toLowerCase() === trimmedEmail) && c.password === password
      );
      
      if (foundCompany) {
        console.log("تم العثور على الشركة:", foundCompany.name);
        
        const companyAdminUser: User = {
          id: `company-${foundCompany.id}`,
          username: `company-${foundCompany.id}`,  
          name: `مدير (${foundCompany.name})`,
          email: foundCompany.email || '',
          role: 'admin' as UserRole,
          companyId: foundCompany.id,
          isActive: true
        };
        
        // تخزين معلومات الشركة
        console.log("تسجيل دخول كمدير شركة:", companyAdminUser.name);
        localStorage.setItem('currentCompanyId', foundCompany.id);
        setUser(companyAdminUser);
        return true;
      }
      
      console.log("لم يتم العثور على مستخدم أو شركة مطابقة");
      return false;
    } catch (error) {
      console.error("خطأ في تسجيل الدخول:", error);
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
