
import React from "react";
import VatReport from "@/features/reports/vat-report/VatReport";
import { useLanguage } from "@/context/LanguageContext";

const VatReportPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <VatReport />
    </div>
  );
};

export default VatReportPage;
