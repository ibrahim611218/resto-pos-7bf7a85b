
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserWithPassword } from "../types";
import UserForm from "./UserForm";
import { usePermissionsManagement } from "../hooks/usePermissionsManagement";
import { useAuth } from "@/features/auth/hooks/useAuth";

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
  canManageAdmins
}) => {
  const { getDefaultPermissionsForRole } = usePermissionsManagement();
  const { updateUserPermissions } = useAuth();
  
  // Initialize permissions based on selected role
  useEffect(() => {
    if (isOpen && newUser && newUser.role) {
      const defaultPermissions = getDefaultPermissionsForRole(newUser.role);
      // We'll apply these permissions after user creation
      console.log(`Default permissions for ${newUser.role}:`, defaultPermissions);
    }
  }, [isOpen, newUser.role, getDefaultPermissionsForRole]);
  
  const handleAddUser = () => {
    // Get default permissions for the selected role
    const defaultPermissions = getDefaultPermissionsForRole(newUser.role);
    
    // Call the original onAddUser function
    // After successful user creation, permissions will be applied
    onAddUser();
    
    // Note: The actual permissions will be applied in the handleAddUser function
    // in the useUserOperations.tsx after the user ID is generated
  };

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
        
        <div className="space-y-2">
          <Label htmlFor="password">
            {isArabic ? "كلمة المرور" : "Password"}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder={isArabic ? "أدخل كلمة المرور" : "Enter password"}
            required
          />
        </div>
        
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleAddUser}>
            {isArabic ? "إضافة" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
