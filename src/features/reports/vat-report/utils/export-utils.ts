
import { VatReportItem } from '@/types';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

export const printVatReport = (report: VatReportItem, isArabic: boolean) => {
  const locale = isArabic ? ar : enUS;
  
  const formatDate = (dateValue: string | Date) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return format(date, 'PPP', { locale });
  };
  
  const getPeriodTypeText = (type: string) => {
    switch (type) {
      case 'monthly': return isArabic ? 'شهري' : 'Monthly';
      case 'quarterly': return isArabic ? 'ربع سنوي' : 'Quarterly';
      case 'annual': return isArabic ? 'سنوي' : 'Annual';
      default: return type;
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(isArabic ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR'
    }).format(value);
  };

  // Create print window
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert(isArabic ? 'يرجى السماح بالنوافذ المنبثقة للطباعة' : 'Please allow popups to print');
    return;
  }
  
  // Document direction
  const direction = isArabic ? 'rtl' : 'ltr';
  const textAlign = isArabic ? 'right' : 'left';
  
  // Print content HTML
  const printContent = `
    <!DOCTYPE html>
    <html lang="${isArabic ? 'ar' : 'en'}" dir="${direction}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isArabic ? 'تقرير ضريبة القيمة المضافة' : 'VAT Report'}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          direction: ${direction};
        }
        .report-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .report-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .report-period {
          font-size: 16px;
          margin-bottom: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          text-align: ${textAlign};
          padding: 10px;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f0f0f0;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin: 20px 0 10px 0;
        }
        .total-row td {
          font-weight: bold;
          background-color: #f9f9f9;
        }
        .text-right {
          text-align: right;
        }
        .text-center {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="report-header">
        <div class="report-title">${isArabic ? 'تقرير ضريبة القيمة المضافة' : 'VAT Report'}</div>
        <div class="report-period">${isArabic ? 'الفترة:' : 'Period:'} ${formatDate(report.period.startDate)} - ${formatDate(report.period.endDate)}</div>
        <div class="report-period">${isArabic ? 'نوع التقرير:' : 'Report Type:'} ${getPeriodTypeText(report.period.type)}</div>
      </div>
      
      <div class="section-title">${isArabic ? 'ملخص الضريبة' : 'Tax Summary'}</div>
      <table>
        <thead>
          <tr>
            <th>${isArabic ? 'البيان' : 'Description'}</th>
            <th class="text-right">${isArabic ? 'المبلغ الخاضع للضريبة' : 'Taxable Amount'}</th>
            <th class="text-right">${isArabic ? 'قيمة الضريبة' : 'Tax Amount'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${isArabic ? 'المبيعات' : 'Sales'}</td>
            <td class="text-right">${formatCurrency(report.totalSalesBeforeTax)}</td>
            <td class="text-right">${formatCurrency(report.salesTax)}</td>
          </tr>
          <tr>
            <td>${isArabic ? 'المشتريات' : 'Purchases'}</td>
            <td class="text-right">${formatCurrency(report.totalPurchasesBeforeTax)}</td>
            <td class="text-right">${formatCurrency(report.purchasesTax)}</td>
          </tr>
          <tr class="total-row">
            <td>${isArabic ? 'صافي الضريبة المستحقة' : 'Net Tax Due'}</td>
            <td class="text-right">-</td>
            <td class="text-right">${formatCurrency(report.netTaxDue)}</td>
          </tr>
        </tbody>
      </table>
      
      <div class="text-center" style="margin-top: 40px; font-size: 12px; color: #666;">
        ${isArabic ? 'تم إنشاء هذا التقرير بتاريخ' : 'This report was generated on'} ${new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
      </div>
      
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;
  
  // Write content to print window
  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();
};

export const exportVatReportToExcel = (report: VatReportItem, isArabic: boolean) => {
  const locale = isArabic ? ar : enUS;
  
  const formatDate = (dateValue: string | Date) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return format(date, 'PPP', { locale });
  };
  
  const getPeriodTypeText = (type: string) => {
    switch (type) {
      case 'monthly': return isArabic ? 'شهري' : 'Monthly';
      case 'quarterly': return isArabic ? 'ربع سنوي' : 'Quarterly';
      case 'annual': return isArabic ? 'سنوي' : 'Annual';
      default: return type;
    }
  };
  
  // Create worksheet data
  const wsData = [
    [isArabic ? 'تقرير ضريبة القيمة المضافة' : 'VAT Report'],
    [isArabic ? 'الفترة' : 'Period', `${formatDate(report.period.startDate)} - ${formatDate(report.period.endDate)}`],
    [isArabic ? 'نوع التقرير' : 'Report Type', getPeriodTypeText(report.period.type)],
    [],
    [isArabic ? 'البيان' : 'Description', isArabic ? 'المبلغ الخاضع للضريبة' : 'Taxable Amount', isArabic ? 'قيمة الضريبة' : 'Tax Amount'],
    [isArabic ? 'المبيعات' : 'Sales', report.totalSalesBeforeTax, report.salesTax],
    [isArabic ? 'المشتريات' : 'Purchases', report.totalPurchasesBeforeTax, report.purchasesTax],
    [isArabic ? 'صافي الضريبة المستحقة' : 'Net Tax Due', '', report.netTaxDue]
  ];
  
  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, isArabic ? 'تقرير ضريبة القيمة المضافة' : 'VAT Report');
  
  // Set column widths
  const colWidths = [{ wch: 30 }, { wch: 20 }, { wch: 20 }];
  ws['!cols'] = colWidths;
  
  // Generate Excel file
  const fileName = `VAT_Report_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

export const exportVatReportToPdf = (report: VatReportItem, isArabic: boolean) => {
  const locale = isArabic ? ar : enUS;
  
  const formatDate = (dateValue: string | Date) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return format(date, 'PPP', { locale });
  };
  
  const getPeriodTypeText = (type: string) => {
    switch (type) {
      case 'monthly': return isArabic ? 'شهري' : 'Monthly';
      case 'quarterly': return isArabic ? 'ربع سنوي' : 'Quarterly';
      case 'annual': return isArabic ? 'سنوي' : 'Annual';
      default: return type;
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(isArabic ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR'
    }).format(value);
  };

  // Create PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true
  });
  
  // Set right-to-left for Arabic
  if (isArabic) {
    doc.setR2L(true);
  }
  
  // Add title
  doc.setFontSize(18);
  doc.text(
    isArabic ? 'تقرير ضريبة القيمة المضافة' : 'VAT Report',
    isArabic ? doc.internal.pageSize.width - 20 : 20,
    20,
    { align: isArabic ? 'right' : 'left' }
  );
  
  // Add period and report type
  doc.setFontSize(12);
  doc.text(
    `${isArabic ? 'الفترة:' : 'Period:'} ${formatDate(report.period.startDate)} - ${formatDate(report.period.endDate)}`,
    isArabic ? doc.internal.pageSize.width - 20 : 20,
    30,
    { align: isArabic ? 'right' : 'left' }
  );
  
  doc.text(
    `${isArabic ? 'نوع التقرير:' : 'Report Type:'} ${getPeriodTypeText(report.period.type)}`,
    isArabic ? doc.internal.pageSize.width - 20 : 20,
    38,
    { align: isArabic ? 'right' : 'left' }
  );
  
  // Add table
  const tableData = [
    [
      isArabic ? 'البيان' : 'Description',
      isArabic ? 'المبلغ الخاضع للضريبة' : 'Taxable Amount',
      isArabic ? 'قيمة الضريبة' : 'Tax Amount'
    ],
    [
      isArabic ? 'المبيعات' : 'Sales',
      formatCurrency(report.totalSalesBeforeTax),
      formatCurrency(report.salesTax)
    ],
    [
      isArabic ? 'المشتريات' : 'Purchases',
      formatCurrency(report.totalPurchasesBeforeTax),
      formatCurrency(report.purchasesTax)
    ],
    [
      isArabic ? 'صافي الضريبة المستحقة' : 'Net Tax Due',
      '',
      formatCurrency(report.netTaxDue)
    ]
  ];
  
  // @ts-ignore
  doc.autoTable({
    startY: 50,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { halign: isArabic ? 'right' : 'left', fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 60, halign: 'right' },
      2: { cellWidth: 50, halign: 'right' }
    }
  });
  
  // Add footer
  const currentDate = new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US');
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    `${isArabic ? 'تم إنشاء هذا التقرير بتاريخ' : 'This report was generated on'} ${currentDate}`,
    doc.internal.pageSize.width / 2,
    doc.internal.pageSize.height - 20,
    { align: 'center' }
  );
  
  // Save PDF
  const fileName = `VAT_Report_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
  doc.save(fileName);
};
