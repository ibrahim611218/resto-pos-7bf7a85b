
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
    }
    .invoice-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin: 20px 0;
    }
    .invoice-table th, .invoice-table td { 
      border: 1px solid #ddd; 
      padding: 8px; 
      text-align: right; 
    }
    .invoice-table th { 
      background-color: #f2f2f2; 
    }
    .invoice-summary { 
      margin-top: 20px; 
      text-align: left;
      width: 50%;
      margin-left: auto;
    }
    .invoice-summary p {
      display: flex;
      justify-content: space-between;
    }
    .qr-code { 
      text-align: center; 
      margin-top: 20px; 
    }
    .invoice-footer { 
      margin-top: 30px; 
      text-align: center; 
      font-size: 12px;
      color: #666;
    }
    .total-row {
      font-weight: bold;
      font-size: 1.2em;
    }
    .customer-info {
      margin-top: 10px;
      border: 1px solid #ddd;
      padding: 10px;
      background-color: #f9f9f9;
    }
    .software-info {
      margin-top: 30px;
      text-align: center;
      font-size: 10px;
      color: #999;
    }
  `;
};
