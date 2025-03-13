
import { jsPDF } from "jspdf";
import { Invoice } from "@/types";

/**
 * Creates table headers for PDF document
 */
export const createTableHeaders = (isArabic: boolean): string[] => {
  return [
    "#",
    isArabic ? "رقم الفاتورة" : "Invoice",
    isArabic ? "التاريخ" : "Date",
    isArabic ? "الحالة" : "Status",
    isArabic ? "طريقة الدفع" : "Payment",
    isArabic ? "نوع الطلب" : "Order Type",
    isArabic ? "المبلغ" : "Amount"
  ];
};

/**
 * Creates table data from invoices
 */
export const createTableData = (
  filteredInvoices: Invoice[], 
  isArabic: boolean
): (string | number)[][] => {
  return filteredInvoices.map((invoice, index) => {
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
};

/**
 * Renders the auto table in the PDF document
 */
export const renderAutoTable = (
  doc: jsPDF, 
  headers: string[], 
  tableData: (string | number)[][], 
  isArabic: boolean, 
  fontFamily: string
): void => {
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
      font: fontFamily
    },
    styles: { 
      fontSize: 10,
      halign: isArabic ? 'right' : 'left', 
      textColor: [0, 0, 0],
      font: fontFamily
    },
    margin: { top: 50 },
    didDrawPage: function(data: any) {
      // Reset RTL setting and font on each page for Arabic
      if (isArabic) {
        doc.setR2L(true);
        doc.setFont(fontFamily);
      }
    },
    didDrawCell: function(data: any) {
      // Ensure font is maintained after each cell draw for Arabic
      if (isArabic && data.row.section === 'body') {
        doc.setFont(fontFamily);
        doc.setR2L(true);
      }
    }
  });
};
