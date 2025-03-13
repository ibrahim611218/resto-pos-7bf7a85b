
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import InventoryTable from "./components/InventoryTable";
import ExportButtons from "./components/ExportButtons";
import { useInventoryData } from "./hooks/useInventoryData";

const InventoryReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { inventoryData } = useInventoryData();
  
  return (
    <div className="container p-4">
      <InventoryTable 
        inventoryData={inventoryData}
        isArabic={isArabic}
        ExportButtons={<ExportButtons inventoryData={inventoryData} isArabic={isArabic} />}
      />
    </div>
  );
};

export default InventoryReport;
