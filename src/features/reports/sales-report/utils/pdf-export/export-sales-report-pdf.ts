
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from "@/hooks/use-toast";
import { ExportPDFProps } from "./types";
import { createPDFDocument, getPDFStyles } from "./config";
import { addReportHeader, addDateRange, addSalesSummaryTitle } from "./sections/header";
import { createTableHeaders, createTableData, renderAutoTable } from "./sections/table";
import { addTotalSales } from "./sections/footer";

/**
 * Creates and saves a PDF report of sales data
 */
export const exportSalesReportPDF = ({
  filteredInvoices,
  totalSales,
  startDate,
  endDate,
  isArabic
}: ExportPDFProps): boolean => {
  try {
    console.log("Starting PDF export, isArabic:", isArabic);
    
    // Create and configure PDF document
    const doc = createPDFDocument(isArabic);
    
    // Get font styles for the document
    const fontStyles = getPDFStyles(isArabic);
    console.log("Font styles:", fontStyles);
    
    // Add report title
    const title = isArabic ? "تقرير المبيعات" : "Sales Report";
    addReportHeader(doc, title, isArabic, fontStyles.font);
    
    // Add date range if available
    addDateRange(doc, startDate, endDate, isArabic, fontStyles.font);
    
    // Add sales summary title
    addSalesSummaryTitle(doc, isArabic, fontStyles.font);
    
    // Create table headers and data
    const headers = createTableHeaders(isArabic);
    const tableData = createTableData(filteredInvoices, isArabic);
    
    // Render the table
    renderAutoTable(doc, headers, tableData, isArabic, fontStyles.font);
    
    // Add total sales
    // @ts-ignore
    const finalY = doc.lastAutoTable.finalY || 150;
    addTotalSales(doc, totalSales, finalY, isArabic, fontStyles.font);
    
    // Force set font again after table rendering
    if (isArabic) {
      doc.setFont('Tajawal');
      doc.setR2L(true);
    }
    
    // Save the PDF document
    doc.save("sales_report.pdf");
    
    // Show success notification
    toast({
      title: isArabic ? "تم التصدير بنجاح" : "Export Successful",
      description: isArabic ? "تم تصدير تقرير المبيعات بنجاح" : "Sales report has been exported successfully",
      variant: "default"
    });
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast({
      title: isArabic ? "خطأ في تصدير التقرير" : "Export Error",
      description: isArabic ? "حدث خطأ أثناء إنشاء ملف PDF" : "An error occurred while creating the PDF file",
      variant: "destructive"
    });
    return false;
  }
};
