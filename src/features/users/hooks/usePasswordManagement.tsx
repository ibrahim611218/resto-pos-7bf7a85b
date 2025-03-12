
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { UserWithPassword } from "../types";

export const usePasswordManagement = (
  users: UserWithPassword[],
  setUsers: (users: UserWithPassword[]) => void,
  selectedUser: UserWithPassword | null
) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword
  };
};
