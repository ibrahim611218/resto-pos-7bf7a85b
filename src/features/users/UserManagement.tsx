
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/features/auth/data/mockUsers";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserWithPassword } from "./types";
import UsersList from "./components/UsersList";
import AddUserDialog from "./components/AddUserDialog";
import EditUserDialog from "./components/EditUserDialog";
import PasswordDialog from "./components/PasswordDialog";
import DeleteDialog from "./components/DeleteDialog";

const UserManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isOwner } = useAuth();
  
  const [users, setUsers] = useState<UserWithPassword[]>(
    mockUsers.map(user => ({ ...user, password: "********" }))
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithPassword | null>(null);
  const [newUser, setNewUser] = useState<UserWithPassword>({
    id: "",
    name: "",
    email: "",
    role: "cashier",
    password: ""
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const canManageAdmins = isOwner();
  
  const handleAddUser = () => {
    // Basic validation
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (newUser.password.length < 6) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل" : "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === newUser.email)) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "البريد الإلكتروني موجود بالفعل" : "Email already exists",
        variant: "destructive"
      });
      return;
    }
    
    // Check if trying to create admin/owner without permission
    if ((newUser.role === 'admin' || newUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "ليس لديك صلاحية لإنشاء مستخدم بهذا الدور" : "You don't have permission to create a user with this role",
        variant: "destructive"
      });
      return;
    }
    
    // Add new user
    const userId = Math.random().toString(36).substring(2, 9);
    setUsers([...users, { ...newUser, id: userId }]);
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewUser({
      id: "",
      name: "",
      email: "",
      role: "cashier",
      password: ""
    });
    
    toast({
      title: isArabic ? "تم إضافة المستخدم" : "User Added",
      description: isArabic ? "تمت إضافة المستخدم بنجاح" : "User has been added successfully"
    });
  };
  
  const handleEditUser = () => {
    if (!selectedUser) return;
    
    // Basic validation
    if (!selectedUser.name || !selectedUser.email) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Check if trying to edit to admin/owner without permission
    if ((selectedUser.role === 'admin' || selectedUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "ليس لديك صلاحية لتعديل المستخدم إلى هذا الدور" : "You don't have permission to change user to this role",
        variant: "destructive"
      });
      return;
    }
    
    // Update user
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...selectedUser } : user
    ));
    
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: isArabic ? "تم تحديث المستخدم" : "User Updated",
      description: isArabic ? "تم تحديث بيانات المستخدم بنجاح" : "User has been updated successfully"
    });
  };
  
  const handleChangePassword = () => {
    if (!selectedUser) return;
    
    // Basic validation
    if (!newPassword || !confirmPassword) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل" : "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    // Update password
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, password: newPassword } : user
    ));
    
    setIsPasswordDialogOpen(false);
    setSelectedUser(null);
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: isArabic ? "تم تغيير كلمة المرور" : "Password Changed",
      description: isArabic ? "تم تغيير كلمة المرور بنجاح" : "Password has been changed successfully"
    });
  };
  
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    // Check if trying to delete admin/owner without permission
    if ((selectedUser.role === 'admin' || selectedUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "ليس لديك صلاحية لحذف مستخدم بهذا الدور" : "You don't have permission to delete a user with this role",
        variant: "destructive"
      });
      setIsDeleteDialogOpen(false);
      return;
    }
    
    // Delete user
    setUsers(users.filter(user => user.id !== selectedUser.id));
    
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: isArabic ? "تم حذف المستخدم" : "User Deleted",
      description: isArabic ? "تم حذف المستخدم بنجاح" : "User has been deleted successfully"
    });
  };
  
  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isArabic ? "إدارة المستخدمين" : "User Management"}</CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            {isArabic ? "إضافة مستخدم" : "Add User"}
          </Button>
        </CardHeader>
        <CardContent>
          <UsersList 
            users={users}
            onEditUser={(user) => {
              setSelectedUser(user);
              setIsEditDialogOpen(true);
            }}
            onChangePassword={(user) => {
              setSelectedUser(user);
              setIsPasswordDialogOpen(true);
            }}
            onDeleteUser={(user) => {
              setSelectedUser(user);
              setIsDeleteDialogOpen(true);
            }}
            isArabic={isArabic}
          />
        </CardContent>
      </Card>
      
      {/* Add User Dialog */}
      <AddUserDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newUser={newUser}
        setNewUser={setNewUser}
        onAddUser={handleAddUser}
        isArabic={isArabic}
        canManageAdmins={canManageAdmins}
      />
      
      {/* Edit User Dialog */}
      <EditUserDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedUser={selectedUser}
        onUserChange={setSelectedUser}
        onEditUser={handleEditUser}
        isArabic={isArabic}
        canManageAdmins={canManageAdmins}
      />
      
      {/* Change Password Dialog */}
      <PasswordDialog 
        isOpen={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
        selectedUser={selectedUser}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onChangePassword={handleChangePassword}
        isArabic={isArabic}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedUser={selectedUser}
        onDeleteUser={handleDeleteUser}
        isArabic={isArabic}
      />
    </div>
  );
};

export default UserManagement;
