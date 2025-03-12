
import { Invoice } from "@/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Language } from "@/types";

/**
 * Exports sales report to PDF
 */
export const exportReportToPDF = (
  invoices: Invoice[],
  startDate: Date,
  endDate: Date,
  totalSales: number,
  totalTax: number,
  language: Language
): void => {
  const isArabic = language === "ar";
  
  const formatDate = (date: Date): string => {
    return format(date, 'dd/MM/yyyy', { locale: isArabic ? ar : undefined });
  };
  
  const title = isArabic ? "تقرير المبيعات" : "Sales Report";
  const dateRangeText = isArabic 
    ? `الفترة: من ${formatDate(startDate)} إلى ${formatDate(endDate)}`
    : `Period: ${formatDate(startDate)} to ${formatDate(endDate)}`;
  
  const invoiceHeader = isArabic 
    ? ["رقم الفاتورة", "التاريخ", "الكاشير", "المبلغ", "الضريبة", "الإجمالي"]
    : ["Invoice #", "Date", "Cashier", "Amount", "Tax", "Total"];
  
  const totalLabel = isArabic ? "الإجمالي" : "Total";
  const taxLabel = isArabic ? "الضريبة" : "Tax";
  
  let htmlContent = `
    <!DOCTYPE html>
    <html dir="${isArabic ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
        }
        h1 {
          color: #333;
          text-align: center;
        }
        .date-range {
          text-align: center;
          margin-bottom: 20px;
          color: #666;
        }
        .summary {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .summary-box {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 5px;
          width: 45%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .summary-box h3 {
          margin-top: 0;
          color: #555;
        }
        .summary-box p {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin: 5px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px 12px;
          border: 1px solid #ddd;
          text-align: ${isArabic ? 'right' : 'left'};
        }
        th {
          background-color: #f5f5f5;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="date-range">${dateRangeText}</div>
      
      <div class="summary">
        <div class="summary-box">
          <h3>${totalLabel}</h3>
          <p>${totalSales.toFixed(2)}</p>
        </div>
        <div class="summary-box">
          <h3>${taxLabel}</h3>
          <p>${totalTax.toFixed(2)}</p>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            ${invoiceHeader.map(header => `<th>${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
  `;
  
  // Add invoice rows
  invoices.forEach(invoice => {
    const invoiceDate = formatDate(new Date(invoice.date));
    htmlContent += `
      <tr>
        <td>${invoice.number}</td>
        <td>${invoiceDate}</td>
        <td>${invoice.cashierName}</td>
        <td>${invoice.subtotal.toFixed(2)}</td>
        <td>${invoice.taxAmount.toFixed(2)}</td>
        <td>${invoice.total.toFixed(2)}</td>
      </tr>
    `;
  });
  
  htmlContent += `
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  // Create and open the print window
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    console.error("Could not open print window");
    return;
  }
  
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Delay to ensure content is loaded
  setTimeout(() => {
    printWindow.print();
  }, 500);
};
