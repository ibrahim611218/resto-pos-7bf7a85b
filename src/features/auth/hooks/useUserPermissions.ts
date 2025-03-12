
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { mockUsers } from '../data/mockUsers';
import { allPermissions } from '../data/permissions';

export function useUserPermissions() {
  const [permissionsMap, setPermissionsMap] = useState<Record<string, string[]>>({});

  // Initialize default permissions for users if not already set
  useEffect(() => {
    const initialPermissions: Record<string, string[]> = {};
    
    mockUsers.forEach(user => {
      if (!permissionsMap[user.id]) {
        switch (user.role) {
          case 'owner':
          case 'admin':
            initialPermissions[user.id] = allPermissions.map(p => p.value);
            break;
          case 'supervisor':
            initialPermissions[user.id] = [
              'create_invoices', 'cancel_invoices', 'refund_invoices', 
              'view_reports', 'manage_inventory', 'manage_kitchen'
            ];
            break;
          case 'cashier':
            initialPermissions[user.id] = ['create_invoices', 'view_reports'];
            break;
          case 'kitchen':
            initialPermissions[user.id] = ['manage_kitchen'];
            break;
        }
      } else {
        initialPermissions[user.id] = permissionsMap[user.id];
      }
    });
    
    setPermissionsMap(initialPermissions);
  }, []);

  const getUserPermissions = (userId: string): string[] => {
    return permissionsMap[userId] || [];
  };
  
  // Fix: Update the function signature to match AuthContextType
  const updateUserPermissions = (userId: string, permissions: string[]): boolean => {
    // Implementation can handle the current user check internally
    setPermissionsMap({
      ...permissionsMap,
      [userId]: permissions
    });
    
    return true;
  };

  return {
    permissionsMap,
    getUserPermissions,
    updateUserPermissions
  };
}
