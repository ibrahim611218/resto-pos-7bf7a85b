
/**
 * Base styles for invoice
 */
export const getBaseStyles = (): string => `
  @font-face {
    font-family: 'Tajawal';
    src: url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');
    font-weight: normal;
    font-style: normal;
  }
  
  body { 
    font-family: 'Tajawal', Arial, sans-serif; 
    margin: 0; 
    padding: 0; 
    direction: rtl;
    color: #333333;
    background-color: #ffffff;
  }
  
  .invoice-container {
    position: relative;
    width: 100%;
    max-width: 80mm; /* Standard thermal receipt width */
    margin: 0 auto;
    padding: 6mm;
    box-sizing: border-box;
  }

  /* Specific styles for PDF download (A4) */
  .pdf-mode {
    max-width: 210mm;
    margin: 0 auto;
  }
  
  /* Print media settings for thermal receipt printer */
  @media print {
    @page {
      size: 80mm auto; /* Fixed width, auto height */
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
      padding: 3mm;
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
