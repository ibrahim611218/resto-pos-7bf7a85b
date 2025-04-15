
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
    max-width: 21cm; /* A4 width */
    margin: 0 auto;
    padding: 1cm;
    box-sizing: border-box;
  }

  @media print {
    @page {
      size: A4;
      margin: 0;
    }
    
    body {
      background-color: white;
      padding: 0;
      margin: 0;
    }
    
    .invoice-container {
      width: 100%;
      max-width: none;
      margin: 0 auto;
      height: 100%;
      padding: 1cm;
      box-sizing: border-box;
      page-break-after: always;
    }
  }
`;
