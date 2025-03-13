
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportToExcel = (
  headers: string[],
  data: (string | number)[][],
  fileName: string
) => {
  try {
    // Create worksheet with headers
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    
    // Create workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    
    // Generate file and trigger download
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return false;
  }
};

export const exportToPdf = (content: HTMLElement, fileName: string, isArabic: boolean = false) => {
  try {
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });
    
    // Enable right-to-left for Arabic
    if (isArabic) {
      doc.setR2L(true);
    }
    
    // Add content from the HTML element
    // This is just a placeholder - in a real implementation, you'd need to
    // properly extract and format the content from the HTML element
    doc.text('Report Content', 20, 20);
    
    // Save the PDF
    doc.save(`${fileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return false;
  }
};
