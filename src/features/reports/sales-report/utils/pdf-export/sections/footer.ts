
import { jsPDF } from "jspdf";

/**
 * Adds total sales to PDF document
 */
export const addTotalSales = (
  doc: jsPDF, 
  totalSales: number, 
  finalY: number, 
  isArabic: boolean, 
  fontFamily: string
): void => {
  doc.setFontSize(14);
  doc.setFont(fontFamily, 'bold');
  const totalText = `${isArabic ? "إجمالي المبيعات" : "Total Sales"}: ${totalSales.toFixed(2)} ${isArabic ? "ريال" : "SAR"}`;
  const totalX = isArabic ? doc.internal.pageSize.width - 20 : 20;
  doc.text(totalText, totalX, finalY + 10, { align: isArabic ? "right" : "left" });
};
