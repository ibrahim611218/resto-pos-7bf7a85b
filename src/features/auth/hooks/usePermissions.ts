
import { User, UserRole } from '@/types';

export const usePermissions = (user: User | null) => {
  const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (user.role === 'admin' || user.role === 'owner') return true;
    
    if (user.role === 'supervisor') {
      if (Array.isArray(requiredRole)) {
        return requiredRole.some(role => 
          role === 'supervisor' || role === 'cashier' || role === 'kitchen');
      }
      return requiredRole === 'supervisor' || requiredRole === 'cashier' || requiredRole === 'kitchen';
    }
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    return user.role === requiredRole;
  };
  
  const isOwner = (): boolean => {
    return user?.role === 'owner';
  };
  
  const isSupervisor = (): boolean => {
    return user?.role === 'supervisor' || user?.role === 'admin' || user?.role === 'owner';
  };

  return {
    hasPermission,
    isOwner,
    isSupervisor
  };
};
