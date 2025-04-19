
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import { UserWithPassword } from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePermissionsManagement } from "./usePermissionsManagement";
import { userService } from "@/services";
import { useDatabaseConnection } from "@/hooks/useDatabaseConnection";

export const useUserOperations = () => {
  const { isOwner, updateUserPermissions } = useAuth();
  const { getDefaultPermissionsForRole } = usePermissionsManagement();
  const [users, setUsers] = useState<UserWithPassword[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithPassword | null>(null);
  const [newUser, setNewUser] = useState<UserWithPassword>({
    id: "",
    name: "",
    email: "",
    role: "cashier",
    password: "",
    isActive: true
  });
  
  const { isConnected } = useDatabaseConnection();
  const canManageAdmins = isOwner();

  // Fetch users from database on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      if (isConnected) {
        try {
          const fetchedUsers = await userService.getUsers();
          if (fetchedUsers && fetchedUsers.length > 0) {
            setUsers(fetchedUsers);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, [isConnected]);

  const handleAddUser = async () => {
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
    
    try {
      // Generate new user ID
      const userId = uuidv4();
      const userToAdd = { ...newUser, id: userId, isActive: true };
      
      // Save to database
      if (isConnected) {
        await userService.saveUser(userToAdd);
        console.log("User saved successfully:", userToAdd);
        
        // Apply default permissions based on role
        const defaultPermissions = getDefaultPermissionsForRole(newUser.role);
        await userService.updateUserPermissions(userId, defaultPermissions);
        
        // Update UI
        setUsers([...users, userToAdd]);
        
        // Reset form
        setNewUser({
          id: "",
          name: "",
          email: "",
          role: "cashier",
          password: "",
          isActive: true
        });
        
        toast({
          title: "تم إضافة المستخدم",
          description: "تمت إضافة المستخدم بنجاح"
        });
        
        return true;
      } else {
        toast({
          title: "خطأ",
          description: "فشل الاتصال بقاعدة البيانات",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المستخدم",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const handleEditUser = async () => {
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
    
    try {
      // Update in database
      if (isConnected) {
        await userService.updateUser(selectedUser);
        
        // Update UI
        setUsers(users.map(user => 
          user.id === selectedUser.id ? { ...selectedUser } : user
        ));
        
        toast({
          title: "تم تحديث المستخدم",
          description: "تم تحديث بيانات المستخدم بنجاح"
        });
        
        return true;
      } else {
        toast({
          title: "خطأ",
          description: "فشل الاتصال بقاعدة البيانات",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث المستخدم",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const handleDeleteUser = async () => {
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
    
    try {
      // Delete from database
      if (isConnected) {
        await userService.deleteUser(selectedUser.id);
        
        // Update UI
        setUsers(users.filter(user => user.id !== selectedUser.id));
        
        toast({
          title: "تم حذف المستخدم",
          description: "تم حذف المستخدم بنجاح"
        });
        
        return true;
      } else {
        toast({
          title: "خطأ",
          description: "فشل الاتصال بقاعدة البيانات",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المستخدم",
        variant: "destructive"
      });
      return false;
    }
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
