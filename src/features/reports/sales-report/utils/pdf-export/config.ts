
import { jsPDF } from "jspdf";
import { getFontStylesForPDF, loadFontsForPDF } from "@/assets/fonts";

/**
 * Creates and configures a new PDF document
 */
export const createPDFDocument = (isArabic: boolean): jsPDF => {
  // Create new PDF document with the appropriate orientation
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    compress: true
  });
  
  // Load proper fonts for the selected language
  loadFontsForPDF(doc, isArabic);
  
  // Ensure Arabic font is properly set
  if (isArabic) {
    doc.setFont('Tajawal', 'normal');
    doc.setR2L(true);
    console.log('Confirmed font after loading:', doc.getFont());
  }
  
  return doc;
};

/**
 * Returns font styles for the PDF document
 */
export const getPDFStyles = (isArabic: boolean) => {
  return getFontStylesForPDF(isArabic);
};
