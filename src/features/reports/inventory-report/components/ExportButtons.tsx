
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { exportToExcel } from "@/utils/reports/export";
import { exportInventoryReportPDF } from "../utils/export-utils";
import { InventoryItem } from "../types";
import { calculateInventoryPercentage } from "../utils/inventory-utils";

interface ExportButtonsProps {
  inventoryData: InventoryItem[];
  isArabic: boolean;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ inventoryData, isArabic }) => {
  const handleExport = () => {
    const headers = isArabic 
      ? ["رقم", "اسم المنتج", "الكمية", "الوحدة", "حد إعادة الطلب", "آخر تحديث", "نسبة المخزون"]
      : ["ID", "Product Name", "Quantity", "Unit", "Reorder Level", "Last Updated", "Inventory %"];
    
    const data = inventoryData.map(item => [
      item.id,
      item.name,
      item.quantity.toFixed(2),
      item.unit,
      item.reorderLevel.toString(),
      item.lastUpdated,
      `${calculateInventoryPercentage(item.quantity, item.originalQuantity)}%`
    ]);
    
    exportToExcel(headers, data, 'inventory_report');
  };
  
  const handleExportPDF = () => {
    exportInventoryReportPDF(inventoryData, isArabic);
  };

  return (
    <>
      <Button onClick={handleExport}>
        <FileDown className="h-4 w-4 mr-2" />
        {isArabic ? "تصدير Excel" : "Export Excel"}
      </Button>
      <Button onClick={handleExportPDF} variant="outline">
        <FileDown className="h-4 w-4 mr-2" />
        {isArabic ? "تصدير PDF" : "Export PDF"}
      </Button>
    </>
  );
};

export default ExportButtons;
