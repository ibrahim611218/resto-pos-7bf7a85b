
export const handleInventoryPrint = (
  inventoryData: any[], 
  isArabic: boolean
) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert(isArabic ? 'يرجى السماح بالنوافذ المنبثقة لهذا الموقع' : 'Please allow popups for this site');
    return;
  }
  
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
          /* ... keep existing code (print styles) */
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
          ${inventoryData.map((item) => `
            <tr>
              <td>${item.id}</td>
              <td>${isArabic && item.productNameAr ? item.productNameAr : item.productName}</td>
              <td>${item.quantity.toFixed(2)}</td>
              <td>${item.unit || "-"}</td>
              <td>${item.reorderLevel}</td>
              <td>${new Date(item.lastUpdated).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}</td>
              <td>${calculateInventoryPercentage(item.quantity, item.originalQuantity)}%</td>
              <td>${getStatusText(item, isArabic)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="footer">
        ${isArabic ? 'تم إنشاؤه في' : 'Generated on'} ${new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.open();
  printWindow.document.write(printableHTML);
  printWindow.document.close();
  
  printWindow.onload = function() {
    printWindow.print();
  };
};

const calculateInventoryPercentage = (current: number, original: number | undefined): number => {
  if (!original || original === 0) return 100;
  return Math.round((current / original) * 100);
};

const getStatusText = (item: any, isArabic: boolean) => {
  const percentage = calculateInventoryPercentage(item.quantity, item.originalQuantity);
  
  if (item.quantity <= 0) {
    return isArabic ? 'نفذ من المخزون' : 'Out of Stock';
  } else if (item.quantity <= item.reorderLevel) {
    return isArabic ? 'الخزون منخفض' : 'Low Stock';
  } else if (percentage < 50) {
    return isArabic ? 'المخزون متوسط' : 'Medium Stock';
  }
  return isArabic ? 'متوفر' : 'In Stock';
};
