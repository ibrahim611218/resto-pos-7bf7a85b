import { createContext } from 'react';
import { AuthContextType } from '../types/authState';

// This file is deprecated as the context is now defined directly in useAuth.tsx
// We keep this file for backwards compatibility but it's not used anymore
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
