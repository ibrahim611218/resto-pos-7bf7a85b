import * as XLSX from "xlsx";
import { Invoice, PaymentMethod } from "@/types";
import { toast } from "@/hooks/use-toast";

interface ExportExcelProps {
  filteredInvoices: Invoice[];
  totalSales: number;
  startDate?: Date;
  endDate?: Date;
  isArabic: boolean;
}

/**
 * Exports sales data to Excel file with improved formatting
 */
export const exportSalesReportExcel = ({
  filteredInvoices,
  totalSales,
  startDate,
  endDate,
  isArabic
}: ExportExcelProps) => {
  try {
    // Create headers in the correct language
    const headers = [
      isArabic ? "الرقم" : "#",
      isArabic ? "رقم الفاتورة" : "Invoice",
      isArabic ? "التاريخ" : "Date",
      isArabic ? "الحالة" : "Status",
      isArabic ? "طريقة الدفع" : "Payment",
      isArabic ? "نوع الطلب" : "Order Type",
      isArabic ? "المبلغ" : "Amount"
    ];
    
    // Create data rows
    const data = filteredInvoices.map((invoice, index) => {
      const invDate = new Date(invoice.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US");
      const status = invoice.status === "refunded" ? (isArabic ? "مسترجع" : "Refunded") : (isArabic ? "مكتمل" : "Completed");
      
      // Format payment method for display only (not changing the actual type)
      let displayPaymentMethod: string = invoice.paymentMethod;
      if (invoice.paymentMethod === "cash") {
        displayPaymentMethod = isArabic ? "نقدي" : "Cash";
      } else if (invoice.paymentMethod === "card") {
        displayPaymentMethod = isArabic ? "بطاقة" : "Card";
      } else if (invoice.paymentMethod === "transfer") {
        displayPaymentMethod = isArabic ? "تحويل" : "Transfer";
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
        displayPaymentMethod,
        orderType,
        invoice.total.toFixed(2)
      ];
    });
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);
    
    // Add title with merged cells
    XLSX.utils.sheet_add_aoa(ws, [[isArabic ? "تقرير المبيعات" : "Sales Report"]], { origin: "A1" });
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];
    
    // Add date range if available
    let rowIndex = 2; // Start after title row
    if (startDate && endDate) {
      const dateRangeText = isArabic 
        ? `الفترة من: ${startDate.toLocaleDateString(isArabic ? "ar-SA" : "en-US")} إلى: ${endDate.toLocaleDateString(isArabic ? "ar-SA" : "en-US")}`
        : `Period: ${startDate.toLocaleDateString("en-US")} to ${endDate.toLocaleDateString("en-US")}`;
      
      XLSX.utils.sheet_add_aoa(ws, [[dateRangeText]], { origin: `A${rowIndex}` });
      ws["!merges"] = [...(ws["!merges"] || []), { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } }];
      rowIndex += 2; // Leave empty row after date range
    } else {
      rowIndex += 1; // Just leave one row after title
    }
    
    // Add table headers
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: `A${rowIndex}` });
    rowIndex++;
    
    // Add data rows
    XLSX.utils.sheet_add_aoa(ws, data, { origin: `A${rowIndex}` });
    rowIndex += data.length + 1; // Add rows plus an empty row
    
    // Add summary/total row
    const summaryRow = [
      "", "", "", "", "",
      isArabic ? "إجمالي المبيعات" : "Total Sales",
      totalSales.toFixed(2)
    ];
    XLSX.utils.sheet_add_aoa(ws, [summaryRow], { origin: `A${rowIndex}` });
    
    // Set column widths
    ws["!cols"] = [
      { wch: 8 },     // # 
      { wch: 15 },    // Invoice
      { wch: 15 },    // Date
      { wch: 15 },    // Status
      { wch: 15 },    // Payment
      { wch: 15 },    // Order Type
      { wch: 15 }     // Amount
    ];
    
    // Apply styles to cells
    const range = XLSX.utils.decode_range(ws["!ref"] || "A1:G100");
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cell_ref]) continue;
        
        // Initialize style object if it doesn't exist
        if (!ws[cell_ref].s) ws[cell_ref].s = {};
        
        // Title row - bold, centered
        if (R === 0 || R === rowIndex - data.length - 1) {
          ws[cell_ref].s.font = { bold: true, sz: 14 };
          ws[cell_ref].s.alignment = { horizontal: "center", vertical: "center" };
        }
        // Header row - bold, with background color
        else if (R === rowIndex - data.length - 2) {
          ws[cell_ref].s.font = { bold: true };
          ws[cell_ref].s.fill = { fgColor: { rgb: "DDDDDD" } };
          ws[cell_ref].s.alignment = { horizontal: isArabic ? "right" : "left", vertical: "center" };
        }
        // Total row - bold
        else if (R === rowIndex) {
          ws[cell_ref].s.font = { bold: true };
          ws[cell_ref].s.alignment = { horizontal: "right", vertical: "center" };
        }
        // Data rows
        else {
          ws[cell_ref].s.alignment = { horizontal: isArabic ? "right" : "left", vertical: "center" };
        }
        
        // Add borders to all cells
        ws[cell_ref].s.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" }
        };
      }
    }
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, isArabic ? "تقرير المبيعات" : "Sales Report");
    
    // Generate Excel file with date in filename and trigger download
    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `sales_report_${dateStr}.xlsx`);
    
    toast({
      title: isArabic ? "تم التصدير بنجاح" : "Export Successful",
      description: isArabic ? "تم تصدير تقرير المبيعات بنجاح" : "Sales report has been exported successfully",
      variant: "default"
    });
    
    return true;
  } catch (error) {
    console.error("Error generating Excel:", error);
    toast({
      title: isArabic ? "خطأ في تصدير التقرير" : "Export Error",
      description: isArabic ? "حدث خطأ أثناء إنشاء ملف Excel" : "An error occurred while creating the Excel file",
      variant: "destructive"
    });
    return false;
  }
};
