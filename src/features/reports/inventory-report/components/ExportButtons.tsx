import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";
import { InventoryItem } from "../types";
import { calculateInventoryPercentage } from "../utils/inventory-utils";
import * as XLSX from "xlsx";
import { toast } from "@/hooks/use-toast";

interface ExportButtonsProps {
  inventoryData: InventoryItem[];
  isArabic: boolean;
  onPrint: () => void;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ inventoryData, isArabic, onPrint }) => {
  const handleExport = () => {
    try {
      // Create headers in the correct language
      const headers = isArabic 
        ? ["رقم", "اسم المنتج", "الكمية", "الوحدة", "حد إعادة الطلب", "آخر تحديث", "نسبة المخزون"]
        : ["ID", "Product Name", "Quantity", "Unit", "Reorder Level", "Last Updated", "Inventory %"];
      
      // Create data rows
      const data = inventoryData.map(item => {
        const displayName = isArabic && item.productNameAr ? item.productNameAr : (item.productName || item.name);
        
        return [
          item.id,
          displayName,
          item.quantity.toFixed(2),
          item.unit || "-",
          item.reorderLevel.toString(),
          new Date(item.lastUpdated).toLocaleDateString(isArabic ? "ar-SA" : "en-US"),
          `${calculateInventoryPercentage(item.quantity, item.originalQuantity)}%`
        ];
      });
      
      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet([]);
      
      // Add title with merged cells
      const titleText = isArabic ? "تقرير المخزون" : "Inventory Report";
      XLSX.utils.sheet_add_aoa(ws, [[titleText]], { origin: "A1" });
      ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];
      
      // Add date
      const dateText = isArabic 
        ? `تاريخ التقرير: ${new Date().toLocaleDateString("ar-SA")}`
        : `Report Date: ${new Date().toLocaleDateString("en-US")}`;
      XLSX.utils.sheet_add_aoa(ws, [[dateText]], { origin: "A3" });
      ws["!merges"] = [...(ws["!merges"] || []), { s: { r: 2, c: 0 }, e: { r: 2, c: 6 } }];
      
      // Add table headers
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A5" });
      
      // Add data rows
      XLSX.utils.sheet_add_aoa(ws, data, { origin: "A6" });
      
      // Set column widths
      ws["!cols"] = [
        { wch: 10 },    // ID
        { wch: 30 },    // Product Name
        { wch: 10 },    // Quantity
        { wch: 10 },    // Unit
        { wch: 15 },    // Reorder Level
        { wch: 15 },    // Last Updated
        { wch: 12 }     // Inventory %
      ];
      
      // Apply styles to cells
      const range = XLSX.utils.decode_range(ws["!ref"] || "A1:G100");
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[cell_ref]) continue;
          
          // Initialize style object if it doesn't exist
          if (!ws[cell_ref].s) ws[cell_ref].s = {};
          
          // Title row - bold, centered, larger font
          if (R === 0) {
            ws[cell_ref].s.font = { bold: true, sz: 16 };
            ws[cell_ref].s.alignment = { horizontal: "center", vertical: "center" };
          }
          // Date row - medium size
          else if (R === 2) {
            ws[cell_ref].s.font = { sz: 12 };
            ws[cell_ref].s.alignment = { horizontal: "center", vertical: "center" };
          }
          // Header row - bold with background color
          else if (R === 4) {
            ws[cell_ref].s.font = { bold: true };
            ws[cell_ref].s.fill = { fgColor: { rgb: "DDDDDD" } };
            ws[cell_ref].s.alignment = { horizontal: isArabic ? "right" : "left", vertical: "center" };
          }
          // Data rows
          else {
            ws[cell_ref].s.alignment = { horizontal: isArabic ? "right" : "left", vertical: "center" };
            
            // Color coding for inventory levels in the percentage column
            if (C === 6 && R > 4) { // Inventory percentage column
              const cellValue = ws[cell_ref].v;
              const percentage = parseInt(cellValue);
              
              if (percentage < 20) {
                ws[cell_ref].s.fill = { fgColor: { rgb: "FFCCCC" } }; // Light red
              } else if (percentage < 50) {
                ws[cell_ref].s.fill = { fgColor: { rgb: "FFFFCC" } }; // Light yellow
              } else {
                ws[cell_ref].s.fill = { fgColor: { rgb: "CCFFCC" } }; // Light green
              }
            }
          }
          
          // Add borders to all cells
          ws[cell_ref].s.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" }
          };
        }
      }
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, isArabic ? "تقرير المخزون" : "Inventory Report");
      
      // Generate filename with date
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `inventory_report_${dateStr}.xlsx`;
      
      // Write file and trigger download
      XLSX.writeFile(wb, filename);
      
      toast({
        title: isArabic ? "تم التصدير بنجاح" : "Export Successful",
        description: isArabic ? "تم تصدير تقرير المخزون بنجاح" : "Inventory report has been exported successfully",
        variant: "default"
      });
      
      return true;
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast({
        title: isArabic ? "خطأ في التصدير" : "Export Error",
        description: isArabic ? "حدث خطأ أثناء تصدير البيانات" : "An error occurred while exporting data",
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <>
      <Button onClick={handleExport}>
        <FileDown className="h-4 w-4 mr-2" />
        {isArabic ? "تصدير Excel" : "Export Excel"}
      </Button>
      <Button onClick={onPrint} variant="outline">
        <Printer className="h-4 w-4 mr-2" />
        {isArabic ? "طباعة" : "Print"}
      </Button>
    </>
  );
};

export default ExportButtons;
