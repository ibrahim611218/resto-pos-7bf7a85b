
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserWithPassword } from "../types";
import { UserPermission } from "@/features/auth/types/authState";

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
        // Set default permissions based on role if fetch fails
        const defaultPermissions = getDefaultPermissionsForRole(user.role);
        setSelectedPermissions(defaultPermissions);
        return true;
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
        return allPermissions;
      case 'admin':
        return allPermissions.filter(p => !['backup_data'].includes(p));
      case 'manager':
        return ['manage_products', 'manage_inventory', 'create_invoices', 'cancel_invoices', 'refund_invoices', 'view_reports', 'manage_tables', 'manage_discounts', 'manage_customers', 'export_data'];
      case 'supervisor':
        return ['manage_products', 'manage_inventory', 'create_invoices', 'view_reports', 'manage_tables', 'manage_customers'];
      case 'accountant':
        return ['view_reports', 'export_data', 'create_invoices', 'refund_invoices'];
      case 'cashier':
        return ['create_invoices', 'view_reports', 'manage_customers'];
      case 'waiter':
        return ['create_invoices', 'manage_tables', 'manage_customers'];
      case 'kitchen':
        return ['manage_kitchen'];
      case 'delivery':
        return ['manage_delivery', 'view_reports'];
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
