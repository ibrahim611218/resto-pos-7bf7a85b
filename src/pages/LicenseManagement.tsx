
import React from "react";
import LicenseKeyGenerator from "@/features/license/admin/LicenseKeyGenerator";
import { useLanguage } from "@/context/LanguageContext";

const LicenseManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold mb-6">إدارة التراخيص</h1>
      <LicenseKeyGenerator />
    </div>
  );
};

export default LicenseManagement;
