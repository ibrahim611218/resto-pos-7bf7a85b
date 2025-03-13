
import * as XLSX from "xlsx";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";

interface ExportExcelProps {
  filteredInvoices: Invoice[];
  totalSales: number;
  startDate?: Date;
  endDate?: Date;
  isArabic: boolean;
}

/**
 * Exports sales data to Excel file
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
    
    // Create summary row
    const summaryRow = [
      "",
      "",
      "",
      "",
      "",
      isArabic ? "إجمالي المبيعات" : "Total Sales",
      totalSales.toFixed(2)
    ];
    
    // Add summary row to data
    data.push([]);  // Empty row for spacing
    data.push(summaryRow);
    
    // Create date range information row if available
    if (startDate && endDate) {
      const fromText = isArabic ? "من" : "From";
      const toText = isArabic ? "إلى" : "To";
      const startDateStr = startDate.toLocaleDateString(isArabic ? "ar-SA" : "en-US");
      const endDateStr = endDate.toLocaleDateString(isArabic ? "ar-SA" : "en-US");
      
      const dateRangeRow = [
        isArabic ? `${fromText}: ${startDateStr} ${toText}: ${endDateStr}` : `${fromText}: ${startDateStr} ${toText}: ${endDateStr}`,
        "",
        "",
        "",
        "",
        "",
        ""
      ];
      
      // Add date range row at the beginning
      data.unshift(dateRangeRow);
      data.unshift([]);  // Empty row for spacing
    }
    
    // Add title row at the beginning
    const titleRow = [
      isArabic ? "تقرير المبيعات" : "Sales Report",
      "",
      "",
      "",
      "",
      "",
      ""
    ];
    data.unshift(titleRow);
    
    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    
    // Set RTL mode for Arabic
    if (isArabic) {
      ws["!cols"] = [{ wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
      
      // Set right alignment for all cells
      const range = XLSX.utils.decode_range(ws["!ref"] || "A1:G100");
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[cell_ref]) continue;
          if (!ws[cell_ref].s) ws[cell_ref].s = {};
          ws[cell_ref].s.alignment = { horizontal: "right", vertical: "center" };
        }
      }
    }
    
    // Create workbook and add worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isArabic ? "تقرير المبيعات" : "Sales Report");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "sales_report.xlsx");
    
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
