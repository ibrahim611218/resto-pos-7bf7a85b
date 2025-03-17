
import React from "react";
import UserManagement from "@/features/users/UserManagement";
import { useLanguage } from "@/context/LanguageContext";

const UserManagementPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <UserManagement />
    </div>
  );
};

export default UserManagementPage;
