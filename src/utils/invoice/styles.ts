
/**
 * CSS styles for the printable invoice
 */
export const getInvoiceStyles = (): string => {
  return `
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
    
    .invoice-header { 
      text-align: center; 
      margin-bottom: 20px; 
    }
    
    .logo { 
      max-width: 150px; 
      max-height: 80px; 
      margin: 0 auto;
      display: block;
    }
    
    .brand-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    
    .brand-name {
      font-size: 24px;
      font-weight: bold;
      display: inline-block;
      margin-top: 5px;
    }
    
    .brand-name-primary {
      color: #00825A;
    }
    
    .brand-name-accent {
      color: #FF6B00;
    }
    
    .invoice-details { 
      margin-bottom: 20px; 
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
    }
    
    .invoice-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin: 20px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .invoice-table th, .invoice-table td { 
      border: 1px solid #ddd; 
      padding: 8px; 
      text-align: right; 
    }
    
    .invoice-table th { 
      background-color: #004d40; 
      color: white;
      font-weight: bold;
    }
    
    .invoice-table tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    
    .invoice-summary { 
      margin-top: 20px; 
      text-align: left;
      width: 100%;
      max-width: 350px;
      margin-left: auto;
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
    }
    
    .invoice-summary p {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
    }
    
    .qr-code { 
      text-align: center; 
      margin: 20px auto;
      padding: 10px;
      background-color: white;
      display: block;
      width: fit-content;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
    }
    
    .qr-code img {
      display: inline-block !important;
      width: 100px;
      height: 100px;
    }
    
    .invoice-footer { 
      margin-top: 30px; 
      text-align: center; 
      font-size: 12px;
      color: #666;
      padding-top: 15px;
      border-top: 1px dashed #ddd;
    }
    
    .total-row {
      font-weight: bold;
      font-size: 1.2em;
      background-color: #f0f7f4 !important;
    }
    
    .customer-info {
      margin-top: 10px;
      border: 1px solid #ddd;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    
    .software-info {
      margin-top: 30px;
      text-align: center;
      font-size: 10px;
      color: #999;
      padding-top: 15px;
      border-top: 1px solid #eee;
    }
    
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      font-size: 96px;
      color: rgba(255, 0, 0, 0.15);
      font-weight: bold;
      z-index: 100;
      pointer-events: none;
      white-space: nowrap;
    }
    
    .invoice-empty-items {
      text-align: center;
      padding: 20px;
      border: 1px dashed #ddd;
      margin: 20px 0;
    }
    
    /* Print-specific styles */
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
      
      .invoice-details,
      .invoice-summary {
        background-color: #f9f9f9 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .invoice-table th {
        background-color: #004d40 !important;
        color: white !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .invoice-table tr:nth-child(even) {
        background-color: #f2f2f2 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .total-row {
        background-color: #f0f7f4 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .watermark {
        color: rgba(255, 0, 0, 0.15) !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .no-print {
        display: none !important;
      }
      
      .qr-code {
        display: block !important;
        margin: 20px auto !important;
      }
      
      .qr-code img, .qr-code canvas {
        display: inline-block !important;
        width: 100px !important;
        height: 100px !important;
      }
    }
  `;
};
