
import { useState } from "react";
import { mockUsers } from "@/features/auth/data/mockUsers";
import { toast } from "@/hooks/use-toast";
import { UserWithPassword } from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useUserOperations = () => {
  const { isOwner } = useAuth();
  const [users, setUsers] = useState<UserWithPassword[]>(
    mockUsers.map(user => ({ ...user, password: "********" }))
  );
  const [selectedUser, setSelectedUser] = useState<UserWithPassword | null>(null);
  const [newUser, setNewUser] = useState<UserWithPassword>({
    id: "",
    name: "",
    email: "",
    role: "cashier",
    password: ""
  });
  
  const canManageAdmins = isOwner();

  const handleAddUser = () => {
    // Basic validation
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return false;
    }
    
    if (newUser.password.length < 6) {
      toast({
        title: "خطأ",
        description: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
        variant: "destructive"
      });
      return false;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === newUser.email)) {
      toast({
        title: "خطأ",
        description: "البريد الإلكتروني موجود بالفعل",
        variant: "destructive"
      });
      return false;
    }
    
    // Check if trying to create admin/owner without permission
    if ((newUser.role === 'admin' || newUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: "خطأ",
        description: "ليس لديك صلاحية لإنشاء مستخدم بهذا الدور",
        variant: "destructive"
      });
      return false;
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

  return {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    newUser,
    setNewUser,
    canManageAdmins,
    handleAddUser,
    handleEditUser,
    handleDeleteUser
  };
};
