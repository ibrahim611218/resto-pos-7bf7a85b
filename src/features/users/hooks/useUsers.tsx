
import { useState } from "react";
import { mockUsers } from "@/features/auth/data/mockUsers";
import { toast } from "@/hooks/use-toast";
import { UserWithPassword } from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useUsers = () => {
  const { isOwner, getUserPermissions, updateUserPermissions, allPermissions } = useAuth();
  const [users, setUsers] = useState<UserWithPassword[]>(
    mockUsers.map(user => ({ ...user, password: "********" }))
  );
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

  // Check if system admin exists, if not add it
  useState(() => {
    const systemAdminExists = users.some(user => 
      user.email === "system_admin@example.com" && user.role === "owner"
    );
    
    if (!systemAdminExists) {
      const systemAdmin: UserWithPassword = {
        id: "sys-admin-1",
        name: "مدير النظام",
        email: "system_admin@example.com",
        role: "owner",
        password: "********"
      };
      
      setUsers(prevUsers => [...prevUsers, systemAdmin]);
      
      // Ensure system admin has all permissions
      const allPermissionValues = allPermissions.map(p => p.value);
      // Fix: Remove the second argument from updateUserPermissions call
      // It should match the signature in AuthContextType
      updateUserPermissions(systemAdmin.id, allPermissionValues);
    }
  }, []);

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
    
    return true;
  };
  
  const handleEditUser = () => {
    if (!selectedUser) return false;
    
    // Basic validation
    if (!selectedUser.name || !selectedUser.email) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return false;
    }
    
    // Check if trying to edit to admin/owner without permission
    if ((selectedUser.role === 'admin' || selectedUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: "خطأ",
        description: "ليس لديك صلاحية لتعديل المستخدم إلى هذا الدور",
        variant: "destructive"
      });
      return false;
    }
    
    // Update user
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...selectedUser } : user
    ));
    
    toast({
      title: "تم تحديث المستخدم",
      description: "تم تحديث بيانات المستخدم بنجاح"
    });
    
    return true;
  };
  
  const handleChangePassword = () => {
    if (!selectedUser) return false;
    
    // Basic validation
    if (!newPassword || !confirmPassword) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return false;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "خطأ",
        description: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
        variant: "destructive"
      });
      return false;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive"
      });
      return false;
    }
    
    // Update password
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, password: newPassword } : user
    ));
    
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: "تم تغيير كلمة المرور",
      description: "تم تغيير كلمة المرور بنجاح"
    });
    
    return true;
  };
  
  const handleDeleteUser = () => {
    if (!selectedUser) return false;
    
    // Check if trying to delete admin/owner without permission
    if ((selectedUser.role === 'admin' || selectedUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: "خطأ",
        description: "ليس لديك صلاحية لحذف مستخدم بهذا الدور",
        variant: "destructive"
      });
      return false;
    }
    
    // Delete user
    setUsers(users.filter(user => user.id !== selectedUser.id));
    
    toast({
      title: "تم حذف المستخدم",
      description: "تم حذف المستخدم بنجاح"
    });
    
    return true;
  };

  const handleEditPermissions = (user: UserWithPassword) => {
    setSelectedUser(user);
    if (user.id) {
      const permissions = getUserPermissions(user.id);
      setSelectedPermissions(permissions);
      return true;
    }
    return false;
  };

  const handleSavePermissions = () => {
    if (!selectedUser) return false;
    
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
    
    return success;
  };

  return {
    users,
    selectedUser,
    setSelectedUser,
    selectedPermissions,
    setSelectedPermissions,
    newUser,
    setNewUser,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    canManageAdmins,
    handleAddUser,
    handleEditUser,
    handleChangePassword,
    handleDeleteUser,
    handleEditPermissions,
    handleSavePermissions
  };
};
