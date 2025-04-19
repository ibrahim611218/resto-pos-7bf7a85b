
import React from "react";
import PurchasesList from "@/features/purchases/PurchasesList";
import { useLanguage } from "@/context/LanguageContext";

const Purchases: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <PurchasesList language={language} />
    </div>
  );
};

export default Purchases;
