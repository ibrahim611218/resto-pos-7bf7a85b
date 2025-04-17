
import { User, UserRole } from "@/types";

export interface UserPermission {
  id: string;
  name: string;
  value: string;
  description: string;
  adminOnly?: boolean;      // Added for admin-only permissions
  cashierAllowed?: boolean; // Added for cashier-allowed permissions
  kitchenAllowed?: boolean; // Added for kitchen-allowed permissions
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isProcessing?: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  isOwner: () => boolean;
  isSupervisor: () => boolean;
  allPermissions: UserPermission[];
  getUserPermissions: (userId: string) => string[];
  updateUserPermissions: (userId: string, permissions: string[]) => boolean;
}
