
import { createContext } from 'react';
import { AuthContextType } from '../types/authState';

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

