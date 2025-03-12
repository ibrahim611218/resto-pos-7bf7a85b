
import { useState, useEffect, useContext } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '../data/mockUsers';
import { allPermissions } from '../data/permissions';
import { useUserPermissions } from './useUserPermissions';
import AuthContext from '../context/AuthContext';
import { AuthContextType } from '../types/auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { permissionsMap, getUserPermissions, updateUserPermissions: updatePermissions } = useUserPermissions();

  // Check for stored user on init
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem('user');
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // In a real app, this would make an API request
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      // Don't store the password in localStorage for security
      const { password, ...userWithoutPassword } = foundUser;
      
      try {
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        console.error("Failed to save user to localStorage:", error);
        return false;
      }
    }
    return false;
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Error removing user from localStorage:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    // Admin and owner have all permissions
    if (user.role === 'admin' || user.role === 'owner') return true;
    
    // Supervisor has all permissions except those reserved for admin/owner
    if (user.role === 'supervisor') {
      if (Array.isArray(requiredRole)) {
        return requiredRole.some(role => 
          role === 'supervisor' || role === 'cashier' || role === 'kitchen');
      }
      return requiredRole === 'supervisor' || requiredRole === 'cashier' || requiredRole === 'kitchen';
    }
    
    // For other roles, check exact match
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

  const updateUserPermissions = (userId: string, permissions: string[]): boolean => {
    return updatePermissions(userId, permissions, user);
  };

  // Don't render children until we've checked localStorage
  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      hasPermission,
      isOwner,
      isSupervisor,
      allPermissions,
      getUserPermissions,
      updateUserPermissions
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
