
/**
 * Base styles for invoice
 */
export const getBaseStyles = (): string => `
  body { 
    font-family: 'Tajawal', 'Arial', 'Helvetica', sans-serif !important; 
    margin: 0; 
    padding: 0; 
    direction: rtl;
    color: #1a1a1a !important;
    background-color: #ffffff;
    font-size: 14px;
    line-height: 1.6;
  }
  
  * {
    font-family: 'Tajawal', 'Arial', 'Helvetica', sans-serif !important;
  }
  
  .invoice-container {
    position: relative;
    width: 100%;
    max-width: 80mm; /* Standard thermal receipt width */
    margin: 0 auto;
    padding: 10mm;
    box-sizing: border-box;
  }

  @media print {
    @page {
      size: 80mm auto; /* Fixed width, auto height to prevent second page */
      margin: 0;
    }
    
    html, body {
      width: 80mm;
      background-color: white !important;
      padding: 0 !important;
      margin: 0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .invoice-container {
      width: 80mm;
      max-width: none;
      margin: 0;
      padding: 5mm;
      box-sizing: border-box;
      page-break-after: avoid;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    
    .watermark {
      display: block !important;
      opacity: 0.15 !important;
    }
  }
  
  /* Ensure all text is visible */
  p, h1, h2, h3, h4, span, div, td, th {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  
  /* Ensure all table cells are visible */
  td, th {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

