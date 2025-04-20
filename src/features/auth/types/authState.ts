
import { User } from '@/types';

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
