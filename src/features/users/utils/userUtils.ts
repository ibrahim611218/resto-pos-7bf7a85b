
import { UserRole } from "@/types";

export const getRoleName = (role: UserRole, isArabic: boolean): string => {
  switch (role) {
    case "admin":
      return isArabic ? "مدير" : "Admin";
    case "owner":
      return isArabic ? "مالك" : "Owner";
    case "supervisor":
      return isArabic ? "مشرف" : "Supervisor";
    case "cashier":
      return isArabic ? "كاشير" : "Cashier";
    case "kitchen":
      return isArabic ? "مطبخ" : "Kitchen";
    default:
      return role;
  }
};
