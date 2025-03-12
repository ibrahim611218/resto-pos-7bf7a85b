
import { User, UserRole } from '@/types';

export interface UserPermission {
  id: string;
  name: string;
  value: string;
  description: string;
}

export interface AuthContextType {
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
