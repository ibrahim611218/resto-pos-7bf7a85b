
import React from "react";
import InventoryManager from "@/features/inventory/InventoryManager";
import { useLanguage } from "@/context/LanguageContext";

const Inventory = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  return (
    <div className="container mx-auto p-4 overflow-auto h-full" dir={isArabic ? "rtl" : "ltr"}>
      <InventoryManager language={language} />
    </div>
  );
};

export default Inventory;
