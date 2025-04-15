
import { User, UserRole } from "@/types";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isProcessing?: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  isOwner: () => boolean;
  isSupervisor: () => boolean;
  allPermissions: string[];
  getUserPermissions: (userId: string) => string[];
  updateUserPermissions: (userId: string, permissions: string[]) => boolean;
}
