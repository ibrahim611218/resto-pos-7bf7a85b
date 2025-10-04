
/**
 * Base styles for invoice
 */
export const getBaseStyles = (): string => `
  body { 
    font-family: 'Tajawal', -apple-system, BlinkMacSystemFont, sans-serif; 
    margin: 0; 
    padding: 0; 
    direction: rtl;
    color: #1a1a1a;
    background-color: #ffffff;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .invoice-container {
    position: relative;
    width: 100%;
    max-width: 80mm; /* Standard thermal receipt width */
    margin: 0 auto;
    padding: 5mm;
    box-sizing: border-box;
  }

  /* Specific styles for PDF download (A4) */
  .pdf-mode {
    max-width: 100%;
    width: 210mm; /* A4 width */
    padding: 8mm;
    margin: 0 auto;
    box-sizing: border-box;
  }
  
  .pdf-mode .invoice-header {
    margin-bottom: 10px;
  }
  
  .pdf-mode .invoice-title {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .pdf-mode .business-details {
    margin-bottom: 10px;
  }
  
  /* Print media settings */
  @media print {
    /* For thermal receipt */
    @page {
      size: 80mm auto;
      margin: 0;
    }
    
    /* For PDF (A4) */
    .pdf-mode {
      @page {
        size: A4;
        margin: 5mm;
      }
    }
    
    html, body {
      width: 100%;
      height: 100%;
      background-color: white !important;
      padding: 0 !important;
      margin: 0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .invoice-container:not(.pdf-mode) {
      width: 80mm;
      max-width: none;
      margin: 0;
      padding: 2mm;
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
  
  /* Ensure all text is visible and clear */
  p, h1, h2, h3, h4, h5, h6, span, div, td, th {
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-family: 'Tajawal', sans-serif;
    font-weight: 400;
  }
  
  /* Bold text */
  strong, b, th, .invoice-title {
    font-weight: 700;
  }
  
  /* Improve text rendering */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  /* Table styles for A4 PDF */
  .pdf-mode .invoice-table {
    width: 100%;
    margin: 10px 0;
    border-collapse: collapse;
  }
  
  .pdf-mode .invoice-table th {
    padding: 6px;
    font-size: 13px;
    font-weight: bold;
    background-color: #f7f7f7;
    border-bottom: 2px solid #ddd;
    text-align: right;
  }
  
  .pdf-mode .invoice-table td {
    padding: 6px;
    font-size: 13px;
    border-bottom: 1px solid #eee;
  }
  
  .pdf-mode .invoice-summary {
    margin-top: 15px;
    font-size: 13px;
  }
  
  .pdf-mode .invoice-footer {
    margin-top: 15px;
    font-size: 11px;
  }
  
  .pdf-mode .qr-code-container {
    margin: 15px auto;
  }
`;
