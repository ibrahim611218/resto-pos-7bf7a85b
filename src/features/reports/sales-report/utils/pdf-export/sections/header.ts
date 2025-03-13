
import { jsPDF } from "jspdf";

/**
 * Adds report header to PDF document
 */
export const addReportHeader = (
  doc: jsPDF, 
  title: string, 
  isArabic: boolean, 
  fontFamily: string
): void => {
  doc.setFontSize(18);
  doc.setFont(fontFamily, 'bold');
  const titleX = isArabic ? doc.internal.pageSize.width - 20 : 20;
  doc.text(title, titleX, 20, { align: isArabic ? "right" : "left" });
};

/**
 * Adds date range to PDF document
 */
export const addDateRange = (
  doc: jsPDF, 
  startDate: Date | undefined, 
  endDate: Date | undefined, 
  isArabic: boolean, 
  fontFamily: string
): void => {
  if (startDate && endDate) {
    doc.setFontSize(12);
    doc.setFont(fontFamily, 'normal');
    const fromText = isArabic ? "من" : "From";
    const toText = isArabic ? "إلى" : "To";
    const startDateStr = startDate.toLocaleDateString(isArabic ? "ar-SA" : "en-US");
    const endDateStr = endDate.toLocaleDateString(isArabic ? "ar-SA" : "en-US");
    const dateRange = `${fromText}: ${startDateStr} ${toText}: ${endDateStr}`;
    const dateX = isArabic ? doc.internal.pageSize.width - 20 : 20;
    doc.text(dateRange, dateX, 30, { align: isArabic ? "right" : "left" });
  }
};

/**
 * Adds sales summary title to PDF document
 */
export const addSalesSummaryTitle = (
  doc: jsPDF, 
  isArabic: boolean, 
  fontFamily: string
): void => {
  doc.setFontSize(14);
  doc.setFont(fontFamily, 'bold');
  const summaryTitle = isArabic ? "ملخص المبيعات" : "Sales Summary";
  const summaryX = isArabic ? doc.internal.pageSize.width - 20 : 20;
  doc.text(summaryTitle, summaryX, 40, { align: isArabic ? "right" : "left" });
};
