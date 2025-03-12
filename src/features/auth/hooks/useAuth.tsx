
import { useState, useEffect, createContext, useContext } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '../data/mockUsers';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  isOwner: () => boolean;
  isSupervisor: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for stored user on init
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
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
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
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

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      hasPermission,
      isOwner,
      isSupervisor
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
