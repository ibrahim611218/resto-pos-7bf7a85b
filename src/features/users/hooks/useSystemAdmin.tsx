
import { useEffect } from "react";
import { UserWithPassword } from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useSystemAdmin = (
  users: UserWithPassword[],
  setUsers: React.Dispatch<React.SetStateAction<UserWithPassword[]>>
) => {
  const { allPermissions, updateUserPermissions } = useAuth();

  useEffect(() => {
    const systemAdminExists = users.some(user => 
      user.email === "system_admin@example.com" && user.role === "owner"
    );
    
    if (!systemAdminExists) {
      const systemAdmin: UserWithPassword = {
        id: "sys-admin-1",
        name: "مدير النظام",
        email: "system_admin@example.com",
        role: "owner",
        password: "********"
      };
      
      setUsers(prevUsers => [...prevUsers, systemAdmin]);
      
      // Ensure system admin has all permissions
      const allPermissionValues = allPermissions.map(p => p.value);
      updateUserPermissions(systemAdmin.id, allPermissionValues);
    }
  }, [users, allPermissions, updateUserPermissions, setUsers]);
};
