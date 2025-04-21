
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { mockUsers } from '../data/mockUsers';
import { allPermissionValues } from '../data/permissions';

const PERMISSIONS_STORAGE_KEY = 'user_permissions_data';

export function useUserPermissions() {
  const [permissionsMap, setPermissionsMap] = useState<Record<string, string[]>>({});

  // Load permissions from localStorage on init
  useEffect(() => {
    try {
      const storedPermissions = localStorage.getItem(PERMISSIONS_STORAGE_KEY);
      if (storedPermissions) {
        setPermissionsMap(JSON.parse(storedPermissions));
      }
    } catch (error) {
      console.error("Error loading permissions from localStorage:", error);
    }
  }, []);

  // Initialize default permissions for users if not already set
  useEffect(() => {
    const initialPermissions: Record<string, string[]> = { ...permissionsMap };
    let hasChanges = false;
    
    mockUsers.forEach(user => {
      if (!initialPermissions[user.id]) {
        hasChanges = true;
        
        switch (user.role) {
          case 'owner':
          case 'admin':
            initialPermissions[user.id] = allPermissionValues;
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
      }
    });
    
    if (hasChanges) {
      setPermissionsMap(initialPermissions);
      // Save to localStorage
      try {
        localStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(initialPermissions));
      } catch (error) {
        console.error("Error saving permissions to localStorage:", error);
      }
    }
  }, [permissionsMap]);

  const getUserPermissions = async (userId: string): Promise<string[]> => {
    return permissionsMap[userId] || [];
  };
  
  const updateUserPermissions = (userId: string, permissions: string[]): boolean => {
    console.log("UserPermissions Hook - Updating permissions for:", userId);
    console.log("UserPermissions Hook - New permissions:", permissions);
    
    const updatedPermissionsMap = {
      ...permissionsMap,
      [userId]: permissions
    };
    
    // Save to state
    setPermissionsMap(updatedPermissionsMap);
    
    // Save to localStorage
    try {
      localStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(updatedPermissionsMap));
      console.log("UserPermissions Hook - Permissions saved to localStorage successfully");
      return true;
    } catch (error) {
      console.error("Error saving permissions to localStorage:", error);
      return false;
    }
  };

  return {
    permissionsMap,
    getUserPermissions,
    updateUserPermissions,
    allPermissions: allPermissionValues // Export this as part of the hook's return value
  };
}
