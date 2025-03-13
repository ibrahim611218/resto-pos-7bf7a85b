
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
      console.log("Loading Arabic fonts for PDF");
      
      // Force binary format for the fonts - make sure to properly convert Base64
      const tajawalRegularBinary = binaryFromBase64(tajawalRegular);
      const tajawalBoldBinary = binaryFromBase64(tajawalBold);
      
      // Add Tajawal font (supports Arabic) with binary data directly
      doc.addFileToVFS('Tajawal-Regular.ttf', tajawalRegularBinary);
      doc.addFileToVFS('Tajawal-Bold.ttf', tajawalBoldBinary);
      
      // Register the font with the document
      doc.addFont('Tajawal-Regular.ttf', 'Tajawal', 'normal');
      doc.addFont('Tajawal-Bold.ttf', 'Tajawal', 'bold');
      
      // Make sure font is properly set
      doc.setFont('Tajawal', 'normal');
      
      // Enable right-to-left for Arabic text - very important
      doc.setR2L(true);
      
      console.log('Arabic fonts loaded successfully', doc.getFont());
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
 * Converts base64 encoded font to binary format
 */
const binaryFromBase64 = (base64: string): string => {
  try {
    // Remove data URI prefix if present
    const base64Data = base64.replace(/^data:.*?;base64,/, '');
    return atob(base64Data);
  } catch (error) {
    console.error('Error converting font to binary:', error);
    throw error;
  }
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
