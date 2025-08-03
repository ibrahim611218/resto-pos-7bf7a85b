
import { User } from '@/types';
import { UserRole } from '@/types/auth';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isProcessing: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface UserPermission {
  id: string;
  name: string;
  value: string;
  description: string;
  category?: string;
  adminOnly?: boolean;
  cashierAllowed?: boolean;
  kitchenAllowed?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isProcessing: boolean;
  isInitialized: boolean; // Added the missing property
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  isOwner: () => boolean;
  isSupervisor: () => boolean;
  allPermissions: string[];
  getUserPermissions: (userId: string) => Promise<string[]>;
  updateUserPermissions: (userId: string, permissions: string[]) => boolean;
}
