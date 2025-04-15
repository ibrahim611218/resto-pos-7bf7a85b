
/**
 * Creates a printable version of the content in a new window
 */
export const printContent = (
  content: HTMLElement,
  title: string = 'Report',
  isArabic: boolean = false
) => {
  try {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert(isArabic ? 'يرجى السماح بالنوافذ المنبثقة لهذا الموقع' : 'Please allow popups for this site');
      return false;
    }
    
    // Get the content HTML
    const contentHtml = content.innerHTML;
    
    // Create printed page styling
    const printableHTML = createPrintableHTML(contentHtml, title, isArabic);
    
    // Write the HTML to the new window and print it
    printWindow.document.open();
    printWindow.document.write(printableHTML);
    printWindow.document.close();
    
    // Wait for resources to load before printing
    printWindow.onload = function() {
      printWindow.print();
    };
    
    return true;
  } catch (error) {
    console.error('Error printing content:', error);
    return false;
  }
};

/**
 * Creates the HTML structure for printing
 */
const createPrintableHTML = (contentHtml: string, title: string, isArabic: boolean): string => {
  return `
    <html dir="${isArabic ? 'rtl' : 'ltr'}">
    <head>
      <title>${title}</title>
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
            margin-bottom: 20px;
            border-bottom: 2px solid #3B82F6;
            padding-bottom: 15px;
          }
          .report-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #3B82F6;
          }
          table {
            width: 100%;
            border-collapse: collapse;
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
          thead {
            display: table-header-group;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 10px;
          }
        }
      </style>
    </head>
    <body>
      <div class="report-header">
        <div class="report-title">${title}</div>
        <div class="date-info">
          ${isArabic ? 'تاريخ التقرير' : 'Report Date'}: ${new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
        </div>
      </div>
      
      <div id="content">
        ${contentHtml}
      </div>
      
      <div class="footer">
        ${isArabic ? 'تم إنشاؤه في' : 'Generated on'} ${new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
      </div>
    </body>
    </html>
  `;
};
