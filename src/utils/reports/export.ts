
import * as XLSX from 'xlsx';

/**
 * Enhanced Excel export with proper formatting and styling
 */
export const exportToExcel = (
  headers: string[],
  data: (string | number)[][],
  fileName: string,
  title?: string,
  isArabic: boolean = false
) => {
  try {
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);
    
    // Add title with merged cells if provided
    let rowIndex = 0;
    if (title) {
      XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" });
      ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }];
      rowIndex = 2; // Start after title row
    }
    
    // Add date row
    const dateText = isArabic 
      ? `تاريخ التقرير: ${new Date().toLocaleDateString("ar-SA")}`
      : `Report Date: ${new Date().toLocaleDateString("en-US")}`;
    XLSX.utils.sheet_add_aoa(ws, [[dateText]], { origin: `A${rowIndex + 1}` });
    
    if (!ws["!merges"]) ws["!merges"] = [];
    ws["!merges"].push({ s: { r: rowIndex, c: 0 }, e: { r: rowIndex, c: headers.length - 1 } });
    rowIndex += 2; // Add empty row after date
    
    // Add headers and data
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: `A${rowIndex + 1}` });
    XLSX.utils.sheet_add_aoa(ws, data, { origin: `A${rowIndex + 2}` });
    
    // Set column widths based on content
    const maxColumnWidth = 30;
    const minColumnWidth = 10;
    
    ws["!cols"] = headers.map((header, index) => {
      // Calculate width based on header and data
      let maxWidth = header.length;
      
      data.forEach(row => {
        if (row[index] !== undefined) {
          const cellValue = row[index].toString();
          maxWidth = Math.max(maxWidth, cellValue.length);
        }
      });
      
      // Apply min/max constraints
      return { wch: Math.min(Math.max(maxWidth, minColumnWidth), maxColumnWidth) };
    });
    
    // Apply styles to cells
    const range = XLSX.utils.decode_range(ws["!ref"] || `A1:${String.fromCharCode(65 + headers.length - 1)}${data.length + rowIndex + 2}`);
    
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cell_ref]) continue;
        
        // Initialize style object if it doesn't exist
        if (!ws[cell_ref].s) ws[cell_ref].s = {};
        
        // Title row - bold, centered, larger font
        if (title && R === 0) {
          ws[cell_ref].s.font = { bold: true, sz: 16 };
          ws[cell_ref].s.alignment = { horizontal: "center", vertical: "center" };
        }
        // Date row - medium size
        else if (R === rowIndex - 2) {
          ws[cell_ref].s.font = { sz: 12 };
          ws[cell_ref].s.alignment = { horizontal: "center", vertical: "center" };
        }
        // Header row - bold with background color
        else if (R === rowIndex) {
          ws[cell_ref].s.font = { bold: true };
          ws[cell_ref].s.fill = { fgColor: { rgb: "DDDDDD" } };
          ws[cell_ref].s.alignment = { horizontal: isArabic ? "right" : "left", vertical: "center" };
        }
        // Data rows
        else if (R > rowIndex) {
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
    
    // Add worksheet to workbook with proper name
    XLSX.utils.book_append_sheet(wb, ws, fileName.substring(0, 31)); // Max 31 chars for sheet name
    
    // Generate filename with date
    const dateStr = new Date().toISOString().split('T')[0];
    const fullFileName = `${fileName}_${dateStr}.xlsx`;
    
    // Write file and trigger download
    XLSX.writeFile(wb, fullFileName);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return false;
  }
};

// Export function for printing (replace PDF export)
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
    const printableHTML = `
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
