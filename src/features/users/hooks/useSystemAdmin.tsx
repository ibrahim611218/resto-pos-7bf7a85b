
import { useEffect } from "react";
import { UserWithPassword } from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { userService } from "@/services";

const SYSTEM_ADMIN_CREATED_KEY = 'system_admin_initialized';

// بيانات حساب مدير النظام الجديدة
const OWNER_EMAIL = "eng.ibrahimabdalfatah@gmail.com";
const OWNER_PASSWORD = "Ibrahim@1995";
const OWNER_NAME = "إبراهيم عبدالفتاح";

export const useSystemAdmin = (
  users: UserWithPassword[],
  setUsers: React.Dispatch<React.SetStateAction<UserWithPassword[]>>
) => {
  const { allPermissions, updateUserPermissions } = useAuth();

  useEffect(() => {
    // تحقق إذا تم إنشاء حساب مدير النظام بالفعل
    const systemAdminInitialized = localStorage.getItem(SYSTEM_ADMIN_CREATED_KEY);

    // تحقق إذا كان مدير النظام موجود ضمن قائمة المستخدمين
    const systemAdminExists = users.some(user =>
      user.email === OWNER_EMAIL && user.role === "owner"
    );

    console.log("Checking system admin:", { systemAdminExists, systemAdminInitialized });
    console.log("Current users:", users);

    // فقط أنشئ حساب مدير النظام إذا لم يكن قد تم إنشاؤه ولم يوجد في قائمة المستخدمين
    if (!systemAdminInitialized && !systemAdminExists) {
      console.log("Creating system admin account");
      
      const systemAdmin: UserWithPassword = {
        id: "sys-admin-1",
        username: "ibrahim",
        name: OWNER_NAME,
        email: OWNER_EMAIL,
        role: "owner",
        password: OWNER_PASSWORD,
        isActive: true
      };

      // حفظ المستخدم في localStorage مباشرة باستخدام service
      userService.saveUser(systemAdmin).then(success => {
        if (success) {
          console.log("System admin user saved successfully");
          setUsers(prevUsers => [...prevUsers, systemAdmin]);
          
          // أمنح كافة الصلاحيات لمدير النظام
          updateUserPermissions(systemAdmin.id, allPermissions);
          
          // اعلم أنه تم الإنشاء في localStorage
          localStorage.setItem(SYSTEM_ADMIN_CREATED_KEY, 'true');
        }
      }).catch(error => {
        console.error("Error saving system admin:", error);
      });
    }
  }, [users, allPermissions, updateUserPermissions, setUsers]);
};
