
import React from "react";
import InventoryReport from "@/features/reports/inventory-report/InventoryReport";
import { useLanguage } from "@/context/LanguageContext";

const InventoryReportPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      <InventoryReport />
    </div>
  );
};

export default InventoryReportPage;
