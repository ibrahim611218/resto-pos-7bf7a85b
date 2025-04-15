
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
    padding: 10mm;
    box-sizing: border-box;
  }

  @media print {
    @page {
      size: 80mm auto; /* Width fixed, height automatic */
      margin: 0;
    }
    
    html, body {
      width: 80mm;
      background-color: white;
      padding: 0;
      margin: 0;
    }
    
    .invoice-container {
      width: 80mm;
      max-width: none;
      margin: 0;
      padding: 5mm;
      box-sizing: border-box;
      page-break-after: always;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;
