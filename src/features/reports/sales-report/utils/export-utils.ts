
import { exportSalesReportExcel } from './excel-export';
import { Invoice } from "@/types";

/**
 * Creates a printable version of the report in a new window
 */
export const printSalesReport = ({
  filteredInvoices,
  totalSales,
  startDate,
  endDate,
  isArabic
}: {
  filteredInvoices: Invoice[];
  totalSales: number;
  startDate?: Date;
  endDate?: Date;
  isArabic: boolean;
}) => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert(isArabic ? 'يرجى السماح بالنوافذ المنبثقة لهذا الموقع' : 'Please allow popups for this site');
    return;
  }
  
  // Create HTML content for printing with better styling
  const printableHTML = `
    <html dir="${isArabic ? 'rtl' : 'ltr'}">
    <head>
      <title>${isArabic ? 'تقرير المبيعات' : 'Sales Report'}</title>
      <style>
        @media print {
          @page { 
            size: A4;
            margin: 1cm;
          }
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            direction: ${isArabic ? 'rtl' : 'ltr'};
            color: #333;
          }
          .report-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #10B981;
            padding-bottom: 15px;
          }
          .report-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #10B981;
          }
          .date-range {
            text-align: center;
            margin-bottom: 20px;
            font-size: 14px;
            color: #666;
          }
          .summary-cards {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }
          .summary-card {
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
            width: 30%;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          .card-title {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
          }
          .card-value {
            font-size: 22px;
            font-weight: bold;
            color: #10B981;
          }
          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            margin-bottom: 30px;
          }
          .invoice-table th, .invoice-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: ${isArabic ? 'right' : 'left'};
          }
          .invoice-table th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          .invoice-table tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .total-row {
            font-weight: bold;
            background-color: #eafbf4 !important;
          }
          .total-row td {
            border-top: 2px solid #10B981;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 10px;
          }
          .page-break {
            page-break-before: always;
          }
          table {
            page-break-inside: auto;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          thead {
            display: table-header-group;
          }
        }
      </style>
    </head>
    <body>
      <div class="report-header">
        <div class="report-title">${isArabic ? 'تقرير المبيعات' : 'Sales Report'}</div>
        ${startDate && endDate ? `
          <div class="date-range">
            ${isArabic ? 'الفترة من' : 'Period from'} 
            ${startDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')} 
            ${isArabic ? 'إلى' : 'to'} 
            ${endDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
          </div>
        ` : ''}
      </div>
      
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-title">${isArabic ? 'إجمالي المبيعات' : 'Total Sales'}</div>
          <div class="card-value">${totalSales.toFixed(2)} ${isArabic ? 'ريال' : 'SAR'}</div>
        </div>
        <div class="summary-card">
          <div class="card-title">${isArabic ? 'عدد الفواتير' : 'Invoice Count'}</div>
          <div class="card-value">${filteredInvoices.length}</div>
        </div>
        <div class="summary-card">
          <div class="card-title">${isArabic ? 'متوسط قيمة الفاتورة' : 'Average Invoice'}</div>
          <div class="card-value">
            ${filteredInvoices.length ? (totalSales / filteredInvoices.length).toFixed(2) : '0'} 
            ${isArabic ? 'ريال' : 'SAR'}
          </div>
        </div>
      </div>
      
      <table class="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>${isArabic ? 'رقم الفاتورة' : 'Invoice'}</th>
            <th>${isArabic ? 'التاريخ' : 'Date'}</th>
            <th>${isArabic ? 'طريقة الدفع' : 'Payment'}</th>
            <th>${isArabic ? 'نوع الطلب' : 'Order Type'}</th>
            <th>${isArabic ? 'الحالة' : 'Status'}</th>
            <th>${isArabic ? 'المبلغ' : 'Amount'}</th>
          </tr>
        </thead>
        <tbody>
          ${filteredInvoices.map((invoice, index) => {
            const invDate = new Date(invoice.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US');
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
            
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${invoice.number}</td>
                <td>${invDate}</td>
                <td>${paymentMethod}</td>
                <td>${orderType}</td>
                <td>${status}</td>
                <td>${invoice.total.toFixed(2)} ${isArabic ? 'ريال' : 'SAR'}</td>
              </tr>
            `;
          }).join('')}
          <tr class="total-row">
            <td colspan="6" style="text-align: ${isArabic ? 'left' : 'right'}">
              ${isArabic ? 'المجموع' : 'Total'}
            </td>
            <td>${totalSales.toFixed(2)} ${isArabic ? 'ريال' : 'SAR'}</td>
          </tr>
        </tbody>
      </table>
      
      <div class="footer">
        ${isArabic ? 'تم إنشاؤه في' : 'Generated on'} ${new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
      </div>
    </body>
    </html>
  `;
  
  // Write the HTML to the new window and print it
  printWindow.document.open();
  printWindow.document.write(printableHTML);
  printWindow.document.close();
  
  // Wait for resources to load before printing
  printWindow.onload = function() {
    printWindow.print();
    // Don't close the window to allow the user to see the print dialog
  };
};

export { exportSalesReportExcel };
