
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import { loadFontsForPDF, getFontStylesForPDF } from "@/assets/fonts";

interface ExportPDFProps {
  filteredInvoices: Invoice[];
  totalSales: number;
  startDate?: Date;
  endDate?: Date;
  isArabic: boolean;
}

/**
 * Creates and saves a PDF report of sales data
 */
export const exportSalesReportPDF = ({
  filteredInvoices,
  totalSales,
  startDate,
  endDate,
  isArabic
}: ExportPDFProps) => {
  try {
    console.log("Starting PDF export, isArabic:", isArabic);
    
    // Create new PDF document with the appropriate orientation
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      compress: true
    });
    
    // Load proper fonts for the selected language
    loadFontsForPDF(doc, isArabic);
    
    // Get font styles for the document
    const fontStyles = getFontStylesForPDF(isArabic);
    console.log("Font styles:", fontStyles);
    
    // Add report title
    doc.setFontSize(18);
    doc.setFont(fontStyles.font, 'bold');
    const title = isArabic ? "تقرير المبيعات" : "Sales Report";
    const titleX = isArabic ? doc.internal.pageSize.width - 20 : 20;
    doc.text(title, titleX, 20, { align: isArabic ? "right" : "left" });
    
    // Add date range if available
    if (startDate && endDate) {
      doc.setFontSize(12);
      doc.setFont(fontStyles.font, 'normal');
      const fromText = isArabic ? "من" : "From";
      const toText = isArabic ? "إلى" : "To";
      const startDateStr = startDate.toLocaleDateString(isArabic ? "ar-SA" : "en-US");
      const endDateStr = endDate.toLocaleDateString(isArabic ? "ar-SA" : "en-US");
      const dateRange = `${fromText}: ${startDateStr} ${toText}: ${endDateStr}`;
      const dateX = isArabic ? doc.internal.pageSize.width - 20 : 20;
      doc.text(dateRange, dateX, 30, { align: isArabic ? "right" : "left" });
    }
    
    // Add sales summary
    doc.setFontSize(14);
    doc.setFont(fontStyles.font, 'bold');
    const summaryTitle = isArabic ? "ملخص المبيعات" : "Sales Summary";
    const summaryX = isArabic ? doc.internal.pageSize.width - 20 : 20;
    doc.text(summaryTitle, summaryX, 40, { align: isArabic ? "right" : "left" });
    
    // Create table headers in the correct language
    const headers = [
      "#",
      isArabic ? "رقم الفاتورة" : "Invoice",
      isArabic ? "التاريخ" : "Date",
      isArabic ? "الحالة" : "Status",
      isArabic ? "طريقة الدفع" : "Payment",
      isArabic ? "نوع الطلب" : "Order Type",
      isArabic ? "المبلغ" : "Amount"
    ];
    
    // Create table data
    const tableData = filteredInvoices.map((invoice, index) => {
      const invDate = new Date(invoice.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US");
      const status = invoice.status === "refunded" ? (isArabic ? "مسترجع" : "Refunded") : (isArabic ? "مكتمل" : "Completed");
      
      let paymentMethod = invoice.paymentMethod;
      if (paymentMethod === "cash") {
        paymentMethod = isArabic ? "نقدي" : "Cash";
      } else if (paymentMethod === "card") {
        paymentMethod = isArabic ? "بطاقة" : "Card";
      }
      
      let orderType = invoice.orderType || "-";
      if (orderType === "takeaway") {
        orderType = isArabic ? "سفري" : "Takeaway"; 
      } else if (orderType === "dineIn") {
        orderType = isArabic ? "محلي" : "Dine In";
      } else {
        orderType = isArabic ? "غير محدد" : "-";
      }
      
      return [
        (index + 1).toString(),
        invoice.number,
        invDate,
        status,
        paymentMethod,
        orderType,
        invoice.total.toFixed(2)
      ];
    });
    
    // Create the table with autoTable
    // @ts-ignore - jspdf-autotable addition not supported in TypeScript
    doc.autoTable({
      startY: 50,
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
      margin: { top: 50 },
      didDrawPage: function(data: any) {
        // Reset RTL setting and font on each page for Arabic
        if (isArabic) {
          doc.setR2L(true);
          doc.setFont(fontStyles.font);
        }
      }
    });
    
    // Add total sales
    // @ts-ignore
    const finalY = doc.lastAutoTable.finalY || 150;
    doc.setFontSize(14);
    doc.setFont(fontStyles.font, 'bold');
    const totalText = `${isArabic ? "إجمالي المبيعات" : "Total Sales"}: ${totalSales.toFixed(2)} ${isArabic ? "ريال" : "SAR"}`;
    const totalX = isArabic ? doc.internal.pageSize.width - 20 : 20;
    doc.text(totalText, totalX, finalY + 10, { align: isArabic ? "right" : "left" });
    
    // Direct method - should work in most cases
    doc.save("sales_report.pdf");
    
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
