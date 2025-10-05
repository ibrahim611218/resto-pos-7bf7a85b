
/**
 * Styles for invoice summary sections
 */
export const getSummaryStyles = (): string => `
  .invoice-details { 
    margin-bottom: 12px; 
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
  }
  
  .invoice-details h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 10px 0;
    line-height: 1.5;
  }
  
  .invoice-details p {
    font-size: 13px;
    line-height: 1.7;
    margin: 5px 0;
    font-weight: 500;
  }
  
  .invoice-summary { 
    margin-top: 10px; 
    text-align: left;
    width: 100%;
    max-width: 350px;
    margin-left: auto;
    background-color: #f9f9f9;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
  }
  
  .invoice-summary p {
    display: flex;
    justify-content: space-between;
    margin: 6px 0;
    font-size: 13px;
    font-weight: 500;
  }
  
  .customer-info {
    margin-top: 8px;
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  @media print {
    .invoice-details,
    .invoice-summary {
      background-color: #f9f9f9 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      padding: 10px;
      margin: 8px auto;
    }
    
    .invoice-details h2 {
      font-size: 16px;
      font-weight: 700;
    }
    
    .invoice-details p {
      font-size: 13px;
      font-weight: 500;
      margin: 5px 0;
    }
    
    .invoice-summary p {
      margin: 6px 0;
      font-size: 13px;
      font-weight: 500;
    }
  }
`;
