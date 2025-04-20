
import { useEffect } from "react";
import { UserWithPassword } from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";

const SYSTEM_ADMIN_CREATED_KEY = 'system_admin_initialized';

export const useSystemAdmin = (
  users: UserWithPassword[],
  setUsers: React.Dispatch<React.SetStateAction<UserWithPassword[]>>
) => {
  const { allPermissions, updateUserPermissions } = useAuth();

  useEffect(() => {
    // Check if we've already created the system admin in this session
    const systemAdminInitialized = localStorage.getItem(SYSTEM_ADMIN_CREATED_KEY);
    
    // Check if system admin exists in users array
    const systemAdminExists = users.some(user => 
      user.email === "system_admin@example.com" && user.role === "owner"
    );
    
    // Only create if not initialized and not in the users array
    if (!systemAdminInitialized && !systemAdminExists) {
      const systemAdmin: UserWithPassword = {
        id: "sys-admin-1",
        name: "مدير النظام",
        email: "system_admin@example.com",
        role: "owner",
        password: "********",
        isActive: true
      };
      
      setUsers(prevUsers => [...prevUsers, systemAdmin]);
      
      // Ensure system admin has all permissions
      updateUserPermissions(systemAdmin.id, allPermissions);
      
      // Mark as initialized in localStorage
      localStorage.setItem(SYSTEM_ADMIN_CREATED_KEY, 'true');
    }
  }, [users, allPermissions, updateUserPermissions, setUsers]);
};
