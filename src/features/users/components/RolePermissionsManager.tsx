import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserRole } from "../types";
import { toast } from "@/hooks/use-toast";

interface RolePermissionsManagerProps {
  isArabic: boolean;
}

const RolePermissionsManager: React.FC<RolePermissionsManagerProps> = ({ isArabic }) => {
  const { allPermissions } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("cashier");
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load permissions for selected role
  useEffect(() => {
    const loadRolePermissions = () => {
      const stored = localStorage.getItem('role_permissions_templates');
      if (stored) {
        const templates = JSON.parse(stored);
        setRolePermissions(templates[selectedRole] || []);
      } else {
        // Set default permissions based on role
        setRolePermissions(getDefaultPermissionsForRole(selectedRole));
      }
    };

    loadRolePermissions();
  }, [selectedRole]);

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

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setRolePermissions(prev => [...prev, permission]);
    } else {
      setRolePermissions(prev => prev.filter(p => p !== permission));
    }
  };

  const handleSaveTemplate = async () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem('role_permissions_templates') || '{}';
      const templates = JSON.parse(stored);
      templates[selectedRole] = rolePermissions;
      
      localStorage.setItem('role_permissions_templates', JSON.stringify(templates));
      
      toast({
        title: isArabic ? "تم الحفظ" : "Saved",
        description: isArabic ? "تم حفظ قالب الصلاحيات للدور" : "Role permissions template saved"
      });
    } catch (error) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "حدث خطأ أثناء الحفظ" : "Error saving permissions template",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToDefault = () => {
    setRolePermissions(getDefaultPermissionsForRole(selectedRole));
  };

  // Group permissions by category
  const permissionsByCategory = allPermissions.reduce((acc: any, permission: any) => {
    const category = permission.category || "عام";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(permission);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {isArabic ? "إدارة صلاحيات الأدوار" : "Role Permissions Manager"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="role-select">
              {isArabic ? "اختر الدور:" : "Select Role:"}
            </Label>
            <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cashier">{isArabic ? "كاشير" : "Cashier"}</SelectItem>
                <SelectItem value="waiter">{isArabic ? "نادل" : "Waiter"}</SelectItem>
                <SelectItem value="kitchen">{isArabic ? "مطبخ" : "Kitchen"}</SelectItem>
                <SelectItem value="delivery">{isArabic ? "توصيل" : "Delivery"}</SelectItem>
                <SelectItem value="supervisor">{isArabic ? "مشرف" : "Supervisor"}</SelectItem>
                <SelectItem value="manager">{isArabic ? "مدير فرع" : "Branch Manager"}</SelectItem>
                <SelectItem value="accountant">{isArabic ? "محاسب" : "Accountant"}</SelectItem>
                <SelectItem value="admin">{isArabic ? "مدير عام" : "Admin"}</SelectItem>
                <SelectItem value="owner">{isArabic ? "مالك" : "Owner"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleResetToDefault} variant="outline" size="sm">
              {isArabic ? "إعادة تعيين للافتراضي" : "Reset to Default"}
            </Button>
            <Button onClick={handleSaveTemplate} disabled={isLoading} size="sm">
              {isLoading ? (isArabic ? "جاري الحفظ..." : "Saving...") : (isArabic ? "حفظ القالب" : "Save Template")}
            </Button>
          </div>

          <div className="space-y-4">
            {Object.entries(permissionsByCategory).map(([category, permissions]: [string, any]) => (
              <Card key={category} className="p-4">
                <h4 className="font-medium mb-3 text-sm text-muted-foreground">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissions.map((permission: any) => (
                    <div key={permission.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission.value}
                        checked={rolePermissions.includes(permission.value)}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(permission.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={permission.value} className="flex-1 cursor-pointer text-foreground">
                        <div>
                          <div className="font-medium text-foreground">{permission.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {permission.description}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolePermissionsManager;