
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { loadFontsForPDF, getFontStylesForPDF } from '@/assets/fonts';

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
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true
    });
    
    // Load proper fonts for Arabic if needed
    loadFontsForPDF(doc, isArabic);
    
    // Get font styles
    const fontStyles = getFontStylesForPDF(isArabic);
    
    // Set font and text direction
    doc.setFont(fontStyles.font);
    if (isArabic) {
      doc.setR2L(true);
    }
    
    // Add content from the HTML element
    const titleX = isArabic ? doc.internal.pageSize.width - 20 : 20;
    doc.text(isArabic ? 'محتوى التقرير' : 'Report Content', titleX, 20, { align: isArabic ? 'right' : 'left' });
    
    // Force set font again to ensure Arabic text displays correctly
    if (isArabic) {
      doc.setFont(fontStyles.font);
      doc.setR2L(true);
    }
    
    // Save the PDF
    doc.save(`${fileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return false;
  }
};
