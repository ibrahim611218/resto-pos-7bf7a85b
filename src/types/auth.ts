
import { UserRole } from "@/features/users/types";

export interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  email?: string;
  role: UserRole;
  permissions?: string[];
  image?: string;
  companyId?: string;
  isActive?: boolean;
}

// Re-export UserRole correctly
export type { UserRole };

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuthState: () => Promise<boolean>;
}
