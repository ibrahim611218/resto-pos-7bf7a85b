
import { useState, useEffect, useContext, createContext } from 'react';
import { User, UserRole } from '@/types';
import { userService } from '@/services';
import { useUserPermissions } from './useUserPermissions';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isProcessing: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  isOwner: () => boolean;
  isSupervisor: () => boolean;
  allPermissions: string[]; 
  getUserPermissions: (userId: string) => Promise<string[]>;
  updateUserPermissions: (userId: string, permissions: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { permissionsMap, getUserPermissions, updateUserPermissions: updatePermissions } = useUserPermissions();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        if (parsedUser.companyId) {
          localStorage.setItem('currentCompanyId', parsedUser.companyId);
        }
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem('user');
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (isProcessing) return false;
    
    try {
      setIsProcessing(true);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const trimmedEmail = email.trim();
      
      // First try to authenticate as a user
      const allUsers = await userService.getUsers();
      
      const foundUser = allUsers.find(
        u => u.email.toLowerCase() === trimmedEmail.toLowerCase() && u.password === password
      );

      // If user found, log them in
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        
        try {
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          
          // Save company ID if available
          if (foundUser.companyId) {
            localStorage.setItem('currentCompanyId', foundUser.companyId);
          }
          
          return true;
        } catch (error) {
          console.error("Failed to save user to localStorage:", error);
          return false;
        }
      }
      
      // If not found as user, try to authenticate as company
      const allCompanies = await userService.getCompanies();
      console.log("Checking company login with:", trimmedEmail, password);
      console.log("Available companies:", allCompanies);
      
      const foundCompany = allCompanies.find(
        c => c.email?.toLowerCase() === trimmedEmail.toLowerCase() && c.password === password
      );
      
      if (foundCompany) {
        console.log("Company found:", foundCompany);
        
        // Create a user object for the company admin
        const companyAdminUser = {
          id: `company-${foundCompany.id}`,
          name: `Admin (${foundCompany.name})`,
          email: foundCompany.email,
          role: 'admin' as UserRole,
          companyId: foundCompany.id
        };
        
        try {
          localStorage.setItem('user', JSON.stringify(companyAdminUser));
          localStorage.setItem('currentCompanyId', foundCompany.id);
          setUser(companyAdminUser);
          setIsAuthenticated(true);
          return true;
        } catch (error) {
          console.error("Failed to save company user to localStorage:", error);
          return false;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 300);
    }
  };

  const logout = async () => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('currentCompanyId');
      } catch (error) {
        console.error("Error removing user data from localStorage:", error);
      } finally {
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 300);
    }
  };

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

  const updateUserPermissions = (userId: string, permissions: string[]): boolean => {
    console.log("Auth Provider - Updating permissions for user:", userId);
    console.log("Auth Provider - Permissions to set:", permissions);
    
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      console.log("Auth Provider - Permission update rejected - not admin/owner");
      return false;
    }
    
    try {
      updatePermissions(userId, permissions);
      console.log("Auth Provider - Permissions updated successfully");
      return true;
    } catch (error) {
      console.error("Auth Provider - Error updating permissions:", error);
      return false;
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated,
      isProcessing,
      login, 
      logout, 
      hasPermission,
      isOwner,
      isSupervisor,
      allPermissions: [], 
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
