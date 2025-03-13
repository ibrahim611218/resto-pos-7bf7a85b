
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import tajawalNormal from '@/assets/fonts/Tajawal-Regular.ttf';
import tajawalBold from '@/assets/fonts/Tajawal-Bold.ttf';

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
    // Create new PDF document with the appropriate orientation
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      compress: true
    });
    
    // Add Arabic font support
    if (isArabic) {
      doc.addFileToVFS('Tajawal-Regular.ttf', tajawalNormal);
      doc.addFileToVFS('Tajawal-Bold.ttf', tajawalBold);
      doc.addFont('Tajawal-Regular.ttf', 'Tajawal', 'normal');
      doc.addFont('Tajawal-Bold.ttf', 'Tajawal', 'bold');
      doc.setFont('Tajawal');
      doc.setR2L(true); // Enable right-to-left for Arabic
    }
    
    // Add report title
    doc.setFontSize(18);
    const title = isArabic ? "تقرير المبيعات" : "Sales Report";
    if (isArabic) {
      doc.text(title, doc.internal.pageSize.width - 20, 20, { align: "right" });
    } else {
      doc.text(title, 20, 20);
    }
    
    doc.setFontSize(12);
    const dateRange = `${isArabic ? "من" : "From"}: ${startDate?.toLocaleDateString()} ${isArabic ? "إلى" : "To"}: ${endDate?.toLocaleDateString()}`;
    if (isArabic) {
      doc.text(dateRange, doc.internal.pageSize.width - 20, 30, { align: "right" });
    } else {
      doc.text(dateRange, 20, 30);
    }
    
    // Add sales summary
    doc.setFontSize(14);
    const summaryTitle = isArabic ? "ملخص المبيعات" : "Sales Summary";
    if (isArabic) {
      doc.text(summaryTitle, doc.internal.pageSize.width - 20, 40, { align: "right" });
    } else {
      doc.text(summaryTitle, 20, 40);
    }
    
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
      
      return [
        (index + 1).toString(),
        invoice.number,
        invDate,
        status,
        invoice.paymentMethod === "cash" ? (isArabic ? "نقدي" : "Cash") : 
        invoice.paymentMethod === "card" ? (isArabic ? "بطاقة" : "Card") : invoice.paymentMethod,
        invoice.orderType === "takeaway" ? (isArabic ? "سفري" : "Takeaway") : 
        invoice.orderType === "dineIn" ? (isArabic ? "محلي" : "Dine In") : (isArabic ? "غير محدد" : "-"),
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
        font: isArabic ? 'Tajawal' : 'Helvetica',
        halign: isArabic ? 'right' : 'left'
      },
      styles: { 
        fontSize: 10,
        halign: isArabic ? 'right' : 'left', 
        textColor: [0, 0, 0],
        font: isArabic ? 'Tajawal' : 'Helvetica',
      },
      margin: { top: 50 },
      didDrawPage: function(data: any) {
        // Ensure RTL support on each page
        if (isArabic) {
          doc.setR2L(true);
        }
      }
    });
    
    // Add total sales
    // @ts-ignore
    const finalY = doc.lastAutoTable.finalY || 150;
    doc.setFontSize(14);
    const totalText = `${isArabic ? "إجمالي المبيعات" : "Total Sales"}: ${totalSales.toFixed(2)} ${isArabic ? "ريال" : "SAR"}`;
    if (isArabic) {
      doc.text(totalText, doc.internal.pageSize.width - 20, finalY + 10, { align: "right" });
    } else {
      doc.text(totalText, 20, finalY + 10);
    }
    
    // Save the file
    doc.save("sales_report.pdf");
    
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
