
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import InventoryTable from "./components/InventoryTable";
import ExportButtons from "./components/ExportButtons";
import { useInventoryData } from "./hooks/useInventoryData";

const InventoryReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { inventoryData } = useInventoryData();
  
  // Log component mount and data status - helpful for debugging
  useEffect(() => {
    console.log("InventoryReport rendered, data length:", inventoryData?.length);
    console.log("Language:", language, "isArabic:", isArabic);
  }, [inventoryData, language, isArabic]);
  
  // If no data, render a loading state
  if (!inventoryData || inventoryData.length === 0) {
    return (
      <div className="container p-4 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">
            {isArabic ? "جاري تحميل البيانات..." : "Loading inventory data..."}
          </h3>
          <p className="text-muted-foreground">
            {isArabic ? "يرجى الانتظار" : "Please wait"}
          </p>
        </div>
      </div>
    );
  }
  
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
