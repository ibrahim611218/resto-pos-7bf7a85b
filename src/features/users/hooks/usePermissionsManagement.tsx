
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserWithPassword } from "../types";
import { UserPermission } from "@/features/auth/types/auth";

export const usePermissionsManagement = () => {
  const { getUserPermissions, updateUserPermissions, allPermissions } = useAuth();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleEditPermissions = async (user: UserWithPassword) => {
    if (user.id) {
      // Get current user permissions
      try {
        const permissions = await getUserPermissions(user.id);
        setSelectedPermissions(permissions);
        return true;
      } catch (error) {
        console.error("Error fetching user permissions:", error);
        return false;
      }
    }
    return false;
  };

  const handleSavePermissions = (selectedUserId: string) => {
    if (!selectedUserId) return false;
    
    console.log("Saving permissions for user:", selectedUserId);
    console.log("Selected permissions:", selectedPermissions);
    
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
        return allPermissions;
      case 'supervisor':
        return allPermissions.filter(p => !p.includes('manage_users'));
      case 'cashier':
        return ['create_invoices', 'view_reports'];
      case 'kitchen':
        return ['manage_kitchen'];
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
