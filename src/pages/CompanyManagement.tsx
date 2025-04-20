
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import CompanyManagementComponent from "@/features/companies/CompanyManagement";

const CompanyManagementPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <CompanyManagementComponent />
    </div>
  );
};

export default CompanyManagementPage;
