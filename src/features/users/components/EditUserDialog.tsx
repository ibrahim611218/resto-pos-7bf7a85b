
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types";
import { UserWithPassword } from "../types";

interface EditUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserWithPassword | null;
  onUserChange: (user: UserWithPassword) => void;
  onEditUser: () => void;
  isArabic: boolean;
  canManageAdmins: boolean;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedUser,
  onUserChange,
  onEditUser,
  isArabic,
  canManageAdmins,
}) => {
  if (!selectedUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isArabic ? "تعديل المستخدم" : "Edit User"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="edit-name">{isArabic ? "الاسم" : "Name"}</Label>
            <Input
              id="edit-name"
              value={selectedUser.name}
              onChange={(e) => onUserChange({ ...selectedUser, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email">{isArabic ? "البريد الإلكتروني" : "Email"}</Label>
            <Input
              id="edit-email"
              type="email"
              value={selectedUser.email}
              onChange={(e) => onUserChange({ ...selectedUser, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-role">{isArabic ? "الدور" : "Role"}</Label>
            <Select
              value={selectedUser.role}
              onValueChange={(value: UserRole) => onUserChange({ ...selectedUser, role: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {canManageAdmins && (
                  <>
                    <SelectItem value="owner">{isArabic ? "مالك" : "Owner"}</SelectItem>
                    <SelectItem value="admin">{isArabic ? "مدير" : "Admin"}</SelectItem>
                  </>
                )}
                <SelectItem value="supervisor">{isArabic ? "مشرف" : "Supervisor"}</SelectItem>
                <SelectItem value="cashier">{isArabic ? "كاشير" : "Cashier"}</SelectItem>
                <SelectItem value="kitchen">{isArabic ? "مطبخ" : "Kitchen"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={onEditUser}>
            {isArabic ? "حفظ" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
