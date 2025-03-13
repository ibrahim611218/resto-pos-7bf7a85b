
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { InventoryItem } from "../types";
import { calculateInventoryPercentage } from "./inventory-utils";
import { loadFontsForPDF, getFontStylesForPDF } from "@/assets/fonts";

/**
 * Exports inventory data to PDF
 */
export const exportInventoryReportPDF = (inventoryData: InventoryItem[], isArabic: boolean) => {
  try {
    console.log("Starting inventory PDF export, isArabic:", isArabic);
    
    // Create new PDF document
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      compress: true
    });
    
    // Load proper fonts for the selected language
    loadFontsForPDF(doc, isArabic);
    
    // Get font styles
    const fontStyles = getFontStylesForPDF(isArabic);
    console.log("Inventory report font styles:", fontStyles);
    
    // Add report title
    doc.setFontSize(18);
    doc.setFont(fontStyles.font, 'bold');
    const title = isArabic ? "تقرير المخزون" : "Inventory Report";
    const titleX = isArabic ? doc.internal.pageSize.width - 20 : 20;
    doc.text(title, titleX, 20, { align: isArabic ? "right" : "left" });
    
    // Create headers in the correct language
    const headers = [
      isArabic ? "رقم" : "ID",
      isArabic ? "اسم المنتج" : "Product Name",
      isArabic ? "الكمية" : "Quantity",
      isArabic ? "الوحدة" : "Unit",
      isArabic ? "حد إعادة الطلب" : "Reorder Level",
      isArabic ? "آخر تحديث" : "Last Updated",
      isArabic ? "نسبة المخزون" : "Inventory %"
    ];
    
    // Create table data
    const tableData = inventoryData.map(item => [
      item.id,
      item.name,
      item.quantity.toFixed(2),
      item.unit,
      item.reorderLevel.toString(),
      item.lastUpdated,
      `${calculateInventoryPercentage(item.quantity, item.originalQuantity)}%`
    ]);
    
    // Create the table with autoTable
    // @ts-ignore - jspdf-autotable addition not supported in TypeScript
    doc.autoTable({
      startY: 30,
      head: [headers],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [16, 185, 129], 
        fontStyle: 'bold',
        halign: isArabic ? 'right' : 'left',
        font: fontStyles.font
      },
      styles: { 
        fontSize: 10,
        halign: isArabic ? 'right' : 'left', 
        textColor: [0, 0, 0],
        font: fontStyles.font
      },
      didDrawPage: function(data: any) {
        // Reset RTL setting and font on each page for Arabic
        if (isArabic) {
          doc.setR2L(true);
          doc.setFont(fontStyles.font);
        }
      }
    });
    
    // Force set font again after table rendering to ensure Arabic text displays correctly
    if (isArabic) {
      doc.setFont(fontStyles.font);
      doc.setR2L(true);
    }
    
    // Save the file directly
    doc.save("inventory_report.pdf");
    
    return true;
  } catch (error) {
    console.error("Error generating inventory PDF:", error);
    return false;
  }
};
