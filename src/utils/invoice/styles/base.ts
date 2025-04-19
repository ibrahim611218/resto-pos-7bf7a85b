
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
    max-width: 100%;
    width: 210mm; /* A4 width */
    padding: 10mm;
    margin: 0 auto;
    box-sizing: border-box;
  }
  
  .pdf-mode .invoice-header {
    margin-bottom: 20px;
  }
  
  .pdf-mode .invoice-title {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .pdf-mode .business-details {
    margin-bottom: 15px;
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
        margin: 10mm;
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
  
  /* Table styles for A4 PDF */
  .pdf-mode .invoice-table {
    width: 100%;
    margin: 15px 0;
    border-collapse: collapse;
  }
  
  .pdf-mode .invoice-table th {
    padding: 8px;
    font-size: 14px;
    font-weight: bold;
    background-color: #f7f7f7;
    border-bottom: 2px solid #ddd;
    text-align: right;
  }
  
  .pdf-mode .invoice-table td {
    padding: 8px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
  
  .pdf-mode .invoice-summary {
    margin-top: 20px;
    font-size: 14px;
  }
  
  .pdf-mode .invoice-footer {
    margin-top: 20px;
    font-size: 12px;
  }
  
  .pdf-mode .qr-code-container {
    margin: 20px auto;
  }
`;
