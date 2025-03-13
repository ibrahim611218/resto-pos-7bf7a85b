
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
      // Convert font data to base64 string if needed
      // Add Tajawal font (supports Arabic)
      doc.addFileToVFS('Tajawal-Regular.ttf', tajawalRegular);
      doc.addFileToVFS('Tajawal-Bold.ttf', tajawalBold);
      
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
