
import { toast } from "@/hooks/use-toast";
import { userService } from "@/services";
import { UserWithPassword } from "../types";

export const useUserModification = (
  users: UserWithPassword[],
  setUsers: (users: UserWithPassword[]) => void,
  selectedUser: UserWithPassword | null,
  canManageAdmins: boolean
) => {
  const handleEditUser = async () => {
    if (!selectedUser) return false;
    
    if (!selectedUser.name || !selectedUser.email) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return false;
    }
    
    if ((selectedUser.role === 'admin' || selectedUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: "خطأ",
        description: "ليس لديك صلاحية لتعديل المستخدم إلى هذا الدور",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      await userService.updateUser(selectedUser);
      
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...selectedUser } : user
      ));
      
      toast({
        title: "تم تحديث المستخدم",
        description: "تم تحديث بيانات المستخدم بنجاح"
      });
      
      return true;
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
    
    if ((selectedUser.role === 'admin' || selectedUser.role === 'owner') && !canManageAdmins) {
      toast({
        title: "خطأ",
        description: "ليس لديك صلاحية لحذف مستخدم بهذا الدور",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      console.log("Deleting user:", selectedUser.id);
      const result = await userService.deleteUser(selectedUser.id);
      console.log("Delete result:", result);
      
      if (result) {
        setUsers(users.filter(user => user.id !== selectedUser.id));
        
        toast({
          title: "تم حذف المستخدم",
          description: "تم حذف المستخدم بنجاح"
        });
        
        return true;
      } else {
        toast({
          title: "خطأ",
          description: "فشلت عملية حذف المستخدم",
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
    handleEditUser,
    handleDeleteUser
  };
};
