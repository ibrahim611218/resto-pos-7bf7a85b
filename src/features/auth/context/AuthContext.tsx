
import { createContext } from 'react';
import { AuthContextType } from '../types/auth';

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
