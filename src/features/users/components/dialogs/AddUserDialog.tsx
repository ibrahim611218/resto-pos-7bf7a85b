
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserWithPassword } from "../../types";
import UserForm from "../UserForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          <DialogDescription>
            {isArabic 
              ? "أدخل بيانات المستخدم الجديد" 
              : "Enter new user information"}
          </DialogDescription>
        </DialogHeader>
        
        <UserForm 
          user={newUser}
          onUserChange={setNewUser}
          isArabic={isArabic}
          canManageAdmins={canManageAdmins}
        />
        
        <div className="space-y-2">
          <Label htmlFor="password">
            {isArabic ? "كلمة المرور" : "Password"}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={newUser.password || ""}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder={isArabic ? "أدخل كلمة المرور" : "Enter password"}
            required
          />
        </div>
        
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
