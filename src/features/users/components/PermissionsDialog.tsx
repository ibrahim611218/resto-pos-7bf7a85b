
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>إدارة صلاحيات المستخدم: {selectedUser.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-start space-x-2 space-x-reverse">
              <Checkbox
                id={`permission-${permission.id}`}
                checked={selectedPermissions.includes(permission.value)}
                onCheckedChange={() => handleTogglePermission(permission.value)}
              />
              <div className="grid gap-1.5 leading-none mr-2">
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
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={onSavePermissions}>
            حفظ الصلاحيات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsDialog;
