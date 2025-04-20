
import { useContext, createContext } from 'react';
import { AuthContextType } from '../types/auth';
import { useAuthState } from './useAuthState';
import { useAuthOperations } from './useAuthOperations';
import { usePermissions } from './usePermissions';
import { useUserPermissions } from './useUserPermissions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isInitialized, isProcessing, setUser, setProcessing } = useAuthState();
  const { login, logout } = useAuthOperations(setUser, setProcessing);
  const { hasPermission, isOwner, isSupervisor } = usePermissions(user);
  const { permissionsMap, getUserPermissions, updateUserPermissions } = useUserPermissions();

  // Don't show anything until auth is initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated,
      isProcessing,
      login, 
      logout, 
      hasPermission,
      isOwner,
      isSupervisor,
      allPermissions: [], 
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
