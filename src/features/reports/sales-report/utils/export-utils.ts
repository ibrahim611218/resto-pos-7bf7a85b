
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";

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
    const doc = new jsPDF(isArabic ? "p" : "p", "mm", "a4");
    
    // Add Tajawal font for Arabic support
    doc.addFont("https://cdn.jsdelivr.net/npm/@fontsource/tajawal@4.5.9/files/tajawal-arabic-400-normal.woff", "Tajawal", "normal");
    doc.addFont("https://cdn.jsdelivr.net/npm/@fontsource/tajawal@4.5.9/files/tajawal-arabic-700-normal.woff", "Tajawal", "bold");
    doc.setFont("Tajawal");
    
    // Add report title
    doc.setFontSize(18);
    const title = isArabic ? "تقرير المبيعات" : "Sales Report";
    doc.text(title, isArabic ? 170 : 20, 20, isArabic ? { align: "right" } : undefined);
    
    doc.setFontSize(12);
    const dateRange = `${isArabic ? "من" : "From"}: ${startDate?.toLocaleDateString()} ${isArabic ? "إلى" : "To"}: ${endDate?.toLocaleDateString()}`;
    doc.text(dateRange, isArabic ? 170 : 20, 30, isArabic ? { align: "right" } : undefined);
    
    // Add sales summary
    doc.setFontSize(14);
    doc.text(isArabic ? "ملخص المبيعات" : "Sales Summary", isArabic ? 170 : 20, 40, isArabic ? { align: "right" } : undefined);
    
    // فقط فلترة الفواتير المكتملة (غير المسترجعة) للتقرير
    const completedInvoices = filteredInvoices.filter(invoice => invoice.status !== "refunded");
    
    // إنشاء سطر منفصل للفواتير المسترجعة (إذا كانت موجودة في الفلتر)
    const refundedInvoices = filteredInvoices.filter(invoice => invoice.status === "refunded");
    
    // Create table data for completed invoices
    const completedTableData = completedInvoices.map((invoice, index) => {
      const invDate = new Date(invoice.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US");
      
      return [
        (index + 1).toString(),
        invoice.number,
        invDate,
        isArabic ? "مكتمل" : "Completed",
        invoice.paymentMethod === "cash" ? (isArabic ? "نقدي" : "Cash") : 
        invoice.paymentMethod === "card" ? (isArabic ? "بطاقة" : "Card") : invoice.paymentMethod,
        invoice.orderType === "takeaway" ? (isArabic ? "سفري" : "Takeaway") : 
        invoice.orderType === "dineIn" ? (isArabic ? "محلي" : "Dine In") : (isArabic ? "غير محدد" : "-"),
        invoice.total.toFixed(2)
      ];
    });
    
    // إضافة الفواتير المسترجعة كقسم منفصل (إذا وجدت)
    const refundedTableData = refundedInvoices.map((invoice, index) => {
      const invDate = new Date(invoice.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US");
      
      return [
        (index + 1).toString(),
        invoice.number,
        invDate,
        isArabic ? "مسترجع" : "Refunded",
        invoice.paymentMethod === "cash" ? (isArabic ? "نقدي" : "Cash") : 
        invoice.paymentMethod === "card" ? (isArabic ? "بطاقة" : "Card") : invoice.paymentMethod,
        invoice.orderType === "takeaway" ? (isArabic ? "سفري" : "Takeaway") : 
        invoice.orderType === "dineIn" ? (isArabic ? "محلي" : "Dine In") : (isArabic ? "غير محدد" : "-"),
        "0.00"  // نعرض قيمة صفر للفواتير المسترجعة
      ];
    });
    
    // Create the table with autoTable for completed invoices
    // @ts-ignore - jspdf-autotable addition not supported in TypeScript
    doc.autoTable({
      startY: 50,
      head: [[
        "#",
        isArabic ? "رقم الفاتورة" : "Invoice",
        isArabic ? "التاريخ" : "Date",
        isArabic ? "الحالة" : "Status",
        isArabic ? "طريقة الدفع" : "Payment",
        isArabic ? "نوع الطلب" : "Order Type",
        isArabic ? "المبلغ" : "Amount"
      ]],
      body: [...completedTableData, ...refundedTableData],
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129], fontStyle: 'bold' },
      styles: { 
        fontSize: 10,
        halign: isArabic ? 'right' : 'left',
        textColor: [0, 0, 0],
        font: "Tajawal"
      },
      margin: { top: 50 }
    });
    
    // Add total sales
    // @ts-ignore
    const finalY = doc.lastAutoTable.finalY || 150;
    doc.setFontSize(14);
    const totalText = `${isArabic ? "إجمالي المبيعات" : "Total Sales"}: ${totalSales.toFixed(2)} ${isArabic ? "ريال" : "SAR"}`;
    doc.text(totalText, isArabic ? 170 : 20, finalY + 10, isArabic ? { align: "right" } : undefined);
    
    // إضافة ملاحظة في حالة وجود فواتير مسترجعة
    if (refundedInvoices.length > 0) {
      doc.setFontSize(10);
      const refundedNote = isArabic 
        ? `ملاحظة: تم استبعاد ${refundedInvoices.length} فاتورة مسترجعة من حساب الإجمالي.` 
        : `Note: ${refundedInvoices.length} refunded invoices were excluded from the total.`;
      doc.text(refundedNote, isArabic ? 170 : 20, finalY + 20, isArabic ? { align: "right" } : undefined);
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
