
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserWithPassword } from "../types";

export const usePermissionsManagement = () => {
  const { getUserPermissions, updateUserPermissions } = useAuth();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleEditPermissions = (user: UserWithPassword) => {
    if (user.id) {
      const permissions = getUserPermissions(user.id);
      setSelectedPermissions(permissions);
      return true;
    }
    return false;
  };

  const handleSavePermissions = (selectedUserId: string) => {
    if (!selectedUserId) return false;
    
    // Update permissions
    updateUserPermissions(selectedUserId, selectedPermissions);
    
    toast({
      title: "تم تحديث الصلاحيات",
      description: "تم تحديث صلاحيات المستخدم بنجاح"
    });
    
    return true;
  };

  return {
    selectedPermissions,
    setSelectedPermissions,
    handleEditPermissions,
    handleSavePermissions
  };
};
