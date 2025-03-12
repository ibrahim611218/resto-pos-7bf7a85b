
import { useState, useEffect, createContext, useContext } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '../data/mockUsers';

interface UserPermission {
  id: string;
  name: string;
  value: string;
  description: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  isOwner: () => boolean;
  isSupervisor: () => boolean;
  allPermissions: UserPermission[];
  getUserPermissions: (userId: string) => string[];
  updateUserPermissions: (userId: string, permissions: string[]) => boolean;
}

// Define all permissions
const allPermissions: UserPermission[] = [
  { id: "p1", name: "إدارة المستخدمين", value: "manage_users", description: "إضافة وتعديل وحذف المستخدمين" },
  { id: "p2", name: "إدارة المنتجات", value: "manage_products", description: "إضافة وتعديل وحذف المنتجات" },
  { id: "p3", name: "إدارة المخزون", value: "manage_inventory", description: "إدارة المخزون وحركة البضائع" },
  { id: "p4", name: "إصدار فواتير", value: "create_invoices", description: "إنشاء فواتير جديدة" },
  { id: "p5", name: "إلغاء الفواتير", value: "cancel_invoices", description: "إلغاء الفواتير الصادرة" },
  { id: "p6", name: "إرجاع الفواتير", value: "refund_invoices", description: "إرجاع الفواتير واسترداد المبالغ" },
  { id: "p7", name: "عرض التقارير", value: "view_reports", description: "عرض تقارير المبيعات والمخزون" },
  { id: "p8", name: "إدارة الإعدادات", value: "manage_settings", description: "تعديل إعدادات النظام" },
  { id: "p9", name: "إدارة المطبخ", value: "manage_kitchen", description: "إدارة طلبات المطبخ" },
];

// User permissions mapping (default values for each role)
const userPermissionsMap: Record<string, string[]> = {};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [permissionsMap, setPermissionsMap] = useState<Record<string, string[]>>(userPermissionsMap);

  // Initialize default permissions for users if not already set
  useEffect(() => {
    const initialPermissions: Record<string, string[]> = {};
    
    mockUsers.forEach(user => {
      if (!permissionsMap[user.id]) {
        switch (user.role) {
          case 'owner':
          case 'admin':
            initialPermissions[user.id] = allPermissions.map(p => p.value);
            break;
          case 'supervisor':
            initialPermissions[user.id] = [
              'create_invoices', 'cancel_invoices', 'refund_invoices', 
              'view_reports', 'manage_inventory', 'manage_kitchen'
            ];
            break;
          case 'cashier':
            initialPermissions[user.id] = ['create_invoices', 'view_reports'];
            break;
          case 'kitchen':
            initialPermissions[user.id] = ['manage_kitchen'];
            break;
        }
      } else {
        initialPermissions[user.id] = permissionsMap[user.id];
      }
    });
    
    setPermissionsMap(initialPermissions);
  }, []);

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

  const getUserPermissions = (userId: string): string[] => {
    return permissionsMap[userId] || [];
  };
  
  const updateUserPermissions = (userId: string, permissions: string[]): boolean => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      return false;
    }
    
    setPermissionsMap({
      ...permissionsMap,
      [userId]: permissions
    });
    
    return true;
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
