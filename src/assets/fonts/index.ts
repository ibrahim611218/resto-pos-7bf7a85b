
import { jsPDF } from 'jspdf';

// Font data will be loaded at runtime
export const loadFontsForPDF = (doc: jsPDF, isArabic: boolean) => {
  if (isArabic) {
    // Set right-to-left for Arabic
    doc.setR2L(true);
  } else {
    // Use default font for English
    doc.setR2L(false);
  }
  
  return doc;
};

export const getFontStylesForPDF = (isArabic: boolean) => {
  return {
    direction: isArabic ? 'rtl' : 'ltr'
  };
};
