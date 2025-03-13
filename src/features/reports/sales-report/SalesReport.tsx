
import React, { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Printer, FileText, FileSpreadsheet } from "lucide-react";
import { useSalesData } from "./hooks/useSalesData";
import { exportSalesReportPDF, exportSalesReportExcel } from "./utils/export-utils";
import FilterCard from "./components/FilterCard";
import SummaryCards from "./components/SummaryCards";
import ChartsTabs from "./components/ChartsTabs";

const CHART_COLORS = [
  "#10B981", // Green
  "#3B82F6", // Blue
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
];

const SalesReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const printableAreaRef = useRef<HTMLDivElement>(null);
  
  const {
    uniqueUsers,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    paymentMethod,
    setPaymentMethod,
    orderType,
    setOrderType,
    cashier,
    setCashier,
    includeRefunded,
    setIncludeRefunded,
    filteredInvoices,
    totalSales,
    salesByPaymentMethod,
    salesByOrderType,
    topSellingProducts,
    resetFilters
  } = useSalesData({ language });
  
  const handlePrint = () => {
    const printContent = document.getElementById('printable-report');
    const originalContents = document.body.innerHTML;
    
    if (printContent) {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert(isArabic ? 'يرجى السماح بالنوافذ المنبثقة لهذا الموقع' : 'Please allow popups for this site');
        return;
      }
      
      // Create HTML content for printing
      const printableHTML = `
        <html dir="${isArabic ? 'rtl' : 'ltr'}">
        <head>
          <title>${isArabic ? 'تقرير المبيعات' : 'Sales Report'}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              direction: ${isArabic ? 'rtl' : 'ltr'};
            }
            .report-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .date-range {
              text-align: center;
              margin-bottom: 15px;
              font-size: 14px;
            }
            .summary-cards {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              flex-wrap: wrap;
            }
            .summary-card {
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 5px;
              width: 30%;
              margin-bottom: 10px;
            }
            .card-title {
              font-size: 14px;
              color: #666;
              margin-bottom: 5px;
            }
            .card-value {
              font-size: 24px;
              font-weight: bold;
            }
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .invoice-table th, .invoice-table td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: ${isArabic ? 'right' : 'left'};
            }
            .invoice-table th {
              background-color: #f2f2f2;
            }
            .total-row {
              font-weight: bold;
            }
            @media print {
              .page-break {
                page-break-before: always;
              }
            }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h1>${isArabic ? 'تقرير المبيعات' : 'Sales Report'}</h1>
          </div>
          ${startDate && endDate ? `
            <div class="date-range">
              ${isArabic ? 'الفترة من' : 'Period from'} 
              ${startDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')} 
              ${isArabic ? 'إلى' : 'to'} 
              ${endDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
            </div>
          ` : ''}
          
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
    }
  };
  
  const handleExportPDF = () => {
    exportSalesReportPDF({
      filteredInvoices,
      totalSales,
      startDate,
      endDate,
      isArabic
    });
  };
  
  const handleExportExcel = () => {
    exportSalesReportExcel({
      filteredInvoices,
      totalSales,
      startDate,
      endDate,
      isArabic
    });
  };
  
  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isArabic ? "تقرير المبيعات" : "Sales Report"}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            {isArabic ? "طباعة" : "Print"}
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <FileText className="h-4 w-4 mr-2" />
            {isArabic ? "تصدير PDF" : "Export PDF"}
          </Button>
          <Button onClick={handleExportExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            {isArabic ? "تصدير Excel" : "Export Excel"}
          </Button>
        </div>
      </div>
      
      <div id="printable-report" ref={printableAreaRef}>
        <FilterCard
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          orderType={orderType}
          setOrderType={setOrderType}
          cashier={cashier}
          setCashier={setCashier}
          includeRefunded={includeRefunded}
          setIncludeRefunded={setIncludeRefunded}
          resetFilters={resetFilters}
          uniqueUsers={uniqueUsers}
          isArabic={isArabic}
        />
        
        <SummaryCards
          totalSales={totalSales}
          filteredInvoices={filteredInvoices}
          isArabic={isArabic}
        />
        
        <ChartsTabs
          salesByPaymentMethod={salesByPaymentMethod}
          salesByOrderType={salesByOrderType}
          topSellingProducts={topSellingProducts}
          filteredInvoices={filteredInvoices}
          chartColors={CHART_COLORS}
          isArabic={isArabic}
        />
      </div>
      
      <div className="saudi-decoration"></div>
      <div className="saudi-decoration-top"></div>
    </div>
  );
};

export default SalesReport;
