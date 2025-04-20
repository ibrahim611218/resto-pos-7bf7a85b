
import React from "react";
import { Card } from "@/components/ui/card";
import BusinessSettingsForm from "@/features/settings/BusinessSettingsForm";
import { useLanguage } from "@/context/LanguageContext";

const CompanySettings = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4">
      <h1 className={`text-2xl font-bold mb-6 ${isArabic ? "text-right" : "text-left"}`}>
        {isArabic ? "إعدادات الشركة" : "Company Settings"}
      </h1>
      <Card className="p-6">
        <BusinessSettingsForm language={language} />
      </Card>
    </div>
  );
};

export default CompanySettings;
