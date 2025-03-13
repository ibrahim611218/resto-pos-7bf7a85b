
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import InventoryTable from "./components/InventoryTable";
import ExportButtons from "./components/ExportButtons";
import { useInventoryData } from "./hooks/useInventoryData";
import { calculateInventoryPercentage } from "./utils/inventory-utils";

const InventoryReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { inventoryData } = useInventoryData();
  
  // Log component mount and data status - helpful for debugging
  useEffect(() => {
    console.log("InventoryReport rendered, data length:", inventoryData?.length);
    console.log("Language:", language, "isArabic:", isArabic);
  }, [inventoryData, language, isArabic]);
  
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert(isArabic ? 'يرجى السماح بالنوافذ المنبثقة لهذا الموقع' : 'Please allow popups for this site');
      return;
    }
    
    // Prepare data for printing
    const printableHTML = `
      <html dir="${isArabic ? 'rtl' : 'ltr'}">
      <head>
        <title>${isArabic ? 'تقرير المخزون' : 'Inventory Report'}</title>
        <style>
          @media print {
            @page { 
              size: A4 landscape;
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
              border-bottom: 2px solid #3B82F6;
              padding-bottom: 15px;
            }
            .report-title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
              color: #3B82F6;
            }
            .date-info {
              font-size: 14px;
              color: #666;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              page-break-inside: auto;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: ${isArabic ? 'right' : 'left'};
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
            tbody tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .low-stock {
              background-color: #FFCCCC !important;
              color: #CC0000;
            }
            .medium-stock {
              background-color: #FFFFCC !important;
              color: #CC7700;
            }
            .good-stock {
              background-color: #CCFFCC !important;
              color: #007700;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-top: 1px solid #eee;
              padding-top: 10px;
            }
            .inventory-status {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-weight: bold;
              text-align: center;
            }
          }
        </style>
      </head>
      <body>
        <div class="report-header">
          <div class="report-title">${isArabic ? 'تقرير المخزون' : 'Inventory Report'}</div>
          <div class="date-info">
            ${isArabic ? 'تاريخ التقرير' : 'Report Date'}: ${new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>${isArabic ? 'رقم' : 'ID'}</th>
              <th>${isArabic ? 'اسم المنتج' : 'Product Name'}</th>
              <th>${isArabic ? 'الكمية' : 'Quantity'}</th>
              <th>${isArabic ? 'الوحدة' : 'Unit'}</th>
              <th>${isArabic ? 'حد إعادة الطلب' : 'Reorder Level'}</th>
              <th>${isArabic ? 'آخر تحديث' : 'Last Updated'}</th>
              <th>${isArabic ? 'نسبة المخزون' : 'Inventory %'}</th>
              <th>${isArabic ? 'الحالة' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            ${inventoryData.map((item, index) => {
              const inventoryPercentage = calculateInventoryPercentage(item.quantity, item.originalQuantity);
              
              let statusClass = 'good-stock';
              let statusText = isArabic ? 'متوفر' : 'In Stock';
              
              if (item.quantity <= 0) {
                statusClass = 'low-stock';
                statusText = isArabic ? 'نفذ من المخزون' : 'Out of Stock';
              } else if (item.quantity <= item.reorderLevel) {
                statusClass = 'low-stock';
                statusText = isArabic ? 'المخزون منخفض' : 'Low Stock';
              } else if (inventoryPercentage < 50) {
                statusClass = 'medium-stock';
                statusText = isArabic ? 'المخزون متوسط' : 'Medium Stock';
              }
              
              return `
                <tr>
                  <td>${item.id}</td>
                  <td>${isArabic && item.productNameAr ? item.productNameAr : item.productName}</td>
                  <td>${item.quantity.toFixed(2)}</td>
                  <td>${item.unit || "-"}</td>
                  <td>${item.reorderLevel}</td>
                  <td>${new Date(item.lastUpdated).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}</td>
                  <td>${inventoryPercentage}%</td>
                  <td>
                    <div class="inventory-status ${statusClass}">
                      ${statusText}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
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
  
  // If no data, render a loading state
  if (!inventoryData || inventoryData.length === 0) {
    return (
      <div className="container p-4 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">
            {isArabic ? "جاري تحميل البيانات..." : "Loading inventory data..."}
          </h3>
          <p className="text-muted-foreground">
            {isArabic ? "يرجى الانتظار" : "Please wait"}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container p-4">
      <InventoryTable 
        inventoryData={inventoryData}
        isArabic={isArabic}
        ExportButtons={<ExportButtons inventoryData={inventoryData} isArabic={isArabic} onPrint={handlePrint} />}
      />
    </div>
  );
};

export default InventoryReport;
