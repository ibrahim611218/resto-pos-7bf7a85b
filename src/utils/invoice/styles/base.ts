
/**
 * Base styles for invoice
 */
export const getBaseStyles = (): string => `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
  
  * {
    font-family: 'Tajawal', sans-serif !important;
  }
  
  body { 
    font-family: 'Tajawal', sans-serif !important;
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
    max-width: 80mm;
    margin: 0 auto;
    padding: 5mm;
    box-sizing: border-box;
    font-family: 'Tajawal', sans-serif !important;
  }

  .pdf-mode {
    max-width: 100%;
    width: 210mm;
    padding: 8mm;
    margin: 0 auto;
    box-sizing: border-box;
    font-family: 'Tajawal', sans-serif !important;
  }
  
  .pdf-mode .invoice-header {
    margin-bottom: 10px;
  }
  
  .pdf-mode .invoice-title {
    font-size: 18px;
    margin-bottom: 5px;
    font-family: 'Tajawal', sans-serif !important;
  }
  
  .pdf-mode .business-details {
    margin-bottom: 10px;
  }
  
  @media print {
    @page {
      size: 80mm auto;
      margin: 0;
    }
    
    .pdf-mode {
      @page {
        size: A4;
        margin: 5mm;
      }
    }
    
    * {
      font-family: 'Tajawal', sans-serif !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    
    html, body {
      width: 100%;
      height: 100%;
      background-color: white !important;
      padding: 0 !important;
      margin: 0 !important;
      font-family: 'Tajawal', sans-serif !important;
    }
    
    .invoice-container:not(.pdf-mode) {
      width: 80mm;
      max-width: none;
      margin: 0;
      padding: 2mm;
      box-sizing: border-box;
      page-break-after: avoid;
      font-family: 'Tajawal', sans-serif !important;
    }
    
    .watermark {
      display: block !important;
      opacity: 0.15 !important;
    }
  }
  
  p, h1, h2, h3, h4, h5, h6, span, div, td, th, label, input, button, a {
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-family: 'Tajawal', sans-serif !important;
    font-weight: 400;
  }
  
  strong, b, th, .invoice-title {
    font-weight: 700;
    font-family: 'Tajawal', sans-serif !important;
  }
  
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-family: 'Tajawal', sans-serif !important;
  }
  
  .pdf-mode .invoice-table {
    width: 100%;
    margin: 10px 0;
    border-collapse: collapse;
    font-family: 'Tajawal', sans-serif !important;
  }
  
  .pdf-mode .invoice-table th {
    padding: 6px;
    font-size: 13px;
    font-weight: bold;
    background-color: #f7f7f7;
    border-bottom: 2px solid #ddd;
    text-align: right;
    font-family: 'Tajawal', sans-serif !important;
  }
  
  .pdf-mode .invoice-table td {
    padding: 6px;
    font-size: 13px;
    border-bottom: 1px solid #eee;
    font-family: 'Tajawal', sans-serif !important;
  }
  
  .pdf-mode .invoice-summary {
    margin-top: 15px;
    font-size: 13px;
    font-family: 'Tajawal', sans-serif !important;
  }
  
  .pdf-mode .invoice-footer {
    margin-top: 15px;
    font-size: 11px;
    font-family: 'Tajawal', sans-serif !important;
  }
  
  .pdf-mode .qr-code-container {
    margin: 15px auto;
  }
`;
