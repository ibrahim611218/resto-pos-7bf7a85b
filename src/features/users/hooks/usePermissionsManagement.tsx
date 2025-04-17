
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserWithPassword } from "../types";

export const usePermissionsManagement = () => {
  const { getUserPermissions, updateUserPermissions, allPermissions } = useAuth();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleEditPermissions = (user: UserWithPassword) => {
    if (user.id) {
      // Get current user permissions
      const permissions = getUserPermissions(user.id);
      setSelectedPermissions(permissions);
      return true;
    }
    return false;
  };

  const handleSavePermissions = (selectedUserId: string) => {
    if (!selectedUserId) return false;
    
    // Update permissions
    const success = updateUserPermissions(selectedUserId, selectedPermissions);
    
    if (success) {
      toast({
        title: "تم تحديث الصلاحيات",
        description: "تم تحديث صلاحيات المستخدم بنجاح"
      });
      return true;
    } else {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الصلاحيات",
        variant: "destructive"
      });
      return false;
    }
  };

  // Get permissions based on user role
  const getDefaultPermissionsForRole = (role: string): string[] => {
    switch(role) {
      case 'owner':
      case 'admin':
        return allPermissions.map(p => p.value);
      case 'supervisor':
        return allPermissions
          .filter(p => !p.adminOnly)
          .map(p => p.value);
      case 'cashier':
        return allPermissions
          .filter(p => p.cashierAllowed)
          .map(p => p.value);
      case 'kitchen':
        return allPermissions
          .filter(p => p.kitchenAllowed)
          .map(p => p.value);
      default:
        return [];
    }
  };

  return {
    selectedPermissions,
    setSelectedPermissions,
    handleEditPermissions,
    handleSavePermissions,
    getDefaultPermissionsForRole
  };
};
