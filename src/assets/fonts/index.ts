
import { jsPDF } from 'jspdf';

// Font data will be loaded at runtime from Google Fonts CDN
export const loadFontsForPDF = (doc: jsPDF, isArabic: boolean) => {
  if (isArabic) {
    // Add tajawal font for Arabic
    doc.setFont('Tajawal');
    doc.setR2L(true); // Set right-to-left for Arabic
  } else {
    // Use default font for English
    doc.setFont('Helvetica');
    doc.setR2L(false);
  }
  
  return doc;
};

export const getFontStylesForPDF = (isArabic: boolean) => {
  return {
    font: isArabic ? 'Tajawal' : 'Helvetica',
    direction: isArabic ? 'rtl' : 'ltr'
  };
};
