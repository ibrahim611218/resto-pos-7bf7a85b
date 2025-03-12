
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserWithPassword } from "../types";
import { Label } from "@/components/ui/label";

interface PermissionItem {
  id: string;
  name: string;
  value: string;
  description: string;
}

interface PermissionsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserWithPassword | null;
  permissions: PermissionItem[];
  selectedPermissions: string[];
  setSelectedPermissions: (permissions: string[]) => void;
  onSavePermissions: () => void;
  isArabic: boolean;
}

const PermissionsDialog: React.FC<PermissionsDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedUser,
  permissions,
  selectedPermissions,
  setSelectedPermissions,
  onSavePermissions,
  isArabic,
}) => {
  if (!selectedUser) return null;

  const handleTogglePermission = (permissionValue: string) => {
    if (selectedPermissions.includes(permissionValue)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permissionValue));
    } else {
      setSelectedPermissions([...selectedPermissions, permissionValue]);
    }
  };

  const handleSelectAll = () => {
    setSelectedPermissions(permissions.map(p => p.value));
  };

  const handleDeselectAll = () => {
    setSelectedPermissions([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isArabic ? `إدارة صلاحيات المستخدم: ${selectedUser.name}` : `Manage User Permissions: ${selectedUser.name}`}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between mb-2">
          <Button variant="outline" size="sm" onClick={handleSelectAll}>
            {isArabic ? "تحديد الكل" : "Select All"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDeselectAll}>
            {isArabic ? "إلغاء تحديد الكل" : "Deselect All"}
          </Button>
        </div>
        <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto">
          {permissions.map((permission) => (
            <div key={permission.id} className={`flex items-start ${isArabic ? 'space-x-reverse' : 'space-x-2'}`}>
              <Checkbox
                id={`permission-${permission.id}`}
                checked={selectedPermissions.includes(permission.value)}
                onCheckedChange={() => handleTogglePermission(permission.value)}
                className="mt-1"
              />
              <div className={`grid gap-1.5 leading-none ${isArabic ? 'mr-2' : 'ml-2'}`}>
                <Label htmlFor={`permission-${permission.id}`} className="font-medium">
                  {permission.name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {permission.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className={`${isArabic ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={onSavePermissions}>
            {isArabic ? "حفظ الصلاحيات" : "Save Permissions"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsDialog;
