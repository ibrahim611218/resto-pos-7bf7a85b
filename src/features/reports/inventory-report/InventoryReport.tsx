
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInventoryData } from "./hooks/useInventoryData";
import ReportHeader from "./components/ReportHeader";
import LoadingState from "./components/LoadingState";
import InventoryTable from "./components/InventoryTable";
import ExportButtons from "./components/ExportButtons";
import { handleInventoryPrint } from "./utils/print-utils";
import { useReportsSync } from "@/hooks/useReportsSync";

const InventoryReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { inventoryData, searchTerm, setSearchTerm, refreshInventoryData } = useInventoryData();
  
  // Sync reports with invoices
  useReportsSync();
  
  // Listen for reports data updates
  useEffect(() => {
    const handleReportsUpdate = () => {
      refreshInventoryData();
    };
    
    window.addEventListener('reports-data-updated', handleReportsUpdate);
    return () => window.removeEventListener('reports-data-updated', handleReportsUpdate);
  }, [refreshInventoryData]);
  
  if (!inventoryData || inventoryData.length === 0) {
    return <LoadingState isArabic={isArabic} />;
  }
  
  const handlePrint = () => handleInventoryPrint(inventoryData, isArabic);
  
  return (
    <div className="container p-4">
      <ReportHeader
        itemCount={inventoryData.length}
        isArabic={isArabic}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={refreshInventoryData}
      />
      
      <InventoryTable 
        inventoryData={inventoryData}
        isArabic={isArabic}
        ExportButtons={
          <ExportButtons 
            inventoryData={inventoryData} 
            isArabic={isArabic} 
            onPrint={handlePrint} 
          />
        }
      />
    </div>
  );
};

export default InventoryReport;
