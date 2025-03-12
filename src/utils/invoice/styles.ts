
/**
 * CSS styles for the printable invoice
 */
export const getInvoiceStyles = (): string => {
  return `
    body { 
      font-family: 'Tajawal', Arial, sans-serif; 
      margin: 0; 
      padding: 20px; 
      direction: rtl;
      color: #333333;
      background-color: #ffffff;
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
      padding: 12px; 
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
      width: 50%;
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
      margin-top: 20px; 
      padding: 10px;
      background-color: white;
      display: inline-block;
      margin-left: auto;
      margin-right: auto;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
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
    /* Dark Mode Specific Styles */
    .dark body {
      background-color: #000;
      color: #fff;
    }
    .dark .invoice-details,
    .dark .invoice-summary,
    .dark .customer-info {
      background-color: #111;
      border-color: #1E88E5;
      color: #fff;
    }
    .dark .invoice-table th {
      background-color: #1E88E5;
    }
    .dark .invoice-table td,
    .dark .invoice-table th {
      border-color: #1E88E5;
    }
    .dark .invoice-table tr:nth-child(even) {
      background-color: #222;
    }
    .dark .qr-code {
      background-color: #111;
      border-color: #1E88E5;
    }
    .dark .invoice-footer {
      border-top-color: #1E88E5;
      color: #aaa;
    }
    .dark .software-info {
      color: #777;
      border-top-color: #1E88E5;
    }
    /* Saudi Mode Specific Styles */
    .saudi .invoice-details,
    .saudi .invoice-summary,
    .saudi .customer-info,
    .saudi .qr-code {
      border-color: #FF6B00;
    }
    /* Print-specific styles */
    @media print {
      body {
        background-color: white;
        padding: 0;
        margin: 0;
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
    }
  `;
};
