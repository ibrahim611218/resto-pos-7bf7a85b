
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Invoice } from "@/types";

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
  // Create new PDF document
  const doc = new jsPDF(isArabic ? "p" : "p", "mm", "a4");
  
  // Add font for Arabic text support
  // This is crucial for proper Arabic text rendering
  doc.addFont("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap", "Tajawal", "normal");
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
    head: [[
      "#",
      isArabic ? "رقم الفاتورة" : "Invoice",
      isArabic ? "التاريخ" : "Date",
      isArabic ? "الحالة" : "Status",
      isArabic ? "طريقة الدفع" : "Payment",
      isArabic ? "نوع الطلب" : "Order Type",
      isArabic ? "المبلغ" : "Amount"
    ]],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [16, 185, 129], fontStyle: 'bold' },
    styles: { 
      font: 'Tajawal',
      fontSize: 10,
      halign: isArabic ? 'right' : 'left',
      textColor: [0, 0, 0]
    },
    margin: { top: 50 }
  });
  
  // Add total sales
  // @ts-ignore
  const finalY = doc.lastAutoTable.finalY || 150;
  doc.setFontSize(14);
  const totalText = `${isArabic ? "إجمالي المبيعات" : "Total Sales"}: ${totalSales.toFixed(2)} ${isArabic ? "ريال" : "SAR"}`;
  doc.text(totalText, isArabic ? 170 : 20, finalY + 10, isArabic ? { align: "right" } : undefined);
  
  // Save the file
  doc.save("sales_report.pdf");
};
