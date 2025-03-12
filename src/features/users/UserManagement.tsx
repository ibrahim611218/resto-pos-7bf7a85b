
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
import PermissionsDialog from "./components/PermissionsDialog";

const UserManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isOwner, allPermissions, getUserPermissions, updateUserPermissions } = useAuth();
  
  const [users, setUsers] = useState<UserWithPassword[]>(
    mockUsers.map(user => ({ ...user, password: "********" }))
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithPassword | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
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
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    if (newUser.password.length < 6) {
      toast({
        title: "خطأ",
        description: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
        variant: "destructive"
      });
      return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === newUser.email)) {
      toast({
        title: "خطأ",
        description: "البريد الإلكتروني موجود بالفعل",
        variant: "destructive"
      });
      return;
    }
    
    // Check if trying to create admin/owner without permission
    if ((newUser.role === 'admin' || newUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: "خطأ",
        description: "ليس لديك صلاحية لإنشاء مستخدم بهذا الدور",
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
      title: "تم إضافة المستخدم",
      description: "تمت إضافة المستخدم بنجاح"
    });
  };
  
  const handleEditUser = () => {
    if (!selectedUser) return;
    
    // Basic validation
    if (!selectedUser.name || !selectedUser.email) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    // Check if trying to edit to admin/owner without permission
    if ((selectedUser.role === 'admin' || selectedUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: "خطأ",
        description: "ليس لديك صلاحية لتعديل المستخدم إلى هذا الدور",
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
      title: "تم تحديث المستخدم",
      description: "تم تحديث بيانات المستخدم بنجاح"
    });
  };
  
  const handleChangePassword = () => {
    if (!selectedUser) return;
    
    // Basic validation
    if (!newPassword || !confirmPassword) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "خطأ",
        description: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
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
      title: "تم تغيير كلمة المرور",
      description: "تم تغيير كلمة المرور بنجاح"
    });
  };
  
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    // Check if trying to delete admin/owner without permission
    if ((selectedUser.role === 'admin' || selectedUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: "خطأ",
        description: "ليس لديك صلاحية لحذف مستخدم بهذا الدور",
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
      title: "تم حذف المستخدم",
      description: "تم حذف المستخدم بنجاح"
    });
  };

  const handleEditPermissions = (user: UserWithPassword) => {
    setSelectedUser(user);
    if (user.id) {
      const permissions = getUserPermissions(user.id);
      setSelectedPermissions(permissions);
      setIsPermissionsDialogOpen(true);
    }
  };

  const handleSavePermissions = () => {
    if (!selectedUser) return;
    
    const success = updateUserPermissions(selectedUser.id, selectedPermissions);
    
    if (success) {
      toast({
        title: "تم تحديث الصلاحيات",
        description: "تم تحديث صلاحيات المستخدم بنجاح"
      });
    } else {
      toast({
        title: "خطأ",
        description: "لا يمكن تحديث صلاحيات المستخدم",
        variant: "destructive"
      });
    }
    
    setIsPermissionsDialogOpen(false);
    setSelectedUser(null);
  };
  
  return (
    <div className="container p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>إدارة المستخدمين</CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 ml-2" />
            إضافة مستخدم
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
            onEditPermissions={handleEditPermissions}
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

      {/* Permissions Dialog */}
      <PermissionsDialog
        isOpen={isPermissionsDialogOpen}
        onOpenChange={setIsPermissionsDialogOpen}
        selectedUser={selectedUser}
        permissions={allPermissions}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
        onSavePermissions={handleSavePermissions}
        isArabic={isArabic}
      />
    </div>
  );
};

export default UserManagement;
