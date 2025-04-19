
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserWithPassword } from "../../types";
import UserForm from "../UserForm";

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
      <DialogContent dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "تعديل المستخدم" : "Edit User"}
          </DialogTitle>
          <DialogDescription>
            {isArabic 
              ? `تعديل بيانات المستخدم: ${selectedUser.name}` 
              : `Edit user information for: ${selectedUser.name}`}
          </DialogDescription>
        </DialogHeader>
        <UserForm
          user={selectedUser}
          onUserChange={onUserChange}
          isArabic={isArabic}
          canManageAdmins={canManageAdmins}
        />
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
