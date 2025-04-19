
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserWithPassword } from "../../types";
import UserForm from "../UserForm";

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  newUser: UserWithPassword;
  setNewUser: (user: UserWithPassword) => void;
  onAddUser: () => void;
  isArabic: boolean;
  canManageAdmins: boolean;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  isOpen,
  onOpenChange,
  newUser,
  setNewUser,
  onAddUser,
  isArabic,
  canManageAdmins,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "إضافة مستخدم جديد" : "Add New User"}
          </DialogTitle>
        </DialogHeader>
        
        <UserForm 
          user={newUser}
          onUserChange={setNewUser}
          isArabic={isArabic}
          canManageAdmins={canManageAdmins}
        />
        
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={onAddUser}>
            {isArabic ? "إضافة" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
