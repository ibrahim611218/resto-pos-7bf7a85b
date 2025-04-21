
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { userService } from "@/services";
import { UserWithPassword } from "../types";

export const useUserCreation = (
  users: UserWithPassword[],
  setUsers: (users: UserWithPassword[]) => void,
  newUser: UserWithPassword,
  setNewUser: (user: UserWithPassword) => void,
  canManageAdmins: boolean,
  getDefaultPermissions: (role: string) => string[]
) => {
  const handleAddUser = async () => {
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
    
    const existingUser = users.find(user => user.email === newUser.email);
    if (existingUser) {
      toast({
        title: "خطأ",
        description: "البريد الإلكتروني موجود بالفعل",
        variant: "destructive"
      });
      return false;
    }
    
    if ((newUser.role === 'admin' || newUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: "خطأ",
        description: "ليس لديك صلاحية لإنشاء مستخدم بهذا الدور",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      const userId = uuidv4();
      const userToAdd: UserWithPassword = { 
        ...newUser, 
        id: userId,
        username: newUser.email.split('@')[0], // Generate username from email
        isActive: true,
        companyId: localStorage.getItem('currentCompanyId') // Associate with current company
      };
      
      const result = await userService.saveUser(userToAdd);
      if (!result.success) {
        throw new Error(result.error || "Failed to save user");
      }
      
      console.log("User saved successfully:", userToAdd);
      
      const defaultPermissions = getDefaultPermissions(newUser.role);
      await userService.updateUserPermissions(userId, defaultPermissions);
      
      setUsers([...users, userToAdd]);
      
      setNewUser({
        id: "",
        username: "",
        name: "",
        email: "",
        role: "cashier",
        password: "",
        isActive: true,
        companyId: userToAdd.companyId
      });
      
      toast({
        title: "تم إضافة المستخدم",
        description: "تمت إضافة المستخدم بنجاح"
      });
      
      return true;
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

  return { handleAddUser };
};
