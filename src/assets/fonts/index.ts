
import { jsPDF } from 'jspdf';
import tajawalRegular from './Tajawal-Regular.ttf';
import tajawalBold from './Tajawal-Bold.ttf';

/**
 * Loads Arabic font for PDF document
 * @param doc jsPDF document instance
 * @param isArabic boolean indicating if Arabic language is used
 * @returns jsPDF document with fonts loaded
 */
export const loadFontsForPDF = (doc: jsPDF, isArabic: boolean) => {
  if (isArabic) {
    try {
      // Force binary format for the fonts
      const tajawalRegularBinary = atob(tajawalRegular);
      const tajawalBoldBinary = atob(tajawalBold);
      
      // Add Tajawal font (supports Arabic) with binary data directly
      doc.addFileToVFS('Tajawal-Regular.ttf', tajawalRegularBinary);
      doc.addFileToVFS('Tajawal-Bold.ttf', tajawalBoldBinary);
      
      // Register the font with the document
      doc.addFont('Tajawal-Regular.ttf', 'Tajawal', 'normal');
      doc.addFont('Tajawal-Bold.ttf', 'Tajawal', 'bold');
      
      // Set the font for Arabic
      doc.setFont('Tajawal');
      
      // Enable right-to-left for Arabic text
      doc.setR2L(true);
      
      console.log('Arabic fonts loaded successfully');
    } catch (error) {
      console.error('Error loading Arabic fonts:', error);
      // Fallback to default font if there's an error
      doc.setFont('helvetica');
      doc.setR2L(true); // Still set RTL for Arabic
    }
  } else {
    // Use default font for English
    doc.setFont('helvetica');
    doc.setR2L(false);
  }
  
  return doc;
};

/**
 * Returns font styles configuration for PDF
 */
export const getFontStylesForPDF = (isArabic: boolean) => {
  return {
    font: isArabic ? 'Tajawal' : 'helvetica',
    direction: isArabic ? 'rtl' : 'ltr'
  };
};
