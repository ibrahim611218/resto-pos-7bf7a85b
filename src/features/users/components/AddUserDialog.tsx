
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types";
import { UserWithPassword } from "../types";

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isArabic ? "إضافة مستخدم جديد" : "Add New User"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">{isArabic ? "الاسم" : "Name"}</Label>
            <Input
              id="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{isArabic ? "البريد الإلكتروني" : "Email"}</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{isArabic ? "كلمة المرور" : "Password"}</Label>
            <Input
              id="password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">{isArabic ? "الدور" : "Role"}</Label>
            <Select
              value={newUser.role}
              onValueChange={(value: UserRole) => setNewUser({ ...newUser, role: value, password: newUser.password })}
            >
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? "اختر الدور" : "Select role"} />
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
          <Button onClick={onAddUser}>
            {isArabic ? "إضافة" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
