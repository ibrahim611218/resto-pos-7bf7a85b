
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { InventoryItem } from "../types";
import { calculateInventoryPercentage } from "./inventory-utils";

/**
 * Exports inventory data to PDF
 */
export const exportInventoryReportPDF = (inventoryData: InventoryItem[], isArabic: boolean) => {
  const doc = new jsPDF(isArabic ? "p" : "p", "mm", "a4");
  
  // Add report title
  doc.setFontSize(18);
  const title = isArabic ? "تقرير المخزون" : "Inventory Report";
  doc.text(title, isArabic ? 170 : 20, 20, isArabic ? { align: "right" } : undefined);
  
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
  
  // Create the table
  // @ts-ignore
  doc.autoTable({
    startY: 30,
    head: [[
      isArabic ? "رقم" : "ID",
      isArabic ? "اسم المنتج" : "Product Name",
      isArabic ? "الكمية" : "Quantity",
      isArabic ? "الوحدة" : "Unit",
      isArabic ? "حد إعادة الطلب" : "Reorder Level",
      isArabic ? "آخر تحديث" : "Last Updated",
      isArabic ? "نسبة المخزون" : "Inventory %"
    ]],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [16, 185, 129] },
    styles: { 
      font: 'helvetica',
      halign: isArabic ? 'right' : 'left',
      textColor: [0, 0, 0]
    }
  });
  
  // Save the file
  doc.save("inventory_report.pdf");
};
